# 🔒 MASTER IMPLEMENTATION PLAN
## Webflow → Next.js Migration (UI-Safe, Production-Ready)

**Status:** Planning Phase  
**Objective:** Zero-regression migration with pixel-perfect UI preservation  
**Stack:** Next.js 14+ (App Router), TypeScript, PostgreSQL, Stripe, Strapi/Payload CMS  
**Deployment:** Vercel (Frontend), Render (Backend/DB), Hostinger-compatible

---

## 📋 EXECUTIVE SUMMARY

This plan ensures **100% UI fidelity** while migrating from static HTML/Webflow to a modern Next.js e-commerce platform. All HTML/CSS remains **untouched**. Logic is extracted and modernized.

**Core Principle:** Next.js is a **transport layer**, not a UI framework.

---

## 🎯 SUCCESS CRITERIA

### Visual Parity
- ✅ DOM structure matches original exactly
- ✅ CSS files unchanged (verbatim copy)
- ✅ Zero layout shift (CLS = 0)
- ✅ Screenshots match baseline pixel-perfect
- ✅ Lighthouse visual parity score = 100%

### Functional Requirements
- ✅ B2C e-commerce flows complete
- ✅ Cart, checkout, payments working
- ✅ User accounts functional
- ✅ Admin panel (B2C only)
- ✅ Deployed and accessible

### Technical Requirements
- ✅ TypeScript throughout
- ✅ Modern stack (Next.js 14+, PostgreSQL, Stripe)
- ✅ Deployable on Vercel/Render/Hostinger
- ✅ No B2B logic included

---

## 🚫 ABSOLUTE CONSTRAINTS

### UI Preservation Rules

1. **HTML Rule:** Paste as-is, no modifications
   - No componentization
   - No wrapper divs
   - No class renaming
   - No DOM restructuring

2. **CSS Rule:** Copy verbatim
   - Same filenames
   - Same load order
   - No Tailwind/CSS-in-JS
   - No optimizations

3. **JavaScript Rule:** Event delegation only
   - No React onClick handlers
   - Use data attributes + event listeners
   - Logic lives outside DOM

4. **Visual Rule:** Zero changes
   - No spacing adjustments
   - No font changes
   - No layout modifications
   - No animation changes

---

## 📁 PROJECT STRUCTURE

```
stonearts-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (CSS imports only)
│   ├── page.tsx                 # Homepage (pasted HTML)
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx          # Product detail (pasted HTML)
│   ├── cart/
│   │   └── page.tsx              # Cart page (pasted HTML)
│   ├── checkout/
│   │   └── page.tsx              # Checkout (pasted HTML)
│   └── api/                      # API routes
│       ├── cart/
│       ├── products/
│       ├── checkout/
│       └── webhooks/
│
├── public/                       # Static assets
│   ├── images/                   # All images (unchanged)
│   ├── fonts/                    # Font files
│   └── videos/                   # Video files
│
├── styles/                       # CSS files (verbatim copy)
│   ├── normalize.css
│   ├── webflow.css
│   └── stonearts-r-webshop.webflow.css
│
├── lib/                          # Business logic (UI-free)
│   ├── cart/
│   │   ├── manager.ts            # Cart operations
│   │   └── validation.ts         # Stock/quantity checks
│   ├── products/
│   │   ├── fetcher.ts            # CMS integration
│   │   └── transformer.ts        # Data mapping
│   ├── checkout/
│   │   ├── stripe.ts             # Payment processing
│   │   └── order.ts              # Order creation
│   └── auth/
│       └── session.ts            # NextAuth integration
│
├── components/                   # Logic-only components (NO UI)
│   ├── CartProvider.tsx          # Cart context (state only)
│   ├── ProductData.tsx           # Data fetcher (invisible)
│   └── CheckoutFlow.tsx          # Checkout logic (invisible)
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # DB migrations
│
├── types/                         # TypeScript definitions
│   ├── product.ts
│   ├── cart.ts
│   └── order.ts
│
└── scripts/                       # Utility scripts
    ├── migrate-html.ts            # HTML migration helper
    └── validate-ui.ts             # UI parity checker
```

---

## 🔄 IMPLEMENTATION PHASES

### PHASE 0: UI FREEZE & BASELINE ⚠️ CRITICAL

