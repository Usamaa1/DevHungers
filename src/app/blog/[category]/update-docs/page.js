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
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05", active: true },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
  { id: 7, label: "Mastering Indexes",      slug: "indexing",                 tag: "07" },
  { id: 8, label: "Lookup & Joins",         slug: "lookup",                   tag: "08" },
];

const updateSections = [
  {
    id: "set",
    title: "The $set Operator",
    context: `// Initial Data:\ndb.users.insertOne({\n  username: "sawera_dev",\n  status: "pending",\n  bio: "Old bio"\n})`,
    desc: "Use $set to replace the value of a field. If the field doesn't exist, MongoDB will create it. This is the most common update query.",
    shell: `db.users.updateOne(\n  { username: "sawera_dev" },\n  { $set: { status: "active", bio: "Fullstack Developer" } }\n)`,
    js: `await db.collection("users").updateOne(\n  { username: "sawera_dev" },\n  { $set: { status: "active" } }\n);`,
    python: `users.update_one({ "username": "sawera_dev" }, { "$set": { "status": "active" } })`
  },
  {
    id: "inc",
    title: "The $inc Operator (Increment)",
    context: `// Initial Data:\ndb.products.insertOne({ name: "Laptop", stock: 10, views: 100 })`,
    desc: "Perfect for counters, stock management, or scoring. $inc adds or subtracts a value from an existing number field.",
    shell: `// Increment views by 1 and decrease stock by 1\ndb.products.updateOne(\n  { name: "Laptop" },\n  { $inc: { views: 1, stock: -1 } }\n)`,
    js: `await db.collection("products").updateOne(\n  { name: "Laptop" },\n  { $inc: { stock: -1 } }\n);`,
    python: `products.update_one({ "name": "Laptop" }, { "$inc": { "views": 1 } })`
  },
  {
    id: "array-push",
    title: "Updating Arrays ($push & $pull)",
    context: `// Initial Data:\ndb.posts.insertOne({\n  title: "MongoDB Guide",\n  tags: ["NoSQL"]\n})`,
    desc: "$push adds an item to an array, while $pull removes it. This is vital for comments, tags, or follower lists.",
    shell: `// Add 'Database' to tags\ndb.posts.updateOne(\n  { title: "MongoDB Guide" },\n  { $push: { tags: "Database" } }\n)`,
    js: `await db.collection("posts").updateOne(\n  { title: "MongoDB Guide" },\n  { $push: { tags: "Database" } }\n);`,
    python: `posts.update_one({ "title": "MongoDB Guide" }, { "$push": { "tags": "Database" } })`
  },
  {
    id: "upsert",
    title: "The Upsert Option",
    context: `// Collection might be empty`,
    desc: "An 'upsert' (Update + Insert) tells MongoDB: 'If you find the document, update it. If not, create a new one.'",
    shell: `db.settings.updateOne(\n  { user: "admin" },\n  { $set: { theme: "dark" } },\n  { upsert: true }\n)`,
    js: `await db.collection("settings").updateOne(\n  { user: "admin" },\n  { $set: { theme: "dark" } },\n  { upsert: true }\n);`,
    python: `settings.update_one({ "user": "admin" }, { "$set": { "theme": "dark" } }, upsert=True)`
  },
  {
    id: "update-many",
    title: "Bulk Updates (updateMany)",
    context: `// Initial Data:\ndb.users.insertMany([\n  { username: "ali", plan: "free", verified: false },\n  { username: "sara", plan: "free", verified: false },\n  { username: "zain", plan: "pro", verified: true }\n])`,
    desc: "While updateOne() stops at the first match, updateMany() applies your changes to every document that matches the filter. Use with caution — there is no undo.",
    shell: `// Mark all free-plan users as unverified\ndb.users.updateMany(\n  { plan: "free" },\n  { $set: { verified: false } }\n)`,
    js: `await db.collection("users").updateMany(\n  { plan: "free" },\n  { $set: { verified: false } }\n);`,
    python: `users.update_many({ "plan": "free" }, { "$set": { "verified": False } })`
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
              <div className="h-full w-5/6 rounded-full" style={{ background: theme.gradient }} />
            </div>
            <p className="font-mono text-[10px] text-stone-500 mb-5">
              <span style={{ color: theme.primary, fontWeight: 600 }}>5 of 6</span> lessons complete
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
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Update Docs</span>
            </nav>

            <h1
              className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Updating Documents
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 mb-8">
              Dynamic applications require constant data changes. Learn how to modify documents safely using atomic operators.
            </p>

            {/* Sections */}
            {updateSections.map((section, i) => (
              <section key={section.id} className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">

                {/* Section header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                    style={{ background: theme.gradient }}>{i + 1}</div>
                  <h2 className="font-display text-[19px] font-bold text-stone-900">{section.title}</h2>
                </div>

                {/* Lab Setup block */}
                <div className="mb-5 p-4 rounded-[11px] bg-[#F5F3EF] border border-stone-900/[0.07]">
                  <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-2">Target Document — Before Update</p>
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
            <Link href={`/blog/${category}/delete-docs`} className="no-underline">
              <div className="flex items-center justify-between p-6 rounded-[16px] bg-stone-900 text-[#F5F3EF] mt-7 cursor-pointer gap-4 shadow-xl hover:bg-stone-800 transition-all">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5F3EF]/35 mb-1.5">Up Next — Lesson 06</div>
                  <div className="font-display text-[18px] font-bold tracking-tight">Deleting Documents</div>
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