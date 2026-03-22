export interface Product {
  id: string
  name: string
  price: number
  description: string
  details: string
  image: string
  slug: string
}

export const products: Product[] = [
  {
    id: "tap-001",
    name: "Craft Beer Tap",
    price: 49.99,
    description: "Classic wooden handle for home bar setups.",
    details: "Crafted from locally sourced oak, this beer tap adds a professional finish to any home kegerator. Includes standard 3/8\"-16 thread insert compatible with most faucets.",
    image: "/images/product tap.png",
    slug: "craft-beer-tap"
  },
  {
    id: "grind-002",
    name: "Coffee Grinder",
    price: 89.99,
    description: "Burr grinder perfect for beer infusion.",
    details: "Precision burr grinder for consistent coffee grounds, ideal for cold-brew coffee beer infusions or just a morning pick-me-up.",
    image: "/images/product-beer-grinder.png",
    slug: "coffee-grinder"
  },
  {
    id: "open-003",
    name: "Bottle Opener",
    price: 15.00,
    description: "Hand-forged steel bottle opener.",
    details: "Built to last a lifetime, this ergonomic opener makes short work of even the most stubborn crown caps.",
    image: "/images/product-bottole-opener.png",
    slug: "bottle-opener"
  },
  {
    id: "log-004",
    name: "Brew Log",
    price: 25.00,
    description: "Professional-grade recipe tracking.",
    details: "Record every detail of your brew day: OG, FG, hop additions, temperatures, and tasting notes. The essential tool for mastering your craft.",
    image: "/images/product-brew-log.png",
    slug: "brew-log"
  },
  {
    id: "scale-005",
    name: "Digital Scale",
    price: 35.00,
    description: "High-precision ingredient scale.",
    details: "Measures hops and specialty grains with 0.1g precision. Essential for hitting your target IBUs and extract goals.",
    image: "/images/product-glass-holder.png",
    slug: "digital-scale"
  },
  {
    id: "therm-006",
    name: "Precision Thermometer",
    price: 22.50,
    description: "Waterproof digital readout.",
    details: "Fast, accurate temperature readings for mash and fermentation control. Includes a stainless steel probe.",
    image: "/images/product-hops.png",
    slug: "precision-thermometer"
  },
  {
    id: "glass-007",
    name: "Tulip Glass",
    price: 12.00,
    description: "Set of 2 tulip glasses.",
    details: "Designed to capture the aroma of complex beers like Saisons or IPAs. Elegant design with a flared lip.",
    image: "/images/product-overalls.png",
    slug: "tulip-glass"
  },
  {
    id: "clean-008",
    name: "Sanitation Kit",
    price: 19.99,
    description: "Everything for a sterile brew.",
    details: "Includes 1lb of Star San, a spray bottle, and a soft brush for hard-to-reach surfaces. Don't compromise your fermentation.",
    image: "/images/product-spices.png",
    slug: "sanitation-kit"
  },
  {
    id: "tub-009",
    name: "Silicone Tubing",
    price: 10.00,
    description: "Food-grade, high-temp tubing.",
    details: "5 feet of 1/2\" ID high-temp silicone tubing. Won't kink, easy to clean, and essential for transferring wort.",
    image: "/images/product-tap-cooler.png",
    slug: "silicone-tubing"
  },
  {
    id: "yeast-010",
    name: "Yeast Starter Kit",
    price: 29.99,
    description: "Flask and stir bar for healthy yeast.",
    details: "Create massive yeast starters with this 2L Erlenmeyer flask and magnetic stir bar. Perfect for high-gravity batches.",
    image: "/images/product-wine-holder.png",
    slug: "yeast-starter-kit"
  }
]
