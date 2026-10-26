import { createFileRoute } from "@tanstack/react-router";
import { card } from "@/components/Shell";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety & support — SheConnect" },
      { name: "description", content: "Stay safe online, report harassment and find support contacts in South Africa." },
      { property: "og:title", content: "SheConnect safety & support" },
      { property: "og:description", content: "Online safety tips and support contacts." },
    ],
  }),
  component: Safety,
});

function Safety() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-extrabold text-primary">Safety & support</h1>
      <div className={card}><h2 className="font-bold">Stay safe online</h2><ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Never pay to apply for a bursary or job.</li><li>Don't share your ID, bank PIN or passwords.</li>
        <li>Meet new contacts only in public places.</li><li>Leave any WhatsApp group that makes you feel unsafe.</li></ul></div>
      <div className={card}><h2 className="font-bold">Report harassment</h2><p className="mt-2">Screenshot the messages, block the person, and tell a group admin. In WhatsApp: open the chat → tap the name → <b>Report</b>.</p></div>
      <div className={card}><h2 className="font-bold">Support contacts</h2><ul className="mt-2 space-y-1">
        <li>GBV Command Centre: <a className="font-semibold text-accent underline" href="tel:0800428428">0800 428 428</a></li>
        <li>SAPS Emergency: <a className="font-semibold text-accent underline" href="tel:10111">10111</a></li>
        <li>Childline: <a className="font-semibold text-accent underline" href="tel:116">116</a></li></ul></div>
    </div>
  );
}
