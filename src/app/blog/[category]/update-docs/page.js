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
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05", active: true },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
];

const updateSections = [
  {
    id: "set",
    title: "1. The $set Operator",
    context: `// Initial Data:\ndb.users.insertOne({\n  username: "sawera_dev",\n  status: "pending",\n  bio: "Old bio"\n})`,
    desc: "Use $set to replace the value of a field. If the field doesn't exist, MongoDB will create it. This is the most common update query.",
    shell: `db.users.updateOne(\n  { username: "sawera_dev" },\n  { $set: { status: "active", bio: "Fullstack Developer" } }\n)`,
    js: `await db.collection("users").updateOne(\n  { username: "sawera_dev" },\n  { $set: { status: "active" } }\n);`,
    python: `users.update_one({ "username": "sawera_dev" }, { "$set": { "status": "active" } })`
  },
  {
    id: "inc",
    title: "2. The $inc Operator (Increment)",
    context: `// Initial Data:\ndb.products.insertOne({ name: "Laptop", stock: 10, views: 100 })`,
    desc: "Perfect for counters, stock management, or scoring. $inc adds or subtracts a value from an existing number field.",
    shell: `// Increment views by 1 and decrease stock by 1\ndb.products.updateOne(\n  { name: "Laptop" },\n  { $inc: { views: 1, stock: -1 } }\n)`,
    js: `await db.collection("products").updateOne(\n  { name: "Laptop" },\n  { $inc: { stock: -1 } }\n);`,
    python: `products.update_one({ "name": "Laptop" }, { "$inc": { "views": 1 } })`
  },
  {
    id: "array-push",
    title: "3. Updating Arrays ($push & $pull)",
    context: `// Initial Data:\ndb.posts.insertOne({\n  title: "MongoDB Guide",\n  tags: ["NoSQL"]\n})`,
    desc: "$push adds an item to an array, while $pull removes it. This is vital for comments, tags, or follower lists.",
    shell: `// Add 'Database' to tags\ndb.posts.updateOne(\n  { title: "MongoDB Guide" },\n  { $push: { tags: "Database" } }\n)`,
    js: `await db.collection("posts").updateOne(\n  { title: "MongoDB Guide" },\n  { $push: { tags: "Database" } }\n);`,
    python: `posts.update_one({ "title": "MongoDB Guide" }, { "$push": { "tags": "Database" } })`
  },
  {
    id: "upsert",
    title: "4. The Upsert Option",
    context: `// Collection might be empty`,
    desc: "An 'upsert' (Update + Insert) tells MongoDB: 'If you find the document, update it. If not, create a new one.'",
    shell: `db.settings.updateOne(\n  { user: "admin" },\n  { $set: { theme: "dark" } },\n  { upsert: true }\n)`,
    js: `await db.collection("settings").updateOne(\n  { user: "admin" },\n  { $set: { theme: "dark" } },\n  { upsert: true }\n);`,
    python: `settings.update_one({ "user": "admin" }, { "$set": { "theme": "dark" } }, upsert=True)`
  }
];

export default function UpdatePage({ params }) {
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
          <p className="font-mono text-[9px] uppercase text-stone-500 mb-3">Progress</p>
          <div className="h-[3.5px] bg-stone-900/[0.07] rounded-full mb-5 overflow-hidden">
            <div className="h-full w-5/6 rounded-full" style={{ background: theme.gradient }} />
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
            Updating Documents
          </h1>
          <p className="text-lg text-stone-500 mb-12">
            Dynamic applications require constant data changes. Learn how to modify documents safely using atomic operators.
          </p>

          {updateSections.map((section, i) => (
            <div key={section.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-white font-mono text-xs">{i + 1}</span>
                 <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="mb-6 p-6 rounded-2xl bg-white border border-stone-200 border-l-4" style={{ borderLeftColor: theme.primary }}>
                 <p className="font-mono text-[10px] uppercase text-stone-400 mb-3">Target Document (Before Update)</p>
                 <pre className="font-mono text-[13px] text-stone-600"><code>{section.context}</code></pre>
              </div>

              <p className="text-stone-500 mb-6">{section.desc}</p>

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

          <Link href={`/blog/${category}/delete-docs`} className="no-underline">
            <div className="p-8 rounded-[32px] bg-stone-900 text-white flex items-center justify-between group hover:bg-stone-800 transition-all shadow-xl">
               <div>
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-2">Final Step</p>
                  <h3 className="text-2xl font-bold">Lesson 06: Deleting Documents</h3>
               </div>
               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black transition-transform group-hover:translate-x-3">→</div>
            </div>
          </Link>
        </main>
      </div>
    </div>
  );
}