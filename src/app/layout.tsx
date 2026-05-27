import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import VoiceAgentWidget from "@/components/sections/voice-agent-widget";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://getlavidastemcells.com'),title: {
    default: "La Vida Regenerative Medicine | Stem Cell Therapy in Punta Cana",
    template: "%s | La Vida Regenerative Medicine",
  },
  description:
    "World-class stem cell therapy in Punta Cana, Dominican Republic. Fresh UC-MSC cells, in-house laboratory, and concierge medical tourism experience. Book your free consultation.",
  keywords: [
    "stem cell therapy",
    "regenerative medicine",
    "Punta Cana",
    "Dominican Republic",
    "UC-MSC",
    "medical tourism",
    "orthopedic",
    "neurological",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "La Vida Regenerative Medicine",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "La Vida Regenerative Medicine",
  description:
    "Stem cell therapy clinic in Punta Cana, Dominican Republic offering regenerative treatments.",
  telephone: "+1-740-547-0921",
  email: "care@lavidastemcells.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Punta Cana",
    addressCountry: "DO",
  },
  medicalSpecialty: "Regenerative Medicine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="flex-1 min-h-0">{children}</main>
        <VoiceAgentWidget />
        <Analytics />

        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${JSON.stringify(metaPixelId)});
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {googleAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(googleAdsId)});
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
