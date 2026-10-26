import { describe, expect, it } from "vitest";

import { whatsappLinks } from "@/lib/data";

// The owner supplied real WhatsApp community invite links; no link may ship as a
// placeholder, and the two real invite codes must be the ones people can join.
describe("WhatsApp community links", () => {
  it("uses the real invite links and no placeholders", () => {
    expect(whatsappLinks.map((w) => w.url)).toEqual([
      "https://chat.whatsapp.com/Bj0HwwpC58t3yKOwnPANqU",
      "https://chat.whatsapp.com/JhZL644xBfv7jPCIN5xksC",
    ]);
    for (const w of whatsappLinks) {
      expect(w.url).not.toMatch(/REPLACE_/);
      expect(w.url.startsWith("https://chat.whatsapp.com/")).toBe(true);
    }
  });
});
