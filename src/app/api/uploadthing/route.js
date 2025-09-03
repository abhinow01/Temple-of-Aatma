import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    // token: process.env.UPLOADTHING_TOKEN,
    callbackUrl: process.env.UPLOADTHING_CALLBACK_URL,
  }
  // Apply an (optional) custom config:
  // config: { ... },
});

// Next.js App Router uploadthing endpoint
