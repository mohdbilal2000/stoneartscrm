# Setup Guide

> How to work with the stonearts® Webflow export for different use cases

**Export Date:** December 15, 2025

---

## 📖 What You Have

This export package includes:

1. **Webflow Code Export** - Complete HTML/CSS/JS
2. **CMS Structure Documentation** - Database schema
3. **Pages Guide** - Every page explained
4. **Technical Notes** - Integrations and custom code
5. **This Setup Guide** - Usage instructions

---

## 🎯 Choose Your Use Case

Select the scenario that matches your goal:

- [Scenario A: View & Reference Only](#scenario-a-view--reference-only)
- [Scenario B: Rebuild in Webflow](#scenario-b-rebuild-in-webflow)
- [Scenario C: Adapt for Indian Market (Webflow)](#scenario-c-adapt-for-indian-market-webflow)
- [Scenario D: Port to Another Platform](#scenario-d-port-to-another-platform)
- [Scenario E: Use as Static Site](#scenario-e-use-as-static-site)

---

## Scenario A: View & Reference Only

**Goal:** Just browse and understand the project

### Quick Start

**1. Open Locally**
```bash
# Navigate to the export folder
cd "C:\Users\nikil\Desktop\Webflow Projekt for India\stonearts webshop"

# Open any HTML file in browser
# Start with index.html (home page)
```

**2. What Works**
✅ Page layouts visible  
✅ Styling renders correctly  
✅ Images appear (if online)  
✅ Basic page navigation  

**3. What Doesn't Work**
❌ Forms won't submit  
❌ E-commerce functionality  
❌ CMS-driven content (templates show structure only)  
❌ Dynamic interactions  
❌ Search functionality  

### Understanding the Export

**HTML Files:**
- Each `.html` file = one page
- `index.html` = Homepage
- `detail_product.html` = Product template
- Check `PAGES-GUIDE.md` for complete list

**CSS Files:**
- Located in `/css/` folder
- `webflow.css` = Main styles
- May have additional stylesheets

**JavaScript Files:**
- Located in `/js/` folder
- `webflow.js` = Core Webflow functionality
- Check for custom scripts

**Images:**
- Referenced as URLs (not included)
- Point to Webflow CDN
- Download separately if needed

---

## Scenario B: Rebuild in Webflow

**Goal:** Create new Webflow project from this export

### Prerequisites
- Webflow account (paid plan for CMS + E-commerce)
- Access to original Webflow project (for reference)

### Step-by-Step Process

#### Phase 1: Project Setup (Day 1)

**1. Create New Webflow Project**
```
1. Go to Webflow Dashboard
2. Create New Site
3. Choose "Blank Site"
4. Enable CMS + E-commerce
```

**2. Set Up CMS Collections**
```
Use: documentation/CMS-STRUCTURE.md

Create in order:
1. Categories (no dependencies)
2. Products (references Categories)
3. SKUs (references Products)
4. News (standalone)
5. Sustainabilities (standalone)

For each collection:
- Match field names exactly
- Set correct field types
- Configure reference relationships
- Mark required fields
```

**3. Create Page Structure**
```
Use: documentation/PAGES-GUIDE.md

Create pages:
- Static pages first (Home, About, etc.)
- Template pages next (Products, News, etc.)
- E-commerce pages last (Cart, Checkout)
```

#### Phase 2: Design Recreation (Days 2-5)

**1. Extract Design System**
```
From style-page.html:
- Typography (fonts, sizes, line heights)
- Colors (brand palette)
- Spacing (margins, padding)
- Components (buttons, cards, forms)
```

**2. Rebuild Page Layouts**
```
Reference exported HTML:
- Open each .html file
- Identify structure (header, sections, footer)
- Recreate in Webflow Designer
- Match styling from CSS
```

**3. Add CMS Bindings**
```
For dynamic pages:
- Connect CMS collection to template
- Bind text fields
- Bind images
- Bind references (categories, etc.)
```

**4. Recreate Interactions**
```
⚠️ Interactions don't export!

Must rebuild:
- Hover effects
- Scroll animations
- Click triggers
- Mobile menu behavior

Tip: Document from original site first
```

#### Phase 3: E-commerce Setup (Days 6-7)

**1. Configure Products**
```
1. Link Products collection to E-commerce
2. Set up pricing
3. Configure SKUs
4. Add product images
5. Set inventory
```

**2. Payment Integration**
```
1. Connect PayPal account
2. Set up other payment methods
3. Configure tax rules
4. Set shipping options
```

**3. Cart & Checkout**
```
1. Customize cart page
2. Design checkout flow
3. Set up order confirmation
4. Configure email notifications
```

#### Phase 4: Custom Code (Days 8-9)

**1. Add Site-Wide Code**
```
Use: documentation/TECHNICAL-NOTES.md

Project Settings → Custom Code:
- Add head code (analytics, fonts)
- Add footer code (tracking, widgets)
```

**2. Page-Specific Code**
```
For special pages:
- Visualizer tool → Recreate JavaScript
- Enhanced product interactions
- Custom form handling
```

**3. Integrations**
```
Set up:
- Google Analytics / GTM
- Email marketing
- Chat widgets
- Any custom APIs
```

#### Phase 5: Content Migration (Days 10-12)

**1. Export CMS Data from Original**
```
From original Webflow project:
1. CMS → Each collection → Export
2. Save CSV files
```

**2. Import to New Project**
```
1. CMS → Each collection → Import
2. Upload CSV
3. Map fields
4. Handle images separately
```

**3. Download & Re-upload Assets**
```
From original project:
1. Assets panel → Select all
2. Download
3. In new project → Upload
4. Update references
```

#### Phase 6: Testing & Launch (Days 13-14)

**Checklist:**
- [ ] All pages display correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Products add to cart
- [ ] Checkout flow complete
- [ ] Payment processing works
- [ ] Email notifications send
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] SEO settings configured
- [ ] Custom domain connected

---

## Scenario C: Adapt for Indian Market (Webflow)

**Goal:** Clone and localize for Indian market

### All steps from Scenario B, PLUS:

#### Localization Changes

**1. Language**
```
Option A: Translate all content
- German → English/Hindi
- Update all page text
- Translate CMS content
- Update meta tags

Option B: Duplicate and translate
- Keep original German version
- Create /en/ or /in/ version
- Use Webflow localization features
```

**2. Currency**
```
Find & Replace:
- EUR → INR
- € → ₹
- Update price formatting
- Update JavaScript calculations
```

**3. Payment Methods**
```
Add Indian payment gateways:
- Razorpay
- Paytm
- UPI
- Indian credit cards

Remove/keep:
- PayPal (optional)
```

**4. Shipping Configuration**
```
Replace:
- Austrian/EU shipping zones
- Shipping costs
- Delivery times
- Courier integrations (Indian providers)
```

**5. Legal Pages**
```
Update:
- Terms & Conditions (Indian law)
- Privacy Policy (Indian regulations)
- Shipping Policy (India-specific)
- Contact info (Indian address/phone)
```

**6. Contact Information**
```
Replace all:
- Company address
- Phone numbers
- Email addresses
- Business hours (IST timezone)
```

**7. Analytics & Tracking**
```
New setup:
- New Google Analytics property
- India-focused keywords
- Local time zone
- Regional targeting
```

#### Market-Specific Enhancements

**1. Product Adjustments**
```
Consider:
- Local availability
- Import duties/pricing
- Regional preferences
- Competition analysis
```

**2. Design Adaptations**
```
Culturally relevant:
- Color scheme (if needed)
- Imagery (Indian contexts)
- Testimonials (Indian customers)
- Case studies (Indian projects)
```

**3. SEO for Indian Market**
```
- Hindi keywords
- English keywords (Indian English)
- Local search optimization
- Google My Business (Indian location)
```

---

## Scenario D: Port to Another Platform

**Goal:** Rebuild on Shopify, WordPress, custom stack, etc.

### Universal Porting Process

#### Step 1: Extract Design System

**From CSS Files:**
```css
/* Extract from webflow.css */

Colors:
- Primary: #...
- Secondary: #...
- Text: #...
- Backgrounds: #...

Typography:
- Headings: font-family, sizes, weights
- Body text: font-family, size, line-height
- Special fonts: display, monospace, etc.

Spacing:
- Base unit: 8px, 16px, etc.
- Common margins/padding
- Container widths

Components:
- Buttons: styles, states
- Cards: structure, shadows
- Forms: inputs, selects, etc.
```

#### Step 2: Map CMS Structure

**Use:** `documentation/CMS-STRUCTURE.md`

**Create mapping table:**
```
Webflow Collection → Target Platform

Products:
- Name → Product Title
- Slug → Product URL
- Main Image → Featured Image
- Description → Product Description
- Price → Price field
- Category (Reference) → Product Category (taxonomy)

[Repeat for all collections]
```

#### Step 3: Export Content

**From Original Webflow:**
```
1. CMS → Export each collection to CSV
2. Download all images from Assets
3. Note: CSV has references as IDs
```

#### Step 4: Transform Data

**Prepare for target platform:**
```python
# Example: Transform Webflow CSV to Shopify CSV

import pandas as pd

# Load Webflow export
df = pd.read_csv('webflow_products.csv')

# Transform
df['Price'] = df['Price'].str.replace(' EUR', '')
df['Title'] = df['Name']
# ... more transformations

# Save for target platform
df.to_csv('shopify_products.csv', index=False)
```

#### Step 5: Rebuild Front-End

**Extract HTML Structure:**
```html
<!-- From exported HTML -->

<header>
  <!-- Top navigation -->
  <!-- Logo -->
  <!-- Search -->
  <!-- Cart icon -->
</header>

<main>
  <!-- Hero section -->
  <!-- Product grid -->
  <!-- Features -->
</main>

<footer>
  <!-- Links -->
  <!-- Newsletter -->
  <!-- Social -->
</footer>
```

**Recreate in Target Platform:**
- Use platform's theme system
- Match layout structure
- Apply design system
- Implement responsive design

#### Step 6: Implement Functionality

**E-commerce Features:**
```
Required:
- Product catalog
- Shopping cart
- Checkout
- Payment processing
- Order management
- Inventory tracking

Reference: Original Webflow implementation
Adapt: To target platform's APIs
```

**Custom Features:**
```
Visualizer Tool:
- Extract JavaScript
- Port to new environment
- Update API endpoints
- Test thoroughly
```

#### Step 7: Migrate Content

```
1. Import products (via CSV or API)
2. Upload images
3. Import blog posts
4. Create pages
5. Set up navigation
6. Configure SEO
```

### Platform-Specific Notes

**Shopify:**
- Use Liquid templates
- Leverage Shopify's product system
- Install apps for extended features
- Use metafields for custom data

**WordPress + WooCommerce:**
- Use theme builder (Elementor, etc.)
- WooCommerce for products
- Custom post types for collections
- ACF for custom fields

**Custom Stack (Next.js, etc.):**
- Full control over implementation
- Use Webflow export as reference
- Headless CMS for content
- Custom e-commerce logic

---

## Scenario E: Use as Static Site

**Goal:** Host as static HTML (no Webflow account needed)

### Limitations
❌ No CMS functionality  
❌ No e-commerce  
❌ No form submissions (unless using third-party)  
❌ No dynamic content  

### When This Works
✅ Portfolio/showcase site  
✅ Documentation site  
✅ Landing page  
✅ Brochure site  

### Steps

**1. Prepare Export**
```bash
# All files already static
# HTML, CSS, JS are ready
```

**2. Handle Images**
```
Option A: Use Webflow CDN links (as-is)
Option B: Download images and update paths
  - Download from Webflow Assets
  - Place in /images/ folder
  - Find & replace URLs in HTML
```

**3. Fix Forms** (if needed)
```html
<!-- Replace Webflow form with third-party -->

<!-- Option 1: Formspree -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>

<!-- Option 2: Netlify Forms -->
<form netlify>
  <!-- form fields -->
</form>

<!-- Option 3: Google Forms embed -->
```

**4. Choose Hosting**
```
Static Hosts (Free options):
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

Upload:
- Connect git repo OR
- Upload via dashboard OR
- Deploy via CLI
```

**5. Configure Domain**
```
In hosting provider:
- Add custom domain
- Configure DNS
- SSL certificate (automatic)
```

**6. Optional Enhancements**
```
Add:
- Google Analytics (via code injection)
- Chat widget (via code injection)
- Newsletter signup (via third-party service)
```

---

## 🛠️ Common Tasks

### Extract Custom Code

**From Exported Files:**
```bash
# Search for custom scripts
grep -r "<script" *.html

# Search for custom styles
grep -r "<style" *.html

# Search for embeds
grep -r "w-embed" *.html
```

### Download All Images

**Method 1: From Webflow CDN**
```bash
# Extract image URLs from HTML
grep -oP 'src="https://[^"]*\.(?:jpg|png|gif|webp)"' *.html > images.txt

# Download with wget or curl
while read url; do
  wget "$url"
done < images.txt
```

**Method 2: From Webflow Assets**
```
1. Open original Webflow project
2. Assets panel
3. Select all → Download
```

### Update API Keys

**Find & Replace:**
```bash
# Never commit real API keys!

# Find potential keys
grep -r "api" *.html
grep -r "key" *.html
grep -r "client" *.html

# Replace with environment variables
# Move to .env file (not in git)
```

---

## 📚 Additional Resources

**Webflow Documentation:**
- [Webflow University](https://university.webflow.com/)
- [Webflow CMS](https://university.webflow.com/lesson/intro-to-the-cms)
- [Webflow E-commerce](https://university.webflow.com/lesson/intro-to-ecommerce)

**Webflow API:**
- [API Documentation](https://developers.webflow.com/)
- [CMS API](https://developers.webflow.com/data/reference)
- [E-commerce API](https://developers.webflow.com/data/reference/ecommerce)

**Migration Guides:**
- [Webflow → Shopify](https://www.shopify.com/blog/migrating-from-webflow)
- [Webflow → WordPress](https://elementor.com/blog/webflow-to-wordpress/)

---

## 🚨 Important Warnings

### Security
```
⚠️  Never commit:
- API keys
- Payment credentials
- Private keys
- Customer data
- Password hashes

✅  Use:
- Environment variables
- Secrets management
- .gitignore
```

### Performance
```
⚠️  Watch for:
- Large unoptimized images
- Unused CSS/JS
- Excessive third-party scripts
- Uncompressed files

✅  Optimize:
- Compress images
- Minify code
- Use CDN
- Enable caching
```

### Legal
```
⚠️  Update before launch:
- Privacy policy (GDPR, local laws)
- Terms of service
- Cookie consent
- Business information

✅  Compliance:
- Legal review
- Local regulations
- Data protection
- Accessibility standards
```

---

## 💬 Getting Help

**Webflow Community:**
- [Webflow Forum](https://forum.webflow.com/)
- [Webflow Discord](https://discord.gg/webflow)

**This Project:**
- Review documentation in `/documentation/`
- Check `TECHNICAL-NOTES.md` for integrations
- Refer to `CMS-STRUCTURE.md` for data architecture

---

## ✅ Quick Reference Checklist

**Before Starting:**
- [ ] Read this entire guide
- [ ] Review all documentation files
- [ ] Understand your use case
- [ ] Gather necessary credentials
- [ ] Set up development environment

**During Setup:**
- [ ] Follow steps in order
- [ ] Test each phase before continuing
- [ ] Document any customizations
- [ ] Keep backups of work
- [ ] Track issues and solutions

**Before Launch:**
- [ ] Complete testing checklist
- [ ] Update all credentials (production)
- [ ] Configure analytics
- [ ] Set up monitoring
- [ ] Prepare rollback plan

---

**Last Updated:** December 15, 2025  
**Documentation Version:** 1.0
