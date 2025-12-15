# CMS Collections Structure

> Complete database schema for all Webflow CMS collections in the stonearts® webshop

**Export Date:** December 15, 2025  
**Total Collections:** 5

---

## 📊 Collections Overview

| Collection | Slug | Items | Purpose |
|------------|------|-------|---------|
| **Products** | `product` | Variable | Main product catalog |
| **Categories** | `category` | Variable | Product organization |
| **SKUs** | `sku` | Variable | Product variants/inventory |
| **News** | `news` | Variable | Blog/journal entries |
| **Sustainabilities** | `sustainability` | Variable | Mission/responsibility content |

---

## 🏗️ Collection Details

### **1. Products Collection**
**Collection ID:** `64ad5017cecbda3ed3e03b35`  
**Slug:** `product`  
**Template Page:** `/product/[slug]`  
**Created:** July 11, 2023  
**Last Updated:** July 11, 2025

#### Purpose
Main product catalog containing all acoustic panel products with details, pricing, images, and specifications.

#### Key Fields (Structure to be recreated)
```
Core Fields:
├── Name (required) - Product title
├── Slug (required) - URL-friendly identifier
├── Main Image - Primary product photo
├── Image Gallery - Multiple product images
├── Description (Rich Text) - Full product description
├── Short Description - Brief summary
├── Price - Product pricing
├── Category (Reference) - Links to Categories collection
└── SKUs (Reference) - Links to SKUs collection

Technical Fields:
├── Acoustic Properties - Sound absorption specs
├── Material Information - Stone type details
├── Dimensions - Size specifications
├── Weight - Product weight
└── Installation Notes - Setup instructions

SEO Fields:
├── Meta Title
├── Meta Description
└── Open Graph Image
```

#### Relationships
- **→ Categories:** Many products to one category
- **→ SKUs:** One product to many SKUs (variants)
- **← Template Page:** Dynamic page at `/product/[slug]`

---

### **2. Categories Collection**
**Collection ID:** `64ad5017cecbda3ed3e03b33`  
**Slug:** `category`  
**Template Page:** `/category/[slug]`  
**Created:** July 11, 2023  
**Last Updated:** July 11, 2025

#### Purpose
Product categorization system for organizing acoustic panels by type, application, or style.

#### Key Fields (Structure to be recreated)
```
Core Fields:
├── Name (required) - Category title
├── Slug (required) - URL-friendly identifier
├── Description (Rich Text) - Category explanation
├── Category Image - Visual representation
└── Sort Order - Display ordering

Display Settings:
├── Hero Background - Banner image
└── Featured - Highlight flag

SEO Fields:
├── Meta Title
├── Meta Description
└── Open Graph Settings
```

#### Relationships
- **← Products:** Receives references from Products collection
- **← Template Page:** Dynamic page at `/category/[slug]`

---

### **3. SKUs Collection**
**Collection ID:** `64ad5017cecbda3ed3e03b37`  
**Slug:** `sku`  
**Template Page:** `/sku/[slug]`  
**Created:** July 11, 2023  
**Last Updated:** July 11, 2025

#### Purpose
Product variants and inventory management - handles different sizes, finishes, or configurations of products.

#### Key Fields (Structure to be recreated)
```
Core Fields:
├── Name (required) - SKU identifier
├── Slug (required) - URL-friendly identifier
├── Product (Reference) - Links to Products collection
├── SKU Code - Internal inventory code
└── Price - Variant-specific pricing

Variant Attributes:
├── Size/Dimensions - Specific measurements
├── Finish Type - Surface treatment
├── Color/Stone Type - Material variant
└── Quantity Available - Stock level

Webflow E-commerce Fields:
├── Main Image
├── Additional Images
├── Weight
├── Shipping Info
└── Stock Status
```

#### Relationships
- **→ Products:** Many SKUs to one product
- **← Template Page:** Dynamic page at `/sku/[slug]`
- **← E-commerce System:** Connected to Webflow cart/checkout

---

### **4. News Collection**
**Collection ID:** `64cb7460be1ffbfde9fae13e`  
**Slug:** `news`  
**Template Page:** `/news/[slug]`  
**Created:** August 3, 2023  
**Last Updated:** July 11, 2025

#### Purpose
Blog/journal entries for company news, product updates, sustainability stories, and industry insights.

#### Key Fields (Structure to be recreated)
```
Core Fields:
├── Name (required) - Article title
├── Slug (required) - URL-friendly identifier
├── Featured Image - Hero image
├── Post Date - Publication date
├── Author - Writer name
├── Content (Rich Text) - Full article body
└── Excerpt - Summary/preview text

Organization:
├── Tags - Content categorization
├── Featured Post - Homepage highlight flag
└── Category - Content type classification

SEO Fields:
├── Meta Title
├── Meta Description
└── Open Graph Image
```

