# Password editor access (no Supabase account needed)

Open **/editor** (or **/admin/editor**). Set **EDITOR_PASSWORD** as a server environment variable. The password is checked by the API and is never included in the browser build. Sessions use an HttpOnly cookie, expire after eight hours, and are invalidated when you rotate the password.

## Local access

1. `npm ci`
2. Put `EDITOR_PASSWORD=<your password>` in `.env.local` (a generated password is already present on this computer).
3. `npm run dev -- --host 127.0.0.1`
4. Open `http://localhost:8080/editor` and enter the password.

Drafts, published pages, revisions and uploaded media persist in the ignored `.cms-data/` directory. Back up this directory. Existing Supabase public content is loaded when available; content published through password access overrides it. The original Supabase records are not modified.

## Deploy on Vercel

1. Open the Vercel project that owns `hastag-web-livid.vercel.app`.
2. In Storage, create/connect a **private Vercel Blob store**. This supplies `BLOB_READ_WRITE_TOKEN` to the project.
3. Add `EDITOR_PASSWORD` under Settings → Environment Variables. Keep both values server-only, without a `VITE_` prefix. Do not commit them.
4. Deploy this repository's changes, including `api/cms.js` and `backend/cms.js`.
5. Open **https://hastag-web-livid.vercel.app/editor** and use your editor password.

Vercel requires Blob storage because its function filesystem is temporary. The API refuses to save without persistent storage there. Configure a Vercel Firewall rate limit on `/api/cms?action=login` for distributed brute-force protection; the API also has a per-instance attempt limit. Share this password only with trusted editors: the editor can publish custom HTML and JavaScript.

The independent backend supports website pages, theme, header/footer, drafts, publishing, version history and small media uploads (under 2.9 MB). Paste a hosted URL for larger files. Products, orders, portfolio administration and existing form submissions still belong to the original Supabase system and require its account. Existing public forms continue to use Supabase.

## Homepage hero reels

The three requested Instagram reels are saved under `public/hero-reels/` and configured on the built-in home hero. They autoplay **muted**, **loop**, and play inline on mobile; playback pauses when out of view. The speaker button enables sound. Browser autoplay restrictions can still apply. A homepage that already has published CMS overrides keeps those settings: select the hero in the editor, choose manual videos and use the three `/hero-reels/<reel-id>.mp4` paths, then Publish.

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

## 5. Homepage: sales-focused video (≈80%) + performance marketing (≈20%)

Order: video hero → trusted brands → your work (reels) → the 3 video formats (Home Style UGC, Studio Shoot, Influencer Reels) → **Videos that deliver sales** → how we make videos that sell → 11 years / network (Google ranking + numbers) → WhatsApp proof → performance marketing → case studies → **pricing (INR default)** → reviews → lead form → FAQ.

* **Video formats:** in /admin → Videos every video now has a format (Home Style UGC / Studio Shoot / Influencer Reels) and a **Sales result** field (e.g. `3.8x ROAS · 240 orders`). Old uploads are mapped automatically: Sales → Home Style UGC, Brand/TVC → Studio Shoot, Influencer → Influencer Reels. Old view counts are hidden.
* **Videos that deliver sales:** shows every video that has a Sales result, plus any result cards you add in the editor (video, brand, headline result, extra numbers). Until you add results it shows only the “orders, not views” comparison.
* **Pricing:** edit prices in `src/components/Pricing.tsx`. INR is the default currency and comes first. USD prices are converted at ₹85 = $1 (`INR_PER_USD` at the top of that file).
* The old ads-focused homepage sections are still on the home page, hidden – turn any back on with the eye icon.

## 6. Notes

* Element edits on existing sections are tied to the page structure. If a developer later rewrites one of those components, re-check its edits in the editor.
* Single-page-app SEO: titles and descriptions are set when the page loads (Google renders JavaScript; some social previews only read `index.html`).
* The editor code only downloads on `/admin/editor`, so it doesn't slow down the public site.
