import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Portfolio Design",
  description:
    "Showcase programming projects and experience with a sleek neon-themed portfolio designed to engage and impress potential employers and clients.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full margin-0 bg-[#060a06]">{children}</body>
    </html>
  );
}
