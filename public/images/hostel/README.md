# Hostel images folder

Place your hostel photos here and reference them in **`src/config/site-content.ts`**.

## How to use your own images

1. Add image files to this folder (e.g. `hero-bg.jpg`, `mixed-dorm.jpg`, `gallery-1.jpg`).
2. Open **`src/config/site-content.ts`**.
3. Replace placeholder image paths with local paths, for example:
   - Hero: `image: '/images/hostel/hero-bg.jpg'`
   - Rooms: `image: '/images/hostel/mixed-dorm.jpg'` (and similar for each room).
   - Gallery: `src: '/images/hostel/gallery-1.jpg'` (and so on for each gallery image).

**Important:** The filenames in this folder must match the paths you set in `site-content.ts`. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

Until you add your own images, the site uses Unsplash placeholder URLs defined in the config file.
