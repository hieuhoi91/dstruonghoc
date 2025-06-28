// app/ga4.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Declare types for gtag
declare global {
  interface Window {
    gtag: (
      command: "config",
      targetId: string,
      config?: {
        page_path?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export default function GA4PageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined" && pathname) {
      window.gtag("config", "G-D68FB9T9L7", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
