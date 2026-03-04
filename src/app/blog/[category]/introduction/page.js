"use client";
import { useState, use } from "react";
import Link from "next/link";
import { themes } from "@/app/lib/themes";
import Navbar from "@/app/components/Navbar";

const sidebarItems = [
  { id: 1, label: "Introduction",           slug: "introduction",             tag: "01", active: true },
  { id: 2, label: "Database & Collections", slug: "database-and-collections",   tag: "02" },
  { id: 3, label: "Insert Documents",       slug: "insert-docs",              tag: "03" },
  { id: 4, label: "Query Documents",        slug: "query-documents",          tag: "04" },
  { id: 5, label: "Update Docs",            slug: "update-docs",              tag: "05" },
  { id: 6, label: "Delete Docs",            slug: "delete-docs",              tag: "06" },
];

export default function IntroPage({ params }) {
  const { category } = use(params);
  const theme = themes[category] || themes.javascript;

  const themeVars = {
    "--t-primary": theme.primary,
    "--t-primary-light": theme.primaryLight,
    "--t-primary-border": theme.primaryBorder,
    "--t-gradient": theme.gradient,
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-stone-900 relative" style={themeVars}>
      
      {/* Ambient orbs */}
      <div className="fixed w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none z-0 top-[-180px] right-[-80px] opacity-100 animate-[orbFloat_13s_ease-in-out_infinite_alternate]"
        style={{ background: theme.primaryLight }} />

      <div className="relative z-10">
        <Navbar badge={theme.label} />

        <div className="max-w-[1280px] mx-auto px-10 flex gap-0">
          
          <aside className="w-[232px] shrink-0 py-9 sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto border-r border-stone-900/[0.08] pr-7 hidden lg:block">
            <p className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">Course Content</p>
            {sidebarItems.map(item => (
              <Link key={item.id} href={`/blog/${category}/${item.slug}`} className="no-underline block">
                <div className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] cursor-pointer transition-all duration-150 mb-0.5
                  ${item.active ? "border shadow-sm" : "hover:bg-stone-900/[0.04]"}`}
                  style={item.active ? { background: theme.primaryLight, borderColor: theme.primaryBorder } : {}}>
                  <span className="font-mono text-[9px] font-medium min-w-[18px]"
                    style={{ color: item.active ? theme.primary : "#78716C" }}>
                    {item.tag}
                  </span>
                  <span className={`text-[13px] font-medium text-stone-900 ${item.active ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </aside>

          <main className="flex-1 py-11 px-12 max-w-[780px] min-w-0">
            <div className="flex items-center gap-1.5 mb-7">
              <span className="font-mono text-[11px] text-stone-400">Course Overview</span>
              <span className="text-stone-300 text-[12px]">/</span>
              <span className="font-mono text-[11px]" style={{ color: theme.primary }}>Introduction</span>
            </div>

            <h1 className="font-display text-[clamp(36px,4.5vw,54px)] font-extrabold leading-[1.04] tracking-[-2px] mb-4 capitalize text-gradient"
              style={{ backgroundImage: theme.gradient }}>
              Welcome to MongoDB
            </h1>
            <p className="text-base font-normal leading-[1.72] text-stone-500 max-w-[520px] mb-12">
              MongoDB is a document-oriented NoSQL database. Instead of tables and rows, it uses a flexible JSON-like format that lets you store data in a way that maps naturally to your application code.
            </p>

            {/* NEW: Visual Comparison Section */}
            <section className="mb-14">
              <h2 className="text-[20px] font-bold mb-6 tracking-tight">Tables vs. BSON Documents</h2>
              <p className="text-[15px] leading-relaxed text-stone-500 mb-6">
                In a relational database, data is split across multiple tables. In MongoDB, related data is often <strong>embedded</strong> into a single document, making reads significantly faster.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-stone-100 rounded-2xl border border-stone-200">
                  <p className="font-mono text-[10px] uppercase text-stone-400 mb-3 tracking-widest">Relational Model (SQL)</p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                      <p className="text-[11px] font-bold text-stone-400 mb-1">TABLE: Users</p>
                      <p className="text-xs font-mono">id: 1 | name: "Sawera"</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                      <p className="text-[11px] font-bold text-stone-400 mb-1">TABLE: Addresses (Link to user_id: 1)</p>
                      <p className="text-xs font-mono">city: "Karachi" | country: "PK"</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-stone-900 rounded-2xl border border-stone-800 text-white">
                  <p className="font-mono text-[10px] uppercase text-stone-500 mb-3 tracking-widest">MongoDB BSON Model</p>
                  <pre className="text-[12px] leading-tight text-emerald-400">
{`{
  _id: 1,
  name: "Sawera",
  address: {
    city: "Karachi",
    country: "PK"
  }
}`}
                  </pre>
                  <p className="text-[10px] text-stone-500 mt-4 italic">// Related data stays together</p>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <section className="mb-14">
              <h2 className="text-[20px] font-bold mb-6 tracking-tight">Technical Comparison</h2>
              <div className="overflow-hidden border border-stone-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-stone-400">Feature</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-stone-400">SQL Database</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-stone-400">MongoDB</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-stone-600">
                    <tr className="border-b border-stone-100">
                      <td className="p-4 font-semibold text-stone-900">Scaling</td>
                      <td className="p-4">Vertical (More RAM/CPU)</td>
                      <td className="p-4">Horizontal (More Servers)</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="p-4 font-semibold text-stone-900">ACID Support</td>
                      <td className="p-4">Full / Native</td>
                      <td className="p-4">Supported since v4.0</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="p-4 font-semibold text-stone-900">Development</td>
                      <td className="p-4">Slow (Schema migrations)</td>
                      <td className="p-4">Fast (Iterative)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BSON Details */}
            <section className="mb-14">
              <h2 className="text-[20px] font-bold mb-4 tracking-tight">Why BSON instead of JSON?</h2>
              <p className="text-[15px] leading-relaxed text-stone-500 mb-6">
                <strong>BSON</strong> stands for Binary JSON. While JSON is easy for humans to read, it's slow for computers to parse. BSON is designed to be <strong>traversable</strong> and <strong>efficient</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { t: "Speed", d: "Skipping records is faster in binary format." },
                  { t: "Types", d: "Supports Int64, Decimal128, and Dates." },
                  { t: "Search", d: "Indexing works natively on BSON fields." }
                ].map(f => (
                  <div key={f.t} className="p-4 rounded-xl bg-white border border-stone-200">
                    <p className="font-bold text-stone-900 text-xs mb-1">{f.t}</p>
                    <p className="text-[11px] text-stone-500 leading-snug">{f.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Next step */}
            <Link href={`/blog/${category}/database-and-collections`} className="no-underline">
              <div className="flex items-center justify-between p-7 rounded-[24px] bg-stone-900 text-[#F5F3EF] shadow-2xl hover:bg-stone-800 transition-all group">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2">Ready to build?</div>
                  <div className="font-display text-[20px] font-bold tracking-tight">Lesson 02: Database & Collections</div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#001E2B] transition-transform group-hover:translate-x-2"
                  style={{ background: theme.gradient }}>→</div>
              </div>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}