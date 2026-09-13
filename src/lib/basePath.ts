// Mirrors the basePath computed in next.config.ts. Needed only for raw
// (non-`next/image`) asset URLs — `next/image`, `next/link` and the router
// already account for basePath automatically.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
