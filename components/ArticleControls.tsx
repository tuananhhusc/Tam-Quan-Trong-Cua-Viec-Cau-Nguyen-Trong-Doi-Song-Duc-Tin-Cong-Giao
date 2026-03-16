"use client";

import { Search, Maximize2, Minimize2, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function ArticleControls({ onFocusToggle, onSearch, triggerSource }: { 
  onFocusToggle: (isFocus: boolean) => void,
  onSearch: (term: string) => void,
  triggerSource?: number
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    onFocusToggle(isFocus);
  }, [isFocus, onFocusToggle]);

  useEffect(() => {
    if (triggerSource && triggerSource > 0) {
      setShowSearch(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [triggerSource]);

  return (
    <div className="flex items-center gap-4 no-print">
      <div className="relative flex items-center">
        {showSearch && (
          <input
            type="text"
            placeholder="Tìm..."
            className="absolute right-0 top-12 w-48 rounded-full border border-yellow-600/30 bg-white/95 px-4 py-2 text-sm shadow-lg backdrop-blur-md focus:border-yellow-600 focus:outline-none transition-all duration-300 z-50 sm:relative sm:top-0 sm:mr-2 sm:w-40 md:w-64 sm:text-xs sm:shadow-inner"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
            autoFocus
          />
        )}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`group flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:bg-stone-50 ${showSearch ? 'border-yellow-600 ring-2 ring-yellow-600/10' : ''}`}
          title="Tìm kiếm"
        >
          <Search size={16} className={showSearch ? 'text-yellow-700' : 'text-stone-600 group-hover:text-stone-900'} />
        </button>
      </div>

      <button
        onClick={() => setIsFocus(!isFocus)}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/80 shadow-sm backdrop-blur-sm text-stone-600 transition-all hover:bg-stone-50 hover:text-stone-900"
        title={isFocus ? "Thoát chế độ tập trung" : "Chế độ đọc tập trung"}
      >
        {isFocus ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
}
