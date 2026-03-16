"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const visibleHeadings = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleHeadings.current.set(id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.current.delete(id);
          }
        }

        const next = [...visibleHeadings.current.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1]),
        )[0]?.[0];

        if (next) {
          setActiveId(next);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={`rounded-xl border border-stone-300/70 bg-stone-100/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 ${className ?? ""}`}
      aria-label="Mục lục"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-800 flex items-center gap-2">
          <List size={14} className="text-yellow-700" />
          Mục lục
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden rounded-md p-1 hover:bg-stone-200 transition-colors"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Đóng mục lục" : "Mở mục lục"}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <ul className={`toc-scroll mt-3 space-y-1 overflow-y-auto pr-1 transition-all duration-300 lg:max-h-[70vh] lg:block ${isOpen ? "max-h-[60vh] block" : "max-h-0 hidden lg:block"}`}>
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "block rounded-md px-2 py-1.5 text-sm leading-snug transition-colors duration-200",
                  item.level === 3 ? "ml-4 border-l border-stone-300 pl-3 text-[13px]" : "font-semibold",
                  isActive
                    ? "bg-yellow-100 text-yellow-900 ring-1 ring-yellow-700/25"
                    : "text-stone-700 hover:bg-stone-200/70 hover:text-stone-900",
                ].join(" ")}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