**Objective:** Lock current UI as reference point

**Tasks:**
1. Generate reference screenshots of all pages
2. Document current HTML structure
3. Catalog all CSS files and load order
4. Create UI baseline checklist
5. Lock HTML/CSS files (read-only)

**Deliverables:**
- `/baseline/screenshots/` - All page screenshots
- `/baseline/html-structure.md` - DOM structure docs
- `/baseline/css-inventory.md` - CSS file list
- `/baseline/validation-checklist.md` - UI parity checklist

**Validation:**
- [ ] All pages screenshotted
- [ ] HTML structure documented
- [ ] CSS files cataloged
- [ ] Baseline locked

**Duration:** 1-2 days

---

### PHASE 1: NEXT.JS WRAPPER (NO LOGIC)

**Objective:** Create Next.js app with HTML pasted as-is

**Tasks:**

1. **Initialize Next.js Project**
   ```bash
   npx create-next-app@latest stonearts-nextjs --typescript --app --no-tailwind
   ```

2. **Copy CSS Files**
   - Copy `css/normalize.css` → `styles/normalize.css`
   - Copy `css/webflow.css` → `styles/webflow.css`
   - Copy `css/stonearts-r-webshop.webflow.css` → `styles/stonearts-r-webshop.webflow.css`
   - **No modifications**

3. **Create Root Layout**
   ```tsx
   // app/layout.tsx
   import '../styles/normalize.css'
   import '../styles/webflow.css'
   import '../styles/stonearts-r-webshop.webflow.css'
   
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <head>
           {/* Meta tags from original */}
         </head>
         <body>
           {children}
         </body>
       </html>
     )
   }
   ```

4. **Create Pages (HTML Paste)**
   ```tsx
   // app/page.tsx (Homepage)
   export default function HomePage() {
     return (
       <>
         {/* PASTE ORIGINAL index.html BODY CONTENT HERE */}
         {/* NO MODIFICATIONS */}
       </>
     )
   }
   ```

5. **Copy Static Assets**
   - Copy `images/` → `public/images/`
   - Copy `fonts/` → `public/fonts/`
   - Copy `videos/` → `public/videos/`

6. **Add Scripts (Event Delegation)**
   ```tsx
   // app/layout.tsx (bottom)
   <script src="/js/cart-manager.js" />
   <script src="/js/populate-cms.js" />
   ```

**Deliverables:**
- Next.js app running locally
- All pages render with original HTML
- CSS loads correctly
- Static assets accessible

**Validation:**
- [ ] DOM structure matches original (DevTools comparison)
- [ ] CSS files load in correct order
- [ ] No layout shift
- [ ] Screenshots match baseline
- [ ] All images/fonts load

**Duration:** 2-3 days

---

### PHASE 2: DATA INTEGRATION (READ-ONLY)

**Objective:** Replace mock data with CMS/API data (no UI changes)

**Tasks:**

1. **Set Up CMS (Strapi/Payload)**
   - Install Strapi: `npx create-strapi-app@latest stonearts-cms`
   - Create collections:
     - Products
     - Categories
     - Accessories
     - News/Blog
   - Migrate data from `mock-cms-data.json`

2. **Create API Routes**
   ```tsx
   // app/api/products/route.ts
   export async function GET() {
     const products = await fetchFromCMS()
     return Response.json(products)
   }
   ```

3. **Create Data Fetcher (Invisible Component)**
   ```tsx
   // components/ProductData.tsx
   'use client'
   import { useEffect } from 'react'
   
   export function ProductData({ productSlug }) {
     useEffect(() => {
       fetch(`/api/products/${productSlug}`)
         .then(res => res.json())
         .then(data => {
           // Populate data attributes (no DOM changes)
           document.querySelectorAll('[data-product-name]').forEach(el => {
             el.textContent = data.name
           })
         })
     }, [productSlug])
     
     return null // Invisible component
   }
   ```

4. **Update Pages (Add Data Fetcher)**
   ```tsx
   // app/product/[slug]/page.tsx
   import { ProductData } from '@/components/ProductData'
   
   export default function ProductPage({ params }) {
     return (
       <>
         <ProductData productSlug={params.slug} />
         {/* PASTED HTML HERE */}
       </>
     )
   }
   ```

