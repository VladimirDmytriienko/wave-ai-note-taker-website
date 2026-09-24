import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

/** Every public route. Add new pages here as they are created. */
const routes = [
  { path: "/", priority: 1 },
  { path: "/faq", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
] as const;

const sitemap = (): MetadataRoute.Sitemap =>
  routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));

export default sitemap;
