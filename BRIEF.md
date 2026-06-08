---
name: la-vida-prompt-landing-pages
status: active
health: yellow
stakeholders: []
tags: []
---

## Overview

# Prompt: La Vida Landing Pages

> Paste this into your Claude Code window opened at ~/Documents/LaVidaLandingPages/

---

/client-website-scaffold

## Project: La Vida Regenerative Medicine — Landing Pages

Build up to 3 dedicated funnel landing pages for a stem cell therapy clinic in Punta Cana, Dominican Republic. These pages are the destination for paid ad traffic (Facebook/Instagram video ads). They need to convert visitors into booked consultations.

### Client Details
- **Business:** La Vida Regenerative Medicine (La Vida Stem Cells)
- **Location:** Punta Cana Village, Dominican Republic
- **Phone:** 877-273-2220
- **Email:** care@lavidastemcells.com
- **Instagram:** @La_Vida.dr
- **Head Physician:** Dr. Bernardo "Benny" Pichardo Caba — Founder, personally oversees all procedures
- **Website (reference only):** lavidastemcells.com

### Brand Direction
- Premium medical tourism — luxury + clinical credibility
- Colors: TBD (awaiting brand assets) — default to clean medical aesthetic: deep navy, white, warm gold accents
- Tone: Authoritative but warm. Not salesy — educational. "You deserve better than managing symptoms."
- Photography style: Tropical clinic setting, professional but approachable

### Landing Page Structure (3 Pages)

**Page 1: General — "Regenerative Medicine in Paradise"**
- Hero: Video embed placeholder + headline + CTA (Book Free Consultation)
- What is stem cell therapy (brief, accessible)
- Conditions treated overview (link to condition-specific pages)
- Why La Vida: fresh never-frozen cells, in-house lab, Dr. Pichardo bio
- The experience: concierge travel, Punta Cana, what to expect
- Patient testimonials (placeholder cards)
- FAQ accordion
- Lead capture form: Name, Email, Phone, Condition, "What are you hoping to improve?"
- AI chatbot widget (placeholder/integration point for CoreLinq)

**Page 2: Orthopedic / Pain — "Stop Managing Pain. Start Healing."**
- Targets: joint pain, arthritis, rotator cuff, back pain, sports injuries, neuropathy
- Treatments: Cervical Epidural, Shoulder, Lower Back Epidural, UC-MSC for Arthritis, Wound Care, Athletes
- Cell counts, viability (92-95%), fresh never-frozen differentiator
- Before/after journey timeline
- Specific testimonials for orthopedic cases
- Same lead form + chatbot

**Page 3: Neurological / Autoimmune / Systemic — "Hope for Complex Conditions"**
- Targets: Parkinson's, dementia, MS, lupus, Crohn's, diabetes, neuropathy
- Treatments: Intrathecal, High-Dose IV (600-700M cells), Auto-Immune, Diabetes
- Research-backed positioning (reference NIH studies)
- Specific testimonials
- Same lead form + chatbot

### Technical Requirements
- Next.js 16 + Tailwind CSS v4 + Framer Motion
- SEO-ready (metadata, Open Graph, structured data for medical practice)
- Conversion tracking pixel placeholders (Meta Pixel, Google Ads)
- Mobile-first responsive design
- Lead form submissions POST to webhook endpoint (placeholder URL — will connect to CoreLinq CRM)
- Chatbot integration point (div with ID for CoreLinq widget injection)
- Fast loading — optimize for ad traffic (high bounce risk)
- Hosting: Vercel (included in client package)

### Regulatory Guardrails (IMPORTANT)
- NO specific medical claims or promises of outcomes
- NO cure language — use "support," "may help," "designed to"
- NO specific pricing on pages
- Include disclaimer: "These statements have not been evaluated by the FDA. This is not intended to diagnose, treat, cure, or prevent any disease. Results may vary."
- All testimonials marked as individual experiences

### Lead Form Fields
1. Full Name
2. Email
3. Phone (with country code — international patients)
4. Primary Condition / What are you hoping to improve? (textarea)
5. How did you hear about us? (dropdown: Facebook Ad, Instagram, Google, Referral, Other)
6. Hidden: UTM parameters (source, medium, campaign, content)

