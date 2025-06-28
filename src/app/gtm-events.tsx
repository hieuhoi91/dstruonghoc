declare global {
  interface Window {
    dataLayer: any[];
  }
}

("use client");

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GTMPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
