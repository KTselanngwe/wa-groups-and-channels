import { createFileRoute, Link } from "@tanstack/react-router";
import { mentors, paths } from "@/lib/data";
import { useApp } from "@/lib/app-state";
import { btnAccent, card } from "@/components/Shell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile — SheConnect" },
      { name: "description", content: "Your saved careers, learning progress and mentor requests." },
      { property: "og:title", content: "My SheConnect profile" },
      { property: "og:description", content: "Track your progress." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { s, set } = useApp();
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-extrabold text-primary">Hi, {s.name || "friend"}!</h1>
      {!s.name && <Link to="/signup" className={btnAccent}>Create your profile</Link>}
      <div className={card}><h2 className="font-bold">Saved careers</h2>
        {s.saved.length ? <ul className="mt-2 list-disc pl-5">{s.saved.map((id) => <li key={id}><Link to="/learn/$id" params={{ id }} className="underline">{paths.find((p) => p.id === id)?.title}</Link></li>)}</ul> : <p className="text-muted-foreground">None yet.</p>}</div>
      <div className={card}><h2 className="font-bold">Learning progress</h2>
        {paths.map((p) => <p key={p.id}>{p.title}: {s.done[p.id]?.length ?? 0}/{p.steps.length} steps</p>)}</div>
      <div className={card}><h2 className="font-bold">Mentor requests</h2>
        {s.requests.length ? s.requests.map((id) => <p key={id}>{mentors.find((m) => m.id === id)?.name} — pending</p>) : <p className="text-muted-foreground">None yet.</p>}</div>
      <div className={card}><h2 className="font-bold">Settings</h2>
        <label className="mt-2 flex items-center gap-2"><input type="checkbox" checked={s.dataSaver} onChange={(e) => set({ dataSaver: e.target.checked })} className="accent-accent" />Data saver mode</label>
        <label className="mt-2 flex items-center gap-2">Language
          <select value={s.lang} onChange={(e) => set({ lang: e.target.value as "en" | "nso" })} className="rounded-lg border px-2 py-1"><option value="en">English</option><option value="nso">Sepedi</option></select></label></div>
    </div>
  );
}
