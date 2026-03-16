"use client";

import { useState, useEffect } from "react";
import { List, Search, Maximize2, Minimize2, X, ChevronRight } from "lucide-react";
import { TocItem } from "./TableOfContents";

type FloatingControlsProps = {
  items: TocItem[];
  isFocus: boolean;
  onFocusToggle: () => void;
  onSearchTrigger: () => void;
};

export default function FloatingControls({ 
  items, 
  isFocus, 
  onFocusToggle, 
  onSearchTrigger 
}: FloatingControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Sync with scroll for TOC highlighting (simplified version for mobile overlay)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Overlay Backdrop for TOC */}
      {showToc && (
        <div 
          className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-sm lg:hidden no-print"
          onClick={() => setShowToc(false)}
        />
      )}

      {/* Mobile TOC Slide-over */}
      <div className={`fixed inset-y-0 right-0 z-[101] w-80 max-w-[85%] transform bg-stone-50 shadow-2xl transition-transform duration-500 ease-out lg:hidden no-print ${showToc ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-800">Mục lục</h2>
            <button onClick={() => setShowToc(false)} className="rounded-full p-2 hover:bg-stone-200">
              <X size={20} className="text-stone-500" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-5">
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setShowToc(false)}
                    className={`flex items-center gap-3 rounded-lg p-3 text-sm transition-all ${
                      item.id === activeId 
                        ? "bg-yellow-100/60 font-semibold text-yellow-900 ring-1 ring-yellow-600/20" 
                        : "text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <ChevronRight size={14} className={item.id === activeId ? "text-yellow-700" : "text-stone-300"} />
                    <span className={item.level === 3 ? "ml-4" : ""}>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-center gap-4 lg:hidden no-print">
        {/* Sub Buttons */}
        <div className={`flex flex-col items-center gap-4 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"}`}>
          
          {/* TOC Button */}
          <button
            onClick={() => { setShowToc(true); setIsOpen(false); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white/95 text-stone-700 shadow-xl backdrop-blur transition-transform hover:scale-105"
            title="Mục lục"
          >
            <List size={20} className="text-yellow-800" />
          </button>

          {/* Search Button */}
          <button
            onClick={() => { onSearchTrigger(); setIsOpen(false); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white/95 text-stone-700 shadow-xl backdrop-blur transition-transform hover:scale-105"
            title="Tìm kiếm"
          >
            <Search size={20} className="text-stone-800" />
          </button>

          {/* Focus Mode Button */}
          <button
            onClick={() => { onFocusToggle(); setIsOpen(false); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white/95 text-stone-700 shadow-xl backdrop-blur transition-transform hover:scale-105"
            title={isFocus ? "Tắt tập trung" : "Bật tập trung"}
          >
            {isFocus ? <Minimize2 size={20} className="text-stone-800" /> : <Maximize2 size={20} className="text-stone-800" />}
          </button>
        </div>

        {/* Main Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] ring-1 ring-stone-900/5 transition-all duration-300 ${isOpen ? "bg-stone-800 text-stone-100 rotate-90" : "bg-[#FDFCF7] text-stone-800 border border-stone-300 rotate-0"}`}
          aria-expanded={isOpen}
          aria-label="Menu điều hướng"
        >
          {isOpen ? <X size={24} /> : <div className="flex flex-col gap-1 items-center"><div className="w-5 h-0.5 bg-stone-800"></div><div className="w-5 h-0.5 bg-stone-800"></div><div className="w-5 h-0.5 bg-yellow-700"></div></div>}
        </button>
      </div>
    </>
  );
}
