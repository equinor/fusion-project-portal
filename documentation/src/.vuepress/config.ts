import hope from "vuepress-theme-hope";

export default hope.config({
  base: "/fusion-project-portal/",
  title: "Fusion Project Portal",
  description:
    "Fusion Project Portal is a mono repository for all frontend and backend services associated project portal.",
  themeConfig: {
    logo: "/fusion.png",
    repo: "equinor/fusion-project-portal",
    docsBranch: "main",
    editLinks: true,
    docsDir: "docs/",
    darkmode: "auto-switch",
    comment: false,
    nav: [
      {
        text: "Project Portal",
        link: "/projectPortal/",
      },
      {
        text: "Project Portal API",
        link: "/backend/",
      },
    ],
    sidebar: [
      {
        title: "Project Portal",
        path: "/projectPortal/",
        collapsable: false,
        sidebarDepth: 3,
        children: [
          "/projectPortal/portal-actions.md",
          "/projectPortal/portal-administration.md",
        ],
      },
      {
        title: "Project Portal API",
        path: "/backend/",
        collapsable: false,
        sidebarDepth: 3,
        children: [
          // {
          // 	title: 'Section',
          // 	path: '/frontend/section',
          // 	children: [
          // 	],
          // },
        ],
      },
      {
        title: "Project Portal Study",
        path: "/projectPortalStudy/",
        collapsable: false,
        sidebarDepth: 3,
        children: [
          // {
          // 	title: 'Section',
          // 	path: '/frontend/section',
          // 	children: [
          // 	],
          // },
        ],
      },
    ],

    mdEnhance: {
      mermaid: true,
      codegroup: true,
      container: true,
      tasklist: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },
  },
});
