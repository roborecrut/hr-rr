import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RR — Робот Рекрутер" },
      { name: "description", content: "ИИ-агент, который автоматизирует найм: подбор, скрининг и общение с кандидатами." },
      { property: "og:title", content: "RR — Робот Рекрутер" },
      { property: "og:description", content: "Найм без боли. Рекрутинг на автопилоте." },
    ],
  }),
  component: HomePage,
});
