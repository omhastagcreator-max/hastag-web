# Website editor (CMS) – setup & how to use

Your site now has a Shopify-style visual editor at **/admin/editor**.
Every page, section and element can be changed from the browser – no code changes needed for routine edits.

## 1. One-time setup (5 minutes)

1. Open **Supabase → SQL Editor**, paste the contents of `supabase/cms.sql`.
2. In that file, change `you@example.com` to the email you use to log in to `/admin` (add more lines for more editors).
3. Click **Run**. This creates the editor tables, permissions and the `cms-media` image/video bucket.
4. Deploy the site as usual (push to GitHub / Vercel).
5. Go to `https://<your-site>/admin/editor` and log in.

Until step 3 is done the site keeps working with its built-in content; the editor opens but Save/Publish stay off.

## 2. How it works

| Area | What you can do |
|---|---|
| **Top bar** | Switch page, add a page, Desktop / Tablet / Mobile preview, **Edit** (click to select) vs **Interact** (use the site like a visitor), Undo / Redo, Save draft, Publish, version history, media library, form submissions, discard changes |
| **Left – Sections** | Header group, page template, footer group. Drag to reorder, eye icon to show/hide (content is kept), ⋯ menu to duplicate / move / copy to another page / delete, **Add section** anywhere |
| **Left – Pages** | Create unlimited pages (blank, landing-page template, or copy of any page), duplicate, delete, version history. Built-in pages can be reset to original |
| **Left – Theme** | Brand colors, heading/body fonts, base size, radius, global CSS / JS / `<head>` code |
| **Preview** | Click any text, image, button or box to edit it. **Double-click text to type straight into the page.** Breadcrumbs let you select the parent element |
| **Right – Section** | Content (all fields), Design (background, typography, spacing, size, borders, shadows – separately for desktop/tablet/mobile), Advanced (anchor ID, classes, show on devices, schedule, URL-parameter condition, animation, custom CSS/JS, HTML before/after) |
| **Right – Element** | Text or rich HTML, image/video source, alt text, link + new tab, hide, extra classes, full responsive styling, reset |
| **Right – Page** (nothing selected) | Page name, SEO title / description / keywords / share image / canonical / noindex, hide header or footer (good for ad landing pages), page CSS / JS |

**Save** stores a draft (not visible to visitors). **Publish** makes it live and keeps a version you can restore later.
Unsaved work is also kept in your browser, so a closed tab doesn't lose edits.

Link fields understand: `/contact` (a page), `#faq` (a section on the page – set the ID under Advanced), `#audit` (scrolls to the lead form), or any `https://` URL.

## 3. Sections available

* **Your existing sections** (hero, trusted brands, WhatsApp proof, case studies, Google reviews, pricing, FAQ, etc.) – click elements inside them to edit.
* **New blocks**: Video hero, Video showcase (reels), Hero banner, Slideshow, Rich text, Image with text, Multi-column, Features/icon grid, Stats, Logo strip, Testimonials, FAQ/accordion, Product grid, Pricing table, CTA banner, Countdown, Image, Video, Embed (Calendly/maps), Newsletter, Contact form, Audit lead form, Contact details + map, Announcement bar, Spacer, Custom HTML.
* Header and footer are fully editable (logo, menu links with dropdowns, buttons, link columns, social links, contact details).

Newsletter / contact form entries are saved in Supabase (`cms_submissions`) and visible under ⋯ → Form submissions.

## 4. Safety

* Custom CSS on a section is automatically limited to that section.
* Custom JavaScript runs inside try/catch – an error shows a red message in the editor and can't break the page.
* If a section ever fails to render, only that section is skipped on the live site.
* Visitors can only read *published* content; only emails in `cms_admins` can edit (database-level rules).

## 5. Homepage repositioning (80% video / 20% performance)

The built-in homepage is now video-first: video hero, your video portfolio as reels (from /admin → Videos), video services, video process, WhatsApp proof, one performance-marketing block, case studies, reviews, lead form and a video-focused FAQ. The header menu, footer and SEO text were updated to match.
The previous ads-focused sections are still on the home page, **hidden** – turn any back on with the eye icon.

## 6. Notes

* Element edits on existing sections are tied to the page structure. If a developer later rewrites one of those components, re-check its edits in the editor.
* Single-page-app SEO: titles and descriptions are set when the page loads (Google renders JavaScript; some social previews only read `index.html`).
* The editor code only downloads on `/admin/editor`, so it doesn't slow down the public site.
