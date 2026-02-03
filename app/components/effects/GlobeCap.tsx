import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { useReducedMotion } from "~/hooks";

interface GlobeCapProps {
  width?: number;
  height?: number;
  visibleCapHeight?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  oceanColor?: string;
  className?: string;
  showSatellite?: boolean;
  satelliteOrbitSpeed?: number;
}

/**
 * GlobeCap - Optimized globe component that renders only the visible spherical cap
 *
 * Instead of rendering a full 4800×4800 globe and hiding most of it,
 * this component renders only the visible top portion (casquete esférico),
 * reducing the rendering area from ~23M pixels to ~1M pixels.
 *
 * Mathematical basis:
 * - Original globe: R = 2182px (radius), full sphere
 * - Visible portion: ~472px (the arc/cap at the bottom of viewport)
 * - This component: same R, same curvature, but only renders what's visible
 */
export function GlobeCap({
  width = 2000,
  height = 500,
  visibleCapHeight = 472,
  autoRotate = true,
  rotationSpeed = 0.3,
  strokeColor = "#cccccc",
  strokeWidth = 0.5,
  fillColor = "none",
  oceanColor = "transparent",
  className = "",
  showSatellite = false,
  satelliteOrbitSpeed = 0.5,
}: GlobeCapProps) {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const isVisibleRef = useRef(true);
  const rotationRef = useRef({ x: 0, y: -20 });
  const isDraggingRef = useRef(false);
  const satelliteAngleRef = useRef(250);
  const lastFrameTimeRef = useRef(0);
  const targetFPS = 30;
  const frameInterval = 1000 / targetFPS;

  // Disable auto-rotation and satellite animation when user prefers reduced motion
  const effectiveAutoRotate = autoRotate && !prefersReducedMotion;
  const effectiveShowSatellite = showSatellite && !prefersReducedMotion;

  // Globe scale - matches the original 4800/2.2 ratio for same curvature
  const globeScale = 4800 / 2.2; // ≈ 2182px radius

  // Calculate center offset to show only the cap
  // The center needs to be below the canvas so only the top arc shows
  const centerY = height + (globeScale - visibleCapHeight);

  // Intersection Observer to pause when not visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "100px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Load world data
  useEffect(() => {
    const loadWorld = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );
        const world = (await response.json()) as Topology<{
          countries: GeometryCollection;
          land: GeometryCollection;
        }>;
        setWorldData(world);
      } catch (error) {
        console.error("Error loading world data:", error);
      }
    };
    loadWorld();
  }, []);

  // Render globe
  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create clip path to constrain rendering to visible area
    const defs = svg.append("defs");
    defs
      .append("clipPath")
      .attr("id", "globe-cap-clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoOrthographic()
      .scale(globeScale)
      .translate([width / 2, centerY])
      .rotate([rotationRef.current.x, rotationRef.current.y]);

    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(
      worldData,
      worldData.objects.countries
    ) as any;

    // Main group with clipping
    const mainGroup = svg.append("g").attr("clip-path", "url(#globe-cap-clip)");

    // Ocean/sphere background
    mainGroup
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", centerY)
      .attr("r", globeScale)
      .attr("fill", oceanColor)
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth);

    // Countries
    const countriesGroup = mainGroup.append("g").attr("class", "countries");

    countriesGroup
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", fillColor)
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth);

    // CubeSat calculations
    const orbitRadiusFactor = 1.045;
    const actualOrbitRadius = globeScale * orbitRadiusFactor;
    const cubeSize = globeScale * 0.006;

    // Orbit line (only the visible arc portion)
    if (effectiveShowSatellite) {
      mainGroup
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", centerY)
        .attr("r", actualOrbitRadius)
        .attr("fill", "none")
        .attr("stroke", "rgba(255, 255, 255, 0.15)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "8,4");
    }

    const satelliteGroup = effectiveShowSatellite
      ? mainGroup.append("g").attr("class", "satellite")
      : null;

    // CubeSat drawing function
    const drawCubeSat = (
      centerX: number,
      centerSatY: number,
      size: number,
      isVisible: boolean,
      scale: number
    ) => {
      if (!satelliteGroup) return;
      satelliteGroup.selectAll("*").remove();

      if (!isVisible) return;

      const s = size * scale;
      const angle = Math.PI / 6;
      const ax = s * Math.cos(angle);
      const ay = s * Math.sin(angle);

      const cx = centerX;
      const cy = centerSatY;

      // Cube vertices
      const v0 = [cx, cy - s];
      const v1 = [cx + ax, cy - s + ay];
      const v2 = [cx, cy - s + 2 * ay];
      const v3 = [cx - ax, cy - s + ay];
      const v5 = [cx + ax, cy + ay];
      const v6 = [cx, cy + 2 * ay];
      const v7 = [cx - ax, cy + ay];

      // Left face (white)
      satelliteGroup
        .append("polygon")
        .attr(
          "points",
          [v3, v2, v6, v7].map((p) => p.join(",")).join(" ")
        )
        .attr("fill", "rgba(255, 255, 255, 0.85)")
        .attr("stroke", "rgba(220, 220, 220, 1)")
        .attr("stroke-width", 0.3);

      // Right face (brand red)
      satelliteGroup
        .append("polygon")
        .attr(
          "points",
          [v2, v1, v5, v6].map((p) => p.join(",")).join(" ")
        )
        .attr("fill", "rgba(219, 1, 58, 0.9)")
        .attr("stroke", "rgba(180, 1, 48, 1)")
        .attr("stroke-width", 0.3);

      // Top face (dark gray)
      satelliteGroup
        .append("polygon")
        .attr(
          "points",
          [v0, v1, v2, v3].map((p) => p.join(",")).join(" ")
        )
        .attr("fill", "rgba(80, 80, 80, 0.8)")
        .attr("stroke", "rgba(100, 100, 100, 1)")
        .attr("stroke-width", 0.3);

      // Antennas
      const antennaLen = s * 1.2;
      const antennaColor = "rgba(200, 200, 200, 0.9)";
      const antennaWidth = 0.5;

      // Top antenna
      satelliteGroup
        .append("line")
        .attr("x1", v0[0])
        .attr("y1", v0[1])
        .attr("x2", v0[0])
        .attr("y2", v0[1] - antennaLen)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Bottom antenna
      satelliteGroup
        .append("line")
        .attr("x1", v6[0])
        .attr("y1", v6[1])
        .attr("x2", v6[0])
        .attr("y2", v6[1] + antennaLen)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Right antenna
      satelliteGroup
        .append("line")
        .attr("x1", v1[0])
        .attr("y1", v1[1])
        .attr("x2", v1[0] + antennaLen * 0.7)
        .attr("y2", v1[1] - antennaLen * 0.4)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Left antenna
      satelliteGroup
        .append("line")
        .attr("x1", v3[0])
        .attr("y1", v3[1])
        .attr("x2", v3[0] - antennaLen * 0.7)
        .attr("y2", v3[1] - antennaLen * 0.4)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);
    };

    // Update function
    const update = () => {
      projection.rotate([rotationRef.current.x, rotationRef.current.y]);
      countriesGroup.selectAll("path").attr("d", path as any);

      if (effectiveShowSatellite) {
        const satAngle = satelliteAngleRef.current * (Math.PI / 180);
        const satX = width / 2 + Math.cos(satAngle) * actualOrbitRadius;
        const satY = centerY + Math.sin(satAngle) * actualOrbitRadius;

        // Only draw if satellite is in visible area (top portion of orbit)
        const isInVisibleArea = satY < height + 50;
        drawCubeSat(satX, satY, cubeSize, isInVisibleArea, 1);
      }
    };

    // Animation loop
    let animationId: number;
    if (effectiveAutoRotate || effectiveShowSatellite) {
      update();

      const animate = (currentTime: number) => {
        animationId = requestAnimationFrame(animate);

        if (!isVisibleRef.current) return;

        if (lastFrameTimeRef.current === 0) {
          lastFrameTimeRef.current = currentTime;
        }
        const elapsed = currentTime - lastFrameTimeRef.current;
        if (elapsed < frameInterval) return;
        lastFrameTimeRef.current = currentTime;

        if (!isDraggingRef.current && effectiveAutoRotate) {
          rotationRef.current.x += rotationSpeed;
        }
        if (effectiveShowSatellite) {
          satelliteAngleRef.current += satelliteOrbitSpeed;
        }
        update();
      };
      animationId = requestAnimationFrame(animate);
    } else {
      // Render initial state without animation
      update();
    }

    // Drag interaction
    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .on("start", () => {
        isDraggingRef.current = true;
      })
      .on("drag", (event) => {
        const sensitivity = 0.5;
        rotationRef.current.x += event.dx * sensitivity;
        rotationRef.current.y -= event.dy * sensitivity;
        rotationRef.current.y = Math.max(
          -90,
          Math.min(90, rotationRef.current.y)
        );
        update();
      })
      .on("end", () => {
        isDraggingRef.current = false;
      });

    svg.call(drag);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [
    worldData,
    width,
    height,
    visibleCapHeight,
    centerY,
    globeScale,
    effectiveAutoRotate,
    rotationSpeed,
    strokeColor,
    strokeWidth,
    fillColor,
    oceanColor,
    effectiveShowSatellite,
    satelliteOrbitSpeed,
    frameInterval,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, overflow: "hidden" }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
