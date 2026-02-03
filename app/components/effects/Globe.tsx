import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useReducedMotion } from "~/hooks";

// Type for the world atlas topology
type WorldTopology = Topology<{
  countries: GeometryCollection;
  land: GeometryCollection;
}>;

interface GlobeProps {
  width?: number;
  height?: number;
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

export function Globe({
  width = 500,
  height = 500,
  autoRotate = true,
  rotationSpeed = 0.3,
  strokeColor = "#cccccc",
  strokeWidth = 0.5,
  fillColor = "none",
  oceanColor = "transparent",
  className = "",
  showSatellite = false,
  satelliteOrbitSpeed = 0.5,
}: GlobeProps) {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] = useState<WorldTopology | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isVisibleRef = useRef(true);
  const rotationRef = useRef({ x: 0, y: -20 });
  const isDraggingRef = useRef(false);
  const satelliteAngleRef = useRef(250);
  const lastFrameTimeRef = useRef(0);
  const targetFPS = 30; // Throttle a 30fps
  const frameInterval = 1000 / targetFPS;

  // Disable auto-rotation when user prefers reduced motion
  const effectiveAutoRotate = autoRotate && !prefersReducedMotion;
  const effectiveShowSatellite = showSatellite && !prefersReducedMotion;

  // Intersection Observer para pausar cuando no es visible
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

  // Load world data from local asset (bundled for faster loading)
  useEffect(() => {
    const loadWorld = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use local asset instead of CDN for:
        // - Faster loading (no external network dependency)
        // - Offline support
        // - Consistent availability
        const response = await fetch("/assets/data/countries-110m.json");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const world = (await response.json()) as WorldTopology;
        setWorldData(world);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error al cargar el globo";
        setError(message);
        console.error("Error loading world data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorld();
  }, []);

  // Render globe
  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoOrthographic()
      .scale(Math.min(width, height) / 2.2)
      .translate([width / 2, height / 2])
      .rotate([rotationRef.current.x, rotationRef.current.y]);

    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(
      worldData,
      worldData.objects.countries
    ) as FeatureCollection<Geometry>;

    // Ocean/sphere background
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", Math.min(width, height) / 2.2)
      .attr("fill", oceanColor)
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth);

    // Countries
    const countriesGroup = svg.append("g").attr("class", "countries");

