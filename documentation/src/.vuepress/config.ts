import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { getDirname, path } from "@vuepress/utils";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
  base: "/fusion-project-portal/",
  title: "Fusion Project Portal",
  description:
    "Fusion Project Portal is a mono repository for all frontend and backend services associated project portal.",
  head: [
    [
      "link",
      {
        href: "https://cdn.eds.equinor.com/font/equinor-font.css",
        rel: "stylesheet",
      },
    ],
  ],
  theme,
  // plugins: [
  //   registerComponentsPlugin({
  //     components: {
  //       ModuleBadge: path.resolve(__dirname, "./components/ModuleBadge.vue"),
  //     },
  //   }),
  // ],
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
});
