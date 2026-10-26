import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { paths } from "@/lib/data";
import { useApp } from "@/lib/app-state";
import { btnPrimary, card } from "@/components/Shell";

export const Route = createFileRoute("/learn/$id")({
  loader: ({ params }) => {
    const p = paths.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Path"} — SheConnect` },
      { name: "description", content: `Free beginner steps for ${loaderData?.title ?? "tech"}.` },
      { property: "og:title", content: `${loaderData?.title ?? "Path"} learning path` },
      { property: "og:description", content: "Free, low-data steps to get started." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const { s, set } = useApp();
  const done = s.done[p.id] ?? [];
  const saved = s.saved.includes(p.id);
  const toggle = (i: number) => set({ done: { ...s.done, [p.id]: done.includes(i) ? done.filter((x) => x !== i) : [...done, i] } });
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link to="/learn" className="text-sm font-semibold text-accent">← All paths</Link>
      <h1 className="text-3xl font-extrabold text-primary">{p.title}</h1>
      <p className="text-muted-foreground">{p.career} · ~{p.hours} hrs · {done.length}/{p.steps.length} done</p>
      <button onClick={() => set({ saved: saved ? s.saved.filter((x) => x !== p.id) : [...s.saved, p.id] })} className="text-sm font-semibold underline">{saved ? "★ Saved" : "☆ Save this career"}</button>
      <ol className="space-y-3">
        {p.steps.map((st, i) => (
          <li key={i} className={`${card} flex items-center gap-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
            <div className="flex-1">
              <a href={st.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{st.title}</a>
              <p className="text-sm text-muted-foreground">{st.source} · free</p>
            </div>
            <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="h-5 w-5 accent-accent" />Done</label>
          </li>
        ))}
      </ol>
      <Link to="/mentors" className={btnPrimary}>Find a mentor for this path</Link>
    </div>
  );
}
