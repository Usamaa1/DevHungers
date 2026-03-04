"use client";
import { useState, use } from "react";
import Link from "next/link";
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-and-collections",   tag: "02", done: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03", done: true },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04", done: true },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05", done: true },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06", active: true },
];

const deleteSections = [
  {
    id: "deleteOne",
    title: "1. Deleting a Single Document",
    context: `// Setup: Orders to process\ndb.orders.insertMany([\n  { id: 101, status: "cancelled" },\n  { id: 102, status: "shipped" }\n])`,
    desc: "Use deleteOne() to remove the first document that matches your filter. This is most commonly used with unique IDs to ensure you don't delete extra data.",
    shell: `db.orders.deleteOne({ id: 101 })`,
    js: `await db.collection("orders").deleteOne({ id: 101 });`,
    python: `orders.delete_one({ "id": 101 })`
  },
  {
    id: "deleteMany",
    title: "2. Bulk Deletion (deleteMany)",
    context: `// Setup: Expired sessions\ndb.sessions.insertMany([\n  { user: "Ali", expired: true },\n  { user: "Sara", expired: true },\n  { user: "Zain", expired: false }\n])`,
    desc: "Delete every document that matches the criteria. Excellent for clearing logs, expired sessions, or old temporary data.",
    shell: `// Remove all expired sessions\ndb.sessions.deleteMany({ expired: true })`,
    js: `await db.collection("sessions").deleteMany({ expired: true });`,
    python: `sessions.delete_many({ "expired": True })`
  },
  {
    id: "drop",
    title: "3. Dropping Collections & DBs",
    context: `// Warning: This action is irreversible`,
    desc: "When a feature is retired or you need to reset your lab environment, use drop() to delete an entire collection or database instantly.",
    shell: `// Drop the 'logs' collection\ndb.logs.drop()\n\n// Drop the entire current database\ndb.dropDatabase()`,
    js: `await db.collection("logs").drop();\nawait db.dropDatabase();`,
    python: `db.logs.drop()\nclient.drop_database("dev_hungers")`
  }
];

export default function DeletePage({ params }) {
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
      <Navbar badge={theme.label} />
      <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
        
        <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] border-r border-stone-900/[0.08] pr-7 hidden lg:block">
          <p className="font-mono text-[9px] uppercase text-stone-500 mb-3">Course Completion</p>
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
          <h1 className="font-display text-[54px] font-black tracking-tight mb-4 text-gradient" style={{ backgroundImage: theme.gradient }}>
            Deleting Documents
          </h1>
          <p className="text-lg text-stone-500 mb-12">
            The final stage of the lifecycle. Learn how to remove data precisely or clear entire datasets when they are no longer needed.
          </p>

          {deleteSections.map((section, i) => (
            <div key={section.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-white font-mono text-xs">{i + 1}</span>
                 <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="mb-6 p-6 rounded-2xl bg-white border border-stone-200 border-l-4" style={{ borderLeftColor: theme.primary }}>
                 <p className="font-mono text-[10px] uppercase text-stone-400 mb-3">Lab Setup: Documents to Remove</p>
                 <pre className="font-mono text-[13px] text-stone-600"><code>{section.context}</code></pre>
              </div>

              <p className="text-stone-500 mb-6 leading-relaxed">{section.desc}</p>

              <div className="rounded-2xl overflow-hidden bg-[#0E1117] border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-[#161B22]">
                  <div className="flex gap-2">
                    {["shell", "js", "python"].map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase transition-all ${activeTab === tab ? "text-white" : "text-stone-500"}`}
                        style={activeTab === tab ? { background: theme.primaryLight, color: theme.codeAccent } : {}}>
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => handleCopy(section[activeTab])} className="text-stone-500 hover:text-white transition-colors">
                    {copied ? "✓" : "COPY"}
                  </button>
                </div>
                <pre className="p-7 font-mono text-[14px] text-stone-300 overflow-x-auto">
                  <code>{section[activeTab]}</code>
                </pre>
              </div>
            </div>
          ))}

          {/* Course Completion Section */}
          <div className="p-10 rounded-[40px] bg-white border border-stone-200 text-center shadow-sm">
             <div className="text-4xl mb-4">🎓</div>
             <h3 className="text-2xl font-bold mb-2">MongoDB CRUD Mastered!</h3>
             <p className="text-stone-500 mb-8 max-w-[400px] mx-auto">
                You've officially completed the core MongoDB operations. You can now Create, Read, Update, and Delete data like a pro.
             </p>
             <Link href="/blog" className="no-underline px-8 py-4 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition-all">
                Browse More Courses
             </Link>
          </div>
        </main>
      </div>
    </div>
  );
}