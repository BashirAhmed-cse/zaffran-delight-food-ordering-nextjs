"use client";

import { useEffect } from "react";

export default function GlightboxProvider() {
  useEffect(() => {
    import("glightbox").then((GLightbox) => {
      GLightbox.default({
        selector: ".glightbox",
      });
    });
  }, []);

  return null;
}
