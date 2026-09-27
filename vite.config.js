import { resolve } from "node:path"
import { defineConfig } from "vite"
import { footer, gallery, headAssets, header, portal } from "./src/render-html.js"

const pagesBase = "/Redwood-Electric/"

function chromePlugin() {
  return {
    name: "redwood-chrome",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const file = (ctx.filename || "").split("/").pop() || "index.html"
        const key = file === "index.html" ? "home" : file.replace(".html", "")
        let out = html
        if (out.includes("<!--HEAD-->")) out = out.replaceAll("<!--HEAD-->", headAssets())
        if (out.includes("<!--HEADER-->")) out = out.replaceAll("<!--HEADER-->", header(key))
        if (out.includes("<!--FOOTER-->")) out = out.replaceAll("<!--FOOTER-->", footer())
        if (out.includes("<!--GALLERY-->")) out = out.replaceAll("<!--GALLERY-->", gallery())
        if (out.includes("<!--PORTAL-->")) out = out.replaceAll("<!--PORTAL-->", portal())
        return out
      },
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === "build" ? pagesBase : "/",
  plugins: [chromePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        about: resolve("about.html"),
        portfolio: resolve("portfolio.html"),
        services: resolve("services.html"),
        contact: resolve("contact.html"),
        training: resolve("training.html"),
        notFound: resolve("404.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 43217,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 43217,
    strictPort: true,
  },
}))
