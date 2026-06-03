import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "RR — Робот Рекрутер" },
      { name: "description", content: "Платформа автоматизированного найма Робот Рекрутер." },
    ],
  }),
  component: App,
});
