import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, GraduationCap, HeartHandshake, MessageCircle } from "lucide-react";
import { useApp } from "@/lib/app-state";
import { btnAccent, btnOutline, btnWa, card } from "@/components/Shell";
import { whatsappLinks } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SheConnect — Your future in tech starts here" },
      { name: "description", content: "Free career guide, learning paths, mentors and WhatsApp groups for South African women and girls in tech." },
      { property: "og:title", content: "SheConnect — Your future in tech starts here" },
      { property: "og:description", content: "Career guide, free learning, mentors and WhatsApp communities." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useApp();
  return (
    <div className="space-y-8">
      <section className="bg-hero rounded-3xl p-6 text-primary-foreground md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80">For SA women & girls</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl">{t("headline")}</h1>
        <p className="mt-3 max-w-lg opacity-90">Find a career you'll love, learn for free, and meet women who've done it.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/guide" className={btnAccent}><MessageCircle className="h-5 w-5" />{t("chat")}</Link>
          <Link to="/learn" className={`${btnOutline} border-primary-foreground text-primary-foreground`}>{t("browse")}</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { i: Compass, h: "Find your path", p: "Answer a few simple questions." },
          { i: GraduationCap, h: "Learn free", p: "Low-data courses from trusted sites." },
          { i: HeartHandshake, h: "Get support", p: "Mentors and a safe community." },
        ].map(({ i: Icon, h, p }) => (
          <div key={h} className={card}>
            <Icon className="h-7 w-7 text-accent" />
            <h3 className="mt-3 font-bold">{h}</h3>
            <p className="text-muted-foreground">{p}</p>
          </div>
        ))}
      </section>

      <section className={card}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{t("join")}</h2>
          <Link to="/community" className="text-sm font-semibold text-accent">See all</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {whatsappLinks.slice(0, 2).map((w) => (
            <a key={w.id} href={w.url} target="_blank" rel="noopener noreferrer" className={`${btnWa} justify-start`}>
              <MessageCircle className="h-5 w-5" />{w.name}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Women in tech</h2>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {["Software dev", "Data scientist", "Cyber analyst", "UX designer", "Cloud engineer"].map((r, i) => (
            <div key={r} className="min-w-40 rounded-2xl bg-secondary p-4 text-secondary-foreground">
              <div className="h-12 w-12 rounded-full bg-accent/80" style={{ opacity: 0.5 + i * 0.1 }} />
              <p className="mt-2 font-semibold">{r}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
