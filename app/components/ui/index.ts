/**
 * Design System - Atomic Design Architecture
 *
 * This module follows Brad Frost's Atomic Design methodology:
 * - Atoms: Basic building blocks (Badge, Button, Heading, IconButton)
 * - Molecules: Combinations of atoms (Card, LanguageSelector)
 * - Organisms: Complex sections (Header, Footer) - future
 * - Templates: Page layouts - future
 *
 * Usage:
 * import { Card, Badge, Button, Heading } from '~/components/ui'
 *
 * Or import by category:
 * import { Badge, Button } from '~/components/ui/atoms'
 * import { Card } from '~/components/ui/molecules'
 */

// Atoms - Basic building blocks
export { Badge, Button, LinkButton, Heading, IconButton, IconLink, Input, Textarea, Select, Spinner, Skeleton } from './atoms'

// Molecules - Combinations of atoms
export { Card, LanguageSelector, ToastProvider, useToast, SectionHeader, SectionBackground } from './molecules'

// Organisms - Complex UI components (Header, Footer)
export { Header, Footer } from './organisms'

// Templates - Page-level layouts (future)
// export * from './templates'
