---
color-primary: "#1E3A8A"
color-accent: "#1D4ED8"
color-background: "#F8FAFC"
color-text: "#0F172A"
font-body: "System UI"
font-heading: "System UI"
font-size-min: 12px
space-unit: 8px
radius: 4px
---

# STYLE.md

## Rationale
- **color-primary**: Navy `#1E3A8A` creates an authoritative scientific aesthetics suited for biomedical audit trails.
- **color-accent**: Royal blue `#1D4ED8` highlights primary action buttons without failing WCAG contrast ratios.
- **font-body / font-heading**: Native system sans-serif font stack avoids external network webfont requests.
- **space-unit**: Base 8px spatial grid enforces predictable UI margins.
- **font-size-min**: Minimum 12px font size ensures legibility for dense technical metadata strings.

## Refusals
1. **No unexpected popups or modals:** Interrupts researcher workflow and violates peak-end usability rules.
2. **No arbitrary user color selections:** Random color assignments erode structural visual hierarchy.

## Sources
- Admired: Stripe Dashboard (clean structural layout and precise data tables).
- Resented: Legacy Academic Web Portals (cluttered styling with illegible contrast ratios).