**Deliverables:**
- CMS running with data
- API routes functional
- Data populates correctly
- No UI changes

**Validation:**
- [ ] Data loads from CMS
- [ ] Product pages show correct data
- [ ] No layout shift during data load
- [ ] Screenshots still match baseline

**Duration:** 3-4 days

---

### PHASE 3: CART (CLIENT-SIDE)

**Objective:** Implement cart functionality (localStorage + validation)

**Tasks:**

1. **Create Cart Manager (TypeScript)**
   ```tsx
   // lib/cart/manager.ts
   export class CartManager {
     addToCart(productId: string, variantId: string, quantity: number) {
       // Validate stock
       // Add to localStorage
       // Update UI via data attributes
     }
     
     removeFromCart(productId: string, variantId: string) {
       // Remove from localStorage
       // Update UI
     }
     
     getCart() {
       return JSON.parse(localStorage.getItem('cart') || '[]')
     }
   }
   ```

2. **Create Cart Context (State Only)**
   ```tsx
   // components/CartProvider.tsx
   'use client'
   export function CartProvider({ children }) {
     const [cart, setCart] = useState([])
     // State management only, no UI
     return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
   }
   ```

3. **Update Event Handlers**
   ```tsx
   // lib/cart/events.ts
   document.addEventListener('submit', (e) => {
     if (e.target.matches('[data-node-type="commerce-add-to-cart-form"]')) {
       e.preventDefault()
       const form = e.target
       const productId = form.getAttribute('data-wf-product-id')
       const variantId = form.getAttribute('data-wf-variant-id')
       const quantity = form.querySelector('input[name="quantity"]').value
       
       cartManager.addToCart(productId, variantId, quantity)
     }
   })
   ```

4. **Add Stock Validation**
   ```tsx
   // lib/cart/validation.ts
   export async function validateStock(productId: string, quantity: number) {
     const product = await fetchProduct(productId)
     if (product.stock < quantity) {
       throw new Error('Insufficient stock')
     }
   }
   ```

5. **Add Toast Notifications (No Layout Shift)**
   ```tsx
   // lib/ui/toast.ts
   export function showToast(message: string) {
     // Create toast element (position: fixed, no layout impact)
     const toast = document.createElement('div')
     toast.className = 'toast-notification'
     toast.textContent = message
     document.body.appendChild(toast)
     setTimeout(() => toast.remove(), 3000)
   }
   ```

**Deliverables:**
- Cart works with localStorage
- Stock validation functional
- Error handling with toasts
- Cart drawer opens automatically

**Validation:**
- [ ] Add to cart works
- [ ] Stock validation prevents overselling
- [ ] Cart persists across sessions
- [ ] No UI changes
- [ ] Error messages appear (toasts)

**Duration:** 3-4 days

---

### PHASE 4: AUTHENTICATION

**Objective:** User accounts (NextAuth.js)

**Tasks:**

1. **Set Up NextAuth.js**
   ```tsx
   // app/api/auth/[...nextauth]/route.ts
   import NextAuth from 'next-auth'
   import CredentialsProvider from 'next-auth/providers/credentials'
   
   export const handler = NextAuth({
     providers: [
       CredentialsProvider({
         // Email + password
       })
     ],
     session: { strategy: 'jwt' }
   })
   ```

2. **Create Auth Pages (Paste HTML)**
   - `app/login/page.tsx` - Login page HTML
   - `app/signup/page.tsx` - Signup page HTML
   - `app/profile/page.tsx` - Profile page HTML

3. **Add Auth Event Handlers**
   ```tsx
   // lib/auth/events.ts
   document.addEventListener('submit', (e) => {
     if (e.target.matches('[data-auth-form="login"]')) {
       e.preventDefault()
       const email = e.target.querySelector('[name="email"]').value
       const password = e.target.querySelector('[name="password"]').value
       signIn('credentials', { email, password })
     }
   })
   ```

4. **Create User Profile API**
   ```tsx
   // app/api/user/route.ts
   export async function GET(request: Request) {
     const session = await getServerSession()
     if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
     const user = await getUserFromDB(session.user.id)
     return Response.json(user)
   }
   ```

**Deliverables:**
- Login/signup functional
- User sessions work
- Profile page shows user data
- Order history accessible

