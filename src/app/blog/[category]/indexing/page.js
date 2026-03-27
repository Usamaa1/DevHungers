"use client";
import { useState, use } from "react";
import Link from "next/link";
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-collections",     tag: "02", done: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03", done: true },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04", done: true },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05", done: true },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06", done: true },
  { id: 7, label: "Mastering Indexes",      slug: "indexing",                 tag: "07", active: true },
  { id: 8, label: "Lookup & Joins",         slug: "lookup",                   tag: "08" },
];

const indexSections = [
  {
    id: "overview",
    title: "The Performance Gap",
    context: `// Setup: 10 Million User Database\ndb.users.insertMany([\n  { email: "dev@example.com", name: "UserA" },\n  { email: "pro@example.com", name: "UserB" }\n])`,
    desc: "Without an index, the database reads every document on the disk (Collection Scan). An index organizes data into a B-Tree, allowing the system to skip 99% of documents and find results in milliseconds.",
    shell: `// See if a query uses an index (IXSCAN) or scans everything (COLLSCAN)\ndb.users.find({ email: "dev@example.com" }).explain("executionStats")`,
    js: `await db.collection("users").find({ email: "dev@example.com" }).explain();`,
    python: `users.find({"email": "dev@example.com"}).explain()`
  },
  {
    id: "create",
    title: "Real-World Compound Indexes",
    context: `// Setup: E-commerce Catalog\ndb.products.insertMany([\n  { name: "Laptop", category: "Tech", price: 1200 },\n  { name: "Phone", category: "Tech", price: 800 }\n])`,
    desc: "Apps often filter by 'Category' and sort by 'Price'. A Compound Index pre-sorts data on multiple fields, preventing 'In-Memory Sorts' that slow down or crash servers under high traffic.",
    shell: `// Index for: Category (Asc) + Price (Desc)\ndb.products.createIndex({ category: 1, price: -1 })`,
    js: `await db.collection("products").createIndex({ category: 1, price: -1 });`,
    python: `products.create_index([("category", 1), ("price", -1)])`
  },
  {
    id: "text-search",
    title: "Text Search (Inverted Indexes)",
    context: `// Setup: Digital Library\ndb.books.insertMany([\n  { title: "Node.js Guide", bio: "Server-side JavaScript patterns." },\n  { title: "React Handbook", bio: "Dynamic UI with hooks." }\n])`,
    desc: "Standard indexes match exact strings. Text Indexes tokenize content and remove common words (the, is), enabling keyword-based searches across multiple fields like titles and descriptions.",
    shell: `// Create a text index on multiple fields\ndb.books.createIndex({ title: "text", bio: "text" })\n\n// Search for keywords\ndb.books.find({ $text: { $search: "JavaScript" } })`,
    js: `await db.collection("books").createIndex({ title: "text", bio: "text" });`,
    python: `books.create_index([("title", "text"), ("bio", "text")])`
  },
  {
    id: "manage",
    title: "Maintenance & Write Penalty",
    context: `// Pro-Tip: Indexes speed up READS but slow down WRITES.`,
    desc: "Every index must be updated whenever data is inserted or changed. Over-indexing wastes RAM and slows down your application. Audit frequently and drop unused indexes to maintain health.",
    shell: `// List active indexes\ndb.books.getIndexes()\n\n// Remove a specific index\ndb.books.dropIndex("title_text_bio_text")`,
    js: `await db.collection("books").dropIndex("index_name");`,
    python: `books.drop_index("index_name")`
  }
];

export default function IndexingPage({ params }) {
  const { category } = use(params);
  const theme = themes[category] || themes.javascript;
  const [activeTab, setActiveTab] = useState("shell");
  const [copied, setCopied] = useState(false);

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

      {/* Orbs */}
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
              <div className="h-full w-full rounded-full" style={{ background: theme.gradient }} />
            </div>
            <p className="font-mono text-[10px] text-stone-500 mb-5">
              <span style={{ color: theme.primary, fontWeight: 600 }}>7 of 8</span> lessons complete
            </p>

            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Course Content</p>
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
                  <span className={`text-[13px] font-medium ${item.active ? "text-stone-900 font-semibold" : "text-stone-900"}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </aside>

          {/* ── MAIN ── */}
          <main className="flex-1 py-11 px-12 max-w-[780px] min-w-0">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 mb-7">
              <Link href={`/blog/${category}/introduction`} className="font-mono text-[11px] text-stone-400 no-underline hover:text-stone-500">{theme.label}</Link>
              <span className="text-stone-300 text-[12px]">/</span>
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Mastering Indexes</span>
            </nav>

            <h1
              className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Mastering Indexes
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 mb-8">
              Optimization is the key to scale. Without indexes, your database is just an unorganized pile of data. Use these strategies to keep your application fast as it grows.
            </p>

            {/* Sections */}
            {indexSections.map((section, i) => (
              <section key={section.id} className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">

                {/* Section header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                    style={{ background: theme.gradient }}>{i + 1}</div>
                  <h2 className="font-display text-[19px] font-bold text-stone-900">{section.title}</h2>
                </div>

                {/* Lab Setup block */}
                <div className="mb-5 p-4 rounded-[11px] bg-[#F5F3EF] border border-stone-900/[0.07]">
                  <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-2">Lab Setup — Test Data</p>
                  <pre className="font-mono text-[12px] leading-[1.7] text-stone-500 overflow-x-auto m-0">
                    <code>{section.context}</code>
                  </pre>
                </div>

                <p className="text-[15px] leading-[1.75] text-stone-600 mb-5">{section.desc}</p>

                {/* Code block */}
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
                    <button onClick={() => handleCopy(section[activeTab])} className="font-mono text-[10px] text-white/35 bg-transparent border-none cursor-pointer">
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-6 font-mono text-[13px] leading-[1.75] text-[#8B96A8] overflow-x-auto m-0">
                    <code>{section[activeTab]}</code>
                  </pre>
                </div>

              </section>
            ))}

            {/* Next Step CTA */}
            <Link href={`/blog/${category}/lookup`} className="no-underline">
              <div className="flex items-center justify-between p-6 rounded-[16px] bg-stone-900 text-[#F5F3EF] mt-7 cursor-pointer gap-4 shadow-xl hover:bg-stone-800 transition-all">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5F3EF]/35 mb-1.5">Up Next — Lesson 08</div>
                  <div className="font-display text-[18px] font-bold tracking-tight">Lookup & Joins</div>
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