import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { mentors } from "@/lib/data";
import { useApp } from "@/lib/app-state";
import { btnAccent, card, tag } from "@/components/Shell";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentors — SheConnect" },
      { name: "description", content: "Request a mentor: women working in software, data, security and design." },
      { property: "og:title", content: "SheConnect mentors" },
      { property: "og:description", content: "Get guidance from women in tech." },
    ],
  }),
  component: Mentors,
});

function Mentors() {
  const { s, set } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const submit = (id: string) => {
    if (msg.trim().length < 10) return setErr("Please write at least 10 characters.");
    set({ requests: [...s.requests, id] }); setOpen(null); setMsg(""); setErr("");
  };
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold text-primary">Mentors</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {mentors.map((m) => {
          const sent = s.requests.includes(m.id);
          return (
            <div key={m.id} className={card}>
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-xl font-bold text-secondary-foreground">{m.name[0]}</div>
                <div><h2 className="font-bold">{m.name}</h2><p className="text-muted-foreground">{m.job}</p></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">{m.skills.map((x) => <span key={x} className={tag}>{x}</span>)}</div>
              <p className="mt-2 text-sm text-muted-foreground">Speaks: {m.langs.join(", ")}</p>
              {sent ? <p className="mt-3 font-semibold text-whatsapp">✓ Request sent! She'll reply soon.</p> : open === m.id ? (
                <div className="mt-3 space-y-2">
                  <label htmlFor={`msg-${m.id}`} className="block text-sm font-semibold">What would you like help with?</label>
                  <textarea id={`msg-${m.id}`} value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} className="w-full rounded-xl border border-input bg-background p-3" />
                  {err && <p className="text-sm text-destructive">{err}</p>}
                  <button onClick={() => submit(m.id)} className={btnAccent}>Send request</button>
                </div>
              ) : <button onClick={() => setOpen(m.id)} className={`${btnAccent} mt-3`}>Request a mentor</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
