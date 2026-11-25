import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mis XV · Lucía",
  description:
    "Sábado 23/01/27, 21:30 hs. Centro de Jubilados Mi Refugio, Blandengues N° 189, Lezama. Confirmá hasta el 15/12/26.",
};

export const viewport: Viewport = {
  themeColor: "#071426",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable} ${script.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-foil">
        <noscript>
          <style>{`.entrance{display:none!important}.invite,.reveal{opacity:1!important;transform:none!important;pointer-events:auto!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
