import type { Metadata, Viewport } from "next";
import { Poppins, Nunito_Sans, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import { SiteNavigation } from "@/components/navigation/SiteNavigation";
import { SiteFooter } from "@/components/footer/SiteFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Razzouk — Tattoo & Piercing Studio",
  description:
    "A private tattoo and piercing atelier where ideas become permanent. Considered craft, anatomical placement, and intimate collaboration.",
  keywords: [
    "Razzouk",
    "tattoo studio",
    "private tattoo",
    "colour tattoo",
    "belly piercing",
    "piercing atelier",
    "fine line tattoo",
    "custom tattoo",
  ],
  openGraph: {
    title: "Razzouk — Tattoo & Piercing Studio",
    description:
      "A private tattoo and piercing atelier where ideas become permanent. Considered craft, anatomical placement, and intimate collaboration.",
    url: "https://razzouk-studio.com",
    siteName: "RAZZOUK",
    images: [
      {
        url: "/assets/hero01.png",
        width: 1672,
        height: 941,
        alt: "Razzouk Tattoo & Piercing Atelier",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Razzouk — Tattoo & Piercing Studio",
    description:
      "A private tattoo and piercing atelier where ideas become permanent.",
    images: ["/assets/hero01.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunitoSans.variable} ${cedarvilleCursive.variable} bg-black text-white`}
    >
      <body className="min-h-screen bg-black text-white selection:bg-[#7F1D2D] selection:text-white antialiased">
        <SiteNavigation />
        <main className="relative flex flex-col min-h-screen">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
