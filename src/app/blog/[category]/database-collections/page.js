"use client";
import { useState, use } from "react";
import Link from "next/link"; // Required for navigation
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-and-collections",   tag: "02", active: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",         tag: "03" },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04" },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05" },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
];

const setupContent = {
  db: {
    title: "1. Creating a Database",
    desc: "In MongoDB, you don't need to 'create' a database explicitly. You simply switch to the one you want to use. MongoDB only actually creates it once you save the first piece of data.",
    js: `// Using the MongoDB Node.js Driver\nconst db = client.db("dev_hungers");\nconsole.log("Switched to dev_hungers database");`,
    python: `# Using PyMongo\ndb = client["dev_hungers"]\nprint("Database initialized")`,
    shell: `# In mongosh\nuse dev_hungers`
  },
  collection: {
    title: "2. Creating a Collection",
    desc: "Collections are like tables in SQL. You can create them explicitly to set options like validation, or implicitly by just inserting a document.",
    js: `// Explicit creation with Node.js\nawait db.createCollection("students");`,
    python: `# Implicit creation in Python\ncollection = db["students"]`,
    shell: `# Create collection explicitly\ndb.createCollection("students")`
  }
};

export default function TutorialPage({ params }) {
  const { category, slug } = use(params);
  const theme = themes[category] || themes.javascript;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("shell"); // Shell as first option

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
          
          {/* ── SIDEBAR ── */}
          <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto border-r border-stone-900/[0.08] pr-7 hidden lg:block">
            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Your Progress</p>
            <div className="h-[3px] bg-stone-900/[0.07] rounded-full mb-1.5 overflow-hidden">
              <div className="h-full w-1/3 rounded-full" style={{ background: theme.gradient }} />
            </div>
            <p className="font-mono text-[10px] text-stone-500 mb-5">
              <span style={{ color: theme.primary, fontWeight: 600 }}>2 of 6</span> lessons complete
            </p>

            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Course Content</p>
            {sidebarItems.map(item => (
              <Link key={item.id} href={`/blog/${category}/${item.slug}`} className="no-underline block">
                <div className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] cursor-pointer transition-all duration-150 mb-0.5
                  ${item.active ? "border" : "hover:bg-stone-900/[0.04]"}`}
                  style={item.active ? { background: theme.primaryLight, borderColor: theme.primaryBorder } : {}}>
                  <span className="font-mono text-[9px] font-medium min-w-[18px]"
                    style={{ color: item.active || item.done ? theme.primary : "#78716C" }}>
                    {item.done ? "✓" : item.tag}
                  </span>
                  <span className={`text-[13px] font-medium ${item.active ? "text-stone-900 font-semibold" : "text-stone-900"}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </aside>

          {/* ── MAIN ── */}
          <main className="flex-1 py-11 px-12 max-w-[780px] min-w-0">
            <nav className="flex items-center gap-1.5 mb-7">
              <Link href={`/blog/${category}/introduction`} className="font-mono text-[11px] text-stone-400 no-underline hover:text-stone-500">{theme.label}</Link>
              <span className="text-stone-300 text-[12px]">/</span>
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>DB & Collections</span>
            </nav>

            <h1 className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Database & Collections
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 mb-8">
              Before storing data, you need a container. Learn how to initialize your environment in {theme.label}.
            </p>

            {/* Section 1: Creating Database */}
            <section className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                  style={{ background: theme.gradient }}>1</div>
                <h2 className="font-display text-[19px] font-bold text-stone-900">{setupContent.db.title}</h2>
              </div>
              <p className="text-[15px] leading-[1.75] text-stone-600 mb-5">{setupContent.db.desc}</p>

              <div className="rounded-[13px] overflow-hidden bg-[#0E1117] border border-white/[0.06]">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161B22]">
                  <div className="flex gap-1">
                    {["shell", "js", "python"].map((id) => (
                      <button key={id} onClick={() => setActiveTab(id)}
                        className={`font-mono text-[10px] px-2.5 py-1 rounded-[6px] border-none cursor-pointer ${activeTab === id ? "" : "text-white/30"}`}
                        style={activeTab === id ? { background: theme.primaryLight, color: theme.codeAccent } : {}}>
                        {id === "shell" ? "Shell" : id === "js" ? "JavaScript" : "Python"}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => handleCopy(setupContent.db[activeTab])} className="font-mono text-[10px] text-white/35 bg-transparent border-none cursor-pointer">
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-6 font-mono text-[13px] leading-[1.75] text-[#8B96A8] overflow-x-auto m-0">
                  <code>{setupContent.db[activeTab]}</code>
                </pre>
              </div>
            </section>

            {/* Section 2: Creating Collection */}
            <section className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                  style={{ background: theme.gradient }}>2</div>
                <h2 className="font-display text-[19px] font-bold text-stone-900">{setupContent.collection.title}</h2>
              </div>
              <p className="text-[15px] leading-[1.75] text-stone-600 mb-5">{setupContent.collection.desc}</p>

              <div className="rounded-[13px] overflow-hidden bg-[#0E1117] border border-white/[0.06]">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161B22]">
                  <div className="flex gap-1">
                    {["shell", "js", "python"].map((id) => (
                      <button key={id} onClick={() => setActiveTab(id)}
                        className={`font-mono text-[10px] px-2.5 py-1 rounded-[6px] border-none cursor-pointer ${activeTab === id ? "" : "text-white/30"}`}
                        style={activeTab === id ? { background: theme.primaryLight, color: theme.codeAccent } : {}}>
                        {id === "shell" ? "Shell" : id === "js" ? "JavaScript" : "Python"}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => handleCopy(setupContent.collection[activeTab])} className="font-mono text-[10px] text-white/35 bg-transparent border-none cursor-pointer">
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-6 font-mono text-[13px] leading-[1.75] text-[#8B96A8] overflow-x-auto m-0">
                  <code>{setupContent.collection[activeTab]}</code>
                </pre>
              </div>
            </section>

            {/* Next step Button Linked */}
            <Link href={`/blog/${category}/insert-documents`} className="no-underline">
              <div className="flex items-center justify-between p-6 rounded-[16px] bg-stone-900 text-[#F5F3EF] mt-7 cursor-pointer gap-4 shadow-xl hover:bg-stone-800 transition-all">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5F3EF]/35 mb-1.5">Up Next — Lesson 03</div>
                  <div className="font-display text-[18px] font-bold tracking-tight">Insert Documents</div>
                </div>
                <div className="w-10 h-10 rounded-[11px] shrink-0 flex items-center justify-center text-[#001E2B] text-lg"
                  style={{ background: theme.gradient }}>→</div>
              </div>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}