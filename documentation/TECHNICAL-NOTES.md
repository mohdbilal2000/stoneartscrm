# Technical Notes

> Custom code, integrations, and technical implementation details

**Export Date:** December 15, 2025

---

## 🔧 Custom Code Overview

Webflow projects can contain custom code in multiple locations:
- **Site-wide `<head>` code** - Loads on every page
- **Site-wide `</body>` code** - Loads on every page before closing body tag
- **Page-specific custom code** - Only on specific pages
- **Embed elements** - Inline custom code within page content

---

## 📍 Custom Code Locations

### **Site-Wide Head Code**
**Location:** Project Settings → Custom Code → Head Code

**Typical Contents:**
```html
<!-- Google Analytics / Tag Manager -->
<!-- Font loading (if not using Webflow fonts) -->
<!-- Global CSS overrides -->
<!-- Third-party script initialization -->
```

**To Access in Webflow:**
1. Project Settings
2. Custom Code tab
3. Head Code section

---

### **Site-Wide Footer Code**
**Location:** Project Settings → Custom Code → Footer Code

**Typical Contents:**
```html
<!-- Analytics tracking -->
<!-- Chat widgets -->
<!-- Performance monitoring -->
<!-- Cookie consent scripts -->
```

---

### **Page-Specific Custom Code**

**Pages Likely to Have Custom Code:**

#### 1. **Visualizer Page** (`/visualizer`)
**Purpose:** Interactive room visualization tool  
**Expected Custom Code:**
- Canvas/WebGL rendering
- Image upload handling
- Product overlay positioning
- Save/export functionality

**Technologies Likely Used:**
- Three.js or similar 3D library
- HTML5 Canvas
- File API for uploads
- LocalStorage for saved configurations

---

#### 2. **Checkout Pages** (`/checkout`, `/paypal-checkout`)
**Purpose:** E-commerce transaction handling  
**Expected Custom Code:**
- PayPal SDK integration
- Form validation enhancements
- Address autocomplete
- Tax/shipping calculations
- Order tracking pixels

**Integration Points:**
```javascript
// PayPal
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

// Possible analytics
// Google Analytics e-commerce tracking
// Facebook Pixel purchase events
```

---

#### 3. **Product Pages** (Templates)
**Purpose:** Enhanced product interactions  
**Expected Custom Code:**
- Image zoom/gallery
- Variant selector logic
- Price calculations
- Inventory display
- Add-to-cart enhancements

---

#### 4. **Home Page** (`/`)
**Purpose:** Marketing and engagement  
**Expected Custom Code:**
- Hero animations
- Newsletter signup
- Video backgrounds
- Scroll-triggered effects

---

## 🔌 Third-Party Integrations

### **E-commerce Platform**
**Provider:** Webflow E-commerce  
**Features Used:**
- Product catalog
- Shopping cart
- Checkout flow
- Order management
- Inventory tracking

**API Access:**
- Webflow E-commerce API available
- Can access orders, products, inventory programmatically

---

### **Payment Processing**

#### PayPal
**Integration Type:** PayPal Checkout SDK  
**Location:** Checkout pages  
**Configuration Needed:**
- PayPal business account
- Client ID / Secret
- Webhook configuration for order updates

**Sandbox vs Production:**
- Development: Use PayPal sandbox credentials
- Production: Use live PayPal credentials

---

#### Possible Additional Payment Methods
**Check custom code for:**
- Stripe integration
- Credit card processing
- Local payment methods (for Austrian market)

---

### **Analytics & Tracking**

**Google Tag Manager**
**Status:** Ready (dataCollectionEnabled: false currently)  
**Setup Location:** Project Settings → Integrations

**Google Analytics**
**Implementation:** Via GTM or direct script  
**E-commerce Tracking:** Enhanced e-commerce likely implemented

**Facebook Pixel**
**Location:** Check head/footer code  
**Events:** PageView, ViewContent, AddToCart, Purchase

---

### **Email Marketing**

**Newsletter Signup**
**Location:** Homepage, footer  
**Possible Providers:**
- Mailchimp
- SendGrid
- Custom API integration

**Form Handling:**
- Check for form submission event listeners
- API endpoints in custom code
- Webflow native forms vs custom implementation

---

### **Forms**

**Webflow Native Forms**
**Used On:**
- Contact page (`/kontaktier-uns`)
- Newsletter signups
- Quote/inquiry forms

**Features:**
- Email notifications
- Form submissions stored in Webflow
- Export capabilities

**Custom Form Handling:**
Check for:
- AJAX form submissions
- Custom validation
- Multi-step forms
- File uploads

---

## 🎨 Design System & Assets

### **Typography**
**Fonts Used:** Check CSS files  
**Typical Setup:**
- Heading fonts
- Body text fonts
- Special display fonts

**Loading Method:**
- Webflow hosted fonts
- Google Fonts
- Adobe Fonts
- Custom font files

---

### **Colors**
**Brand Colors:** Documented in Style Page (`/style-page`)  
**Usage:**
- Primary brand color
- Secondary colors
- Accent colors
- Neutral grays
- Status colors (success, error, warning)

---

### **Images & Assets**

**Image Storage:**
- Webflow Assets (hosted by Webflow)
- CDN delivery
- Responsive image variants

**Asset Types:**
- Product photos
- Lifestyle images
- Icons
- Logos
- Background patterns

**Export Note:** Exported code contains image URLs, not actual files. To download all images:
1. Webflow Designer → Assets panel
2. Select all or individual assets
3. Download

---

## 🔍 JavaScript Dependencies

### **Webflow's Built-in Libraries**
**Included Automatically:**
- Webflow.js - Core functionality
- jQuery (if used in interactions)
- Animation libraries

**Location:** Check `/js/` folder in export

---