**Validation:**
- [ ] Users can register/login
- [ ] Sessions persist
- [ ] Profile page works
- [ ] Order history loads
- [ ] No UI changes

**Duration:** 4-5 days

---

### PHASE 5: CHECKOUT & PAYMENTS

**Objective:** Stripe integration + order creation

**Tasks:**

1. **Set Up Stripe**
   ```bash
   npm install stripe @stripe/stripe-js
   ```

2. **Create Checkout API**
   ```tsx
   // app/api/checkout/route.ts
   import Stripe from 'stripe'
   
   export async function POST(request: Request) {
     const { cart, customerInfo } = await request.json()
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
     
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items: cart.map(item => ({
         price_data: {
           currency: 'eur',
           product_data: { name: item.name },
           unit_amount: item.price * 100
         },
         quantity: item.quantity
       })),
       mode: 'payment',
       success_url: `${process.env.NEXT_PUBLIC_URL}/order-confirmation`,
       cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`
     })
     
     return Response.json({ sessionId: session.id })
   }
   ```

3. **Create Order Creation API**
   ```tsx
   // app/api/orders/route.ts
   export async function POST(request: Request) {
     const { cart, customerInfo, paymentIntentId } = await request.json()
     const order = await prisma.order.create({
       data: {
         userId: customerInfo.userId,
         items: cart,
         total: calculateTotal(cart),
         paymentIntentId,
         status: 'PAID'
       }
     })
     return Response.json(order)
   }
   ```

4. **Add Stripe Webhook**
   ```tsx
   // app/api/webhooks/stripe/route.ts
   export async function POST(request: Request) {
     const sig = request.headers.get('stripe-signature')
     const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
     
     if (event.type === 'checkout.session.completed') {
       await createOrder(event.data.object)
     }
   }
   ```

5. **Update Checkout Page Handler**
   ```tsx
   // lib/checkout/flow.ts
   document.addEventListener('submit', async (e) => {
     if (e.target.matches('[data-checkout-form]')) {
       e.preventDefault()
       const cart = cartManager.getCart()
       const customerInfo = getFormData(e.target)
       
       const { sessionId } = await fetch('/api/checkout', {
         method: 'POST',
         body: JSON.stringify({ cart, customerInfo })
       }).then(r => r.json())
       
       const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
       await stripe.redirectToCheckout({ sessionId })
     }
   })
   ```

**Deliverables:**
- Stripe checkout functional
- Orders created in database
- Payment webhooks working
- Order confirmation page

**Validation:**
- [ ] Checkout redirects to Stripe
- [ ] Payments process successfully
- [ ] Orders saved to database
- [ ] Confirmation email sent
- [ ] No UI changes

**Duration:** 5-6 days

---

### PHASE 6: ADMIN PANEL (B2C ONLY)

**Objective:** Admin interface for product/order management

**Tasks:**

1. **Create Admin Layout**
   ```tsx
   // app/admin/layout.tsx
   export default function AdminLayout({ children }) {
     // Check admin role
     // Paste admin HTML structure
   }
   ```

2. **Create Admin Pages**
   - `app/admin/products/page.tsx` - Product list
   - `app/admin/products/[id]/page.tsx` - Product edit
   - `app/admin/orders/page.tsx` - Order list
   - `app/admin/orders/[id]/page.tsx` - Order detail

3. **Create Admin APIs**
   ```tsx
   // app/api/admin/products/route.ts
   export async function GET() {
     // Verify admin
     const products = await prisma.product.findMany()
     return Response.json(products)
   }
   
   export async function POST(request: Request) {
     // Verify admin
     const data = await request.json()
     const product = await prisma.product.create({ data })
     return Response.json(product)
   }
   ```

4. **Add Admin Event Handlers**
   ```tsx
   // lib/admin/events.ts
   document.addEventListener('submit', async (e) => {
     if (e.target.matches('[data-admin-form="product"]')) {
       e.preventDefault()
       const formData = getFormData(e.target)
       await fetch('/api/admin/products', {
         method: 'POST',
         body: JSON.stringify(formData)
       })
     }
   })
   ```

**Deliverables:**
- Admin can manage products
- Admin can view orders
- Admin can update inventory
- Admin can manage content

**Validation:**
- [ ] Admin login works
- [ ] Product CRUD functional
- [ ] Order management works
- [ ] Inventory updates reflect
- [ ] No UI changes

**Duration:** 4-5 days

---

## 🗄️ DATABASE SCHEMA

```prisma
// prisma/schema.prisma

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String
  name          String?
  createdAt     DateTime @default(now())
  orders        Order[]
}

