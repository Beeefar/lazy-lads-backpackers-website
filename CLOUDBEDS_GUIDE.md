# Cloudbeds Booking Integration Guide

This site sends all **Book Now** clicks to your Cloudbeds Booking Engine. No internal booking forms are used.

---

## 1. Find Your Booking Engine URL

1. Log in to your **Cloudbeds Dashboard**.
2. Go to **Manage** (or **Settings**) → **Booking Engine** (or **Channel Manager** / **Direct Booking**).
3. Look for a section like **“Booking Engine URL”**, **“Direct link”**, or **“Widget / Embed”**.
4. Copy the full URL. It usually looks like:
   - `https://yourproperty.cloudbeds.com/reservations`
   - or `https://book.cloudbeds.com/xxxxx`

Use this URL as your single source for all “Book Now” buttons on the site.

---

## 2. Update the Config File

1. Open **`src/config/site-content.ts`** in your project.
2. Find the line:
   ```ts
   CLOUDBEDS_URL: 'https://lazylads.cloudbeds.com/reservations',
   ```
3. Replace the placeholder with your actual Cloudbeds Booking Engine URL:
   ```ts
   CLOUDBEDS_URL: 'https://your-actual-property.cloudbeds.com/reservations',
   ```
4. Save the file. Every “Book Now” link on the site will now point to your real booking page.

---

## 3. Optional: URL Parameters

Cloudbeds often supports query parameters so you can pre-fill dates or promo codes.

**Examples:**

- **Check-in / check-out dates** (if supported by Cloudbeds):
  ```
  https://yourproperty.cloudbeds.com/reservations?checkin=2025-03-01&checkout=2025-03-05
  ```
- **Promo code** (if supported):
  ```
  https://yourproperty.cloudbeds.com/reservations?promo=LAZY10
  ```

To use these on the site, update `CLOUDBEDS_URL` in `site-content.ts` to include the parameters, or build the link in code by appending `?checkin=...&checkout=...` (or similar) to `CLOUDBEDS_URL` when generating the “Book Now” link.

Check your Cloudbeds documentation or support for the exact parameter names they support.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Cloudbeds Dashboard → Manage → Booking Engine → copy URL |
| 2 | Paste URL into `src/config/site-content.ts` → `CLOUDBEDS_URL` |
| 3 | (Optional) Add `?checkin=...&checkout=...` or `?promo=...` if needed |

All “Book Now” buttons on the site are plain `<a>` tags that open this URL in a new tab.
