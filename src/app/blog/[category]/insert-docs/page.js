"use client";
import { useState, use } from "react";
import Link from "next/link"; // [Import Link]
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

// [Update sidebarItems with slugs for navigation]
const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-and-collections",   tag: "02", done: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03", active: true },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04" },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05" },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
];

const insertExamples = {
  single: {
    title: "1. Inserting a Single Document",
    desc: "The insertOne() method adds a single document to a collection. If the collection does not exist, MongoDB creates it automatically.",
    shell: `// Using mongosh\ndb.students.insertOne({\n  name: "Sawera Younus",\n  course: "AI Tools",\n  year: 2026\n})`,
    js: `// Node.js Driver\nawait db.collection("students").insertOne({\n  name: "Sawera",\n  active: true\n});`,
    python: `# PyMongo\ndb.students.insert_one({\n    "name": "Sawera",\n    "active": True\n})`
  },
  many: {
    title: "2. Bulk Insertion (Many)",
    desc: "To insert multiple documents at once, use insertMany(). This is much faster than calling insertOne() multiple times in a loop.",
    shell: `// Bulk insert in Shell\ndb.students.insertMany([\n  { name: "Alice", grade: "A" },\n  { name: "Bob", grade: "B" }\n])`,
    js: `// Node.js Bulk Insert\nconst docs = [{ a: 1 }, { b: 2 }];\nawait db.collection("test").insertMany(docs);`,
    python: `# Python Bulk Insert\ndocs = [{"x": 1}, {"x": 2}]\ndb.test.insert_many(docs)`
  }
};

export default function InsertPage({ params }) {
  const { category } = use(params);
  const theme = themes[category] || themes.javascript;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("shell");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeVars = {
    "--t-primary": theme.primary,
    "--t-primary-light": theme.primaryLight,
    "--t-primary-border": theme.primaryBorder,
    "--t-gradient": theme.gradient,
    "--t-code-accent": theme.codeAccent,
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-stone-900 relative" style={themeVars}>
      <div className="fixed w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none z-0 top-[-180px] right-[-80px] opacity-100 animate-[orbFloat_13s_ease-in-out_infinite_alternate]"
        style={{ background: theme.primaryLight }} />
      <div className="fixed w-[360px] h-[360px] rounded-full blur-[110px] pointer-events-none z-0 bottom-[60px] left-[-100px] opacity-50 animate-[orbFloat_17s_ease-in-out_infinite_alternate-reverse]"
        style={{ background: theme.primaryLight }} />

      <div className="relative z-10">
        <Navbar badge={theme.label} />

        <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
          
          <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto border-r border-stone-900/[0.08] pr-7 hidden lg:block">
            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Your Progress</p>
            <div className="h-[3px] bg-stone-900/[0.07] rounded-full mb-1.5 overflow-hidden">
              <div className="h-full w-1/2 rounded-full" style={{ background: theme.gradient }} />
            </div>
            <p className="font-mono text-[10px] text-stone-500 mb-5">
              <span style={{ color: theme.primary, fontWeight: 600 }}>3 of 6</span> lessons complete
            </p>

            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Course Content</p>
            {/* [SIDEBAR NAVIGATION FIX] */}
            {sidebarItems.map(item => (
              <Link key={item.id} href={`/blog/${category}/${item.slug}`} className="no-underline block">
                <div 
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] cursor-pointer transition-all duration-150 mb-0.5
                    ${item.active ? "border" : "hover:bg-stone-900/[0.04]"}`}
                  style={item.active ? { background: theme.primaryLight, borderColor: theme.primaryBorder } : {}}>
                  <span className="font-mono text-[9px] font-medium min-w-[18px]"
                    style={{ color: item.active || item.done ? theme.primary : "#78716C" }}>
                    {item.done ? "✓" : item.tag}
                  </span>
                  <span className={`text-[13px] font-medium text-stone-900 ${item.active ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                  {item.active && (
                    <div className="w-[3px] h-4 rounded-sm ml-auto shrink-0" style={{ background: theme.gradient }} />
                  )}
                </div>
              </Link>
            ))}
          </aside>

          <main className="flex-1 py-11 px-12 max-w-[780px] min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-7">
              <Link href={`/blog/${category}/database-and-collections`} className="font-mono text-[11px] text-stone-400 no-underline hover:text-stone-500 transition-colors">CRUD</Link>
              <span className="text-stone-300 text-[12px]">/</span>
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Insert Docs</span>
            </div>

            <h1 className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Inserting Documents
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 max-w-[520px] mb-8">
              Data in MongoDB is stored as BSON (Binary JSON). Learn how to populate your collections with single or multiple records.
            </p>

            {Object.entries(insertExamples).map(([key, content], index) => (
              <section key={key} className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-[#001E2B] shrink-0"
                    style={{ background: theme.gradient }}>{index + 1}</div>
                  <h2 className="font-display text-[19px] font-bold text-stone-900 tracking-tight">{content.title}</h2>
                </div>
                <p className="text-[15px] leading-[1.75] text-stone-600 mb-5">{content.desc}</p>

                <div className="rounded-[13px] overflow-hidden bg-[#0E1117] border border-white/[0.06] shadow-2xl">
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161B22] border-b border-white/[0.05]">
                    <div className="flex gap-1">
                      {["shell", "js", "python"].map((id) => (
                        <button key={id} onClick={() => setActiveTab(id)}
                          className={`font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 rounded-[6px] border-none cursor-pointer transition-all duration-150
                            ${activeTab === id ? "" : "bg-transparent text-white/30 hover:bg-white/[0.05]"}`}
                          style={activeTab === id ? { background: theme.primaryLight, color: theme.codeAccent } : {}}>
                          {id === "shell" ? "Shell" : id === "js" ? "JavaScript" : "Python"}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => handleCopy(content[activeTab])}
                      className="font-mono text-[10px] text-white/35 px-3 py-1 rounded-[6px] border border-white/10 bg-transparent cursor-pointer">
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-6 font-mono text-[13px] leading-[1.75] text-[#8B96A8] overflow-x-auto m-0">
                    <code>{content[activeTab]}</code>
                  </pre>
                </div>
              </section>
            ))}

            {/* Next Step Link */}
            <Link href={`/blog/${category}/query-documents`} className="no-underline">
              <div className="flex items-center justify-between p-6 rounded-[16px] bg-stone-900 text-[#F5F3EF] mt-7 cursor-pointer gap-4 shadow-xl hover:bg-stone-800 transition-all">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5F3EF]/35 mb-1.5">Up Next — Lesson 04</div>
                  <div className="font-display text-[18px] font-bold tracking-tight">Querying Documents</div>
                </div>
                <div className="w-10 h-10 rounded-[11px] flex items-center justify-center text-[#001E2B] text-lg"
                  style={{ background: theme.gradient }}>→</div>
              </div>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}