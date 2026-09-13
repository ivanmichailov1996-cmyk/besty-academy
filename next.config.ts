import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (.github/workflows/deploy.yml) to deploy
// the site under https://<user>.github.io/besty-academy/. Left unset for
// local builds (npm run build / the ЗАПУСТИТЬ_САЙТ.bat launcher flow), which
// keep serving from the domain root exactly as before.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  // trailingSlash makes every route export as a folder with its own
  // index.html (e.g. /service/index.html) instead of a flat service.html —
  // the safest layout for GitHub Pages' static file serving. Only turned on
  // for the GitHub Pages build; the local launcher's `serve` already
  // resolves flat .html files fine, so it stays off there.
  trailingSlash: basePath ? true : undefined,
};

export default nextConfig;
