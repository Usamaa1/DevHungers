"use client";
import { useState, use } from "react";
import Link from "next/link";
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", done: true },
  { id: 2, label: "Database & Collections", slug: "database-collections",     tag: "02", done: true },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03", done: true },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04", active: true },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05" },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
  { id: 7, label: "Mastering Indexes",      slug: "indexing",                 tag: "07" },
  { id: 8, label: "Lookup & Joins",         slug: "lookup",                   tag: "08" },
];

const querySections = [
  {
    id: "all",
    title: "Fetch All Documents",
    context: `// Setup: Prepare a collection with some data\ndb.products.insertMany([\n  { name: "MacBook Pro", category: "Laptops" },\n  { name: "iPhone 15", category: "Phones" }\n])`,
    desc: "The simplest query is an empty find(). It retrieves every single document within a collection. In large datasets, this is usually combined with .limit() to avoid performance issues.",
    shell: `db.products.find({}) \n// or simply\ndb.products.find()`,
    js: `// Fetching all as an array\nawait db.collection("products").find({}).toArray();`,
    python: `products.find({})`
  },
  {
    id: "basic",
    title: "The Equality Match",
    context: `// Setup: Multiple batches with same SKU\ndb.products.insertMany([\n  { sku: "LAP-1024", name: "Pro Book", stock: 50 },\n  { sku: "MOU-500", name: "Wireless Mouse", stock: 120 },\n  { sku: "LAP-1024", name: "Batch B", stock: 5 }\n])`,
    desc: "Match a field exactly. Note that MongoDB returns ALL documents that match the criteria, not just the first one.",
    shell: `db.products.find({ sku: "LAP-1024" })`,
    js: `await db.collection("products").find({ sku: "LAP-1024" }).toArray();`,
    python: `products.find({ "sku": "LAP-1024" })`
  },
  {
    id: "projection",
    title: "Projections (Selecting Fields)",
    context: `// Setup: Document with sensitive data\ndb.users.insertOne({\n  username: "sawera_y",\n  email: "sawera@example.com",\n  password: "hashed_secret_123",\n  role: "admin"\n})`,
    desc: "Projections allow you to include (1) or exclude (0) specific fields. Use this to hide passwords or reduce the size of the data sent to your frontend.",
    shell: `// Return only username and email, hide _id\ndb.users.find(\n  { username: "sawera_y" },\n  { username: 1, email: 1, _id: 0 }\n)`,
    js: `await db.collection("users").find(\n  { username: "sawera_y" },\n  { projection: { username: 1, email: 1, _id: 0 } }\n).toArray();`,
    python: `users.find({ "username": "sawera_y" }, { "username": 1, "email": 1, "_id": 0 })`
  },
  {
    id: "arrays",
    title: "Array Deep Dive ($all & $size)",
    context: `// Setup: Posts with varying tag counts\ndb.posts.insertMany([\n  { title: "React Guide", tags: ["React", "Nextjs"] },\n  { title: "JS Basics", tags: ["JavaScript"] },\n  { title: "FullStack", tags: ["React", "Node", "MongoDB"] }\n])`,
    desc: "Target array length with $size, or ensure a document contains multiple specific tags using $all.",
    shell: `// Find posts with exactly 3 tags\ndb.posts.find({ tags: { $size: 3 } })\n\n// Find posts containing both React and Nextjs\ndb.posts.find({ tags: { $all: ["React", "Nextjs"] } })`,
    js: `await db.collection("posts").find({ tags: { $size: 3 } }).toArray();`,
    python: `posts.find({ "tags": { "$size": 3 } })`
  },
  {
    id: "sort",
    title: "Sorting and Limiting",
    context: `// Setup: Leaderboard data\ndb.scores.insertMany([\n  { user: "Ali", points: 450 },\n  { user: "Sara", points: 900 },\n  { user: "Zain", points: 150 }\n])`,
    desc: "Use sort() for ordering (1 for ascending, -1 for descending) and limit() to restrict the number of results, perfect for pagination.",
    shell: `// Top 2 highest scores\ndb.scores.find().sort({ points: -1 }).limit(2)`,
    js: `await db.collection("scores").find().sort({ points: -1 }).limit(2).toArray();`,
    python: `scores.find().sort("points", -1).limit(2)`
  },
  {
    id: "regex",
    title: "Pattern Matching ($regex)",
    context: `// Setup: Searchable user list\ndb.users.insertMany([\n  { name: "Sawera Younus", bio: "Fullstack Developer" },\n  { name: "Ali Ahmed", bio: "Frontend Enthusiast" },\n  { name: "Zainab", bio: "Backend Engineer" }\n])`,
    desc: "Use Regular Expressions to perform 'Search' functionality. The 'i' option makes the search case-insensitive, which is standard for search bars.",
    shell: `// Find any user with "sawera" in their name (case-insensitive)\ndb.users.find({ name: { $regex: /sawera/i } })`,
    js: `await db.collection("users").find({\n  name: { $regex: "sawera", $options: "i" }\n}).toArray();`,
    python: `users.find({ "name": { "$regex": "sawera", "$options": "i" } })`
  },
  {
    id: "exists-type",
    title: "Element Filtering ($exists & $type)",
    context: `// Setup: Mixed data types in a 'phone' field\ndb.profiles.insertMany([\n  { user: "Ali", phone: "0300-1234567" },\n  { user: "Sara", phone: 923001234567 },\n  { user: "Zain", github: "zain-dev" }\n])`,
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

      {/* Orbs — both, matching reference */}
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
              <div className="h-full w-2/3 rounded-full" style={{ background: theme.gradient }} />
            </div>
            <p className="font-mono text-[10px] text-stone-500 mb-5">
              <span style={{ color: theme.primary, fontWeight: 600 }}>4 of 6</span> lessons complete
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
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Query Documents</span>
            </nav>

            <h1
              className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Querying Documents
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 mb-8">
              Mastering the <strong>find()</strong> method involves not just locating data, but shaping exactly how that data returns to your application.
            </p>

            {/* Sections */}
            {querySections.map((section, i) => (
              <section key={section.id} className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">

                {/* Section header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                    style={{ background: theme.gradient }}>{i + 1}</div>
                  <h2 className="font-display text-[19px] font-bold text-stone-900">{section.title}</h2>
                </div>

                {/* Lab Setup block */}
                <div className="mb-5 p-4 rounded-[11px] bg-[#F5F3EF] border border-stone-900/[0.07]">
                  <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-2">Lab Setup — Run this First</p>
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
            <Link href={`/blog/${category}/update-docs`} className="no-underline">
              <div className="flex items-center justify-between p-6 rounded-[16px] bg-stone-900 text-[#F5F3EF] mt-7 cursor-pointer gap-4 shadow-xl hover:bg-stone-800 transition-all">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F5F3EF]/35 mb-1.5">Up Next — Lesson 05</div>
                  <div className="font-display text-[18px] font-bold tracking-tight">Updating Documents</div>
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