export interface ProductOption {
  label: string;
  key: string;
  type: "select" | "number" | "text" | "radio";
  choices?: { name: string; priceAdd?: number }[];
  min?: number;
  max?: number;
  placeholder?: string;
  unit?: string;
}

export interface Product {
  slug: string;
  name: string;
  emoji: string;
  tag: string;
  tagColor: string;
  shortDesc: string;
  longDesc: string;
  images: string[];
  basePrice: number;
  priceLabel: string;
  priceNote: string;
  options: ProductOption[];
  highlights: string[];
  ingredients: string;
  deliveryTime: string;
  minOrder: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "artisan-bread",
    name: "Artisan Bread",
    emoji: "🍞",
    tag: "Bestseller",
    tagColor: "bg-amber-100 text-amber-700",
    shortDesc: "Traditional whole-wheat & multigrain loaves baked fresh each morning.",
    longDesc:
      "Our Artisan Bread is made using a slow fermentation process that enhances flavour and texture. Every single loaf is hand-shaped by our experienced bakers using locally sourced whole-wheat and multigrain flour, sea salt, and natural yeast. No shortcuts, no preservatives — just honest, wholesome bread the way it was meant to be.",
    images: [
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=85",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=85",
    ],
    basePrice: 50,
    priceLabel: "₹50 – ₹120",
    priceNote: "Price varies by size and type.",
    deliveryTime: "Same day (order before 8 AM)",
    minOrder: "1 loaf",
    options: [
      {
        label: "Bread Type",
        key: "type",
        type: "radio",
        choices: [
          { name: "Whole Wheat", priceAdd: 0 },
          { name: "Multigrain", priceAdd: 15 },
          { name: "Sourdough", priceAdd: 30 },
          { name: "White Sandwich", priceAdd: 0 },
        ],
      },
      {
        label: "Size",
        key: "size",
        type: "radio",
        choices: [
          { name: "Small (400g) — ₹50", priceAdd: 0 },
          { name: "Medium (600g) — ₹80", priceAdd: 30 },
          { name: "Large (900g) — ₹120", priceAdd: 70 },
        ],
      },
      {
        label: "Quantity (Loaves)",
        key: "quantity",
        type: "number",
        min: 1,
        max: 50,
        unit: "loaf/loaves",
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. sliced bread, half-baked, extra crust…",
      },
    ],
    highlights: [
      "Slow-fermented for 12+ hours",
      "No artificial preservatives",
      "Locally-sourced wheat flour",
      "Baked fresh at 4 AM daily",
      "FSSAI certified facility",
    ],
    ingredients: "Whole-wheat flour, water, natural yeast, sea salt, olive oil",
  },
  {
    slug: "custom-cakes",
    name: "Custom Cakes",
    emoji: "🎂",
    tag: "Premium",
    tagColor: "bg-orange-100 text-orange-700",
    shortDesc: "Celebration cakes for every occasion — birthdays, weddings & more.",
    longDesc:
      "Make every celebration unforgettable with a Badal Bakery custom cake. Our pastry chefs work closely with you to design a cake that matches your vision — from single-tier birthday cakes to multi-tier wedding centrepieces. Every cake is made to order with premium ingredients, hand-decorated, and delivered fresh on the day of your event.",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=85",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=85",
    ],
    basePrice: 400,
    priceLabel: "₹400 – ₹5000+",
    priceNote: "Final price depends on weight, tier, and decoration.",
    deliveryTime: "2–3 days advance order required",
    minOrder: "500g",
    options: [
      {
        label: "Occasion",
        key: "occasion",
        type: "radio",
        choices: [
          { name: "Birthday", priceAdd: 0 },
          { name: "Wedding", priceAdd: 500 },
          { name: "Anniversary", priceAdd: 100 },
          { name: "Baby Shower", priceAdd: 100 },
          { name: "Corporate / Other", priceAdd: 0 },
        ],
      },
      {
        label: "Flavour",
        key: "flavour",
        type: "radio",
        choices: [
          { name: "Chocolate", priceAdd: 0 },
          { name: "Vanilla", priceAdd: 0 },
          { name: "Strawberry", priceAdd: 50 },
          { name: "Red Velvet", priceAdd: 80 },
          { name: "Butterscotch", priceAdd: 50 },
          { name: "Black Forest", priceAdd: 60 },
        ],
      },
      {
        label: "Weight / Tier",
        key: "weight",
        type: "radio",
        choices: [
          { name: "0.5 kg (1 tier) — ₹400", priceAdd: 0 },
          { name: "1 kg (1 tier) — ₹700", priceAdd: 300 },
          { name: "2 kg (1–2 tier) — ₹1200", priceAdd: 800 },
          { name: "4 kg (2–3 tier) — ₹2400", priceAdd: 2000 },
          { name: "Custom size — contact us", priceAdd: 0 },
        ],
      },
      {
        label: "Name / Message on Cake",
        key: "message",
        type: "text",
        placeholder: "E.g. Happy Birthday Rahul! 🎉",
      },
      {
        label: "Delivery Date",
        key: "date",
        type: "text",
        placeholder: "DD/MM/YYYY — at least 2 days from today",
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. egg-free, sugar-free, specific colour theme…",
      },
    ],
    highlights: [
      "100% made to order",
      "Hand-decorated by expert pastry chefs",
      "Egg & eggless options available",
      "Sugar-free option on request",
      "Custom colour themes & toppers",
    ],
    ingredients: "Maida, butter, sugar, eggs (or egg-free), cocoa/vanilla, fresh cream, fondant",
  },
  {
    slug: "butter-cookies",
    name: "Butter Cookies",
    emoji: "🍪",
    tag: "Fan Favorite",
    tagColor: "bg-rose-100 text-rose-700",
    shortDesc: "Crispy, melt-in-your-mouth cookies with rich butter and real vanilla.",
    longDesc:
      "Our Butter Cookies have earned a legendary status among our regulars. Made using pure churned butter and real vanilla extract, these cookies deliver that satisfying snap followed by a melt-in-your-mouth finish. Packaged in gift boxes, they make the perfect present for any occasion.",
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f0f6dbe4b73?w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=85",
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800&q=85",
    ],
    basePrice: 80,
    priceLabel: "₹80 – ₹400",
    priceNote: "Price per pack. Discount on bulk orders.",
    deliveryTime: "Same day (order before 10 AM)",
    minOrder: "1 pack (250g)",
    options: [
      {
        label: "Variant",
        key: "variant",
        type: "radio",
        choices: [
          { name: "Classic Butter", priceAdd: 0 },
          { name: "Choco Chip", priceAdd: 20 },
          { name: "Almond Crunch", priceAdd: 40 },
          { name: "Assorted Mix", priceAdd: 20 },
        ],
      },
      {
        label: "Pack Size",
        key: "packSize",
        type: "radio",
        choices: [
          { name: "250g — ₹80", priceAdd: 0 },
          { name: "500g — ₹150", priceAdd: 70 },
          { name: "1 kg Gift Box — ₹280", priceAdd: 200 },
        ],
      },
      {
        label: "Number of Packs",
        key: "quantity",
        type: "number",
        min: 1,
        max: 100,
        unit: "pack(s)",
      },
      {
        label: "Gift Wrapping",
        key: "gift",
        type: "radio",
        choices: [
          { name: "No gift wrap", priceAdd: 0 },
          { name: "Standard gift wrap — +₹30", priceAdd: 30 },
          { name: "Premium ribbon box — +₹60", priceAdd: 60 },
        ],
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. add greeting card, nut-free, extra crispy…",
      },
    ],
    highlights: [
      "Pure churned butter — no margarine",
      "Real vanilla extract",
      "Crunchy, crumbly texture",
      "Available in gift boxes",
      "Perfect for festive gifting",
    ],
    ingredients: "Maida, pure butter, sugar, vanilla extract, baking powder, salt",
  },
  {
    slug: "croissants",
    name: "Croissants",
    emoji: "🥐",
    tag: "Fresh Daily",
    tagColor: "bg-yellow-100 text-yellow-700",
    shortDesc: "Flaky, buttery, golden croissants made with imported French techniques.",
    longDesc:
      "Achieving the perfect croissant takes skill, patience, and premium ingredients. Our bakers use a traditional lamination method — layering chilled butter into the dough over 24 hours — to create those signature flaky layers. Bite into one and you'll hear the satisfying crunch before the buttery softness inside.",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=85",
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=85",
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=800&q=85",
    ],
    basePrice: 40,
    priceLabel: "₹40 – ₹120",
    priceNote: "Per piece or pack pricing available.",
    deliveryTime: "Available from 6 AM daily",
    minOrder: "2 pieces",
    options: [
      {
        label: "Type",
        key: "type",
        type: "radio",
        choices: [
          { name: "Plain Butter", priceAdd: 0 },
          { name: "Chocolate Filled — +₹15", priceAdd: 15 },
          { name: "Almond — +₹20", priceAdd: 20 },
          { name: "Ham & Cheese — +₹25", priceAdd: 25 },
        ],
      },
      {
        label: "Quantity",
        key: "quantity",
        type: "number",
        min: 2,
        max: 200,
        unit: "piece(s)",
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. extra warm, no filling, bulk pack…",
      },
    ],
    highlights: [
      "24-hour lamination process",
      "Imported European-style butter",
      "Crispy exterior, soft inside",
      "Baked fresh every morning",
      "No artificial additives",
    ],
    ingredients: "Maida, European butter, whole milk, sugar, yeast, salt, eggs",
  },
  {
    slug: "muffins",
    name: "Muffins",
    emoji: "🧁",
    tag: "Quick Bite",
    tagColor: "bg-green-100 text-green-700",
    shortDesc: "Fluffy chocolate, blueberry, and vanilla muffins — perfect snack size.",
    longDesc:
      "Our muffins are baked to that perfect balance — domed tops, moist crumb, and bursting with real fruit or chocolate in every bite. Great as a quick breakfast on the go, an afternoon snack, or a lunchbox treat for the kids. Available in classic and premium flavours.",
    images: [
      "https://images.unsplash.com/photo-1607958996333-41aef84a6e82?w=800&q=85",
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=85",
      "https://images.unsplash.com/photo-1514508985285-5aa2d91e5cc6?w=800&q=85",
    ],
    basePrice: 30,
    priceLabel: "₹30 – ₹80",
    priceNote: "Per piece. Tray orders get a 15% discount.",
    deliveryTime: "Same day (order before 10 AM)",
    minOrder: "4 pieces",
    options: [
      {
        label: "Flavour",
        key: "flavour",
        type: "radio",
        choices: [
          { name: "Chocolate", priceAdd: 0 },
          { name: "Blueberry — +₹10", priceAdd: 10 },
          { name: "Vanilla", priceAdd: 0 },
          { name: "Banana Walnut — +₹10", priceAdd: 10 },
          { name: "Mixed Box (all flavours)", priceAdd: 5 },
        ],
      },
      {
        label: "Quantity",
        key: "quantity",
        type: "number",
        min: 4,
        max: 120,
        unit: "piece(s)",
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. eggless, low sugar, extra blueberries…",
      },
    ],
    highlights: [
      "Real fruit — no artificial flavours",
      "Eggless version available",
      "Moist crumb, domed top",
      "Tray orders get 15% discount",
      "School & office bulk friendly",
    ],
    ingredients: "Maida, eggs, butter, sugar, milk, fresh blueberries / cocoa / vanilla",
  },
  {
    slug: "pav-buns",
    name: "Pav & Buns",
    emoji: "🍔",
    tag: "Daily Essential",
    tagColor: "bg-blue-100 text-blue-700",
    shortDesc: "Soft, pillowy pav and dinner rolls — iconic Indian bakery staple.",
    longDesc:
      "No Bihari breakfast is complete without freshly baked pav. Our pav is steamed and baked to achieve that signature soft, pillowy texture — the kind that tears cleanly and soaks up sabzi beautifully. We supply to hundreds of households and restaurants across Patna daily. Bulk orders welcome.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=85",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=85",
    ],
    basePrice: 20,
    priceLabel: "₹20 – ₹120",
    priceNote: "Sold by pack of 6. Bulk rates available.",
    deliveryTime: "Available from 5:30 AM daily",
    minOrder: "1 pack (6 pieces)",
    options: [
      {
        label: "Type",
        key: "type",
        type: "radio",
        choices: [
          { name: "Ladi Pav (soft)", priceAdd: 0 },
          { name: "Dinner Rolls", priceAdd: 10 },
          { name: "Burger Buns", priceAdd: 10 },
          { name: "Garlic Butter Buns — +₹20", priceAdd: 20 },
        ],
      },
      {
        label: "Quantity (Packs of 6)",
        key: "quantity",
        type: "number",
        min: 1,
        max: 200,
        unit: "pack(s) of 6",
      },
      {
        label: "Special Instructions",
        key: "note",
        type: "text",
        placeholder: "E.g. extra soft, no sesame seeds, restaurant bulk…",
      },
    ],
    highlights: [
      "Soft, pillowy texture",
      "Perfect for pav bhaji & vada pav",
      "Restaurant & hotel supply available",
      "Bulk discounts over 10 packs",
      "Delivered to your doorstep",
    ],
    ingredients: "Maida, yeast, milk, butter, sugar, salt",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
