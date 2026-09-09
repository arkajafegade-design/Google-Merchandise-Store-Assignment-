import { Product, Promotion } from '../types';

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
    bannerImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=80',
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
    bannerImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=80',
    categoryTarget: 'drinkware',
    tagline: 'Eco-certified stainless steel'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'g-hoodie-01',
    slug: 'google-heritage-tricolor-hoodie',
    name: 'Google Heritage Tricolor Zip Hoodie',
    tagline: 'Ultra-soft organic cotton fleece with embroidered Google crest',
    price: 64.00,
    originalPrice: 75.00,
    category: 'clothing',
    categoryLabel: 'Clothing',
    subcategory: 'Hoodies & Sweatshirts',
    badge: 'Bestseller',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Navy Blue', hex: '#1a365d' },
      { name: 'Heather Grey', hex: '#718096' },
      { name: 'Forest Green', hex: '#276749' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    description: 'A Google campus classic refreshed for all-day comfort. Crafted with 100% GOTS-certified heavyweight organic cotton fleece, featuring a double-lined hood, durable YKK metal zipper, and subtle tonal embroidery of the iconic Google Super G logo on the chest.',
    features: [
      '100% certified organic ring-spun combed cotton (380 GSM)',
      'Custom brushed interior for cloud-like softness',
      'Embroidered heritage chest emblem and sleeve badge',
      'Heavy-gauge ribbed cuffs and hem with spandex memory',
      'Reinforced kangaroo pocket with internal phone pouch'
    ],
    materials: '80% Organic Cotton, 20% Recycled Poly Fleece',
    care: 'Machine wash cold with like colors, tumble dry low. Do not iron embroidery.',
    reviews: [
      {
        id: 'rev-101',
        author: 'Marcus L.',
        date: '3 days ago',
        rating: 5,
        title: 'Insanely comfortable, perfect campus fit',
        comment: 'The fleece inside is the softest hoodie I own. Sizing is true to standard unisex fit. Navy color looks very sharp.',
        verified: true
      },
      {
        id: 'rev-102',
        author: 'Elena S.',
        date: '1 week ago',
        rating: 5,
        title: 'High quality zipper and embroidery',
        comment: 'Surpassed expectations. It has substantial weight without feeling bulky. Love the discreet Google logo.',
        verified: true
      }
    ]
  },
  {
    id: 'g-tee-02',
    slug: 'google-minimalist-super-g-tee',
    name: 'Google Minimalist "Super G" Organic Tee',
    tagline: 'Tailored everyday crewneck in premium combed cotton',
    price: 28.00,
    category: 'clothing',
    categoryLabel: 'Clothing',
    subcategory: 'T-Shirts',
    badge: 'Popular',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crisp White', hex: '#f7fafc' },
      { name: 'Charcoal Black', hex: '#1a202c' },
      { name: 'Mountain View Sage', hex: '#4a7c59' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    description: 'The foundation of the Google Merch wardrobe. Lightweight, breathable, and pre-shrunk for a consistent tailored fit wash after wash. Screen-printed with solvent-free water-based inks featuring the clean Google G monogram.',
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
        comment: 'Fabric feels breathable and holds up well after multiple washes. The subtle G logo is very sleek.',
        verified: true
      }
    ]
  },
  {
    id: 'g-cap-03',
    slug: 'gemini-ai-quantum-performance-cap',
    name: 'Gemini AI Quantum Performance Cap',
    tagline: 'Water-repellent structured 6-panel cap with magnetic buckle',
    price: 26.00,
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Hats & Caps',
    badge: 'New Arrival',
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockCount: 30,
    rating: 4.7,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#171923' },
      { name: 'Dune Sand', hex: '#d69e2e' }
    ],
    sizes: ['One Size Fits All'],
    description: 'Engineered for coders and creators on the move. Features a sweat-wicking internal headband, laser-perforated side ventilation panels, and the iridescent reflective Gemini sparkle icon on the crown.',
    features: [
      'Laser-cut breathable eyelets for airflow',
      'UPF 50+ sun protection fabric with DWR finish',
      'Quick-release magnetic FIDLOCK clasp closure',
      'Reflective Gemini emblem visible in low light'
    ],
    materials: '100% Recycled Ripstop Nylon',
    care: 'Spot clean with damp cloth and mild detergent.',
    reviews: [
      {
        id: 'rev-301',
        author: 'Samira T.',
        date: '2 weeks ago',
        rating: 5,
        title: 'The magnetic strap is a game changer',
        comment: 'Super lightweight and keeps its shape. Love the understated Gemini branding.',
        verified: true
      }
    ]
  },
  {
    id: 'g-tumbler-04',
    slug: 'google-pixel-insulated-matte-tumbler',
    name: 'Google Pixel Insulated Matte Tumbler 20oz',
    tagline: 'Double-wall stainless steel with leakproof splash lid',
    price: 32.00,
    category: 'drinkware',
    categoryLabel: 'Drinkware',
    subcategory: 'Bottles & Tumblers',
    badge: 'Bestseller',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 52,
    rating: 4.9,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570824104453-508955ab713e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#212121' },
      { name: 'Porcelain White', hex: '#f5f5f5' },
      { name: 'Hazel Grey', hex: '#8d99ae' },
      { name: 'Mint Green', hex: '#a8dadc' }
    ],
    sizes: ['20 oz (590 ml)'],
    description: 'Designed to mirror the soft-touch tactile finish of Google Pixel devices. Keeps drinks cold for 24 hours or piping hot for up to 12 hours. Ergonomically shaped to fit standard vehicle cup holders and bike cages.',
    features: [
      'Pro-grade 18/8 kitchen stainless steel',
      'Copper-core vacuum insulation eliminates condensation',
      'Tritan shatterproof slider lid compatible with reusable straws',
      'BPA-free, lead-free and non-toxic ceramic inner lining'
    ],
    materials: '18/8 Stainless Steel, Food-grade Silicone',
    care: 'Top-rack dishwasher safe. Do not microwave.',
    reviews: [
      {
        id: 'rev-401',
        author: 'Chloe R.',
        date: '4 days ago',
        rating: 5,
        title: 'Keeps ice frozen for over a full day',
        comment: 'Matches my Pixel 9 Pro Obsidian perfectly. The ceramic coating means coffee never tastes metallic!',
        verified: true
      }
    ]
  },
  {
    id: 'g-socks-05',
    slug: 'chrome-dinosaur-no-internet-socks',
    name: 'Chrome Dinosaur "No Internet" Crew Socks',
    tagline: 'Cushioned combed cotton crew socks featuring the offline Dino',
    price: 16.00,
    category: 'clothing',
    categoryLabel: 'Clothing',
    subcategory: 'Socks',
    badge: 'Fan Favorite',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 65,
    rating: 4.9,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heather Grey / Teal', hex: '#4a5568' },
      { name: 'Pixel Charcoal', hex: '#2d3748' }
    ],
    sizes: ['S/M (US 6-9)', 'L/XL (US 9-13)'],
    description: 'Celebrate the world’s most played offline arcade game. Woven with reinforced heel and toe arches, ribbed athletic cuff, and pixelated 8-bit T-Rex and cactus graphics that make every software bug a little more fun.',
    features: [
      'Reinforced cushioned footbed for all-day campus walking',
      'Dynamic arch compression band prevents slipping',
      'Seamless toe closure prevents chafing',
      'Jacquard knit pattern will not crack or peel'
    ],
    materials: '75% Combed Cotton, 22% Polyester, 3% Elastane',
    care: 'Machine wash warm, tumble dry low.',
    reviews: [
      {
        id: 'rev-501',
        author: 'Josh B.',
        date: '1 week ago',
        rating: 5,
        title: 'Instant conversation starter at standup',
        comment: 'Super soft and the cactus & dino design is crisp. Bought three pairs as gifts for my team.',
        verified: true
      }
    ]
  },
  {
    id: 'g-backpack-06',
    slug: 'google-campus-commuter-backpack-24l',
    name: 'Google Campus Commuter Laptop Backpack 24L',
    tagline: 'Weatherproof recycled tech pack with dedicated 16" laptop sleeve',
    price: 78.00,
    originalPrice: 89.00,
    category: 'accessories',
    categoryLabel: 'Accessories',
    subcategory: 'Bags & Backpacks',
    badge: 'Staff Pick',
    isBestseller: true,
    isNew: false,
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 74,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Space Grey', hex: '#4a5568' },
      { name: 'Deep Tech Navy', hex: '#2c3e50' }
    ],
    sizes: ['24 Liters'],
    description: 'The standard issue backpack seen across Google’s global engineering offices. Features waterproof coated zippers, an elevated suspended laptop sleeve protecting up to 16” devices, hidden passport pocket, and luggage trolley pass-through.',
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
        author: 'Priya N.',
        date: '2 weeks ago',
        rating: 5,
        title: 'Ideal everyday carry for developers',
        comment: 'Holds my 16 inch MacBook Pro, charger brick, headphones, water bottle, and gym clothes with room to spare.',
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
  }
];

export const CATEGORIES = [
  {
    id: 'clothing',
    name: 'Clothing & Apparel',
    shortName: 'Clothing',
    description: 'Hoodies, t-shirts, jackets & socks crafted with certified organic materials.',
    count: 4,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'accessories',
    name: 'Bags & Accessories',
    shortName: 'Accessories',
    description: 'Weatherproof commuter backpacks, caps, tech organizers, and everyday essentials.',
    count: 3,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'drinkware',
    name: 'Drinkware & Bottles',
    shortName: 'Drinkware',
    description: 'Pixel-inspired vacuum tumblers, campfire mugs, and pure glass bottles.',
    count: 3,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tech-stationery',
    name: 'Stationery & Collectibles',
    shortName: 'Collectibles',
    description: 'Hardcover rainbow notebooks, Android Bot figurines, and office desk flair.',
    count: 2,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  }
];
