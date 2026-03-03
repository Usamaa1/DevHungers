export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dev<span className="text-blue-600">Hungers</span></h1>
        <div className="space-x-6 text-slate-600 font-medium">
          <a href="#" className="hover:text-blue-600">Guides</a>
          <a href="#" className="hover:text-blue-600">Roadmaps</a>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm">Join Community</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Feed your hunger for <br /> 
          <span className="text-blue-600">Better Code.</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Deep dives into the MERN Stack, Laravel, and Modern Javascript. 
          Written for students, optimized for the real world.
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition">
            Start Learning Free
          </button>
          <button className="border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
            View Topics
          </button>
        </div>

        {/* Categories Preview */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['React', 'Next.js', 'Laravel', 'MongoDB'].map((tech) => (
            <div key={tech} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition cursor-pointer">
              <h3 className="font-bold text-slate-800">{tech}</h3>
              <p className="text-sm text-slate-500">20+ Guides</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}