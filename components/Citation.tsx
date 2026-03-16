"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Citation({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const citationText = `Tầm Quan Trọng Cầu Nguyện. (2026). ${title}. Báo cáo nghiên cứu chuyên sâu về thần học và đời sống đức tin Công giáo. Truy cập từ https://tamquantrongcaunguyen.id.vn`;

  const copyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 rounded-lg border border-stone-200 bg-stone-50/50 p-6 no-print">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Trích dẫn học thuật (APA)</h4>
        <button
          onClick={copyCitation}
          className="flex items-center gap-2 text-[11px] font-bold text-yellow-800 hover:text-yellow-900 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "ĐÃ SAO CHÉP" : "SAO CHÉP TRÍCH DẪN"}
        </button>
      </div>
      <p className="text-sm italic text-stone-600 leading-relaxed font-serif">
        "{citationText}"
      </p>
    </div>
  );
}