model Product {
  id            String   @id @default(cuid())
  productId     String   @unique // CMS ID
  variantId     String   @unique // CMS variant ID
  name          String
  slug          String   @unique
  description   String?
  price         Float
  currency      String   @default("EUR")
  stock         Int      @default(0)
  images        Json     // Array of image URLs
  category      String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  orderItems    OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  userId          String?
  user            User?       @relation(fields: [userId], references: [id])
  items           OrderItem[]
  total           Float
  currency        String      @default("EUR")
  status          OrderStatus @default(PENDING)
  paymentIntentId String?
  shippingAddress Json?
  billingAddress  Json?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id])
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  quantity    Int
  price       Float
  createdAt   DateTime @default(now())
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## 🔧 CONFIGURATION FILES

### `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Render deployment
  images: {
    domains: ['cdn.prod.website-files.com'],
    unoptimized: true // If using static export
  }
}

module.exports = nextConfig
```

### `.env.example`
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stonearts"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# CMS
CMS_API_URL="http://localhost:1337/api"
CMS_API_TOKEN="your-cms-token"
```

### `package.json` (Key Dependencies)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@prisma/client": "^5.0.0",
    "next-auth": "^4.24.0",
    "stripe": "^14.0.0",
    "@stripe/stripe-js": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "prisma": "^5.0.0"
  }
}
```

---

## ✅ VALIDATION CHECKLIST (Per Phase)

### Phase 1 Validation
- [ ] HTML DOM matches original (DevTools comparison)
- [ ] CSS files load correctly
- [ ] No layout shift (CLS = 0)
- [ ] Screenshots match baseline
- [ ] All assets load

### Phase 2 Validation
- [ ] Data loads from CMS
- [ ] Product pages show correct data
- [ ] No layout shift during load
- [ ] Screenshots still match

### Phase 3 Validation
- [ ] Cart adds/removes items
- [ ] Stock validation works
- [ ] Cart persists
- [ ] No UI changes
- [ ] Error toasts appear

### Phase 4 Validation
- [ ] Login/signup works
- [ ] Sessions persist
- [ ] Profile loads
- [ ] Order history accessible

### Phase 5 Validation
- [ ] Checkout redirects to Stripe
- [ ] Payments process
- [ ] Orders saved
- [ ] Emails sent

### Phase 6 Validation
- [ ] Admin login works
- [ ] Product CRUD works
- [ ] Order management works

---

## 🚀 DEPLOYMENT GUIDE

### Vercel (Frontend)
```bash
vercel --prod
```

### Render (Backend/DB)
1. Create PostgreSQL database
2. Deploy Next.js app
3. Set environment variables
4. Run migrations: `npx prisma migrate deploy`

### Hostinger (Alternative)
1. Build: `npm run build`
2. Export: `next export` (if static)
3. Upload to hosting
4. Configure database

---

## 📊 MONITORING & MAINTENANCE

### Error Tracking
- Integrate Sentry for error monitoring
- Log all API errors
- Track cart abandonment

### Performance
- Monitor Core Web Vitals
- Track API response times
- Optimize images (Next.js Image component)

### Analytics
- Google Analytics 4
- E-commerce tracking
- Conversion funnel analysis

---

## 🎯 FINAL DELIVERY CHECKLIST

- [ ] All phases complete
- [ ] UI matches original (screenshot comparison)
- [ ] All B2C flows functional
- [ ] Deployed on Vercel
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Admin panel accessible
- [ ] Error handling in place
- [ ] Documentation complete

---

## 📝 NOTES

- **B2B Logic:** Explicitly excluded. Can be added later without refactor.
- **UI Changes:** Forbidden. Any visual change = failure.
- **Componentization:** Only for logic, never for UI.
- **Testing:** Manual visual testing + automated functional tests.

---

**Last Updated:** 2025-01-XX  
**Status:** Ready for Phase 0 execution
