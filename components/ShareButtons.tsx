"use client";

import { Share2, Link, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Chia sẻ:</span>
      <button
        onClick={copyLink}
        className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white transition-all hover:border-yellow-600 hover:text-yellow-700"
        title="Sao chép liên kết"
      >
        <Link size={14} />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-stone-800 px-2 py-1 text-[10px] text-white">
            Đã chép!
          </span>
        )}
      </button>
      <button
        onClick={shareFacebook}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white transition-all hover:border-blue-600 hover:text-blue-600"
        title="Chia sẻ Facebook"
      >
        <Facebook size={14} />
      </button>
      <button
        onClick={shareTwitter}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white transition-all hover:border-sky-500 hover:text-sky-500"
        title="Chia sẻ Twitter"
      >
        <Twitter size={14} />
      </button>
    </div>
  );
}
