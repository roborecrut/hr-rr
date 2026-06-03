import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RR — Робот Рекрутер" },
      { name: "description", content: "Интеллектуальная RPA-платформа найма: подбор, скрининг, интервью и обучение кандидатов." },
      { property: "og:title", content: "RR — Робот Рекрутер" },
      { property: "og:description", content: "Найм на автопилоте." },
    ],
  }),
  component: App,
});
