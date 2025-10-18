import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://www.thelangmaster.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.thelangmaster.com/waitlist",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
