import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { paths } from "@/lib/data";
import { btnAccent, card } from "@/components/Shell";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Career guide — SheConnect" },
      { name: "description", content: "Answer simple questions and find tech careers that suit you." },
      { property: "og:title", content: "SheConnect career guide" },
      { property: "og:description", content: "Find a tech career that suits you." },
    ],
  }),
  component: Guide,
});

const questions = [
  { q: "Hi! 👋 What do you enjoy most?", opts: [["I like design", "ux"], ["I like problem solving", "web"], ["I'm not sure", "any"]] },
  { q: "Which sounds more fun?", opts: [["Working with numbers", "data"], ["Keeping people safe online", "cyber"], ["Building things", "web"]] },
  { q: "Last one: how do you like to work?", opts: [["Creatively", "ux"], ["Carefully, step by step", "cyber"], ["With facts and charts", "data"]] },
] as const;

const why: Record<string, string> = {
  web: "You enjoy building and solving problems.", data: "You like patterns and facts.",
  cyber: "You care about safety and detail.", ux: "You're creative and think about people.",
};

function Guide() {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<{ me?: boolean; text: string }[]>([{ text: questions[0].q }]);
  const [score, setScore] = useState<Record<string, number>>({});

  const answer = (label: string, key: string) => {
    const s = { ...score };
    if (key === "any") paths.forEach((p) => (s[p.id] = (s[p.id] ?? 0) + 0.5)); else s[key] = (s[key] ?? 0) + 1;
    setScore(s);
    const next = step + 1;
    setLog((l) => [...l, { me: true, text: label }, ...(next < questions.length ? [{ text: questions[next].q }] : [{ text: "Great! Here are careers that could suit you:" }])]);
    setStep(next);
  };
  const results = [...paths].sort((a, b) => (score[b.id] ?? 0) - (score[a.id] ?? 0)).slice(0, 3);
  const done = step >= questions.length;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-primary">Career guide</h1>
        <Link to="/learn" className="text-sm font-semibold text-accent underline">Skip & browse</Link>
      </div>
      <div className="space-y-3">
        {log.map((m, i) => (
          <div key={i} className={m.me ? "ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground" : "w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-4 py-2 shadow-sm"}>{m.text}</div>
        ))}
      </div>
      {!done && (
        <div className="flex flex-wrap gap-2">
          {questions[step].opts.map(([label, key]) => (
            <button key={label} onClick={() => answer(label, key)} className="rounded-full border-2 border-accent px-4 py-2 font-semibold text-accent hover:bg-accent hover:text-accent-foreground">{label}</button>
          ))}
        </div>
      )}
      {done && (
        <div className="space-y-3">
          {results.map((p) => (
            <div key={p.id} className={card}>
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-muted-foreground"><b>Why this suits you:</b> {why[p.id]}</p>
              <Link to="/learn/$id" params={{ id: p.id }} className={`${btnAccent} mt-3`}>Start learning</Link>
            </div>
          ))}
          <button onClick={() => { setStep(0); setScore({}); setLog([{ text: questions[0].q }]); }} className="text-sm font-semibold underline">Start again</button>
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">Suggestions are a guide only. You decide.</p>
    </div>
  );
}
