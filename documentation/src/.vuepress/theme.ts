import { hopeTheme } from "vuepress-theme-hope";
import { navbar } from "./nav-bar";
import sidebar from "./side-bar";
// We export the theme object by default
export default hopeTheme({
  // theme configuration

  logo: "/fusion.png",
  repo: "equinor/fusion-project-portal",
  docsBranch: "main",
  navbar,
  sidebar,
  docsDir: "docs/",
  darkmode: "switch",
  plugins: {
    blog: true,
    mdEnhance: {
      mermaid: true,
      codetabs: true,
      tabs: true,
      tasklist: true,
      container: true,
      imgSize: true,
      align: true,
    },
  },
});
