import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — RR" },
      { name: "description", content: "RR — Робот Рекрутер: миссия, цифры и команда за продуктом." },
      { property: "og:title", content: "О нас — RR" },
      { property: "og:description", content: "Миссия и цифры RR — Робота Рекрутера." },
    ],
  }),
  component: AboutPage,
});
