/**
 * LAZY LADS BACKPACKERS HOSTEL — SITE CONTENT (SOURCE OF TRUTH)
 * =============================================================
 * All text, image paths, prices, and URLs for the website live here.
 * Do NOT hardcode content in components. Edit this file only.
 */

export const siteContent = {
  /** Site name shown in header and meta tags */
  siteName: 'Lazy Lads Backpackers Hostel',

  /** Short tagline used in footer or meta description */
  tagline: 'Relaxed but Premium — Your Home Away From Home',

  /**
   * CLOUDBEDS BOOKING ENGINE URL
   */
  CLOUDBEDS_URL: 'https://www.booking.com/hotel/np/lazy-lads-backpackers-hostel.html?aid=2336990&label=en-np-booking-desktop-Hxoa%2A5%2AsEjvRLkSf5HUebQS652804038665%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-46257546822%3Alp9070019%3Ali%3Adec%3Adm&sid=01ff068bbef1532e6204ad8025ae3110&all_sr_blocks=1597129612_430830392_2_1_0&checkin=2026-03-16&checkout=2026-03-17&dest_id=15971296&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1597129612_430830392_2_1_0&hpos=1&matching_block_id=1597129612_430830392_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1597129612_430830392_2_1_0__1350&srepoch=1773630326&srpvid=4cfa12d931a4009d&type=total&ucfs=1&',

  /**
   * GLOBAL SEO / METADATA
   * Used across all pages for Open Graph, Twitter cards, and search engine discovery.
   */
  seo: {
    /** Optimised page title for the homepage */
    title: 'Lazy Lads Backpackers Hostel | Best Hostel in Pokhara',
    /** Meta description (155 chars max for best results in search results) */
    description:
      'Relaxed but premium hostel in Lakeside Pokhara. High-speed Wi-Fi, social vibes, and trekking adventures for digital nomads.',
    /** Your live domain — used to build canonical URLs and OG image paths */
    siteUrl: 'https://lazyladsbackpackers.com',
    /** Target keywords for on-page SEO */
    keywords:
      'hostel pokhara, backpackers nepal, digital nomad pokhara, lazy lads hostel',
    /** Path to a high-quality hero image used as the default social-share image */
    defaultImage: '/images/hostel/phewa-lake.webp',
    /** Twitter / X handle (without @) */
    twitterHandle: 'lazyladspokhara',
  },

  /** Navigation */
  nav: {
    bookNowLabel: 'Book Now',
    roomsLabel: 'Rooms',
    adventuresLabel: 'Adventures',
    galleryLabel: 'Gallery',
    teamLabel: 'Our Team',
    contactLabel: 'Contact',
  },

  /** HERO SECTION */
  hero: {
    headline: 'High-Speed Wi-Fi, Social Vibes, Prime Location',
    subheadline:
      'Kick back at Lazy Lads — where comfort meets community. Perfect for digital nomads and backpackers.',
    image: '/images/hostel/banner.webp',
    imageAlt: 'Relaxed common area at Lazy Lads Backpackers Hostel',
  },

  /** ROOMS SECTION */
  rooms: {
    sectionTitle: 'Choose Your Vibe',
    sectionSubtitle: 'From dorms to private rooms — something for every traveller.',
    list: [
      {
        id: 'mixed-dorm',
        name: 'Mixed Dorms',
        description: 'Social dorms with lockers, AC, and high-speed Wi-Fi. Meet fellow travellers.',
        priceFrom: 6.77,
        currency: 'NPR',
        image: '/images/hostel/mixed-dorm.webp',
        imageAlt: 'Mixed dorm room at Lazy Lads',
        features: ['Locker', 'Wi-Fi'],
      },
      {
        id: 'female-dorm',
        name: 'Female Dorms',
        description: 'Female-only dorms for a comfortable, safe stay. Same great amenities.',
        priceFrom: 7.44,
        currency: 'NPR',
        image: '/images/hostel/female-dorm.webp',
        imageAlt: 'Female dorm at Lazy Lads',
        features: ['Locker', 'Wi-Fi'],
      },
      {
        id: 'private-room',
        name: 'Private Rooms',
        description: 'Your own space with double bed, AC, and Wi-Fi. Privacy when you need it.',
        priceFrom: 17,
        currency: 'NPR',
        image: '/images/hostel/private-room.webp',
        imageAlt: 'Private room at Lazy Lads',
        features: ['Wi-Fi', 'Private Bath'],
      },
    ],
  },

  /** GALLERY SECTION */
  gallery: {
    sectionTitle: 'Around the Hostel',
    sectionSubtitle: 'Spaces where you can work, relax, and connect.',
    images: [
      { id: 'g1', src: '/images/hostel/peacepagoda.webp', alt: 'Peace Pagoda' },
      { id: 'g2', src: '/images/hostel/phewa-lake.webp', alt: 'Phewa Lake in the evening' },
      { id: 'g3', src: '/images/hostel/mixed-dorm.webp', alt: 'Cozy bunk' },
      { id: 'g4', src: '/images/adventure/rafting.webp', alt: 'Rafting' },
      { id: 'g5', src: '/images/hostel/park.webp', alt: 'Basundhara Park' },
      { id: 'g6', src: '/images/hostel/lakeside.webp', alt: 'Outdoor seating' },
    ],
  },

  /**
   * ADVENTURES
   * ──────────
   * category values drive badges + filtering. Valid values:
   *   'Multi-Day' | 'Half-Day' | 'Adrenaline'
   *
   * To add a new adventure, copy one of the objects below,
   * give it a unique `id` and `slug`, fill in the fields, and save.
   * Badges and filtering will work automatically.
   */
  adventures: {
    sectionTitle: 'Adventures Around Lazy Lads',
    sectionSubtitle: 'Turn your stay into a story — from lake walks to sky-high views.',
    items: [
      {
        id: 'trekking',
        slug: 'trekking',
        /** Category drives the badge icon + colour on every card and detail page */
        category: 'Multi-Day' as const,
        title: 'Trekking',
        description:
          'Day hikes and multi-day treks with trusted local guides, from mellow viewpoints to serious peaks.',
        fullDescription:
          'From easy sunrise hikes to multi-day ridge walks, trekking from Lazy Lads can be as mellow or as challenging as you like. We work with trusted local guides, help you rent or buy gear, and make sure you are well-briefed before you hit the trail.',
        image: '/images/adventure/trekingMardi.webp',
        imageAlt: 'Backpackers trekking in the mountains',
      },
      {
        id: 'paragliding',
        slug: 'paragliding',
        category: 'Half-Day' as const,
        title: 'Paragliding',
        description:
          'Soar above the valley with licensed pilots and catch the best views in town.',
        fullDescription:
          'Take off from a nearby hill and glide over lakes, rooftops, and rice fields with licensed, insured tandem pilots. We can arrange morning or afternoon flights, handle transport to the take-off point, and share honest tips about weather and safety.',
        image: '/images/adventure/Paragliding.jpg',
        imageAlt: 'Paragliding above a lake and hills',
      },
      {
        id: 'rafting',
        slug: 'rafting',
        category: 'Adrenaline' as const,
        title: 'Rafting',
        description:
          'White-water or gentle floats — we connect you with safe, reputable operators.',
        fullDescription:
          'Whether you want a relaxed float or proper rapids, we connect you with river operators who prioritise safety and fun. We can help you pick routes that match your comfort level and arrange same-day or next-day departures.',
        image: '/images/adventure/rafting.webp',
        imageAlt: 'Group of people rafting on a river',
      },
      {
        id: 'ziplining',
        slug: 'ziplining',
        category: 'Half-Day' as const,
        title: 'Zip-lining',
        description:
          'Experience one of the world\'s longest and steepest zip lines over a lush valley.',
        fullDescription:
          'Pokhara is home to one of the most thrilling zip lines on the planet. You will soar at speeds of up to 120 km/h across a dramatic valley with Himalayan peaks in the background. The whole experience — including transport and safety briefing — fits comfortably into a half-day. No experience required.',
        image: '/images/adventure/zip-line.webp',
        imageAlt: 'Person zip-lining over a green valley with mountains in the background',
      },
      {
        id: 'caving',
        slug: 'caving',
        category: 'Half-Day' as const,
        title: 'Caving',
        description:
          'Explore the ancient limestone caves of Bat Cave and Mahendra Cave near Pokhara.',
        fullDescription:
          'Pokhara hides an underworld of ancient limestone formations just a short drive from Lakeside. Mahendra Cave is the longest in Nepal, while Bat Cave offers a more adventurous crawl-through experience. Our guides handle torches, safety gear, and transport — you just bring your sense of wonder.',
        image: '/images/adventure/gupteshowrmahadev.webp',
        imageAlt: 'Glowing cave interior with stalactites and rock formations',
      },
      {
        id: 'mardi-himal-trek',
        slug: 'mardi-himal-trek',
        category: 'Multi-Day' as const,
        title: 'Mardi Himal Trek',
        description:
          'A stunning 4–5 day trek to the base of the iconic Machhapuchhre (Fishtail) peak.',
        fullDescription:
          'The Mardi Himal Trek is one of Nepal\'s best-kept secrets — a quiet, dramatic route that takes you through rhododendron forests, high ridges, and finally to a stunning base camp with jaw-dropping views of Machhapuchhre, Annapurna South, and Hiunchuli. We sort permits, guide, teahouse bookings, and a kit list tailored to the season.',
        image: '/images/adventure/mardiTrek.webp',
        imageAlt: 'Dramatic Himalayan mountain ridge at sunrise',
      },
    ],
  },

  /** FEATURED FACILITIES */
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

  /** TEAM */
  team: {
    sectionTitle: 'Meet the Lazy Lads Crew',
    sectionSubtitle: 'A small team of travellers and locals who love hosting travellers like you.',
    members: [
      {
        id: 'azeem',
        name: 'Azeem',
        role: 'Hostel Manager',
        bio: 'Keeps the vibes high and the operations smooth. Your go-to for anything you need on-site.',
        image: '/images/hostel/azeem.jpg',
        imageAlt: 'Hostel manager smiling at the camera',
      },
      {
        id: 'samir',
        name: 'Samir',
        role: 'Front Desk and Guest Services',
        bio: 'Handles check-ins/check-outs, bookings, and provides local travel information.',
        image: '/images/hostel/samir.jpg',
        imageAlt: 'Front Desk manager smiling at the camera',
      },
      {
        id: 'Sahef',
        name: 'Sahef',
        role: 'Community & Events',
        bio: 'Organises family dinners, bar nights, and city walks so you never feel like a stranger.',
        image: '/images/hostel/sahef.jpg',
        imageAlt: 'Team member chatting with guests in a common area',
      },
    ],
  },

  /** PLACES OF INTEREST */
  placesOfInterest: {
    sectionTitle: 'Close to Everything That Matters',
    sectionSubtitle: 'From lakeside sunsets to hilltop stupas — all within easy reach.',
    places: [
      {
        id: 'phewa-lake',
        name: 'Phewa Lake',
        distance: '10–15 minutes walk',
        description: 'Iconic lakeside boardwalk and boat rides.',
        image: '/images/hostel/phewa-lake.webp',
        imageAlt: 'Colorful boats on a calm lake at sunset',
      },
      {
        id: 'world-peace-pagoda',
        name: 'World Peace Pagoda',
        distance: '30–40 mins drive',
        description: 'Hilltop stupa with panoramic mountain views.',
          image: '/images/hostel/peacepagoda.webp',
        imageAlt: 'White hilltop stupa overlooking mountains and valley',
      },
      {
        id: 'lakeside-strip',
        name: 'Lakeside Main Street',
        distance: '10 minutes walk',
        description: 'Shops, cafés, bars, and gear rentals along the main backpacker strip.',
        image: '/images/hostel/foottrack.webp',
        imageAlt: 'Lively street lined with cafés and shops in the evening',
      },
      {
        id: 'bus-park',
        name: 'Tourist Bus Park',
        distance: '10–15 minutes drive',
        description: 'Easy arrivals and departures for Kathmandu and beyond.',
        image: '/images/hostel/touristbuspark.webp',
        imageAlt: 'Tourist buses parked and ready for departure',
      },
    ],
  },

  /** FAQ */
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
   * ──────────
   * `category` values drive badges + filtering on the /blog archive page.
   * Valid values (add new ones freely): 'Hostel Life' | 'Travel Guide' | 'Adventure' | 'Digital Nomad'
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
        category: 'Hostel Life',
        image: '/images/hostel/banner.webp',
        imageAlt: 'Lazy Lads hostel common area during soft opening',
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
        category: 'Travel Guide',
        image: '/images/hostel/phewa-lake.webp',
        imageAlt: 'Phewa Lake at sunset in Pokhara',
        excerpt:
          'Everything you need to know about getting here, local ATMs, and making the most of your first 24 hours in Pokhara.',
        content:
          'Namaste and welcome to the Lazy Lads family! We are stoked to have you stay with us. To make your arrival as smooth as a sunset boat ride on Phewa Lake, we have put together this quick guide.\n\n1. GETTING HERE\n• FROM TOURIST BUS PARK: It is a 10-minute taxi ride. Expect to pay around 300–400 NPR.\n• FROM THE AIRPORT: A taxi costs roughly 700–900 NPR and takes about 15 minutes.\n\n2. MONEY & ATMS\nThe best ATMs for international cards are Nabil Bank or Standard Chartered in the main Lakeside area.\n\n3. LAZY LADS ESSENTIALS\n• FAMILY DINNER: We host communal dinners most nights at 7:30 PM.\n• FILTERED WATER: Free filtered water station in the common area.\n• QUIET HOURS: Quiet hours start at 11:00 PM in the dorm areas.\n\n4. FIRST DAY TIPS\nGrab a coffee at our bar and take a stroll down to the lake boardwalk (only 10 mins away). See you at the hostel!',
      },
      {
        id: 'trek-guide',
        slug: 'three-easy-weekend-treks',
        title: '3 Easy Treks You Can Do in Two Days or Less',
        date: '2025-01-15',
        category: 'Adventure',
        image: '/images/adventure/trekingMardi.webp',
        imageAlt: 'Trekkers on a mountain trail near Pokhara',
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
        category: 'Digital Nomad',
        image: '/images/hostel/lakeside.webp',
        imageAlt: 'Lakeside Pokhara — perfect for digital nomads',
        excerpt:
          'Digital nomad or just answering a few emails on the road? Here is how to stay productive without missing the fun.',
        content:
          'Working from a hostel can be the best or the worst of both worlds. The key is to set a few soft boundaries with yourself and your surroundings.\n\nAt Lazy Lads, we designed quiet corners, added plenty of outlets, and keep the Wi-Fi strong enough for calls. In this post we share a few simple routines — like choosing a "deep work" spot, setting clear work hours, and planning small rewards — so you can log off feeling like you actually saw the city.',
      },
    ],
  },

  /** CONTACT / WHATSAPP */
  contact: {
    whatsAppNumber: '9779856057003',
    whatsAppMessageMain: 'Hi Lazy Lads! I have a question about staying with you.',
    whatsAppMessageAdventure: 'Hi! I am interested in the [ADVENTURE] package.',
  },

  /** MAP / LOCATION SECTION */
  map: {
    sectionTitle: 'Find Us',
    sectionSubtitle: 'We are in the heart of Pokhara. Easy to reach by transit.',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d522.6551317853714!2d83.96337361009957!3d28.207599964913065!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595003e1649b5%3A0xbb61b8aed70ab2a6!2sLazy%20Lads%20Backpackers%20Hostel!5e0!3m2!1sen!2snp!4v1771840303495!5m2!1sen!2snp',
    address: 'Street No. 6, Pragati Marga, Lakeside, Pokhara 33700, Nepal',
    googleMapsLink: 'https://maps.app.goo.gl/sbcjG1Sgghh8zV2V7',
  },

  /** FOOTER */
  footer: {
    tagline: 'Relaxed but Premium.',
    email: 'info@lazyladsbackpackers.com',
    phone: '+977-9856057003',
    copyright: '© %year% Lazy Lads Backpackers. All rights reserved.',
    bookNowLabel: 'Book Now',
  },
} as const;

export type SiteContent = typeof siteContent;

/** Helper type: all valid adventure category strings */
export type AdventureCategory = SiteContent['adventures']['items'][number]['category'];

/** Helper type: all valid blog category strings */
export type BlogCategory = SiteContent['blog']['posts'][number]['category'];
