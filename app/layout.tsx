import type React from "react";
import "./styles.css";
import BackToTop from "@/components/BackToTop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BackToTop />   {/* <- here */}
      </body>
    </html>
  );
}
