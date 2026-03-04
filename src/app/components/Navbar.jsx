"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Courses", href: "/courses" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Community", href: "/community" }
];

export default function Navbar({ badge }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Adds a shadow when you start scrolling for a "natural" lift
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 h-[64px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-xl border-b border-stone-200/50 shadow-sm" : "bg-transparent"
      }`}>
        
        {/* Left: Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group no-underline">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-stone-900 text-white overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <span className="relative z-10 font-bold text-sm">D</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-display text-[15px] font-bold text-stone-900 tracking-tight">
              Dev<span className="text-stone-400 font-medium">Hungers</span>
            </span>
          </Link>
        </div>

        {/* Center: Floating Pill (Desktop) */}
        <div className="hidden md:flex items-center bg-stone-100/50 p-1 rounded-full border border-stone-200/40">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="px-5 py-1.5 text-[13px] font-medium text-stone-500 rounded-full transition-all duration-200 hover:text-stone-900 hover:bg-white hover:shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Badge & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {badge && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--t-primary)' }} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  {badge}
                </span>
              </div>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-[4px] w-10 h-10 rounded-full hover:bg-stone-100 transition-colors"
          >
            <div className={`h-0.5 bg-stone-900 rounded-full transition-all duration-300 ${menuOpen ? "w-6 translate-y-1.5 -rotate-45" : "w-5"}`} />
            <div className={`h-0.5 bg-stone-900 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : "w-4"}`} />
            <div className={`h-0.5 bg-stone-900 rounded-full transition-all duration-300 ${menuOpen ? "w-6 -translate-y-1 rotate-45" : "w-3"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Natural Slide Down) */}
      <div className={`fixed inset-0 top-[64px] z-40 bg-white/95 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out ${
        menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <div className="flex flex-col p-8 gap-6">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Main Menu</p>
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-stone-900 no-underline transition-transform active:scale-95"
            >
              {link.name}
            </Link>
          ))}
          {badge && (
            <div className="mt-4 pt-8 border-t border-stone-100">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Currently Learning</p>
              <span className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 text-stone-900">
                {badge} Guide
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}