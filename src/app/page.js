import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { themes } from "@/app/lib/themes";

const courses = [
  {
    id: "mongodb",
    lessons: 24,
    students: "12.4k",
    desc: "Master document databases, aggregation pipelines, indexing strategies, and real-world data modeling.",
    tags: ["CRUD", "Aggregation", "Indexes", "Atlas"],
  },
  {
    id: "javascript",
    lessons: 38,
    students: "28.1k",
    desc: "From variables to async/await, closures, prototypes, and modern ES2024 features used in production.",
    tags: ["ES6+", "Async", "DOM", "Closures"],
    badge: "Popular",
  },
  {
    id: "nodejs",
    lessons: 31,
    students: "9.8k",
    desc: "Build scalable servers, REST APIs, authentication systems, and deploy production Node applications.",
    tags: ["Express", "REST API", "Auth", "Deploy"],
  },
  {
    id: "react",
    lessons: 42,
    students: "31.6k",
    desc: "Hooks, context, performance optimization, and patterns used by senior engineers at top companies.",
    tags: ["Hooks", "Context", "Next.js", "Patterns"],
  },
  {
    id: "typescript",
    lessons: 28,
    students: "14.2k",
    desc: "Type safety, generics, decorators, and advanced patterns that make large codebases maintainable.",
    tags: ["Types", "Generics", "OOP", "Config"],
    badge: "New",
  },
  {
    id: "python",
    lessons: 35,
    students: "19.3k",
    desc: "Data structures, OOP, file I/O, web scraping, and automation scripts for real-world use cases.",
    tags: ["OOP", "Scripts", "APIs", "Data"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Subtle ambient orbs */}
      <div className="fixed w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 top-[-180px] right-[-120px] bg-[#6366F10C]" />
      <div className="fixed w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none z-0 bottom-[80px] left-[-100px] bg-[#8B5CF608]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 pb-24 flex-grow">
          {/* ── HERO ── */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-stone-500 bg-white border border-stone-200 px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
              <div className="flex gap-1">
                {[
                  "#00ED64",
                  "#F7DF1E",
                  "#6cc24a",
                  "#38BDF8",
                  "#60A5FA",
                  "#2DD4BF",
                ].map((c) => (
                  <span
                    key={c}
                    className="w-2 h-2 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
              6 learning tracks · Free forever
            </div>

            <h1 className="font-display text-[clamp(40px,5vw,64px)] font-black leading-[1.03] tracking-[-2.5px] text-stone-900 mb-4">
              One platform.
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Every stack.
              </span>
            </h1>
            <p className="text-[17px] font-normal leading-relaxed text-stone-500 max-w-[480px]">
              Practical tutorials for JavaScript, TypeScript, React, Node.js,
              MongoDB and Python — structured from zero to production.
            </p>
          </div>

          {/* ── COURSE GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const t = themes[course.id];
              return (
                <Link
                  key={course.id}
                  href={`/blog/${course.id}/introduction`}
                  className="group bg-white border border-stone-200 rounded-[24px] p-7 no-underline block relative overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-300"
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-[48px] h-[48px] rounded-xl flex items-center justify-center text-[22px] shrink-0 bg-stone-50 border border-stone-100 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: t.primaryLight,
                          border: `1px solid ${t.primaryBorder}`,
                        }}
                      >
                        {t.icon}
                      </div>
                      {course.badge && (
                        <span
                          className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: t.primaryLight,
                            color: t.primary,
                            border: `1px solid ${t.primaryBorder}`,
                          }}
                        >
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <div className="font-display text-[20px] font-extrabold tracking-tight text-stone-900 mb-2">
                      {t.label}
                    </div>
                    <p className="text-[14px] leading-relaxed text-stone-500 mb-6">
                      {course.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] font-medium px-2 py-1 rounded-lg bg-stone-50 text-stone-500 border border-stone-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                      <div className="flex gap-4">
                        <span className="text-[12px] font-medium text-stone-400">
                          📚 {course.lessons}
                        </span>
                        <span className="text-[12px] font-medium text-stone-400">
                          👥 {course.students}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 bg-stone-50 text-stone-300 group-hover:bg-stone-900 group-hover:text-white">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>

        {/* ── REDESIGNED NATURAL FOOTER ── */}
        <footer className="w-full pb-10 pt-20 px-6">
          <div className="max-w-[1280px] mx-auto bg-white border border-stone-200 rounded-[32px] px-8 py-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            {/* matched Logo Part */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 group no-underline"
              >
                <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-stone-900 text-white overflow-hidden shadow-sm">
                  <span className="relative z-10 font-bold text-sm text-white">
                    D
                  </span>
                  {/* Using the exact Indigo/Violet gradient from your navbar */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <span className="font-display text-[15px] font-bold text-stone-900 tracking-tight">
                  Dev<span className="text-stone-400 font-medium">Hungers</span>
                </span>
              </Link>
              <p className="text-[11px] text-stone-400 font-medium tracking-tight">
                Practical code for hungry developers.
              </p>
            </div>

            {/* Center: Pill Links */}
            <div className="flex items-center bg-stone-50 p-1.5 rounded-full border border-stone-100">
              {["Courses", "Roadmap", "Blog", "About"].map((l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="px-4 py-1.5 text-[12px] font-medium text-stone-500 rounded-full transition-all hover:text-stone-900 hover:bg-white hover:shadow-sm no-underline"
                >
                  {l}
                </Link>
              ))}
            </div>

            {/* Copyright Section */}
            <div className="flex flex-col items-center md:items-end">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                © 2026 DevHungers
              </div>
              <p className="text-[11px] text-stone-300 font-medium">
                An open-source resource for developers.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
