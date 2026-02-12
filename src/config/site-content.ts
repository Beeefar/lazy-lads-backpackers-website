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
    /** Optional: link text for anchor to adventures section (leave empty to hide) */
    adventuresLabel: 'Adventures',
    /** Optional: link text for anchor to gallery (leave empty to hide) */
    galleryLabel: 'Gallery',
    /** Optional: link text for anchor to team section (leave empty to hide) */
    teamLabel: 'Our Team',
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
   * ADVENTURES
   * High-energy activities you can help guests book.
   * Image tip: put your own photos in /public/images/hostel/adventures/
   * and reference them here, e.g. '/images/hostel/adventures/trekking.jpg'.
   */
  adventures: {
    sectionTitle: 'Adventures Around Lazy Lads',
    sectionSubtitle: 'Turn your stay into a story — from lake walks to sky-high views.',
    items: [
      {
        id: 'trekking',
        slug: 'trekking',
        title: 'Trekking',
        description:
          'Day hikes and multi-day treks with trusted local guides, from mellow viewpoints to serious peaks.',
        fullDescription:
          'From easy sunrise hikes to multi-day ridge walks, trekking from Lazy Lads can be as mellow or as challenging as you like. We work with trusted local guides, help you rent or buy gear, and make sure you are well-briefed before you hit the trail.',
        image:
          'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?w=800&q=80',
        imageAlt: 'Backpackers trekking in the mountains',
      },
      {
        id: 'paragliding',
        slug: 'paragliding',
        title: 'Paragliding',
        description:
          'Soar above the valley with licensed pilots and catch the best views in town.',
        fullDescription:
          'Take off from a nearby hill and glide over lakes, rooftops, and rice fields with licensed, insured tandem pilots. We can arrange morning or afternoon flights, handle transport to the take-off point, and share honest tips about weather and safety.',
        image:
          'https://images.unsplash.com/photo-1534448311378-1e193fb2570e?w=800&q=80',
        imageAlt: 'Paragliding above a lake and hills',
      },
      {
        id: 'rafting',
        slug: 'rafting',
        title: 'Rafting',
        description:
          'White-water or gentle floats — we connect you with safe, reputable operators.',
        fullDescription:
          'Whether you want a relaxed float or proper rapids, we connect you with river operators who prioritise safety and fun. We can help you pick routes that match your comfort level and arrange same-day or next-day departures.',
        image:
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
        imageAlt: 'Group of people rafting on a river',
      },
    ],
  },

  /**
   * FEATURED FACILITIES
   * Key amenities you want every guest to notice at a glance.
   */
  featuredFacilities: {
    sectionTitle: 'Why Travellers Love Lazy Lads',
    sectionSubtitle: 'Everything you need for a relaxed but premium stay.',
    items: [
      { id: 'wifi', label: 'Free WiFi' },
      { id: 'security', label: '24/7 Security' },
      { id: 'bar', label: 'Bar & Restaurant' },
      { id: 'travel-desk', label: 'Travel Desk' },
      { id: 'housekeeping', label: 'Housekeeping & Laundry' },
      { id: 'breakfast', label: 'Free Breakfast' },
      { id: 'exercise', label: 'Exercise Area' },
      { id: 'airport', label: 'Airport Transportation' },
    ],
  },

  /**
   * TEAM
   * Introduce the humans behind the hostel to build trust.
   * Image tip: add friendly staff portraits to /public/images/hostel/team/
   * and reference them here, e.g. '/images/hostel/team/manager.jpg'.
   */
  team: {
    sectionTitle: 'Meet the Lazy Lads Crew',
    sectionSubtitle: 'A small team of travellers and locals who love hosting travellers like you.',
    members: [
      {
        id: 'azeem',
        name: 'Azeem',
        role: 'Hostel Manager',
        bio: 'Keeps the vibes high and the operations smooth. Your go-to for anything you need on-site.',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80',
        imageAlt: 'Hostel manager smiling at the camera',
      },
      {
        id: 'samir',
        name: 'Samir',
        role: 'Lead Adventure Guide',
        bio: 'Knows every trail, sunrise spot, and hidden waterfall within driving distance.',
        image:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&q=80',
        imageAlt: 'Adventure guide with backpack in the mountains',
      },
      {
        id: 'bidur',
        name: 'Bidur',
        role: 'Community & Events',
        bio: 'Organises family dinners, bar nights, and city walks so you never feel like a stranger.',
        image:
          'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=600&q=80',
        imageAlt: 'Team member chatting with guests in a common area',
      },
    ],
  },

  /**
   * PLACES OF INTEREST
   * Nearby highlights with approximate distance from the hostel.
   */
  placesOfInterest: {
    sectionTitle: 'Close to Everything That Matters',
    sectionSubtitle: 'From lakeside sunsets to hilltop stupas — all within easy reach.',
    places: [
      {
        id: 'phewa-lake',
        name: 'Phewa Lake',
        distance: '10–15 minutes walk',
        description: 'Iconic lakeside boardwalk and boat rides.',
        image:
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
        imageAlt: 'Colorful boats on a calm lake at sunset',
      },
      {
        id: 'world-peace-pagoda',
        name: 'World Peace Pagoda',
        distance: '30–40 mins drive',
        description: 'Hilltop stupa with panoramic mountain views.',
        image:
          'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
        imageAlt: 'White hilltop stupa overlooking mountains and valley',
      },
      {
        id: 'lakeside-strip',
        name: 'Lakeside Main Street',
        distance: '10 minutes walk',
        description: 'Shops, cafés, bars, and gear rentals along the main backpacker strip.',
        image:
          'https://images.unsplash.com/photo-1521664873436-6c48b74a8a19?w=800&q=80',
        imageAlt: 'Lively street lined with cafés and shops in the evening',
      },
      {
        id: 'bus-park',
        name: 'Tourist Bus Park',
        distance: '10–15 minutes drive',
        description: 'Easy arrivals and departures for Kathmandu and beyond.',
        image:
          'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=800&q=80',
        imageAlt: 'Tourist buses parked and ready for departure',
      },
    ],
  },

  /**
   * FAQ
   * Common questions to reduce friction before booking.
   */
  faqs: {
    sectionTitle: 'Frequently Asked Questions',
    sectionSubtitle: 'A few quick answers before you pack your bags.',
    items: [
      {
        id: 'check-in',
        question: 'What are your check-in and check-out times?',
        answer:
          'Standard check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out is subject to availability — just message us and we will do our best.',
      },
      {
        id: 'late-arrival',
        question: 'I arrive late at night. Is that a problem?',
        answer:
          'Not at all. We have 24/7 security and night staff. Please add your arrival time in your booking notes so we can expect you.',
      },
      {
        id: 'wifi',
        question: 'Is the Wi-Fi good enough for remote work?',
        answer:
          'Yes. We have high-speed Wi-Fi and quiet corners where digital nomads often work during the day.',
      },
      {
        id: 'lockers',
        question: 'Do you provide lockers and luggage storage?',
        answer:
          'Every dorm bed comes with an individual locker. We can also store bags for a short time before check-in or after check-out.',
      },
      {
        id: 'what-to-pack',
        question: 'What should I pack for my stay and nearby adventures?',
        answer:
          'Comfortable walking shoes, a light jacket, reusable water bottle, and any medication you need. Trekking or paragliding can be arranged locally — gear rental is usually available.',
      },
    ],
  },

  /**
   * BLOG / NEWS
   * Simple list of recent updates or trip ideas.
   */
  blog: {
    sectionTitle: 'Latest from Lazy Lads',
    sectionSubtitle: 'Trip ideas, hostel news, and local tips.',
    posts: [
      {
        id: 'soft-opening',
        slug: 'soft-opening-first-backpackers',
        title: 'Soft Opening: Lazy Lads Welcomes Its First Backpackers',
        date: '2025-02-01',
        excerpt:
          'After months of painting walls, building bunks, and testing the Wi-Fi, Lazy Lads quietly opened its doors to the very first guests.',
        content:
          'Lazy Lads started as a simple idea: create a hostel that feels like the perfect shared apartment — relaxed, social, and comfortable enough to actually rest in. Our soft opening week was full of small wins: first check-in, first family dinner, first sunrise mission, and of course, the first time the entire dorm cheered when the Wi-Fi speed test hit the green.\n\nIn the coming months, we will keep tweaking the space based on real guest feedback. Expect more plants, cozier lighting, and even more power outlets near every bed.',
      },
      {
        id: 'guest-welcome-guide',
        slug: 'welcome-to-lazy-lads-arrival-guide',
        title: 'Welcome to Pokhara: The Ultimate Lazy Lads Arrival Guide',
        date: '2025-02-12',
        excerpt: 'Everything you need to know about getting here, local ATMs, and making the most of your first 24 hours in Pokhara.',
        content: 
          'Namaste and welcome to the Lazy Lads family! We are stoked to have you stay with us. To make your arrival as smooth as a sunset boat ride on Phewa Lake, we’ve put together this quick guide.\n\n' +
          '1. GETTING HERE\n' +
          '• FROM TOURIST BUS PARK: It’s a 10-minute taxi ride. Expect to pay around 300–400 NPR. Just tell the driver "Lakeside, near [Your Nearest Landmark]" or show them our location on Google Maps.\n' +
          '• FROM THE AIRPORT: A taxi costs roughly 700–900 NPR and takes about 15 minutes.\n\n' +
          '2. MONEY & ATMS\n' +
          'The best ATMs for international cards are Nabil Bank or Standard Chartered in the main Lakeside area. They usually allow the highest withdrawal limits with the most reliable connections. Pro-tip: Always have some cash, as smaller local spots don’t always take cards!\n\n' +
          '3. LAZY LADS ESSENTIALS\n' +
          '• FAMILY DINNER: We host communal dinners most nights at 7:30 PM. It’s the best way to meet everyone. Sign up at reception by 4:00 PM!\n' +
          '• FILTERED WATER: Don’t buy plastic bottles! We have a free filtered water station in the common area.\n' +
          '• QUIET HOURS: We love a good time, but we respect sleep. Quiet hours start at 11:00 PM in the dorm areas.\n\n' +
          '4. FIRST DAY TIPS\n' +
          'Grab a coffee at our bar, ask Arjun for the sunrise forecast, and take a stroll down to the lake boardwalk (only 10 mins away). See you at the hostel!'
      },
      {
        id: 'trek-guide',
        slug: 'three-easy-weekend-treks',
        title: '3 Easy Treks You Can Do in Two Days or Less',
        date: '2025-01-15',
        excerpt:
          'Short on time but still want mountain views? These three beginner-friendly treks fit neatly between long travel days.',
        content:
          'Not everyone arrives with two spare weeks and a backpack full of gear. If you are in town for just a few days, you can still squeeze in a trek that feels like a real adventure.\n\nFrom mellow ridge walks to one-night tea house stays, our team can help you choose a route that fits your fitness level and schedule. Ask at the travel desk for up-to-date trail conditions, gear rental options, and weather checks before you commit.',
      },
      {
        id: 'remote-work',
        slug: 'remote-work-from-a-hostel',
        title: 'How to Work Remotely from a Hostel Without Losing Your Mind',
        date: '2024-12-20',
        excerpt:
          'Digital nomad or just answering a few emails on the road? Here is how to stay productive without missing the fun.',
        content:
          'Working from a hostel can be the best or the worst of both worlds. The key is to set a few soft boundaries with yourself and your surroundings.\n\nAt Lazy Lads, we designed quiet corners, added plenty of outlets, and keep the Wi-Fi strong enough for calls. In this post we share a few simple routines — like choosing a \"deep work\" spot, setting clear work hours, and planning small rewards — so you can log off feeling like you actually saw the city.',
      },
    ],
  },

  /**
   * CONTACT / WHATSAPP
   * Configure direct messaging for quick questions and adventure enquiries.
   *
   * HOW TO SET YOUR WHATSAPP NUMBER:
   * - Use full international format WITHOUT the "+" sign.
   *   Example for Nepal: 97798XXXXXXXX
   * - Do not include spaces or dashes.
   *
   * The website will automatically build links like:
   *   https://wa.me/97798XXXXXXXX?text=...
   */
  contact: {
    /**
     * Your main WhatsApp number in international format, without "+".
     * Example: '9779812345678'
     */
    whatsAppNumber: '9779817034846',
    /** Default message used by the global floating WhatsApp button. */
    whatsAppMessageMain: 'Hi Lazy Lads! I have a question about staying with you.',
    /**
     * Template message for adventure enquiries.
     * The text "[ADVENTURE]" will be replaced with the specific adventure name,
     * for example "Trekking" or "Paragliding".
     */
    whatsAppMessageAdventure: 'Hi! I am interested in the [ADVENTURE] package.',
  },

  /**
   * MAP / LOCATION SECTION
   * embedUrl: Google Maps embed iframe URL (from Share > Embed map).
   * address: Plain text address for display and SEO.
   */
  map: {
    sectionTitle: 'Find Us',
    sectionSubtitle: 'We’re in the heart of Pokhara. Easy to reach by transit.',
    /** Full Google Maps embed URL (iframe src). Replace with your hostel location. */
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.998815018989!2d83.95919079000895!3d28.20734859112087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995950355bde455%3A0x3ff9df1fe0be3aee!2sParadise%20Mount%20Resort%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1770868838319!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    /** Display address — update with your real address */
    address: 'Street No. 6, Pragati Marga, Lakeside, Pokhara 33700, Nepal',
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
    phone: '+977-9817034846',
    /** Optional: copyright line. %year% will be replaced with current year. */
    copyright: '© %year% Lazy Lads Backpackers. All rights reserved.',
    /** Optional: link text for “Book Now” in footer */
    bookNowLabel: 'Book Now',
  },
} as const;

export type SiteContent = typeof siteContent;