### **Custom JavaScript**

**Common Libraries Likely Used:**
```
- Swiper.js (image sliders)
- GSAP (animations)
- Lightbox/Fancybox (image galleries)
- AOS (scroll animations)
- Lottie (animated illustrations)
```

**To Identify:**
1. Check `<head>` and `</body>` custom code
2. Review page-specific embeds
3. Examine `/js/` folder for custom scripts

---

## 🛠️ Webflow Interactions

**Important:** Webflow interactions are Designer-only and don't export!

**Types of Interactions Used:**
- Hover effects
- Scroll animations
- Click triggers
- Page load animations
- Mouse move effects

**Recreating Interactions:**
- Document each interaction manually
- Use screenshots/videos from Designer
- Rebuild using CSS animations or JavaScript
- Consider using GSAP or similar library

---

## 📱 Responsive Design

### **Breakpoints**
**Webflow Default Breakpoints:**
- Desktop: >991px
- Tablet: 768px - 991px
- Mobile Landscape: 478px - 767px
- Mobile Portrait: <478px

### **Responsive Images**
**Webflow automatically generates:**
- Multiple image sizes
- Srcset attributes
- Lazy loading

### **Mobile Optimizations**
**Check For:**
- Touch-friendly interactions
- Mobile navigation
- Simplified layouts
- Performance optimizations

---

## 🚀 Performance Optimizations

### **Current Optimizations**
- Image optimization (WebP, responsive images)
- CSS minification
- JavaScript minification
- CDN delivery (Webflow CDN)
- Lazy loading

### **Potential Improvements for Indian Market**
- Consider additional CDN for India
- Optimize for slower connections
- Reduce large image sizes
- Critical CSS inlining
- Remove unused CSS/JS

---

## 🔐 Security & Privacy

### **SSL/HTTPS**
**Webflow Hosted:** Automatic SSL  
**Custom Domain:** SSL certificate included

### **GDPR Compliance**
**Current Setup:** Austrian/EU compliance  
**Required Updates for India:**
- Review Indian data protection laws
- Update privacy policy
- Adjust cookie consent
- Data storage location considerations

### **Form Security**
- reCAPTCHA (check if implemented)
- Honeypot fields
- Rate limiting
- Input sanitization

---

## 📊 Tracking & Monitoring

### **Analytics Events**
**E-commerce Events to Track:**
```
- Product views
- Add to cart
- Remove from cart
- Begin checkout
- Purchase complete
- Payment method selection
```

### **Custom Events**
**Check For:**
- Visualizer tool usage
- Newsletter signups
- Contact form submissions
- Download clicks
- Video plays

---

## 🌍 Localization Considerations

### **Current Setup**
**Language:** German (Austria)  
**Currency:** EUR (€)  
**Date Format:** DD.MM.YYYY  
**Number Format:** 1.234,56

### **For Indian Market**
**Language:** Hindi / English  
**Currency:** INR (₹)  
**Date Format:** DD/MM/YYYY  
**Number Format:** 1,23,456.78

### **Localization Points**
- All page content
- Product descriptions
- Error messages
- Email notifications
- Currency symbols throughout code
- Date/time formatting in JavaScript

---

## 🔄 API Integrations

### **Webflow APIs Available**
**Data API:**
- CMS collections CRUD
- Asset management
- Site information

**E-commerce API:**
- Orders
- Products
- Inventory
- Customers

**Use Cases:**
- Sync with external systems
- Custom admin interfaces
- Automated content updates
- Integration with ERP/CRM

---

## 💾 Database & Content

### **CMS Storage**
**Current:** Webflow CMS (hosted)  
**Limits:** Based on Webflow plan  
**Backup:** Export CSV regularly

### **E-commerce Data**
**Orders:** Stored in Webflow  
**Export:** Available via API or dashboard  
**Retention:** Check Webflow policy

---

## 🔍 SEO Implementation

### **On-Page SEO**
**Meta Tags:**
- Title tags (customized per page)
- Meta descriptions
- Open Graph tags
- Twitter Cards

**Structured Data:**
Check for:
```html
<!-- Product schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "image": "...",
  "description": "...",
  "offers": {...}
}
</script>
```

### **Technical SEO**
- XML sitemap (auto-generated by Webflow)
- Robots.txt
- 301 redirects (in Webflow settings)
- Canonical URLs
- Hreflang tags (if multi-language)

---

## 🐛 Known Custom Code Areas

**Based on Page Analysis:**

1. **Visualizer Tool** - Complex custom JavaScript
2. **Product Variant Selector** - Custom interaction logic
3. **Cart Updates** - AJAX or custom handling
4. **Search Functionality** - Custom or Webflow native
5. **Newsletter Integration** - API calls to email service

---

## 📝 Documentation TODO

**To Complete Full Technical Audit:**
1. ✅ Extract actual custom code from each location
2. ✅ Identify all third-party scripts
3. ✅ Document API keys locations
4. ✅ List all external services
5. ✅ Map all form handlers

**How to Extract:**
1. Open each page in Webflow Designer
2. Check Page Settings → Custom Code
3. Check Project Settings → Custom Code
4. Review all Embed elements on pages
5. Document findings

---

## 🚨 Migration Checklist

**When Recreating:**
- [ ] Set up all third-party accounts (PayPal, analytics, etc.)
- [ ] Generate new API keys (don't reuse from export)
- [ ] Configure webhooks for order processing
- [ ] Test payment flows thoroughly
- [ ] Set up email notifications
- [ ] Configure DNS and SSL
- [ ] Test all forms
- [ ] Verify tracking pixels
- [ ] Check mobile responsiveness
- [ ] Performance testing
- [ ] Security audit

---

**Last Updated:** December 15, 2025  
**Documentation Version:** 1.0
