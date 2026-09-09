import { Product, ProductCategory, Promotion } from '../types';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo_spring_2026',
    name: 'Spring 2026 Merch Refresh',
    creative_name: 'spring_merch_refresh_20pct',
    creative_slot: 'homepage_featured_banner',
    title: 'Spring Campus & Creator Refresh',
    subtitle: 'Save 20% on our newest sustainable apparel & tech gear with code GOOGLE20.',
    discountCode: 'GOOGLE20',
    discountRate: 0.2,
    bannerImage: '/hero-banner.jpg',
    categoryTarget: 'clothing',
    tagline: 'Limited time offer • Official Google Store'
  },
  {
    id: 'promo_drinkware_bundle',
    name: 'Pixel Insulated Drinkware Free Ship',
    creative_name: 'drinkware_freeship_banner',
    creative_slot: 'category_drinkware_header',
    title: 'Hydrate Smarter with Pixel Matte Tumblers',
    subtitle: 'Double-walled vacuum insulation keeping drinks icy for 24h. Free shipping on all drinkware orders.',
    discountCode: 'FREESHIP',
    discountRate: 0,
    bannerImage: '/hydrate-smarter-banner.jpg',
    productImage: '/products/pixel-bottle.jpg',
    categoryTarget: 'drinkware',
    tagline: 'Eco-certified stainless steel'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'g-hoodie-01',
    slug: 'google-hoodie',
    name: 'Google Hoodie',
    tagline: 'Iconic Google logo pullover crafted with ultra-soft organic cotton fleece',
    price: 85.00,
    originalPrice: 95.00,
    category: 'clothing',
    categoryLabel: 'Apparel',
    subcategory: 'Hoodies & Sweatshirts',
    badge: 'Trending',
    isBestseller: true,
    isNew: true,
    ecoFriendly: true,
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 124,
    images: [
      '/products/grey-hoodie.jpg',
      '/products/white-hoodie.jpg',
      '/wear-what-you-google.jpg'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#d1d5db' },
      { name: 'Black', hex: '#111827' },
      { name: 'Google Blue', hex: '#2563eb' },
      { name: 'Google Red', hex: '#dc2626' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A Google campus classic refreshed for all-day comfort. Crafted with 100% GOTS-certified heavyweight organic cotton fleece, featuring a double-lined hood, durable drawstrings, and the vibrant Google logo across the chest.',
    features: [
      '100% certified organic ring-spun combed cotton (380 GSM)',
      'Custom brushed interior for cloud-like softness',
      'Vibrant multi-color Google chest print',
      'Heavy-gauge ribbed cuffs and hem with spandex memory',
      'Spacious front kangaroo pocket'
    ],
    materials: '80% Organic Cotton, 20% Recycled Poly Fleece',
    care: 'Machine wash cold with like colors, tumble dry low.',
    reviews: [
      {
        id: 'rev-101',
        author: 'Sarah M.',
        date: '2 days ago',
        rating: 5,
        title: 'Super comfortable and looks amazing',
        comment: 'Great quality, super comfortable and looks amazing! Sizing is true to standard unisex fit.',
        verified: true
      },
      {
        id: 'rev-102',
        author: 'James T.',
        date: '1 week ago',
        rating: 5,
        title: 'Perfect for everyday use',
        comment: 'Perfect for everyday use. I get compliments all the time!',
        verified: true
      }
    ]
  },
  {
    id: 'g-tee-02',
    slug: 'google-t-shirt',
    name: 'Google T-Shirt',
    tagline: 'Simple & iconic everyday crewneck in premium combed cotton',
    price: 28.00,
    category: 'clothing',
    categoryLabel: 'Apparel',
    subcategory: 'T-Shirts',
    badge: 'Popular',
    isBestseller: true,
    isNew: true,
    ecoFriendly: true,
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 180,
    images: [
      '/products/google-tee.jpg',
      '/products/superg-tee.jpg'
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Black', hex: '#111827' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The foundation of the Google Merch wardrobe. Lightweight, breathable, and pre-shrunk for a consistent tailored fit wash after wash. Screen-printed with solvent-free water-based inks featuring the clean Google logo.',
    features: [
      '100% combed ring-spun organic cotton (180 GSM)',
      'Side-seamed construction for shape retention',
      'Tagless printed neck label for itch-free comfort',
      'Eco-friendly water-based discharge printing'
    ],
    materials: '100% GOTS Organic Cotton',
    care: 'Machine wash cold inside out, hang dry recommended.',
    reviews: [
      {
        id: 'rev-201',
        author: 'Daniel K.',
        date: '5 days ago',
        rating: 5,
        title: 'Best basic tee ever',
        comment: 'Fabric feels breathable and holds up well after multiple washes. The subtle logo is very sleek.',
        verified: true
      }
    ]
  },
  {
    id: 'g-cap-03',
    slug: 'google-cap',
    name: 'Google Cap',
    tagline: 'Keep it classic structured 6-panel cap with Google G emblem',
    price: 28.00,
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Hats & Caps',
    badge: 'Fan Favorite',
    isBestseller: true,
    isNew: true,
    inStock: true,
    stockCount: 36,
    rating: 4.6,
    reviewCount: 87,
    images: [
      '/products/black-cap.jpg',
      '/products/white-cap.jpg'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827' },
      { name: 'Light Grey', hex: '#d1d5db' },
      { name: 'Google Blue', hex: '#2563eb' },
      { name: 'Google Red', hex: '#dc2626' }
    ],
    sizes: ['One Size Fits All'],
    description: 'Engineered for creators on the move. Features a sweat-wicking internal headband, structured front crown, and the vibrant embroidered Google G emblem.',
    features: [
      'Laser-cut breathable eyelets for airflow',
      'UPF 50+ sun protection fabric with DWR finish',
      'Embroidered four-color Google G icon',
      'Adjustable back clasp closure'
    ],
    materials: '100% Recycled Cotton Twill',
    care: 'Spot clean with damp cloth and mild detergent.',
    reviews: [
      {
        id: 'rev-301',
        author: 'Samira T.',
        date: '2 weeks ago',
        rating: 5,
        title: 'The fit is super clean and comfortable',
        comment: 'Super lightweight and keeps its shape. Love the understated Google branding.',
        verified: true
      }
    ]
  },
  {
    id: 'g-tumbler-04',
    slug: 'google-bottle',
    name: 'Google Bottle',
    tagline: 'Stay refreshed with double-wall insulated stainless steel and silver loop cap',
    price: 32.00,
    category: 'drinkware',
    categoryLabel: 'Drinkware',
    subcategory: 'Bottles & Tumblers',
    badge: 'Bestseller',
    isBestseller: true,
    isNew: true,
    ecoFriendly: true,
    inStock: true,
    stockCount: 52,
    rating: 4.9,
    reviewCount: 156,
    images: [
      '/products/pixel-bottle.jpg',
      '/hydrate-smarter-banner.jpg'
    ],
    colors: [
      { name: 'Porcelain White', hex: '#ffffff' },
      { name: 'Obsidian Black', hex: '#111827' },
      { name: 'Google Blue', hex: '#2563eb' },
      { name: 'Google Green', hex: '#16a34a' }
    ],
    sizes: ['24 oz (710 ml)'],
    description: 'Stay refreshed with vacuum insulated stainless steel. Keeps drinks ice cold for 24 hours or piping hot for up to 12 hours. Ergonomically shaped to fit standard vehicle cup holders and backpack bottle pockets with brushed silver loop cap.',
    features: [
      'Pro-grade 18/8 kitchen stainless steel',
      'Copper-core vacuum insulation eliminates condensation',
      'Leakproof stainless steel screw-top cap with loop handle',
      'BPA-free, lead-free and non-toxic inner lining'
    ],
    materials: '18/8 Stainless Steel, Food-grade Silicone',
    care: 'Hand wash recommended with bottle brush.',
    reviews: [
      {
        id: 'rev-401',
        author: 'Emily R.',
        date: '4 days ago',
        rating: 5,
        title: 'Love the eco-friendly options',
        comment: 'Love the eco-friendly options. Good quality and great style! Keeps water freezing cold.',
        verified: true
      }
    ]
  },
  {
    id: 'g-socks-05',
    slug: 'google-chrome-dino-socks',
    name: 'Google Chrome Dino Socks',
    tagline: 'Cushioned combed cotton crew socks featuring the offline Dino and tricolor stripe',
    price: 14.00,
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Socks',
    badge: 'Limited Stock',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 14,
    rating: 4.7,
    reviewCount: 1200,
    images: [
      '/products/dino-socks.jpg',
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Heather Grey', hex: '#94a3b8' },
      { name: 'Obsidian Black', hex: '#0f172a' }
    ],
    sizes: ['S/M (US 6-9)', 'L/XL (US 9-13)'],
    description: 'Celebrate Google heritage and the world’s most played offline arcade game. Woven with reinforced heel and toe arches, ribbed athletic cuff with vibrant rainbow stripes, and official Google G emblem.',
    features: [
      'Reinforced cushioned footbed for all-day campus walking',
      'Dynamic arch compression band prevents slipping',
      'Seamless toe closure prevents chafing',
      'Retro athletic ribbed cuff with Google tricolor stripes'
    ],
    materials: '80% Combed Cotton, 17% Polyester, 3% Spandex',
    care: 'Machine wash warm, tumble dry medium.',
    reviews: [
      {
        id: 'rev-501',
        author: 'Alex W.',
        date: '1 week ago',
        rating: 5,
        title: 'Super comfy and fun',
        comment: 'Everyone at the office asks where I got these! The rainbow stripes are super crisp.',
        verified: true
      }
    ]
  },
  {
    id: 'g-backpack-06',
    slug: 'google-backpack',
    name: 'Google Backpack',
    tagline: 'Carry your world with weatherproof recycled tech pack and dedicated laptop sleeve',
    price: 75.00,
    originalPrice: 85.00,
    category: 'bags',
    categoryLabel: 'Bags',
    subcategory: 'Bags & Backpacks',
    badge: 'Popular',
    isBestseller: true,
    isNew: true,
    ecoFriendly: true,
    inStock: true,
    stockCount: 24,
    rating: 4.7,
    reviewCount: 98,
    images: [
      '/products/black-backpack.jpg',
      '/products/everyday-backpack.jpg'
    ],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Grey', hex: '#64748b' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    sizes: ['24 Liters'],
    description: 'Carry your world. The standard issue backpack seen across Google campus. Features waterproof coated zippers, an elevated suspended laptop sleeve protecting up to 16” devices, hidden passport pocket, and luggage trolley pass-through.',
    features: [
      'Constructed from 32 recycled plastic bottles (Cordura Eco Fabric)',
      'Water-repellent PU coating rated IPX4 for rain protection',
      'Ergonomic EVA molded back panel with airflow channels',
      'Quick-access magnetic key leash and tech cable organizers'
    ],
    materials: '100% Recycled 600D Polyester with TPU coating',
    care: 'Wipe clean with warm water and microfiber cloth.',
    reviews: [
      {
        id: 'rev-601',
        author: 'David L.',
        date: '3 days ago',
        rating: 5,
        title: 'Spacious and well designed',
        comment: 'The backpack is spacious and well designed. Highly recommend!',
        verified: true
      }
    ]
  },
  {
    id: 'g-jacket-07',
    slug: 'google-cloud-engineer-softshell-jacket',
    name: 'Google Cloud Engineer Softshell Jacket',
    tagline: 'Windproof technical membrane with fleece backing',
    price: 88.00,
    category: 'clothing',
    categoryLabel: 'Clothing',
    subcategory: 'Jackets & Outerwear',
    badge: 'New Arrival',
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Anthracite Grey', hex: '#2d3748' },
      { name: 'Google Cloud Blue', hex: '#4285f4' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Designed for brisk campus walks and cool server room environments. 3-layer bonded softshell blocks 100% of chilly winds while retaining breathability. Tonal Google Cloud architectural hex icon on the upper left arm.',
    features: [
      '3-layer laminate with 10k waterproof / 10k breathability rating',
      'Micro-fleece thermal lining for warmth without weight',
      'Waterproof zippered chest pocket with audio port pass-through',
      'Adjustable cinch hem and hook-and-loop cuffs'
    ],
    materials: '94% Recycled Polyester, 6% Spandex',
    care: 'Machine wash cold on gentle cycle, tumble dry low.',
    reviews: [
      {
        id: 'rev-701',
        author: 'Alexandre G.',
        date: '3 weeks ago',
        rating: 5,
        title: 'Exceptional build quality',
        comment: 'Zippers are super smooth, pockets are well placed, and the cloud blue accent pops subtly.',
        verified: true
      }
    ]
  },
  {
    id: 'g-mug-08',
    slug: 'youtube-creator-studio-enamel-mug',
    name: 'YouTube Creator Studio Enamel Mug',
    tagline: 'Campfire style steel mug with rolled rim and glossy enamel coating',
    price: 18.00,
    category: 'drinkware',
    categoryLabel: 'Drinkware',
    subcategory: 'Mugs',
    badge: 'Popular',
    isBestseller: false,
    isNew: false,
    inStock: true,
    stockCount: 40,
    rating: 4.7,
    reviewCount: 63,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Studio Red / White', hex: '#ff0000' },
      { name: 'Matte Onyx Black', hex: '#111827' }
    ],
    sizes: ['14 oz (410 ml)'],
    description: 'For morning brainstorming and late-night video renders. Hand-dipped steel core with a speckle finish, bearing the distinctive YouTube Play button symbol. Durable enough for the desk, campsite, or studio.',
    features: [
      'Handcrafted heavy gauge carbon steel with enamel glaze',
      'Smooth double-coated rolled lip for comfortable drinking',
      'Induction and open flame stove safe',
      'Lead-free, non-porous and rust resistant'
    ],
    materials: 'Enamel Coated Steel',
    care: 'Hand wash recommended to preserve gloss.',
    reviews: [
      {
        id: 'rev-801',
        author: 'Mia C.',
        date: '6 days ago',
        rating: 5,
        title: 'Perfect size for pour-over coffee',
        comment: 'Looks great sitting next to my monitor. Very sturdy and has a wonderful retro feel.',
        verified: true
      }
    ]
  },
  {
    id: 'g-pouch-09',
    slug: 'google-hardware-recycled-tech-pouch',
    name: 'Google Hardware Recycled Tech Pouch',
    tagline: 'Origami style accessory organizer for cables, adapters & stylus',
    price: 24.00,
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Tech Organizers',
    badge: 'Essential',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stone Grey', hex: '#718096' },
      { name: 'Charcoal Black', hex: '#1a202c' }
    ],
    sizes: ['One Size (2L)'],
    description: 'Keep your charging bricks, dongles, USB-C cables, and ear buds neatly compartmentalized. Features an origami-style folding layout that opens wide and sits upright on your desk without tipping over.',
    features: [
      'Self-standing accordion structure for instant visibility',
      'Elastic loops for pens, cables, and flash drives',
      'Padded magnetic center compartment for SSD or powerbank',
      'Weather-resistant coated canvas exterior'
    ],
    materials: '100% Recycled PET canvas',
    care: 'Spot clean with mild soap.',
    reviews: [
      {
        id: 'rev-901',
        author: 'Kenji M.',
        date: '2 weeks ago',
        rating: 5,
        title: 'Eliminated cable clutter from my backpack',
        comment: 'Opens wide like a desk tray. Fits my 140W MacBook charger, two cables, SSD, and Pixel Buds easily.',
        verified: true
      }
    ]
  },
  {
    id: 'g-notebook-10',
    slug: 'google-colors-eco-notebook-and-pen',
    name: 'Google Colors Eco Hardcover Notebook & Gel Pen',
    tagline: 'FSC-certified dotted journal with iconic Google colored page edges',
    price: 18.00,
    category: 'tech-stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Notebooks',
    badge: 'Eco Friendly',
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 80,
    rating: 4.9,
    reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Sand / Multi', hex: '#e2e8f0' },
      { name: 'Obsidian / Multi', hex: '#1a202c' }
    ],
    sizes: ['A5 (192 Pages)'],
    description: 'Capture project blueprints, sketches, and meeting notes in style. Features 120gsm bleed-proof bamboo paper with a 5mm dot grid matrix. The gilded page edges feature the vibrant primary colors of Google (Blue, Red, Yellow, Green).',
    features: [
      '192 numbered acid-free pages (120 gsm fountain-pen friendly)',
      'Dual color-coded ribbon bookmarks and expandable inner back pocket',
      'Lay-flat 180° Smyth-sewn binding',
      'Includes refillable matte aluminum 0.5mm gel ink pen'
    ],
    materials: 'FSC Bamboo Paper, Recycled Linen Cover',
    care: 'Store in dry place away from direct moisture.',
    reviews: [
      {
        id: 'rev-1001',
        author: 'Rachel W.',
        date: '4 days ago',
        rating: 5,
        title: 'Paper quality is phenomenal',
        comment: 'Zero ghosting with gel pens. The Google rainbow foil edges look gorgeous on my desk.',
        verified: true
      }
    ]
  },
  {
    id: 'g-plush-11',
    slug: 'android-bot-mascot-plushie',
    name: 'Android Bot Official Mascot Plushie',
    tagline: 'Super soft 10-inch collectible Bugdroid with posable antenna',
    price: 22.00,
    category: 'tech-stationery',
    categoryLabel: 'Collectibles',
    subcategory: 'Plush & Toys',
    badge: 'Popular',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 35,
    rating: 5.0,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Android Green', hex: '#3ddc84' },
      { name: 'Nightshade Dark', hex: '#1e293b' }
    ],
    sizes: ['10 inch (25 cm)'],
    description: 'Bring the beloved open-source mascot to your workspace. Lovingly crafted with velvety plush micro-velour, embroidered white eyes, and weighted microbead base so Bugdroid sits securely on your monitor stand or shelf.',
    features: [
      'Hypoallergenic cloud-touch stuffing',
      'Weighted bean base keeps plush upright',
      'Embroidered detailing safe for all ages',
      'Official Android 3D logo woven tag'
    ],
    materials: '100% Recycled Polyester Fill & Velour',
    care: 'Surface wash with mild damp cloth.',
    reviews: [
      {
        id: 'rev-1101',
        author: 'Liam P.',
        date: '3 days ago',
        rating: 5,
        title: 'Adorable and sits firmly on my desk',
        comment: 'Must-have for any Android developer. The shade of green is vibrant and perfectly matched.',
        verified: true
      }
    ]
  },
  {
    id: 'g-bottle-12',
    slug: 'google-active-pure-glass-water-bottle',
    name: 'Google Active Pure Glass Water Bottle 24oz',
    tagline: 'Borosilicate glass bottle with protective silicone grip sleeve',
    price: 28.00,
    originalPrice: 34.00,
    category: 'drinkware',
    categoryLabel: 'Drinkware',
    subcategory: 'Bottles & Tumblers',
    badge: 'Eco Friendly',
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Frosted Glass / Slate', hex: '#94a3b8' },
      { name: 'Frosted Glass / Mint', hex: '#6ee7b7' }
    ],
    sizes: ['24 oz (710 ml)'],
    description: 'Taste pure water with zero aftertaste. Engineered from thermal shock-resistant lab-grade borosilicate glass wrapped in a non-slip silicone bumper sleeve with an integrated bamboo carry loop.',
    features: [
      'Pure borosilicate glass withstands boiling water to iced cubes',
      'Impact-absorbing silicone sleeve with measurement markings',
      'Leakproof bamboo cap with 304 food-grade stainless steel interior',
      'Wide mouth fits ice cubes easily and simplifies cleaning'
    ],
    materials: 'Borosilicate Glass, Medical-Grade Silicone, Bamboo',
    care: 'Dishwasher safe (sleeve on). Hand wash cap.',
    reviews: [
      {
        id: 'rev-1201',
        author: 'Sophie H.',
        date: '1 week ago',
        rating: 5,
        title: 'Crisp, clean taste every sip',
        comment: 'Looks minimal and the bamboo cap gives it a very upscale organic feel. Fits in car cup holders!',
        verified: true
      }
    ]
  },
  {
    id: 'g-tote-13',
    slug: 'google-campus-canvas-tote-bag',
    name: 'Google Campus Heavyweight Canvas Tote Bag',
    tagline: '16oz recycled cotton canvas tote with interior zippered pocket',
    price: 24.00,
    category: 'bags',
    categoryLabel: 'Bags',
    subcategory: 'Bags & Totes',
    badge: 'New',
    isNew: true,
    isBestseller: true,
    inStock: true,
    stockCount: 38,
    rating: 4.9,
    reviewCount: 47,
    images: [
      '/categories/bags.jpg',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#1e293b' },
      { name: 'Natural Canvas', hex: '#f1f5f9' }
    ],
    description: 'A versatile Google campus staple. Built from durable 16oz recycled cotton canvas, featuring reinforced handles, a flat boxed bottom for stability, an interior zippered phone/wallet pocket, and the iconic colorful Google logo screenprint.',
    features: [
      '16oz heavyweight 100% GOTS-certified recycled organic cotton canvas',
      'Reinforced dual carry straps with an ergonomic 11-inch drop',
      'Interior zippered slip pocket for security and quick organization',
      'Flat boxed bottom stands upright for easy loading'
    ],
    materials: '100% Recycled Cotton Canvas',
    care: 'Spot clean with mild soap and cold water. Line dry in shade.',
    reviews: [
      {
        id: 'rev-1301',
        author: 'Kelsey M.',
        date: '2 days ago',
        rating: 5,
        title: 'Roomy, durable and super stylish',
        comment: 'The canvas is thick and holds its shape nicely. Perfect for campus days, gym gear, or quick grocery trips!',
        verified: true
      }
    ]
  },
  {
    id: 'g-crewneck-04',
    slug: 'google-crewneck-sweatshirt',
    name: 'Google Crewneck Sweatshirt',
    tagline: 'Heavyweight fleece crewneck with vibrant official Google rainbow logo',
    price: 65.00,
    category: 'clothing',
    categoryLabel: 'Apparel',
    subcategory: 'Hoodies & Sweatshirts',
    badge: 'Bestseller',
    isBestseller: true,
    isNew: false,
    ecoFriendly: true,
    inStock: true,
    stockCount: 42,
    rating: 4.7,
    reviewCount: 96,
    images: [
      '/products/crewneck-sweatshirt.jpg'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#111827' },
      { name: 'Heather Grey', hex: '#9ca3af' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The timeless campus pullover. Built with ultra-plush 360 GSM combed cotton fleece, featuring ribbed cuffs, hem, and the iconic Google multi-color logo proudly across the chest.',
    features: [
      '360 GSM premium organic cotton fleece',
      'Ribbed collar, cuffs, and hem with spandex shape memory',
      'Color-matched interior neck taping for itch-free comfort',
      'Vibrant screen-printed Google rainbow lettering'
    ],
    materials: '85% Organic Cotton, 15% Recycled Polyester',
    care: 'Machine wash cold with like colors. Tumble dry low.',
    reviews: [
      {
        id: 'rev-crew-01',
        author: 'Marcus B.',
        date: '3 days ago',
        rating: 5,
        title: 'Perfect weight and fit',
        comment: 'Extremely well-made sweatshirt. The fleece lining is super soft and the colors are vibrant.',
        verified: true
      }
    ]
  },
  {
    id: 'g-longsleeve-05',
    slug: 'google-long-sleeve-tee',
    name: 'Google Long Sleeve Tee',
    tagline: 'Crisp organic cotton long sleeve tee with sleeve graphic and chest emblem',
    price: 32.00,
    category: 'clothing',
    categoryLabel: 'Apparel',
    subcategory: 'T-Shirts',
    badge: 'New Arrival',
    isBestseller: false,
    isNew: true,
    ecoFriendly: true,
    inStock: true,
    stockCount: 35,
    rating: 4.6,
    reviewCount: 73,
    images: [
      '/products/longsleeve-tee.jpg'
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Charcoal Black', hex: '#111827' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A modern layering staple featuring the clean Google chest emblem and colorful Google lettering along the sleeve. Pre-shrunk 100% organic combed ring-spun cotton for an effortlessly soft feel.',
    features: [
      '100% GOTS-certified ring-spun organic cotton',
      'Screen-printed typographic sleeve detail',
      'Ribbed cuffs for a secure tailored fit',
      'Side-seamed athletic silhouette'
    ],
    materials: '100% Organic Cotton',
    care: 'Machine wash cold inside out, hang dry recommended.',
    reviews: [
      {
        id: 'rev-ls-01',
        author: 'Claire D.',
        date: '5 days ago',
        rating: 5,
        title: 'Love the sleeve detail',
        comment: 'The sleeve graphic is such a nice subtle touch. Great breathable cotton for everyday wear.',
        verified: true
      }
    ]
  },
  {
    id: 'g-ziphoodie-06',
    slug: 'google-zip-hoodie',
    name: 'Google Zip Hoodie',
    tagline: 'Premium full-zip fleece hoodie with metal zipper and embroidered chest logo',
    price: 95.00,
    originalPrice: 120.00,
    category: 'clothing',
    categoryLabel: 'Apparel',
    subcategory: 'Hoodies & Sweatshirts',
    badge: 'Sale',
    isBestseller: true,
    isNew: false,
    ecoFriendly: true,
    inStock: true,
    stockCount: 22,
    rating: 4.5,
    reviewCount: 62,
    images: [
      '/products/zip-hoodie.jpg'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Heather Grey', hex: '#9ca3af' },
      { name: 'Google Blue', hex: '#2563eb' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Versatile, warm, and built to last. Premium full-zip fleece hoodie engineered with heavy-duty YKK zipper, double-layered drawstring hood, and dual front split pouch pockets.',
    features: [
      'Heavyweight 400 GSM brushed interior fleece',
      'Antique nickel YKK full-length zipper',
      'Embroidered multicolor Google logo on left chest',
      'Reinforced dual front pouch pockets'
    ],
    materials: '80% Organic Cotton, 20% Recycled Polyester Fleece',
    care: 'Machine wash cold with like colors, gentle cycle.',
    reviews: [
      {
        id: 'rev-zip-01',
        author: 'Jonathan K.',
        date: '1 week ago',
        rating: 5,
        title: 'Top notch quality hoodie',
        comment: 'Worth every penny! Heavyweight fabric and the zipper is very smooth.',
        verified: true
      }
    ]
  }
];

export interface CategoryItem {
  id: ProductCategory;
  name: string;
  label: string;
  dotColor: string;
  dotBgClass: string;
  description: string;
  count: number;
  image: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'clothing',
    name: 'APPAREL',
    label: 'Apparel',
    dotColor: '#1a73e8', // Google Blue
    dotBgClass: 'bg-blue-600',
    description: 'Certified organic tees, hoodies, softshell jackets & socks.',
    count: 4,
    image: '/categories/apparel.jpg'
  },
  {
    id: 'drinkware',
    name: 'DRINKWARE',
    label: 'Drinkware',
    dotColor: '#ea4335', // Google Red
    dotBgClass: 'bg-red-500',
    description: 'Double-wall vacuum tumblers, pure glass bottles, and enamel mugs.',
    count: 3,
    image: '/categories/drinkware.jpg'
  },
  {
    id: 'bags',
    name: 'BAGS',
    label: 'Bags',
    dotColor: '#f9ab00', // Google Yellow
    dotBgClass: 'bg-amber-400',
    description: 'Weatherproof commuter backpacks, canvas totes, and tech organizers.',
    count: 3,
    image: '/categories/bags.jpg'
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    label: 'Accessories',
    dotColor: '#34a853', // Google Green
    dotBgClass: 'bg-emerald-600',
    description: 'Structured performance caps, collectible enamel pins, and lanyards.',
    count: 4,
    image: '/categories/accessories.jpg'
  }
];
