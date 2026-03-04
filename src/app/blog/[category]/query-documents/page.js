"use client";
import { useState, use } from "react";
import Link from "next/link";
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-and-collections",   tag: "02", done: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03", done: true },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04", active: true },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05" },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
];

const querySections = [
  {
    id: "basic",
    title: "1. The Equality Match",
    context: `// Setup: Multiple batches with same SKU\ndb.products.insertMany([\n  { sku: "LAP-1024", name: "Pro Book", stock: 50 },\n  { sku: "MOU-500", name: "Wireless Mouse", stock: 120 },\n  { sku: "LAP-1024", name: "Batch B", stock: 5 }\n])`,
    desc: "Match a field exactly. Note that MongoDB returns ALL documents that match the criteria, not just the first one.",
    shell: `db.products.find({ sku: "LAP-1024" })`,
    js: `await db.collection("products").find({ sku: "LAP-1024" }).toArray();`,
    python: `products.find({ "sku": "LAP-1024" })`
  },
  {
    id: "projection",
    title: "2. Projections (Selecting Fields)",
    context: `// Setup: Document with sensitive data\ndb.users.insertOne({\n  username: "sawera_y",\n  email: "sawera@example.com",\n  password: "hashed_secret_123",\n  role: "admin"\n})`,
    desc: "Projections allow you to include (1) or exclude (0) specific fields. Use this to hide passwords or reduce the size of the data sent to your frontend.",
    shell: `// Return only username and email, hide _id\ndb.users.find(\n  { username: "sawera_y" },\n  { username: 1, email: 1, _id: 0 }\n)`,
    js: `await db.collection("users").find(\n  { username: "sawera_y" },\n  { projection: { username: 1, email: 1, _id: 0 } }\n).toArray();`,
    python: `users.find({ "username": "sawera_y" }, { "username": 1, "email": 1, "_id": 0 })`
  },
  {
    id: "arrays",
    title: "3. Array Deep Dive ($all & $size)",
    context: `// Setup: Posts with varying tag counts\ndb.posts.insertMany([\n  { title: "React Guide", tags: ["React", "Nextjs"] },\n  { title: "JS Basics", tags: ["JavaScript"] },\n  { title: "FullStack", tags: ["React", "Node", "MongoDB"] }\n])`,
    desc: "Target array length with $size, or ensure a document contains multiple specific tags using $all.",
    shell: `// Find posts with exactly 3 tags\ndb.posts.find({ tags: { $size: 3 } })\n\n// Find posts containing both React and Nextjs\ndb.posts.find({ tags: { $all: ["React", "Nextjs"] } })`,
    js: `await db.collection("posts").find({ tags: { $size: 3 } }).toArray();`,
    python: `posts.find({ "tags": { "$size": 3 } })`
  },
  {
    id: "sort",
    title: "4. Sorting and Limiting",
    context: `// Setup: Leaderboard data\ndb.scores.insertMany([\n  { user: "Ali", points: 450 },\n  { user: "Sara", points: 900 },\n  { user: "Zain", points: 150 }\n])`,
    desc: "Use sort() for ordering (1 for ascending, -1 for descending) and limit() to restrict the number of results, perfect for pagination.",
    shell: `// Top 2 highest scores\ndb.scores.find().sort({ points: -1 }).limit(2)`,
    js: `await db.collection("scores").find().sort({ points: -1 }).limit(2).toArray();`,
    python: `scores.find().sort("points", -1).limit(2)`
  },
  {
    id: "regex",
    title: "5. Pattern Matching ($regex)",
    context: `// Setup: Searchable user list\ndb.users.insertMany([\n  { name: "Sawera Younus", bio: "Fullstack Developer" },\n  { name: "Ali Ahmed", bio: "Frontend Enthusiast" },\n  { name: "Zainab", bio: "Backend Engineer" }\n])`,
    desc: "Use Regular Expressions to perform 'Search' functionality. The 'i' option makes the search case-insensitive, which is standard for search bars.",
    shell: `// Find any user with "sawera" in their name (case-insensitive)\ndb.users.find({ name: { $regex: /sawera/i } })`,
    js: `await db.collection("users").find({\n  name: { $regex: "sawera", $options: "i" }\n}).toArray();`,
    python: `users.find({ "name": { "$regex": "sawera", "$options": "i" } })`
  },
 {
    id: "exists-type",
    title: "6. Element Filtering ($exists & $type)",
    context: `// Setup: Mixed data types in a 'phone' field\ndb.profiles.insertMany([\n  { user: "Ali", phone: "0300-1234567" },       // Type: String (2)\n  { user: "Sara", phone: 923001234567 },      // Type: Number (1)\n  { user: "Zain", github: "zain-dev" }         // Field Missing\n])`,
    desc: "Use $exists to find documents with a specific field. Use $type to ensure data integrity—for example, finding only users whose phone number was saved as a String.",
    shell: `// Find users who have a 'phone' field AND it is a String\ndb.profiles.find({ \n  phone: { $exists: true, $type: "string" } \n})`,
    js: `// Using string alias for type\nawait db.collection("profiles").find({\n  phone: { $exists: true, $type: "string" }\n}).toArray();`,
    python: `profiles.find({\n    "phone": { "$exists": True, "$type": "string" }\n})`
  }
];

