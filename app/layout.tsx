import type { Metadata } from "next";
import { Inter, Michroma } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
  weight: "400",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denilson Rodrigues — Dev, IA & Produto",
  description:
    "Portfólio de Denilson Rodrigues. Desenvolvedor full stack, arquiteto de agentes de IA, engenheiro de prompts e criador de conteúdo visual. Freelancer disponível.",
  keywords: [
    "agentes ia",
    "prompt engineering",
    "react",
    "nextjs",
    "gsap",
    "three.js",
    "freelancer",
    "desenvolvedor full stack",
  ],
  openGraph: {
    title: "Denilson Rodrigues — Dev, IA & Produto",
    description: "Do prompt ao produto. Código, IA e visão criativa.",
    url: "https://denisin.dev",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@denisin_ia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("scroll-smooth", inter.variable, michroma.variable, geistMono.variable, "font-sans", geistSans.variable)}
      style={{ scrollBehavior: "auto" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css" />
      </head>
      <body className="relative overflow-x-hidden font-body">
        {children}
        <Script src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js" type="module" strategy="lazyOnload" />
      </body>
    </html>
  );
}
