// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact, tailwindcss,
// tsConfigPaths, nitro (cloudflare), componentTagger (dev), VITE_* env injection, @ alias,
// React/TanStack dedupe, error logger plugins, and sandbox detection. Do NOT add them manually.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
    server: { entry: "server" },
  },
});