    countriesGroup
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", (d) => path(d as any) || "")
      .attr("fill", fillColor)
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth);

    // CubeSat group (si está habilitado)
    const globeRadius = Math.min(width, height) / 2.2;
    const orbitRadiusFactor = 1.045; // Órbita muy cerca del borde del globo
    const actualOrbitRadius = globeRadius * orbitRadiusFactor;
    const cubeSize = globeRadius * 0.006; // Tamaño reducido 70% más

    // Dibujar órbita circular visible (anillo alrededor del borde del globo)
    if (showSatellite) {
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", actualOrbitRadius)
        .attr("fill", "none")
        .attr("stroke", "rgba(255, 255, 255, 0.15)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "8,4");
    }

    const satelliteGroup = showSatellite ? svg.append("g").attr("class", "satellite") : null;

    // Función para dibujar el CubeSat isométrico (cubo real)
    const drawCubeSat = (centerX: number, centerY: number, size: number, isVisible: boolean, scale: number) => {
      if (!satelliteGroup) return;
      satelliteGroup.selectAll("*").remove();

      if (!isVisible) return;

      const s = size * scale;

      // Isométrico verdadero: todos los ejes tienen la misma longitud visual
      // Ángulo de 30° para ejes horizontales
      const angle = Math.PI / 6;
      const ax = s * Math.cos(angle); // Componente X del eje derecho
      const ay = s * Math.sin(angle); // Componente Y del eje derecho

      // 8 vértices del cubo
      // Centro visual del cubo
      const cx = centerX;
      const cy = centerY;

      // Vértices superiores
      const v0 = [cx, cy - s];                    // Arriba centro
      const v1 = [cx + ax, cy - s + ay];          // Arriba derecha
      const v2 = [cx, cy - s + 2 * ay];           // Arriba atrás
      const v3 = [cx - ax, cy - s + ay];          // Arriba izquierda

      // Vértices inferiores (v4 no se usa en vista isométrica)
      const v5 = [cx + ax, cy + ay];              // Abajo derecha
      const v6 = [cx, cy + 2 * ay];               // Abajo atrás
      const v7 = [cx - ax, cy + ay];              // Abajo izquierda

      // Cara izquierda (blanco)
      satelliteGroup
        .append("polygon")
        .attr("points", [v3, v2, v6, v7].map(p => p.join(",")).join(" "))
        .attr("fill", "rgba(255, 255, 255, 0.85)")
        .attr("stroke", "rgba(220, 220, 220, 1)")
        .attr("stroke-width", 0.3);

      // Cara derecha (rojo)
      satelliteGroup
        .append("polygon")
        .attr("points", [v2, v1, v5, v6].map(p => p.join(",")).join(" "))
        .attr("fill", "rgba(219, 1, 58, 0.9)")
        .attr("stroke", "rgba(180, 1, 48, 1)")
        .attr("stroke-width", 0.3);

      // Cara superior (gris oscuro)
      satelliteGroup
        .append("polygon")
        .attr("points", [v0, v1, v2, v3].map(p => p.join(",")).join(" "))
        .attr("fill", "rgba(80, 80, 80, 0.8)")
        .attr("stroke", "rgba(100, 100, 100, 1)")
        .attr("stroke-width", 0.3);

      // Antenas
      const antennaLen = s * 1.2;
      const antennaColor = "rgba(200, 200, 200, 0.9)";
      const antennaWidth = 0.5;

      // Antena superior
      satelliteGroup
        .append("line")
        .attr("x1", v0[0])
        .attr("y1", v0[1])
        .attr("x2", v0[0])
        .attr("y2", v0[1] - antennaLen)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Antena inferior
      satelliteGroup
        .append("line")
        .attr("x1", v6[0])
        .attr("y1", v6[1])
        .attr("x2", v6[0])
        .attr("y2", v6[1] + antennaLen)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Antena lateral derecha
      satelliteGroup
        .append("line")
        .attr("x1", v1[0])
        .attr("y1", v1[1])
        .attr("x2", v1[0] + antennaLen * 0.7)
        .attr("y2", v1[1] - antennaLen * 0.4)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);

      // Antena lateral izquierda
      satelliteGroup
        .append("line")
        .attr("x1", v3[0])
        .attr("y1", v3[1])
        .attr("x2", v3[0] - antennaLen * 0.7)
        .attr("y2", v3[1] - antennaLen * 0.4)
        .attr("stroke", antennaColor)
        .attr("stroke-width", antennaWidth);
    };

    // Update function for rotation
    const update = () => {
      projection.rotate([rotationRef.current.x, rotationRef.current.y]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      countriesGroup.selectAll("path").attr("d", (d) => path(d as any) || "");

      // Actualizar posición del satélite
      if (showSatellite) {
        const angle = satelliteAngleRef.current * (Math.PI / 180);
        const centerX = width / 2;
        const centerY = height / 2;

        // Órbita circular alrededor del borde visible del globo
        const satX = centerX + Math.cos(angle) * actualOrbitRadius;
        const satY = centerY + Math.sin(angle) * actualOrbitRadius;

        // Siempre visible (orbita alrededor de la silueta)
        drawCubeSat(satX, satY, cubeSize, true, 1);
      }
    };

    // Auto rotation con throttle a 30fps y pausa cuando no es visible
    let animationId: number;
    if (effectiveAutoRotate || effectiveShowSatellite) {
      // Renderizar el estado inicial
      update();

      const animate = (currentTime: number) => {
        animationId = requestAnimationFrame(animate);

        // Pausar si no es visible
        if (!isVisibleRef.current) return;

        // Throttle a 30fps
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
        // Clamp vertical rotation
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

  // Loading state
  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="animate-pulse rounded-full bg-white/10" style={{ width: Math.min(width, height) * 0.9, height: Math.min(width, height) * 0.9 }} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        ref={containerRef}
        className={`flex flex-col items-center justify-center gap-2 ${className}`}
        style={{ width, height }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-white/10 bg-white/5"
          style={{ width: Math.min(width, height) * 0.5, height: Math.min(width, height) * 0.5 }}
        >
          <ExclamationTriangleIcon className="h-8 w-8 text-gray-500" />
        </div>
        <p className="text-xs text-gray-500">No se pudo cargar el globo</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={{ width, height }}>
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
