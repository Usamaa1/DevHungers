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
    title: "1. The Performance Gap",
    context: `// Setup: 10 Million User Database\ndb.users.insertMany([\n  { email: "dev@example.com", name: "UserA" },\n  { email: "pro@example.com", name: "UserB" }\n])`,
    desc: "Without an index, the database reads every document on the disk (Collection Scan). An index organizes data into a B-Tree, allowing the system to skip 99% of documents and find results in milliseconds.",
    shell: `// See if a query uses an index (IXSCAN) or scans everything (COLLSCAN)\ndb.users.find({ email: "dev@example.com" }).explain("executionStats")`,
    js: `await db.collection("users").find({ email: "dev@example.com" }).explain();`,
    python: `users.find({"email": "dev@example.com"}).explain()`
  },
  {
    id: "create",
    title: "2. Real-World Compound Indexes",
    context: `// Setup: E-commerce Catalog\ndb.products.insertMany([\n  { name: "Laptop", category: "Tech", price: 1200 },\n  { name: "Phone", category: "Tech", price: 800 }\n])`,
    desc: "Apps often filter by 'Category' and sort by 'Price'. A Compound Index pre-sorts data on multiple fields, preventing 'In-Memory Sorts' that slow down or crash servers under high traffic.",
    shell: `// Index for: Category (Asc) + Price (Desc)\ndb.products.createIndex({ category: 1, price: -1 })`,
    js: `await db.collection("products").createIndex({ category: 1, price: -1 });`,
    python: `products.create_index([("category", 1), ("price", -1)])`
  },
  {
    id: "text-search",
    title: "3. Text Search (Inverted Indexes)",
    context: `// Setup: Digital Library\ndb.books.insertMany([\n  { title: "Node.js Guide", bio: "Server-side JavaScript patterns." },\n  { title: "React Handbook", bio: "Dynamic UI with hooks." }\n])`,
    desc: "Standard indexes match exact strings. Text Indexes tokenize content and remove common words (the, is), enabling keyword-based searches across multiple fields like titles and descriptions.",
    shell: `// Create a text index on multiple fields\ndb.books.createIndex({ title: "text", bio: "text" })\n\n// Search for keywords\ndb.books.find({ $text: { $search: "JavaScript" } })`,
    js: `await db.collection("books").createIndex({ title: "text", bio: "text" });`,
    python: `books.create_index([("title", "text"), ("bio", "text")])`
  },
  {
    id: "manage",
    title: "4. Maintenance & Write Penalty",
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
      <Navbar badge={theme.label} />
      <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
        
        <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] border-r border-stone-900/[0.08] pr-7 hidden lg:block scrollbar-hide">
          <p className="font-mono text-[9px] uppercase text-stone-500 mb-3 tracking-widest text-center">Course Progress</p>
          <div className="h-[3.5px] bg-stone-900/[0.07] rounded-full mb-5 overflow-hidden">
            <div className="h-full w-full rounded-full" style={{ background: theme.gradient }} />
          </div>
          {sidebarItems.map(item => (
            <Link key={item.id} href={`/blog/${category}/${item.slug}`} className="no-underline block">
              <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 transition-all ${item.active ? "bg-white border border-stone-200 shadow-sm" : "hover:bg-stone-200/40"}`}>
                <span className="font-mono text-[10px]" style={{ color: item.active || item.done ? theme.primary : "#A8A29E" }}>{item.done ? "✓" : item.tag}</span>
                <span className={`text-[13px] ${item.active ? "font-bold text-stone-900" : "text-stone-500"}`}>{item.label}</span>
              </div>
            </Link>
          ))}
        </aside>

        <main className="flex-1 py-11 px-12 max-w-[820px] min-w-0">
          <h1 className="font-display text-[54px] font-black tracking-tighter mb-4 text-gradient leading-tight" style={{ backgroundImage: theme.gradient }}>
            Mastering Indexes
          </h1>
          <p className="text-lg text-stone-500 mb-12 leading-relaxed">
            Optimization is the key to scale. Without indexes, your database is just an unorganized pile of data. Use these strategies to keep your application fast as it grows.
          </p>

          {indexSections.map((section, i) => (
            <div key={section.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-white font-mono text-xs">{i + 1}</span>
                 <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              </div>

              <div className="mb-6 p-6 rounded-2xl bg-white border border-stone-200 border-l-4 shadow-sm" style={{ borderLeftColor: theme.primary }}>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">Lab Setup: Test Data</p>
                 <pre className="font-mono text-[13px] text-stone-600 overflow-x-auto"><code>{section.context}</code></pre>
              </div>

              <p className="text-stone-500 mb-6 leading-relaxed text-[15px]">{section.desc}</p>

              <div className="rounded-2xl overflow-hidden bg-[#0E1117] border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-white/5">
                  <div className="flex gap-2">
                    {["shell", "js", "python"].map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase transition-all ${activeTab === tab ? "text-white shadow-inner" : "text-stone-500 hover:text-stone-300"}`}
                        style={activeTab === tab ? { background: theme.primaryLight, color: theme.codeAccent } : {}}>
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => handleCopy(section[activeTab])} className="text-stone-500 hover:text-white text-[10px] font-mono">
                    {copied ? "✓" : "COPY"}
                  </button>
                </div>
                <pre className="p-7 font-mono text-[14px] leading-relaxed text-stone-300 overflow-x-auto">
                  <code>{section[activeTab]}</code>
                </pre>
              </div>
            </div>
          ))}

          {/* New Next Page Section */}
          <Link href={`/blog/${category}/lookup`} className="no-underline">
            <div className="p-8 rounded-[32px] bg-stone-900 text-white flex items-center justify-between group hover:bg-stone-800 transition-all shadow-xl mt-12">
               <div>
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-2">Relational Logic</p>
                  <h3 className="text-2xl font-bold">Lesson 08: Lookup & Joins</h3>
               </div>
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black transition-transform group-hover:translate-x-3 shadow-lg">→</div>
            </div>
          </Link>
        </main>
      </div>
    </div>
  );
}