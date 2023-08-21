import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/frontend/": [
    {
      text: "Frontend",
      prefix: "/frontend/",
      children: [
        {
          text: "Home",
          link: "/frontend/",
        },
        "/frontend/portal-actions.md",
      ],
    },
  ],
  "/backend/": [
    {
      text: "Backend",
      prefix: "/backend/",
      children: [],
    },
  ],
});
