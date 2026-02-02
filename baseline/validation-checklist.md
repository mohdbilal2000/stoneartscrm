# UI Parity Validation Checklist

## Visual Validation

### Phase 1 (Next.js Wrapper)
- [ ] DOM structure matches original (DevTools comparison)
- [ ] CSS files load in correct order
- [ ] No layout shift (CLS = 0)
- [ ] Screenshots match baseline (pixel-perfect)
- [ ] All images load correctly
- [ ] All fonts load correctly
- [ ] No console errors

### Phase 2 (Data Integration)
- [ ] Data loads from CMS/API
- [ ] Product pages show correct data
- [ ] No layout shift during data load
- [ ] Screenshots still match baseline
- [ ] Dynamic content populates correctly

### Phase 3 (Cart)
- [ ] Cart adds/removes items
- [ ] Stock validation works
- [ ] Cart persists across sessions
- [ ] No UI changes
- [ ] Error toasts appear (no layout shift)
- [ ] Cart drawer opens correctly

### Phase 4 (Auth)
- [ ] Login/signup pages match original
- [ ] Sessions persist
- [ ] Profile page matches original
- [ ] Order history accessible
- [ ] No UI changes

### Phase 5 (Checkout)
- [ ] Checkout page matches original
- [ ] Stripe integration works
- [ ] Order confirmation matches original
- [ ] No UI changes

### Phase 6 (Admin)
- [ ] Admin pages functional
- [ ] No UI changes

## Technical Validation

- [ ] No new wrapper divs added
- [ ] No class names changed
- [ ] No CSS modifications
- [ ] Event delegation used (no React onClick)
- [ ] HTML pasted as-is
- [ ] All scripts load correctly

## Performance Validation

- [ ] Lighthouse score maintained
- [ ] Core Web Vitals unchanged
- [ ] No performance regressions

## Browser Compatibility

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## Notes

- Any visual change = FAILURE
- Screenshots must match exactly
- DOM structure must match exactly
