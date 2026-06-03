import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const stats = [
  { v: "50k+", l: "кандидатов в базе" },
  { v: "92%", l: "точность подбора" },
  { v: "3 дня", l: "средний срок найма" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-4xl px-6 pt-24 pb-20">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">О проекте</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          RR — Робот Рекрутер создан, чтобы освободить HR-команды от рутины.
          Мы соединили большие языковые модели, многолетний опыт рекрутинга и удобный интерфейс,
          чтобы каждая вакансия закрывалась быстрее, точнее и дешевле.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-4xl font-bold tracking-tight">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-semibold">Наша миссия</h2>
          <p className="text-muted-foreground leading-relaxed">
            Сделать наём прозрачным и человечным — оставив машинам всё, что машинами и должно решаться.
            Мы верим: рекрутер будущего — это связка человека и ИИ, где каждый делает то, что умеет лучше всего.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
