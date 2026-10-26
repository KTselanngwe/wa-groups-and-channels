import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "nso";
type State = {
  lang: Lang; dataSaver: boolean; name: string; saved: string[]; done: Record<string, number[]>; requests: string[];
};
const initial: State = { lang: "en", dataSaver: false, name: "", saved: [], done: {}, requests: [] };

const dict: Record<string, [string, string]> = {
  home: ["Home", "Gae"], guide: ["Guide", "Tlhahlo"], learn: ["Learn", "Ithute"], mentors: ["Mentors", "Bahlahli"],
  community: ["Groups", "Dihlopha"], jobs: ["Jobs", "Mešomo"], headline: ["Your future in tech starts here", "Bokamoso bja gago go theknolotši bo thoma mo"],
  chat: ["Chat with the career guide", "Bolela le mohlahli wa mošomo"], browse: ["Browse learning paths", "Lebelela ditsela tša go ithuta"],
  join: ["Join our WhatsApp groups", "Tsenela dihlopha tša WhatsApp"], dataSaver: ["Data saver", "Boloka data"],
};

const Ctx = createContext<{ s: State; set: (p: Partial<State>) => void; t: (k: string) => string } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial);
  useEffect(() => {
    try { const raw = localStorage.getItem("sheconnect"); if (raw) setS({ ...initial, ...JSON.parse(raw) }); } catch {}
  }, []);
  const set = (p: Partial<State>) => setS((prev) => { const n = { ...prev, ...p }; localStorage.setItem("sheconnect", JSON.stringify(n)); return n; });
  const t = (k: string) => dict[k]?.[s.lang === "en" ? 0 : 1] ?? k;
  return <Ctx.Provider value={{ s, set, t }}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
