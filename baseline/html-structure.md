# HTML Structure Documentation

## Page Count

Total HTML pages: **31**

## Page List

1. index.html - Homepage
2. detail_product.html - Product detail page
3. detail_category.html - Category page
4. detail_news.html - News/blog detail
5. detail_sku.html - SKU detail
6. detail_sustainability.html - Sustainability detail
7. cart.html - Shopping cart
8. checkout.html - Checkout page
9. order-confirmation.html - Order confirmation
10. paypal-checkout.html - PayPal checkout
11. search.html - Search results
12. visualizer.html - Product visualizer
13. zubehoer.html - Accessories page
14. akurock-muster.html - Product samples
15. akustik.html - Acoustic info
16. blog-news.html - Blog/news listing
17. faq.html - FAQ page
18. galerie.html - Gallery
19. installation-and-guide.html - Installation guide
20. kontaktier-uns.html - Contact us
21. stein-selektion.html - Stone selection
22. stoneskin.html - Stoneskin page
23. uber-uns.html - About us
24. verantwortung.html - Responsibility
25. zahlung-und-versand.html - Payment & shipping
26. allgemeine-geschaeftsbedingungen.html - Terms & conditions
27. cookie-und-datschenschutzerklaerung.html - Cookie & privacy
28. impressum.html - Legal/Impressum
29. special-page.html - Special page
30. style-page.html - Style page
31. default.html - Default template

## Common HTML Structure

### Head Section (All Pages)
```html
<head>
  <meta charset="utf-8">
  <title>...</title>
  <meta name="description" content="...">
  <!-- CSS files in order -->
  <link href="css/normalize.css" rel="stylesheet">
  <link href="css/webflow.css" rel="stylesheet">
  <link href="css/stonearts-r-webshop.webflow.css" rel="stylesheet">
  <!-- Fonts -->
  <!-- Scripts -->
</head>
```

### Body Structure (Common Patterns)
- Navigation (desktop + mobile)
- Main content area
- Footer
- Cart sidebar (desktop + mobile)

## Key Data Attributes

- `data-wf-page` - Webflow page ID
- `data-wf-site` - Webflow site ID
- `data-node-type` - Webflow node types (commerce, etc.)
- `bind` - Webflow bind attributes for CMS
- `data-product-id`, `data-variant-id` - Product identifiers

## Critical Elements

- Cart containers: `[data-node-type="commerce-cart-container-wrapper"]`
- Add to cart forms: `[data-node-type="commerce-add-to-cart-form"]`
- Product bindings: Various `bind` attributes for CMS population

## Notes

- All HTML must be pasted as-is
- No DOM restructuring allowed
- Data attributes must be preserved
- Webflow-specific attributes must remain