#### Relationships
- **← Template Page:** Dynamic page at `/news/[slug]`
- **← List Page:** Displayed on `/blog-news`

---

### **5. Sustainabilities Collection**
**Collection ID:** `65c64109cf9cc9017ee4f57b`  
**Slug:** `sustainability`  
**Template Page:** `/sustainability/[slug]`  
**Created:** February 9, 2024  
**Last Updated:** July 11, 2025

#### Purpose
Mission, values, and responsibility content - stories about environmental impact, social responsibility, and company ethics.

#### Key Fields (Structure to be recreated)
```
Core Fields:
├── Name (required) - Initiative title
├── Slug (required) - URL-friendly identifier
├── Hero Image - Main visual
├── Content (Rich Text) - Full story/description
└── Summary - Brief overview

Impact Metrics:
├── Impact Category - Type of responsibility
├── Statistics - Quantifiable impact
└── Related Projects - Connected initiatives

Display Settings:
├── Featured - Priority highlighting
├── Order - Display sequence
└── Icon/Badge - Visual identifier

SEO Fields:
├── Meta Title
├── Meta Description
└── Open Graph Settings
```

#### Relationships
- **← Template Page:** Dynamic page at `/sustainability/[slug]`
- **← List Page:** Displayed on `/verantwortung` (responsibility page)

---

## 🔗 Collection Relationships Diagram

```
Categories ←──┐
              │
              │ (Reference)
              │
           Products ←──┐
              │        │
              │        │ (Reference)
              │        │
              └──→ SKUs
              
News (Standalone)

Sustainabilities (Standalone)
```

---

## 📋 Field Types Reference

### Common Webflow Field Types Used
- **Plain Text** - Single-line text input
- **Rich Text** - Multi-line formatted content
- **Image** - Single image upload
- **Multi-Image** - Multiple image uploads
- **Number** - Numeric values (prices, quantities)
- **Date/Time** - Publication dates, timestamps
- **Switch** - Boolean on/off toggle
- **Reference** - Link to another collection item
- **Multi-Reference** - Link to multiple collection items
- **Option** - Dropdown selection from predefined choices

---

## 🛠️ Recreating CMS Collections

### **Step-by-Step Process**

#### 1. Create Collections in Order
```
1. Categories (no dependencies)
2. Products (references Categories)
3. SKUs (references Products)
4. News (standalone)
5. Sustainabilities (standalone)
```

#### 2. Set Up Fields
For each collection:
- Add all fields listed above
- Configure field types correctly
- Set required fields
- Configure reference relationships

#### 3. Configure Templates
- Create dynamic template pages for each collection
- Set correct slug patterns (`/product/[slug]`, etc.)
- Design layouts based on exported HTML

#### 4. Set Up E-commerce (for Products/SKUs)
- Enable Webflow E-commerce
- Connect Products and SKUs to e-commerce system
- Configure pricing, inventory, shipping

---

## 📥 Exporting CMS Data

### **To Export Actual Content**
In Webflow Designer:
1. CMS → Select collection
2. Export → Download CSV
3. Repeat for each collection

### **CSV Structure**
Each export will contain:
- All field values
- References as IDs
- Images as URLs
- Rich text as HTML

---

## 🔄 Data Migration Strategy

### **For Webflow → Webflow**
1. Create collection structure (use this documentation)
2. Export CSV from original site
3. Import CSV to new site
4. Manually reconnect references
5. Re-upload images

### **For Webflow → Other Platform**
1. Export all collections as CSV
2. Map Webflow fields to target platform fields
3. Transform data as needed (currency, language, etc.)
4. Import to target platform
5. Recreate relationships/references

---

## 💡 Important Notes

### **Field Name Conventions**
- Webflow auto-generates field IDs
- Field names can contain spaces
- Slugs are auto-generated but customizable

### **Reference Field Limitations**
- Can only reference one collection per field
- Multi-reference allows multiple items
- Circular references are allowed but be cautious

### **E-commerce Specific**
- Products and SKUs have special e-commerce fields
- Some fields are required for Webflow checkout
- Inventory is managed at SKU level

---

## 📊 Collection Size Estimates

**Based on typical acoustic panel product catalog:**
- **Products:** 10-50 items (different panel types/styles)
- **Categories:** 5-15 items (by application, style, material)
- **SKUs:** 50-200 items (size/finish variants)
- **News:** 20-100 items (ongoing content)
- **Sustainabilities:** 5-20 items (mission stories)

---

**Last Updated:** December 15, 2025  
**Documentation Version:** 1.0
