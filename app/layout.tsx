import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import LocomotiveScrollInit from "@/components/layout/LocomotiveScrollInit";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/layout/CartDrawer";

// Serif: Premium display / heading font
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sans-serif: Clean, readable UI & body font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Serif accent: elegant italic quotes & captions
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Badal Bakery — Fresh Baked Goods from Bihar, India",
  description:
    "Badal Bakery in Patna, Bihar crafts fresh artisan breads, custom cakes, cookies, croissants and more every day. Order now or visit our factory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${lora.variable} antialiased`}
      >
        <CartProvider>
          <LocomotiveScrollInit />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
