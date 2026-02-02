# CSS Files Inventory

## Load Order (CRITICAL - Must Maintain)

1. **normalize.css**
   - Path: `css/normalize.css`
   - Purpose: CSS reset/normalization
   - Load Order: 1

2. **webflow.css**
   - Path: `css/webflow.css`
   - Purpose: Webflow base styles
   - Load Order: 2

3. **stonearts-r-webshop.webflow.css**
   - Path: `css/stonearts-r-webshop.webflow.css`
   - Purpose: Site-specific custom styles
   - Load Order: 3

## Inline Styles (Preserve)

### In `<head>` section:
- `.js-accordion-item, .js-accordion-header` tap highlight styles
- `.js-link` tap highlight styles
- Input number spinner removal styles

## External Fonts

- Google Fonts: Playfair Display (regular, 500, 600, 700, 800, 900)
- Load via: WebFont.load() script

## Notes

- All CSS files must be copied verbatim
- No modifications allowed
- Same filenames must be maintained
- Load order is critical for proper styling
