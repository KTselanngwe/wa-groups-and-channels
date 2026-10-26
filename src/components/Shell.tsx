import { Link } from "@tanstack/react-router";
import { Home, MessageCircle, BookOpen, Users, Briefcase, Smartphone } from "lucide-react";
import type { ReactNode } from "react";
import { useApp } from "@/lib/app-state";

const nav = [
  { to: "/", k: "home", icon: Home },
  { to: "/guide", k: "guide", icon: MessageCircle },
  { to: "/learn", k: "learn", icon: BookOpen },
  { to: "/community", k: "community", icon: Smartphone },
  { to: "/mentors", k: "mentors", icon: Users },
  { to: "/jobs", k: "jobs", icon: Briefcase },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { s, set, t } = useApp();
  return (
    <div className={s.dataSaver ? "data-saver min-h-screen" : "min-h-screen"}>
      <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">S</span>
            SheConnect
          </Link>
          <nav className="ml-6 hidden gap-4 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground" activeProps={{ className: "text-sm font-semibold text-primary" }} activeOptions={{ exact: n.to === "/" }}>{t(n.k)}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <button onClick={() => set({ lang: s.lang === "en" ? "nso" : "en" })} className="rounded-full border px-3 py-1 font-medium" aria-label="Switch language">
              {s.lang === "en" ? "EN" : "NSO"}
            </button>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={s.dataSaver} onChange={(e) => set({ dataSaver: e.target.checked })} className="accent-accent" />
              <span className="hidden sm:inline">{t("dataSaver")}</span><span className="sm:hidden">Lite</span>
            </label>
            <Link to="/profile" className="grid h-8 w-8 place-items-center rounded-full bg-secondary font-semibold text-secondary-foreground" aria-label="Profile">
              {(s.name || "Me").slice(0, 1).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:pb-12">{children}</main>
      <footer className="mx-auto hidden max-w-5xl border-t px-4 py-6 text-sm text-muted-foreground md:block">
        <Link to="/safety" className="underline">Safety & support</Link> · <Link to="/signup" className="underline">Sign up</Link> · SheConnect © 2026
      </footer>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-6 border-t bg-card md:hidden">
        {nav.map(({ to, k, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-muted-foreground" activeProps={{ className: "flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold text-accent" }} activeOptions={{ exact: to === "/" }}>
            <Icon className="h-5 w-5" />{t(k)}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-opacity hover:opacity-90";
export const btnPrimary = `${btn} bg-primary text-primary-foreground`;
export const btnAccent = `${btn} bg-accent text-accent-foreground`;
export const btnOutline = `${btn} border-2 border-primary text-primary`;
export const btnWa = `${btn} bg-whatsapp text-whatsapp-foreground`;
export const card = "rounded-2xl border bg-card p-5 shadow-sm";
export const tag = "inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground";
