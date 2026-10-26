// Edit these links to point to your real WhatsApp groups and channels.
export type WaLink = { id: string; name: string; desc: string; url: string; kind: "group" | "channel" | "community"; members?: string };

// Real WhatsApp community invite links supplied by the owner.
export const whatsappLinks: WaLink[] = [
  { id: "c1", kind: "community", name: "SheConnect Community", desc: "Opportunities, free learning and peer support in one place.", url: "https://chat.whatsapp.com/Bj0HwwpC58t3yKOwnPANqU" },
  { id: "c2", kind: "community", name: "Chats Koena Community", desc: "Chats, advice and job leads from the community.", url: "https://chat.whatsapp.com/JhZL644xBfv7jPCIN5xksC" },
];

export type Path = { id: string; title: string; career: string; hours: number; steps: { title: string; url: string; source: string }[] };

export const paths: Path[] = [
  { id: "web", title: "Web Development", career: "Build websites and apps", hours: 40, steps: [
    { title: "HTML basics", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", source: "freeCodeCamp" },
    { title: "CSS styling", url: "https://web.dev/learn/css", source: "web.dev" },
    { title: "JavaScript first steps", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps", source: "MDN" },
    { title: "Build your first page", url: "https://pages.github.com/", source: "GitHub Pages" },
  ]},
  { id: "data", title: "Data Analysis", career: "Find stories in numbers", hours: 35, steps: [
    { title: "Spreadsheets basics", url: "https://edu.gcfglobal.org/en/googlespreadsheets/", source: "GCFGlobal" },
    { title: "Intro to data", url: "https://www.khanacademy.org/math/statistics-probability", source: "Khan Academy" },
    { title: "Learn SQL", url: "https://www.sqlbolt.com/", source: "SQLBolt" },
  ]},
  { id: "cyber", title: "Cybersecurity", career: "Protect people and systems", hours: 30, steps: [
    { title: "Online safety basics", url: "https://www.netacad.com/courses/introduction-to-cybersecurity", source: "Cisco NetAcad" },
    { title: "Networking basics", url: "https://www.netacad.com/", source: "Cisco NetAcad" },
    { title: "Practice challenges", url: "https://tryhackme.com/", source: "TryHackMe" },
  ]},
  { id: "ux", title: "UX Design", career: "Design apps people love", hours: 25, steps: [
    { title: "What is UX?", url: "https://www.interaction-design.org/literature/topics/ux-design", source: "IxDF" },
    { title: "Learn Figma", url: "https://help.figma.com/hc/en-us/categories/360002051613", source: "Figma" },
    { title: "Design your first screen", url: "https://www.figma.com/community", source: "Figma Community" },
  ]},
];

export const mentors = [
  { id: "m1", name: "Lerato M.", job: "Software Developer", skills: ["JavaScript", "React"], langs: ["English", "Sepedi"] },
  { id: "m2", name: "Thandi K.", job: "Data Analyst", skills: ["Excel", "SQL"], langs: ["English", "isiZulu"] },
  { id: "m3", name: "Naledi P.", job: "Security Analyst", skills: ["Networks", "Linux"], langs: ["English", "Setswana"] },
  { id: "m4", name: "Ayesha D.", job: "UX Designer", skills: ["Figma", "Research"], langs: ["English", "Afrikaans"] },
];

export const opportunities = [
  { id: "o1", type: "Bursary", org: "Example ICT Bursary Fund", province: "National", deadline: "2026-11-30", url: "https://www.nsfas.org.za/" },
  { id: "o2", type: "Learnership", org: "Example Tech Learnership", province: "Gauteng", deadline: "2026-12-15", url: "https://www.yes4youth.co.za/" },
  { id: "o3", type: "Internship", org: "Example Digital Internship", province: "Limpopo", deadline: "2027-01-10", url: "https://www.sayouth.mobi/" },
  { id: "o4", type: "Junior job", org: "Example Junior Support Role", province: "Western Cape", deadline: "2026-11-20", url: "https://www.sayouth.mobi/" },
  { id: "o5", type: "Data / device", org: "Example Zero-rated Learning", province: "National", deadline: "2027-02-28", url: "https://www.sayouth.mobi/" },
];
