import { Link } from "@tanstack/react-router";
import { Bot } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </span>
          <span>RR</span>
          <span className="text-muted-foreground font-normal hidden sm:inline">— Робот Рекрутер</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition"
            activeProps={{ className: "px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-accent" }}
          >
            Главная
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition"
            activeProps={{ className: "px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-accent" }}
          >
            О нас
          </Link>
        </nav>
      </div>
    </header>
  );
}
