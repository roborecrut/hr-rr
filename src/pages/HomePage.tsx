import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Brain, Zap, Target, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "ИИ-скрининг", text: "Анализ резюме и собеседований за секунды." },
  { icon: Zap, title: "Скорость 10×", text: "Закрывайте вакансии быстрее конкурентов." },
  { icon: Target, title: "Точный матч", text: "Подбор кандидатов по 200+ параметрам." },
];

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Робот уже на смене
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            Найм без боли. <br />
            <span className="text-muted-foreground">Рекрутинг на автопилоте.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            RR — ИИ-агент, который ищет, отбирает и общается с кандидатами вместо вас. Вы только выбираете лучших.
          </p>
          <div className="mt-10 flex gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              Узнать больше <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-accent transition"
            >
              Возможности
            </a>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/40 transition">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary mb-5">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
