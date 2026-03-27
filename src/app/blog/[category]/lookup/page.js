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
  { id: 7, label: "Mastering Indexes",      slug: "indexing",                 tag: "07", done: true },
  { id: 8, label: "Lookup & Joins",         slug: "lookup",                   tag: "08", active: true },
];

const lookupSections = [
  {
    id: "comparison",
    title: "SQL Join vs. MongoDB $lookup",
    desc: "In SQL, data is normalized into tables and combined using JOIN. In MongoDB, data is usually embedded, but when collections remain separate, we use the $lookup aggregation stage to perform a Left Outer Join.",
    comparison: true
  },
  {
    id: "basic-lookup",
    title: "Basic $lookup Syntax",
    context: `// Collection: orders\n{ _id: 1, product_id: 101, qty: 2 }\n\n// Collection: products\n{ _id: 101, name: "Laptop", price: 1200 }`,
    desc: "Use $lookup to pull details from a 'from' collection into your current result set based on a matching local and foreign field.",
    shell: `db.orders.aggregate([\n  {\n    $lookup: {\n      from: "products",\n      localField: "product_id",\n      foreignField: "_id",\n      as: "product_details"\n    }\n  }\n])`,
    js: `await db.collection("orders").aggregate([\n  { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "details" } }\n]).toArray();`,
    python: `orders.aggregate([{"$lookup": {"from": "products", "localField": "product_id", "foreignField": "_id", "as": "details"}}])`
  },
  {
    id: "real-world",
    title: "Real-World Case: User Profiles & Posts",
    context: `// Collection: users (Sawera, Ali)\n// Collection: posts (written by user_id)`,
    desc: "Commonly used in social apps to fetch an author's profile information alongside their posts.",
    shell: `db.posts.aggregate([\n  {\n    $lookup: {\n      from: "users",\n      localField: "author_id",\n      foreignField: "_id",\n      as: "author"\n    }\n  },\n  { $unwind: "$author" } // Converts the array result into an object\n])`,
    js: `await db.collection("posts").aggregate([\n  { $lookup: { from: "users", localField: "author_id", foreignField: "_id", as: "author" } },\n  { $unwind: "$author" }\n]).toArray();`,
    python: `posts.aggregate([{"$lookup": {"from": "users", "localField": "author_id", "foreignField": "_id", "as": "author"}}, {"$unwind": "$author"}])`
  }
];

export default function LookupPage({ params }) {
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
              <span style={{ color: theme.primary, fontWeight: 600 }}>8 of 8</span> lessons complete
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
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Lookup & Joins</span>
            </nav>

            <h1
              className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Lookup & Joins
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 mb-8">
              In NoSQL, we usually embed data. However, for complex relationships, the <strong>$lookup</strong> operator allows us to join collections just like a SQL database.
            </p>

            {/* Sections */}
            {lookupSections.map((section, i) => (
              <section key={section.id} className="bg-white border border-stone-900/[0.08] rounded-[18px] p-7 mb-8 shadow-sm">

                {/* Section header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-mono text-[13px] font-medium text-white shrink-0"
                    style={{ background: theme.gradient }}>{i + 1}</div>
                  <h2 className="font-display text-[19px] font-bold text-stone-900">{section.title}</h2>
                </div>

                {section.comparison ? (
                  <>
                    <p className="text-[15px] leading-[1.75] text-stone-600 mb-5">{section.desc}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse rounded-[11px] overflow-hidden border border-stone-900/[0.07]">
                        <thead>
                          <tr className="bg-[#F5F3EF]">
                            <th className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 p-3.5 border-b border-stone-900/[0.07]">Feature</th>
                            <th className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 p-3.5 border-b border-stone-900/[0.07]">SQL (Join)</th>
                            <th className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400 p-3.5 border-b border-stone-900/[0.07]">MongoDB ($lookup)</th>
                          </tr>
                        </thead>
                        <tbody className="text-[14px] text-stone-600">
                          <tr className="hover:bg-stone-900/[0.02] transition-colors">
                            <td className="p-3.5 border-b border-stone-900/[0.07] font-semibold text-stone-900">Concept</td>
                            <td className="p-3.5 border-b border-stone-900/[0.07]">Relational Normalization</td>
                            <td className="p-3.5 border-b border-stone-900/[0.07]">Aggregation Pipeline</td>
                          </tr>
                          <tr className="hover:bg-stone-900/[0.02] transition-colors">
                            <td className="p-3.5 border-b border-stone-900/[0.07] font-semibold text-stone-900">Join Type</td>
                            <td className="p-3.5 border-b border-stone-900/[0.07]">Inner, Left, Right, Full</td>
                            <td className="p-3.5 border-b border-stone-900/[0.07]">Left Outer Join</td>
                          </tr>
                          <tr className="hover:bg-stone-900/[0.02] transition-colors">
                            <td className="p-3.5 font-semibold text-stone-900">Result</td>
                            <td className="p-3.5">Flat Rowset</td>
                            <td className="p-3.5">Embedded Array</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}

              </section>
            ))}

            {/* Course Complete CTA */}
            <div className="bg-white border border-stone-900/[0.08] rounded-[18px] p-10 shadow-sm mt-7 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-display text-[22px] font-bold text-stone-900 mb-2">You've reached the advanced track!</h3>
              <p className="text-[15px] leading-[1.75] text-stone-500 mb-8 max-w-[420px] mx-auto">
                By mastering $lookup, you can now build complex data relationships while maintaining the speed and flexibility of MongoDB.
              </p>
              <Link href="/"
                className="inline-block px-8 py-3 rounded-full font-bold text-white no-underline transition-all hover:opacity-90 shadow-md"
                style={{ background: theme.gradient }}>
                Browse More Tracks
              </Link>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}