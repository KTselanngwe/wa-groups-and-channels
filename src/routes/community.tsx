import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Megaphone, Users } from "lucide-react";
import { whatsappLinks, type WaLink } from "@/lib/data";
import { btnWa, card, tag } from "@/components/Shell";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "WhatsApp groups & channels — SheConnect" },
      { name: "description", content: "Join SheConnect WhatsApp groups and channels for opportunities, learning and peer support." },
      { property: "og:title", content: "SheConnect WhatsApp groups & channels" },
      { property: "og:description", content: "Join our WhatsApp community for women and girls in tech." },
    ],
  }),
  component: Community,
});

function WaCard({ w }: { w: WaLink }) {
  return (
    <div className={`${card} flex flex-col gap-3`}>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
          {w.kind === "channel" ? <Megaphone className="h-5 w-5" /> : <Users className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="font-bold">{w.name}</h3>
          <p className="text-muted-foreground">{w.desc}</p>
        </div>
      </div>
      <a href={w.url} target="_blank" rel="noopener noreferrer" className={btnWa}>
        {w.kind === "channel" ? "Follow channel" : "Join group"} <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function Community() {
  const channels = whatsappLinks.filter((w) => w.kind === "channel");
  const groups = whatsappLinks.filter((w) => w.kind === "group");
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-primary">Our WhatsApp community</h1>
        <p className="mt-2 text-muted-foreground">Tap to open WhatsApp. Channels share news; groups let you chat.</p>
      </header>
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">Channels <span className={tag}>Updates only</span></h2>
        <div className="grid gap-4 md:grid-cols-2">{channels.map((w) => <WaCard key={w.id} w={w} />)}</div>
      </section>
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">Groups <span className={tag}>Chat & ask</span></h2>
        <div className="grid gap-4 md:grid-cols-2">{groups.map((w) => <WaCard key={w.id} w={w} />)}</div>
      </section>
      <section className={`${card} bg-secondary`}>
        <h2 className="font-bold">Community rules</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Be kind and respectful.</li>
          <li>No spam, scams or selling.</li>
          <li>Never share your ID number, bank details or passwords.</li>
          <li>Report bad behaviour to a group admin. <Link to="/safety" className="font-semibold text-accent underline">Safety help</Link></li>
        </ul>
      </section>
    </div>
  );
}
