import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "never"
  },
  scopedStyleStrategy: "where",
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  integrations: [
    react({
      include: ['**/react/*']
    }),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@shortcodes/Button",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Video",
        "@shortcodes/Youtube",
        "@shortcodes/Blockquote",
        "@shortcodes/Badge",
        "@shortcodes/ContentBlock",
        "@shortcodes/Changelog",
      ],
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
