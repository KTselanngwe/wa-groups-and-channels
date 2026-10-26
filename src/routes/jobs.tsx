import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { opportunities } from "@/lib/data";
import { btnAccent, card, tag } from "@/components/Shell";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Opportunities — SheConnect" },
      { name: "description", content: "Bursaries, learnerships, internships, junior jobs and data programmes in South Africa." },
      { property: "og:title", content: "SheConnect opportunities" },
      { property: "og:description", content: "Find bursaries, learnerships and jobs." },
    ],
  }),
  component: Jobs,
});

const sel = "rounded-xl border border-input bg-card px-3 py-2";

function Jobs() {
  const [type, setType] = useState("All");
  const [prov, setProv] = useState("All");
  const [sort, setSort] = useState("soon");
  const types = ["All", ...new Set(opportunities.map((o) => o.type))];
  const provs = ["All", ...new Set(opportunities.map((o) => o.province))];
  const list = opportunities
    .filter((o) => (type === "All" || o.type === type) && (prov === "All" || o.province === prov))
    .sort((a, b) => (sort === "soon" ? 1 : -1) * a.deadline.localeCompare(b.deadline));
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold text-primary">Opportunities</h1>
      <div className="flex flex-wrap gap-2">
        <label className="flex flex-col text-sm font-semibold">Type<select value={type} onChange={(e) => setType(e.target.value)} className={sel}>{types.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="flex flex-col text-sm font-semibold">Province<select value={prov} onChange={(e) => setProv(e.target.value)} className={sel}>{provs.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="flex flex-col text-sm font-semibold">Closing<select value={sort} onChange={(e) => setSort(e.target.value)} className={sel}><option value="soon">Closing soon</option><option value="late">Closing later</option></select></label>
      </div>
      {list.length === 0 && <p className="text-muted-foreground">Nothing matches. Try other filters.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((o) => (
          <div key={o.id} className={card}>
            <span className={tag}>{o.type}</span>
            <h2 className="mt-2 font-bold">{o.org}</h2>
            <p className="text-muted-foreground">{o.province} · Closes {o.deadline}</p>
            <a href={o.url} target="_blank" rel="noopener noreferrer" className={`${btnAccent} mt-3`}>Apply</a>
          </div>
        ))}
      </div>
    </div>
  );
}
