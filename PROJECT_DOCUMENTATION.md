# Macee External Workforce Solutions — Website Architecture & Design System Documentation

> **Project Name:** Macee | Think Better. Recruit Smarter.  
> **Type:** High-Performance Enterprise Workforce & Staffing Web Application  
> **Date Generated:** October 2026  
> **Status:** Production Ready  

---

## 1. Executive Summary & Overview

**Macee** is an enterprise-grade digital platform for an international workforce solutions, recruitment desk, and interim staffing provider based in the Netherlands. The platform connects clients with verified global talent, interim professionals, and compliant contracting services (SNA NEN 4400-1 certified & IND Recognised Sponsor).

The website is engineered for speed, high visual polish, fluid smooth-scrolling animations, accessibility, and full two-way recruitment integration with the **OTYS Recruitment System Web API**.

---

## 2. Typography & Fonts System

The website uses a modern multi-tiered typography pairing loaded via Google Fonts with responsive fallbacks:

| Font Name | Category | Weights Used | Usage on Website | Google Font Link / Source |
| :--- | :--- | :--- | :--- | :--- |
| **Space Grotesk** | Display / Headings | `300`, `400`, `500`, `600`, `700`, `800` | Section headings (`h1` - `h6`), hero banners, button texts, metric numbers | [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| **Plus Jakarta Sans** | Primary UI / Body | `300`, `400`, `500`, `600`, `700`, `800` | Primary paragraph text, navigation links, form inputs, modal bodies | [Google Fonts - Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |
| **Syne** | Secondary Display | `500`, `600`, `700`, `800` | Feature titles, stylish highlighted headers, cards display | [Google Fonts - Syne](https://fonts.google.com/specimen/Syne) |
| **JetBrains Mono** | Monospace / Data | `400`, `500`, `600` | Job IDs, reference tags, salary indicators, criteria codes | [Google Fonts - JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Arial / System Sans** | Native Fallback | `400`, `700` | Base browser system fallback (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`) | System Native |

### Typography CSS Variables & Rules:
```css
:root {
  --heading_font-family: "Space Grotesk", sans-serif;
  --content_font-family: "Plus Jakarta Sans", "Arial", sans-serif;
  --h1_hero_font-weight: 800;
  --h2_hero_font-weight: 700;
}
```

---

## 3. Brand Color Palette & Design Tokens

The color scheme is designed around Macee's corporate identity: **Bold Vibrant Red**, **Deep Professional Charcoal/Navy Black**, and **Clean Modern Neutrals**:

### Primary Brand Colors:
| Color Name | Hex Code | RGB | Tailwind / CSS Var | Main Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Macee Primary Red** | `#E30613` | `rgb(227, 6, 19)` | `--primary-color`, `bg-[#E30613]` | Primary buttons (CTAs), key highlight words, active badges, accent icons |
| **Macee Dark Red Hover** | `#BE040F` | `rgb(190, 4, 15)` | `hover:bg-[#BE040F]` | Button hover states, active press states |
| **Charcoal Black / Dark Navy** | `#111827` | `rgb(17, 24, 39)` | `--accent-black`, `bg-[#111827]` | Top bar, sticky header text, dark buttons, footers, deep contrast titles |
| **Slate Accent Blue** | `#8E96CB` | `rgb(142, 150, 203)` | `--accent-blue`, `text-[#8E96CB]` | Secondary badges, soft card accents, hard drop-shadows |
| **Navy Accent Blue** | `#36427D` | `rgb(54, 66, 125)` | `--accent-blue-dark` | Deep badges, hover states |

### Background & Neutral Colors:
| Color Name | Hex Code | RGB | Usage |
| :--- | :--- | :--- | :--- |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Page base background, card white fills, modal backgrounds |
| **Soft Cool White / Off-White** | `#F8FAFB` | `rgb(248, 250, 251)` | Alternate section backgrounds, input fields, pill badges |
| **Light Card Accent Tint** | `#F0F3FA` | `rgb(240, 243, 250)` | Highlight cards, resource download cards |
| **Subtle Border Gray** | `#E5E7EB` / `gray-100` | `rgb(229, 231, 235)` | Dividers, card borders, form field borders |

### Text & Content Colors:
| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Text (Dark)** | `#111827` / `#333333` | Headings, card titles, primary body labels |
| **Secondary Paragraph Gray** | `#54595F` / `#4B5563` | Subtitles, description paragraphs, footer subtext |
| **Muted Metadata Gray** | `#6B7280` / `#9CA3AF` | Timestamps, job locations, criteria numbers |
| **White Text** | `#FFFFFF` | Footer links, dark buttons, badge text on red |

---

## 4. Technology Stack & Frameworks

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | **React** | `19.0.1` | Next-generation component-based declarative UI |
| **DOM Renderer** | **React-DOM** | `19.0.1` | Web browser DOM binding |
| **Language** | **TypeScript** | `7.0.2` | Strong static typing across all components, APIs, and data models |
| **Build Tool & Dev Server**| **Vite** | `8.3.0` | Ultra-fast HMR and optimized Rollup production builds |
| **CSS Utility Framework** | **Tailwind CSS** | `4.3.3` | Tailwind v4 with `@tailwindcss/vite` integration |
| **Smooth Scrolling** | **Lenis** | `1.3.26` | 60 FPS momentum-based buttery smooth scrolling across the entire site |
| **Animation Engine** | **GSAP (GreenSock)** | `3.15.0` | ScrollTrigger scroll reveals, element stagger transitions |
| **Motion Effects** | **Motion (Framer Motion)** | `12.23.24` | Modal entrance/exit springs, micro-animations |
| **Icon Library** | **Lucide React** | `0.546.0` | 50+ crisp, featherweight SVG vector icons |
| **Server & API Proxy** | **Express.js & Node.js** | `4.21.2` | Production static server and secure OTYS API reverse proxy |
| **Environment Management**| **Dotenv** | `17.2.3` | Secret token and API environment variable isolation |
| **AI Integration** | **@google/genai** | `2.4.0` | Google Gemini AI capabilities for intelligent HR matching |

---

## 5. Key UI Rules & Styling Elements

- **Button Border Radius:** `10px` (`--button_border-radius: 10px;`) & `rounded-[5px]` for compact action buttons.
- **Card Border Radius:** `20px` to `26px` (`--card_border-radius: 20px;`) with soft micro-borders (`border border-gray-100`).
- **Signature Accent Shadow:** `box-shadow: 40px 40px 0 0 rgba(142, 150, 203, 0.25)` (`img.hard-shadow`).
- **Smooth Crossfade Carousels:** 4.5-second auto-cycling hero image carousels with Ken Burns scale zoom effect (`scale-105 transition-transform duration-[6000ms]`).
- **Top Accent Line:** `body { border-top: 3px solid #E30613; }` providing Macee's brand mark across all pages.
- **Lenis Scroll Prevention:** Dialogs and modal lists are protected with `[data-lenis-prevent]` to preserve natural inner wheel scrolling.

---

## 6. Website Pages & URL Routing Architecture

The application operates as a full SPA (Single Page Application) with synced browser URLs and deep-link routing:

| Route Path | Component | Description & Key Sections |
| :--- | :--- | :--- |
| `/` | `HomePage` / `App.tsx` | Main landing experience: Hero carousel, What We Do 8-slot balanced grid, Downloadable resources, Why Workforce Solutions, Live Job Vacancies, HR Risk survey, **Tailored Home FAQs (5 questions)**, Contact form, and Compact footer. |
| `/about` | `AboutPage.tsx` | Macee background: Crossfade hero with live desk emblem, "What We Do" capabilities, "How We Work" methodology, 3 Service pillars, 6 Team member cards, **Tailored About FAQs (4 questions)**, Contact form. |
| `/clients` | `ClientsPage.tsx` | Dedicated solutions for hiring managers, enterprises, compliance frameworks, interim staffing desk, **Tailored Client & Staffing FAQs (5 questions)**. |
| `/professionals` | `ProfessionalsPage.tsx` | Specialized hub for expats, international contractors, work permits, payroll support, relocation assistance, **Tailored Candidate & Expat FAQs (5 questions)**. |
| `/projects` | `ProjectsPage.tsx` | Full OTYS vacancy explorer: Search by keyword/function, filter by employment type/location, pagination, live job application, **Tailored Project & Vacancy FAQs (5 questions)**. |
| `/faq` | `FaqPage.tsx` | Master knowledge base: Category filter tabs, search engine, expandable accordion cards for legal, payroll, contracting, and compliance questions. |
| `/contact` | `ContactPage.tsx` | Direct outreach page: First Name, Last Name, Email, Phone, Detailed Message, direct office address, phone numbers, **Tailored Contact & Visit FAQs (4 questions)**, Google Maps embed. |

---

## 7. Interactive Modals & Floating Components

1. **Consultation Modal (`ConsultationModal.tsx`):**
   - Book a strategic 1-on-1 consultation with a workforce specialist.
2. **HR Risk Survey Modal (`HRRiskSurveyModal.tsx`):**
   - Interactive multi-question compliance assessment calculating employer hiring risk.
3. **Job Application Modal (`JobApplicationModal.tsx`):**
   - Integrated CV upload (`.pdf`, `.docx`), cover letter, and candidate profile dispatching directly to the OTYS API.
4. **Open Application Modal (`OpenApplicationModal.tsx`):**
   - For candidates seeking general registration without a specific vacancy ID.
5. **Create Job Alert Modal (`CreateJobalertModal.tsx`):**
   - Set up automated email notifications based on job function, salary range, and location.
6. **Downloadable Resource Modal (`ResourceModal.tsx`):**
   - Download whitepapers, salary benchmarks, and compliance cheat sheets.
7. **Mobile Drawer Menu (`MobileMenu.tsx`):**
   - Touch-friendly slide-over navigation with direct CTA triggers.

---

## 8. Third-Party Integrations & External APIs

### 1. OTYS Recruitment Web API Integration
- **Proxy Endpoint:** `/api/otys/*` handled via `server/otysProxy.js` on Node/Express.
- **Client Handler:** `src/lib/api.ts` & `src/lib/auth.ts`.
- **Capabilities:**
  - Dynamic bearer authentication with automated token refreshing.
  - Vacancy list retrieval, keyword search, and criteria filtering (`/vacancies`).
  - Candidate application submission (`/vacancy_application`).
  - Open applications (`/open_application`).
  - Resume & document upload (`/files`).
  - Automated job alerts (`/jobalert-form`).

### 2. Multi-Language Internationalization (Google Translate API)
- Script initialized dynamically in `index.html`:
  - **Supported Languages:** English (`en`) & Dutch / Nederlands (`nl`).
  - Integrated custom language switcher inside `AutoLanguageSelector.tsx`.
  - Zero-flicker CSS overrides to suppress native Google tooltips and banner bars.

---

## 9. Content & Data Source Architecture

All website copy is decoupled into structured JSON and TypeScript files in `src/data/`:
- `pageFaqs.ts` — Context-tailored FAQ questions, answers, and tags for each individual page.
- `aboutData.json` — Hero copy, team bios, contact details, certifications.
- `clientsData.json` — Enterprise staffing solutions, compliance points.
- `professionalsData.json` — Contractor guides, relocation assistance data.
- `faqData.json` — Curated FAQ question-and-answer pairs by category.
- `content.ts` — Curated job listings, downloadable resources, client logos.
- `contactData.json` — Office addresses, emails, phone numbers, business hours.

---

## 10. Summary Table for Quick Reference

```
================================================================================
                    MACEE WEBSITE DESIGN & TECH SPEC
================================================================================
Brand Colors:        Primary Red: #E30613 | Charcoal Black: #111827 | Accent Blue: #8E96CB
Backgrounds:         White: #FFFFFF | Neutral Gray: #F8FAFB | Card Tint: #F0F3FA
Fonts:               Space Grotesk (Headings) | Plus Jakarta Sans (Body) | Syne (Display)
Core Tech:           React 19 + TypeScript + Vite 8 + Tailwind CSS v4
Animation:           Lenis Smooth Scroll + GSAP ScrollTrigger
Icons:               Lucide React (50+ SVG icons)
Backend:             Node.js + Express.js OTYS Recruitment API Proxy
Languages:           English (en) & Dutch (nl)
================================================================================
```
