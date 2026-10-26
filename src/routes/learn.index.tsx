import { createFileRoute, Link } from "@tanstack/react-router";
import { paths } from "@/lib/data";
import { useApp } from "@/lib/app-state";
import { card, tag } from "@/components/Shell";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Free learning paths — SheConnect" },
      { name: "description", content: "Free, low-data beginner pathways in web, data, cybersecurity and UX." },
      { property: "og:title", content: "SheConnect learning paths" },
      { property: "og:description", content: "Free beginner tech pathways." },
    ],
  }),
  component: Learn,
});

function Learn() {
  const { s } = useApp();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold text-primary">Learning paths</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {paths.map((p) => {
          const pct = Math.round(((s.done[p.id]?.length ?? 0) / p.steps.length) * 100);
          return (
            <Link key={p.id} to="/learn/$id" params={{ id: p.id }} className={`${card} block hover:border-accent`}>
              <div className="flex gap-2"><span className={tag}>Free</span><span className={tag}>Low-data friendly</span></div>
              <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
              <p className="text-muted-foreground">{p.career} · ~{p.hours} hrs</p>
              <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
              <p className="mt-1 text-xs text-muted-foreground">{pct}% done</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
