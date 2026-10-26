import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-state";
import { btnAccent, card } from "@/components/Shell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — SheConnect" },
      { name: "description", content: "Create a simple SheConnect profile in under a minute." },
      { property: "og:title", content: "Join SheConnect" },
      { property: "og:description", content: "Create your simple profile." },
    ],
  }),
  component: Signup,
});

const input = "w-full rounded-xl border border-input bg-background px-3 py-2";

function Signup() {
  const { s, set } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState(s.name);
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr("Please enter a name or nickname.");
    if (!consent) return setErr("Please agree to the privacy note.");
    set({ name: name.trim() }); nav({ to: "/guide" });
  };
  return (
    <form onSubmit={submit} className={`${card} mx-auto max-w-md space-y-4`}>
      <h1 className="text-2xl font-extrabold text-primary">Create your profile</h1>
      <div><label htmlFor="n" className="mb-1 block font-semibold">Name or nickname</label><input id="n" value={name} onChange={(e) => setName(e.target.value)} className={input} /></div>
      <div><label htmlFor="ed" className="mb-1 block font-semibold">Education level</label>
        <select id="ed" className={input}><option>Grade 10–12</option><option>University / college</option><option>Graduate</option><option>Working</option></select></div>
      <fieldset><legend className="mb-1 font-semibold">Interests</legend>
        {["Coding", "Data", "Design", "Security"].map((i) => <label key={i} className="mr-4 inline-flex items-center gap-1"><input type="checkbox" className="accent-accent" />{i}</label>)}</fieldset>
      <div><label htmlFor="lang" className="mb-1 block font-semibold">Preferred language</label>
        <select id="lang" value={s.lang} onChange={(e) => set({ lang: e.target.value as "en" | "nso" })} className={input}><option value="en">English</option><option value="nso">Sepedi</option></select></div>
      <p className="rounded-xl bg-muted p-3 text-sm">🔒 Privacy (POPIA): your info stays on this phone and is only used to personalise your experience.</p>
      <label className="flex items-start gap-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-accent" />I agree to the privacy note.</label>
      {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
      <button className={`${btnAccent} w-full`}>Continue</button>
    </form>
  );
}
