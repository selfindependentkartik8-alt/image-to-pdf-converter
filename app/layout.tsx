import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://imagetopdfconverter.krishaiworks.com"
  ),

  title: "Image to PDF Converter | Convert Images to PDF Online",

  description:
    "Convert JPG, PNG, and other images to PDF online quickly and easily. Create PDF files from your images with the free Image to PDF Converter by KrishAIWorks.",

  keywords: [
    "Image to PDF Converter",
    "JPG to PDF",
    "PNG to PDF",
    "Image to PDF",
    "Convert Image to PDF",
    "Convert JPG to PDF",
    "Convert PNG to PDF",
    "Image PDF Converter",
    "Images to PDF Online",
    "Free Image to PDF Converter",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical:
      "https://imagetopdfconverter.krishaiworks.com/",
  },

  openGraph: {
    title: "Image to PDF Converter | KrishAIWorks",
    description:
      "Convert JPG, PNG, and other images into PDF files online quickly and easily.",
    url: "https://imagetopdfconverter.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter | KrishAIWorks",
    description:
      "Convert images to PDF online quickly and easily with KrishAIWorks.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://imagetopdfconverter.krishaiworks.com/#webapplication",
      name: "Image to PDF Converter",
      url: "https://imagetopdfconverter.krishaiworks.com/",
      description:
        "Convert JPG, PNG, and other images to PDF online quickly and easily. Create PDF files from your images with the free Image to PDF Converter by KrishAIWorks.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id":
        "https://imagetopdfconverter.krishaiworks.com/#webpage",
      url: "https://imagetopdfconverter.krishaiworks.com/",
      name: "Image to PDF Converter | Convert Images to PDF Online",
      description:
        "Convert JPG, PNG, and other images to PDF online quickly and easily. Create PDF files from your images with the free Image to PDF Converter by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://imagetopdfconverter.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}