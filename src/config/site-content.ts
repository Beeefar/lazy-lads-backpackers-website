/**
 * LAZY LADS BACKPACKERS HOSTEL — SITE CONTENT (SOURCE OF TRUTH)
 * =============================================================
 * All text, image paths, prices, and URLs for the website live here.
 * Do NOT hardcode content in components. Edit this file only.
 *
 * HOW TO UPDATE IMAGES:
 * 1. Place your image files in: /public/images/hostel/
 * 2. Use the exact filenames you set below (e.g. hero-bg.jpg, dorm-room.jpg).
 * 3. Supported formats: .jpg, .jpeg, .png, .webp
 *
 * HOW TO UPDATE TEXT / PRICES:
 * Change the string values below. Save the file and refresh the site.
 *
 * CLOUDBEDS BOOKING:
 * Replace CLOUDBEDS_URL with your real Cloudbeds Booking Engine URL.
 * See CLOUDBEDS_GUIDE.md in the project root for how to find it.
 */

export const siteContent = {
  /** Site name shown in header and meta tags */
  siteName: 'Lazy Lads Backpackers Hostel',

  /** Short tagline used in footer or meta description */
  tagline: 'Relaxed but Premium — Your Home Away From Home',

  /**
   * CLOUDBEDS BOOKING ENGINE URL
   * Replace this with your actual Cloudbeds booking link.
   * Find it in Cloudbeds: Manage > Booking Engine > Widget / Direct link
   */
  CLOUDBEDS_URL: 'https://lazylads.cloudbeds.com/reservations',

  /** Navigation */
  nav: {
    /** Text on the main call-to-action button in the header */
    bookNowLabel: 'Book Now',
    /** Optional: link text for anchor to rooms section (leave empty to hide) */
    roomsLabel: 'Rooms',
    /** Optional: link text for anchor to gallery (leave empty to hide) */
    galleryLabel: 'Gallery',
    /** Optional: link text for anchor to contact/location (leave empty to hide) */
    contactLabel: 'Contact',
  },

  /**
   * HERO SECTION
   * Hero image: use a local file in /public/images/hostel/ or a full URL.
   * Example local: '/images/hostel/hero-bg.jpg'
   * Placeholder below uses Unsplash (replace with your photo path when ready).
   */
  hero: {
    /** Main headline above the fold */
    headline: 'High-Speed Wi-Fi, Social Vibes, Prime Location',
    /** Supporting line under the headline */
    subheadline:
      'Kick back at Lazy Lads — where comfort meets community. Perfect for digital nomads and backpackers.',
    /** Path to hero background image. Put your image in /public/images/hostel/ and name it e.g. hero-bg.jpg */
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80',
    /** Alt text for hero image (for accessibility and SEO) */
    imageAlt: 'Relaxed common area at Lazy Lads Backpackers Hostel',
  },

  /**
   * ROOMS SECTION
   * Each room type: name, short description, starting price, and image.
   * Image paths: place files in /public/images/hostel/ and match the filename here.
   */
  rooms: {
    sectionTitle: 'Choose Your Vibe',
    sectionSubtitle: 'From dorms to private rooms — something for every traveller.',
    list: [
      {
        id: 'mixed-dorm',
        name: 'Mixed Dorms',
        description: 'Social dorms with lockers, AC, and high-speed Wi-Fi. Meet fellow travellers.',
        priceFrom: 12,
        currency: 'USD',
        /** Image path: /public/images/hostel/mixed-dorm.jpg */
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
        imageAlt: 'Mixed dorm room at Lazy Lads',
        features: ['AC', 'Locker', 'Wi-Fi'],
      },
      {
        id: 'female-dorm',
        name: 'Female Dorms',
        description: 'Female-only dorms for a comfortable, safe stay. Same great amenities.',
        priceFrom: 14,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        imageAlt: 'Female dorm at Lazy Lads',
        features: ['AC', 'Locker', 'Wi-Fi'],
      },
      {
        id: 'private-room',
        name: 'Private Rooms',
        description: 'Your own space with double bed, AC, and Wi-Fi. Privacy when you need it.',
        priceFrom: 35,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1590490360182-c33f57733954?w=800&q=80',
        imageAlt: 'Private room at Lazy Lads',
        features: ['AC', 'Wi-Fi', 'Private Bath'],
      },
    ],
  },

  /**
   * GALLERY SECTION
   * Add or remove image objects. For local images, use paths like /images/hostel/gallery-1.jpg
   * Ensure filenames in /public/images/hostel/ match the path you set here.
   */
  gallery: {
    sectionTitle: 'Around the Hostel',
    sectionSubtitle: 'Spaces where you can work, relax, and connect.',
    images: [
      {
        id: 'g1',
        src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        alt: 'Common area and lounge',
      },
      {
        id: 'g2',
        src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        alt: 'Dorm room',
      },
      {
        id: 'g3',
        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
        alt: 'Cozy bunk',
      },
      {
        id: 'g4',
        src: 'https://images.unsplash.com/photo-1590490360182-c33f57733954?w=600&q=80',
        alt: 'Private room',
      },
      {
        id: 'g5',
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        alt: 'Hostel kitchen',
      },
      {
        id: 'g6',
        src: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&q=80',
        alt: 'Outdoor seating',
      },
    ],
  },

  /**
   * MAP / LOCATION SECTION
   * embedUrl: Google Maps embed iframe URL (from Share > Embed map).
   * address: Plain text address for display and SEO.
   */
  map: {
    sectionTitle: 'Find Us',
    sectionSubtitle: 'We’re in the heart of the action. Easy to reach by transit.',
    /** Full Google Maps embed URL (iframe src). Replace with your hostel location. */
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.998815018989!2d83.95919079000895!3d28.20734859112087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995950355bde455%3A0x3ff9df1fe0be3aee!2sParadise%20Mount%20Resort%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1770868838319!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    /** Display address — update with your real address */
    address: '123 Backpacker Lane, Downtown',
    /** Optional: link that opens in Google Maps in a new tab */
    googleMapsLink: 'https://maps.app.goo.gl/D8ReWEmKDz6t1LXx8',
  },

  /**
   * FOOTER
   */
  footer: {
    /** Short line under the logo */
    tagline: 'Relaxed but Premium.',
    /** Optional: email for contact (leave empty to hide) */
    email: 'hello@lazyladshostel.com',
    /** Optional: phone (leave empty to hide) */
    phone: '+1 (555) 123-4567',
    /** Optional: copyright line. %year% will be replaced with current year. */
    copyright: '© %year% Lazy Lads Backpackers. All rights reserved.',
    /** Optional: link text for “Book Now” in footer */
    bookNowLabel: 'Book Now',
  },
} as const;

export type SiteContent = typeof siteContent;
