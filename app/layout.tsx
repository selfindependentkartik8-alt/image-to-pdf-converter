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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

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