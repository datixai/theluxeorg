import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Luxe Organization",
    short_name: "TLO",
    description: "The Luxe Organization: Vision 2035",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
