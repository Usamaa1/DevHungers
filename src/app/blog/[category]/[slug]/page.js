const themes = {
  mongodb: {
    primary: "#00ED64",
    secondary: "#001E2B",
    gradient: "from-[#00ED64] to-[#00684A]",
    bg: "bg-[#F9FBFA]",
    label: "MongoDB",
  },
  nodejs: {
    primary: "#339933",
    secondary: "#333333",
    gradient: "from-[#6cc24a] to-[#339933]",
    bg: "bg-[#F2F7F2]",
    label: "Node.js",
  },
  javascript: {
    primary: "#F7DF1E",
    secondary: "#000000",
    gradient: "from-[#F7DF1E] to-[#E2C000]",
    bg: "bg-[#FFFDF0]",
    label: "JavaScript",
  },
};

export default async function TutorialPage({ params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const theme = themes[category] || themes.javascript;

  return (
    <div
      className={`min-h-screen ${theme.bg} selection:bg-slate-900 selection:text-white`}
    >
      {/* 1. GLASS NAV BAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${theme.bg === "bg-[#FFFDF0]" ? "bg-black" : "bg-slate-900"}`}
          />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Dev<span className="opacity-50">Hungers</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900`}
          >
            {theme.label}
          </span>
          <a href="#" className="hover:text-slate-900">
            Roadmap
          </a>
          <a href="#" className="hover:text-slate-900">
            Community
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex gap-10 px-8">
        {/* 2. FLOATING SIDEBAR */}
        <aside className="w-64 hidden lg:block sticky top-24 h-[calc(100vh-120px)] py-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
            Course Content
          </p>
          <div className="space-y-1">
            {[
              "Introduction",
              "Query Documents",
              "Update Docs",
              "Delete Docs",
            ].map((item) => (
              <div
                key={item}
                className={`group flex items-center px-4 py-2 rounded-lg text-sm transition-all cursor-pointer 
                ${
                  item.toLowerCase().includes(slug?.split("-")[0])
                    ? "bg-white shadow-sm border border-slate-200 text-slate-900 font-semibold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        {/* 3. MAIN CONTENT (Bento Style) */}
        <main className="flex-1 py-12 max-w-3xl">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-slate-400">
                01. Getting Started
              </span>
              <div className="h-[1px] w-8 bg-slate-200" />
            </div>
            <h1
              className={`text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 pb-2 leading-tight bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent capitalize`}
            >
              {slug ? slug.replace(/-/g, " ") : "Tutorial"}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Mastering data retrieval in {theme.label} is the foundation of any
              full-stack application.
            </p>
          </header>

          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-gradient-to-br ${theme.gradient}`}
              >
                1
              </span>
              The Basic Query
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              To fetch all documents, we use the{" "}
              <code className="bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded font-mono text-sm">
                find()
              </code>{" "}
              method. This is standard across all MongoDB drivers.
            </p>

            {/* MODERN CODE BLOCK */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#0a0c10] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  JavaScript / MongoDB
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
              </div>
              <pre className="p-6 text-sm font-mono text-slate-300 leading-relaxed overflow-x-auto">
                {`db.inventory.find({
  status: "D",
  qty: { $lt: 30 }
}).pretty();`}
              </pre>
            </div>
          </section>

          {/* NEXT STEPS CARD */}
          <div className="mt-10 p-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent">
            <div className="bg-white py-8 text-center">
              <p className="text-sm text-slate-400 mb-2 font-medium">
                Ready for the next challenge?
              </p>
              <button className="text-slate-900 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                Learn about Comparison Operators →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
