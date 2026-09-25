# Standards

## Normative Coding Rules

1. **Strict Input Validation:** All user inputs must be validated prior to updating state. Digital file signature inputs must match a 64-character hexadecimal pattern before persistence.
2. **Safe SQL Parameterization:** User values reach SQL exclusively through `.bind()`, never string concatenation.
3. **Zero Repository Credentials:** No credentials, API tokens, or secrets may be stored in the repository. Database IDs are addresses and belong in `wrangler.toml`.
4. **DOM Injection Prevention:** Dynamic UI rendering must use safe methods (`document.createElement()` and `textContent`). Direct `innerHTML` assignment with unescaped user inputs is strictly prohibited.
5. **Accessible Error Handling:** Failed network requests must be displayed to the user via status badges on the page without throwing uncaught console errors.
