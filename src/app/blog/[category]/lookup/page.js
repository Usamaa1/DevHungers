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
    title: "1. SQL Join vs. MongoDB $lookup",
    desc: "In SQL, data is normalized into tables and combined using JOIN. In MongoDB, data is usually embedded, but when collections remain separate, we use the $lookup aggregation stage to perform a Left Outer Join.",
    comparison: true
  },
  {
    id: "basic-lookup",
    title: "2. Basic $lookup Syntax",
    context: `// Collection: orders\n{ _id: 1, product_id: 101, qty: 2 }\n\n// Collection: products\n{ _id: 101, name: "Laptop", price: 1200 }`,
    desc: "Use $lookup to pull details from a 'from' collection into your current result set based on a matching local and foreign field.",
    shell: `db.orders.aggregate([\n  {\n    $lookup: {\n      from: "products",\n      localField: "product_id",\n      foreignField: "_id",\n      as: "product_details"\n    }\n  }\n])`,
    js: `await db.collection("orders").aggregate([\n  { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "details" } }\n]).toArray();`,
    python: `orders.aggregate([{"$lookup": {"from": "products", "localField": "product_id", "foreignField": "_id", "as": "details"}}])`
  },
  {
    id: "real-world",
    title: "3. Real-World Case: User Profiles & Posts",
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
      <Navbar badge={theme.label} />
      <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
        
        <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] border-r border-stone-900/[0.08] pr-7 hidden lg:block scrollbar-hide">
          <p className="font-mono text-[9px] uppercase text-stone-500 mb-3 tracking-widest text-center">Aggregation Progress</p>
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
            Lookup & Joins
          </h1>
          <p className="text-lg text-stone-500 mb-12 leading-relaxed">
            In NoSQL, we usually embed data. However, for complex relationships, the <strong>$lookup</strong> operator allows us to join collections just like a SQL database.
          </p>

          

          {lookupSections.map((section, i) => (
            <div key={section.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900 text-white font-mono text-xs">{i + 1}</span>
                 <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              </div>

              {section.comparison ? (
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
                    <thead>
                      <tr className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400">
                        <th className="p-4 border-b">Feature</th>
                        <th className="p-4 border-b">SQL (Join)</th>
                        <th className="p-4 border-b">MongoDB ($lookup)</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] text-stone-600">
                      <tr>
                        <td className="p-4 border-b font-bold">Concept</td>
                        <td className="p-4 border-b">Relational Normalization</td>
                        <td className="p-4 border-b">Aggregation Pipeline</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b font-bold">Join Type</td>
                        <td className="p-4 border-b">Inner, Left, Right, Full</td>
                        <td className="p-4 border-b">Left Outer Join</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b font-bold">Result</td>
                        <td className="p-4 border-b">Flat Rowset</td>
                        <td className="p-4 border-b">Embedded Array</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}

      <div className="p-10 rounded-[40px] bg-white border border-stone-200 text-center shadow-sm mt-12">
             <div className="text-4xl mb-4">🎓</div>
             <h3 className="text-2xl font-bold mb-2 text-stone-900">You've reached the advanced track!</h3>
             <p className="text-stone-500 mb-8 max-w-[450px] mx-auto text-sm leading-relaxed">
                By mastering $lookup, you can now build complex data relationships while maintaining the speed and flexibility of MongoDB.
             </p>
             <Link href="/blog" className="inline-block px-10 py-4 rounded-full font-bold text-white transition-transform hover:scale-105 shadow-md bg-stone-800" >
                Browse More Tracks
             </Link>
          </div>
        </main>
      </div>
    </div>
  );
}