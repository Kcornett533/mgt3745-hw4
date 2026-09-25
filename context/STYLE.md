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

---
tokens: [fetch, async, bind, DOMContentLoaded]
---
# Style Guidelines

1. **fetch**: Used for all client-to-server communication rather than XMLHttpRequest.
2. **async**: Used for cleaner promise handling in network calls.
3. **bind**: Mandatory for passing user input to Cloudflare D1 to prevent SQL injection.
4. **DOMContentLoaded**: Ensures scripts don't run until the HTML is fully parsed.

## Refusals
* I refused Copilot's suggestion to use string-concatenation (`${userInput}`) inside SQL queries, strictly enforcing `bind()` instead.
* I refused to leave API URLs hardcoded across multiple functions, instead pulling the URL into a single constant at the top of the file.
## Sources
- Admired: Stripe Dashboard (clean structural layout and precise data tables).
- Resented: Legacy Academic Web Portals (cluttered styling with illegible contrast ratios).