export default function QueryDeepDive({ params }) {
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
      <div className="fixed w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none z-0 top-[-180px] right-[-80px] opacity-100"
        style={{ background: theme.primaryLight }} />

      <div className="relative z-10">
        <Navbar badge={theme.label} />

        <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
          
          <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto border-r border-stone-900/[0.08] pr-7 hidden lg:block scrollbar-hide">
            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Roadmap</p>
            <div className="h-[3.5px] bg-stone-900/[0.07] rounded-full mb-5 overflow-hidden">
              <div className="h-full w-2/3 rounded-full" style={{ background: theme.gradient }} />
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
            <h1 className="font-display text-[54px] font-black leading-tight tracking-[-2.5px] mb-4 text-gradient" style={{ backgroundImage: theme.gradient }}>
              Querying Documents
            </h1>
            <p className="text-lg text-stone-500 mb-12 leading-relaxed">
              Mastering the <strong>find()</strong> method involves not just locating data, but shaping exactly how that data returns to your application.
            </p>

            {querySections.map((section, i) => (
              <div key={section.id} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                   <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-white font-mono text-xs">{i + 1}</span>
                   <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                </div>

                <div className="mb-6 p-6 rounded-2xl bg-white border border-stone-200 border-l-4 shadow-sm" style={{ borderLeftColor: theme.primary }}>
                   <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">Lab Setup: Run this First</p>
                   <pre className="font-mono text-[13px] text-stone-600 overflow-x-auto"><code>{section.context}</code></pre>
                </div>

                <p className="text-stone-500 mb-6 leading-relaxed">{section.desc}</p>

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
                    <button onClick={() => handleCopy(section[activeTab])} className="text-stone-500 hover:text-white transition-colors">
                      {copied ? "✓" : <span className="text-[10px] font-mono">COPY QUERY</span>}
                    </button>
                  </div>
                  <pre className="p-7 font-mono text-[14px] leading-relaxed text-stone-300 overflow-x-auto">
                    <code>{section[activeTab]}</code>
                  </pre>
                </div>
              </div>
            ))}

            <Link href={`/blog/${category}/update-docs`} className="no-underline">
              <div className="p-8 rounded-[32px] bg-stone-900 text-white flex items-center justify-between group hover:bg-stone-800 transition-all shadow-xl mt-10">
                 <div>
                    <p className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-2">Ready to Modify?</p>
                    <h3 className="text-2xl font-bold">Lesson 05: Updating Documents</h3>
                 </div>
                 <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black transition-transform group-hover:translate-x-3">→</div>
              </div>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}