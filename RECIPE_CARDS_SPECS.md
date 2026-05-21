# Savori Print-Ready Recipe Card Specifications

**TL;DR**
Three high-resolution recipe card designs (Thai, Moroccan, Szechuan) are ready for production. These cards are engineered for letterbox-friendly 5.5" x 8.5" dimensions and utilize the "Chef-Grade Minimalist" aesthetic. Digital templates are provided in the repository for seamless 300dpi PDF export.

---

## 1. Physical Specifications

| Attribute | Specification |
| :--- | :--- |
| **Dimensions** | 5.5 inches (W) x 8.5 inches (H) |
| **Material** | 18pt FSC-Certified Cardstock |
| **Finish** | Aqueous Matte (PFAS-free) |
| **Thickness** | 0.018" per card (Fits USPS Flat Mail <0.75" limit) |
| **Color Space** | CMYK (Digital-first templates provided in RGB for preview) |

---

## 2. Visual Content Breakdown

### Card 01: Bangkok Green Curry
- **Primary Color**: Kaffir Green (#2D5A27)
- **Hero Image**: `images/editorial-food-photography-of-a-vibrant-.png`
- **Narrative Focus**: Aromatic balance and Burlap & Barrel Turmeric.

### Card 02: Marrakesh Lamb Tagine
- **Primary Color**: Paprika Red (#A63D2D)
- **Hero Image**: `images/editorial-food-photography-of-an-authent.png`
- **Narrative Focus**: Sweet-savory complexity and Grade-A Saffron.

### Card 03: Chengdu Mapo Tofu
- **Primary Color**: Savori Saffron (#E89E1A)
- **Hero Image**: `images/editorial-food-photography-of-chengdu-ma.png`
- **Narrative Focus**: "Mala" numbing effect and Szechuan Peppercorns.

---

## 3. Production Assets

The following digital templates are live in the `public/recipes/` directory and are ready for professional PDF conversion:

1.  **Bangkok Green Curry**: `public/recipes/thai-green-curry.html`
2.  **Marrakesh Lamb Tagine**: `public/recipes/moroccan-tagine.html`
3.  **Chengdu Mapo Tofu**: `public/recipes/mapo-tofu.html`
4.  **Shared Styling**: `public/recipes/print.css`

---

## 4. Next Steps for Fulfillment
1.  **PDF Export**: Use a headless browser (Puppeteer) or manual "Print to PDF" at 100% scale to generate 300dpi print files.
2.  **QR Code Generation**: Replace the `QR code placeholder` with unique tracking URLs for each kit's video masterclass.
3.  **Print Sample**: Execute a 10-unit test run to verify the Aqueous Matte coating's grease resistance on kitchen counters.
