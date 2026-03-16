"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";
import contentData from "@/data/content.json";
import ShareButtons from "@/components/ShareButtons";
import ArticleControls from "@/components/ArticleControls";
import FloatingControls from "@/components/FloatingControls";
import Citation from "@/components/Citation";
import { Clock } from "lucide-react";
import Image from "next/image";

// Type definitions based on JSON structure
type ContentBlock = 
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; data: { headers: string[]; rows: string[][] } };

type Section = {
  id: string;
  title: string;
  image?: string;
  content: ContentBlock[];
};

type Footnote = {
  id: number;
  label: string;
  url?: string;
};

const footnotes: Footnote[] = contentData.footnotes;
const maxFootnoteId = Math.max(...footnotes.map((note) => note.id));

function FootnoteRef({ id }: { id: number }) {
  return (
    <sup className="mx-0.5 no-print">
      <a href={`#fn-${id}`} aria-label={`Chú thích ${id}`} className="hover:underline">
        [{id}]
      </a>
    </sup>
  );
}

function highlightText(text: string, query: string): ReactNode {
  if (!query || !text) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 text-stone-900 rounded-px px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function withFootnotes(text: string, query: string = ""): ReactNode {
  if (!text) return null;

  const pattern = /([.!?;:"”')\]])(\d{1,2})/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const fullMatch = match[0];
    const punctuation = match[1];
    const noteId = Number(match[2]);
    const index = match.index ?? 0;

    if (noteId < 1 || noteId > maxFootnoteId) {
      continue;
    }

    const punctuationEnd = index + punctuation.length;
    nodes.push(highlightText(text.slice(cursor, punctuationEnd), query));
    nodes.push(<FootnoteRef key={`fnref-${index}-${noteId}`} id={noteId} />);
    cursor = index + fullMatch.length;
  }

  if (nodes.length === 0) return highlightText(text, query);

  nodes.push(highlightText(text.slice(cursor), query));
  return nodes;
}

function RenderBlock({ block, searchQuery }: { block: ContentBlock, searchQuery: string }) {
  const content = (text: string) => highlightText(text, searchQuery);
  const withFn = (text: string) => withFootnotes(text as any); // Type cast simplified for brevity in this specific context

  const renderContent = (text: string) => {
    return withFootnotes(text, searchQuery); 
  };

  switch (block.type) {
    case "p":
      return <p>{renderContent(block.text)}</p>;
    case "quote":
      return (
        <blockquote>
          <p>{renderContent(block.text)}</p>
        </blockquote>
      );
    case "h3":
      return <h3 id={block.id}>{renderContent(block.text)}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{renderContent(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{renderContent(item)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-stone-300/80 bg-stone-50/80">
          <table className="min-w-full border-collapse text-left text-sm leading-relaxed text-stone-800">
            <thead className="bg-stone-200/70 text-xs uppercase tracking-wide text-slate-800">
              <tr>
                {block.data.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3">{renderContent(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.data.rows.map((row, i) => (
                <tr key={i} className="border-t border-stone-300/70 align-top">
                  {row.map((cell, j) => (
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-semibold text-slate-800">
                        {renderContent(cell)}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3">{renderContent(cell)}</td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(0);

  const tocItems: TocItem[] = (contentData.sections as Section[]).flatMap(section => [
    { id: section.id, text: section.title, level: 2 },
    ...section.content
      .filter((b): b is Extract<ContentBlock, { type: 'h3' }> => b.type === 'h3')
      .map(h3 => ({ id: h3.id, text: h3.text, level: 3 as const }))
  ]);

  // Add Footnotes to TOC
  tocItems.push({ id: "nguon-trich-dan", text: "Nguồn trích dẫn", level: 2 });

  // Calculate estimated reading time
  const totalText = JSON.stringify(contentData);
  const wordCount = totalText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div id="main-content" className="paper-texture min-h-screen bg-stone-50 text-[#3E2723]">
      <ReadingProgress />

      <div className={`mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 px-4 pb-24 pt-6 md:px-8 lg:gap-12 lg:pt-16 ${isFocus ? 'lg:grid-cols-1' : 'lg:grid-cols-[300px_minmax(0,1fr)]'}`}>
        {!isFocus && (
          <aside className="hidden lg:block no-print">
            <TableOfContents items={tocItems} className="sticky top-24" />
          </aside>
        )}

        <main className={`${isFocus ? 'max-w-4xl mx-auto' : 'min-w-0'}`}>

          <article className={`article-prose prose prose-stone max-w-[85ch] text-[1.06rem] leading-loose lg:prose-lg prose-headings:scroll-mt-24 ${isFocus ? 'focus-mode' : ''}`}>
              <header className="not-prose mb-10 border-b border-stone-300/70 pb-7">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <p className="inline-flex rounded-full border-b-2 border-yellow-700/30 bg-yellow-50/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-yellow-800 shadow-sm transition-all hover:bg-yellow-100/50 sm:px-4 sm:text-[10px] sm:tracking-[0.2em] md:whitespace-nowrap">
                    Báo Cáo Nghiên Cứu Chuyên Sâu
                  </p>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-stone-500 text-[12px] font-medium">
                      <Clock size={14} />
                      <span>Khoảng {readingTime} phút đọc</span>
                    </div>
                    {/* Hide top controls on mobile as they are now in FloatingControls */}
                    <div className="hidden lg:block">
                      <ArticleControls 
                        onFocusToggle={setIsFocus} 
                        onSearch={setSearchQuery}
                        triggerSource={triggerSearch}
                      />
                    </div>
                  </div>
                </div>

                <h1 className="font-extrabold text-slate-900 tracking-tight">
                  {contentData.title}
                </h1>
                
                <div className="mt-8 flex flex-wrap items-center justify-between gap-6 no-print">
                  <p className="max-w-xl text-sm leading-relaxed text-stone-700 italic">
                    {contentData.heroDescription}
                  </p>
                  <ShareButtons title={contentData.title} />
                </div>
              </header>

              {(contentData.sections as Section[]).map((section: Section) => (
                <FadeIn key={section.id}>
                  <section id={section.id} className="relative">
                    {section.image && (
                      <div className="not-prose my-12 overflow-hidden rounded-2xl border border-stone-200 shadow-sm opacity-90 transition-opacity hover:opacity-100">
                        <Image
                          src={`/${section.image}`}
                          alt={section.title}
                          width={1200}
                          height={600}
                          className="w-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                        />
                        <div className="bg-stone-50 px-4 py-2 text-[10px] uppercase tracking-widest text-stone-400 text-center border-t border-stone-100">
                          Minh họa cho: {section.title}
                        </div>
                      </div>
                    )}
                    <h2>{highlightText(section.title, searchQuery)}</h2>
                    {section.content.map((block, i) => (
                      <RenderBlock key={i} block={block} searchQuery={searchQuery} />
                    ))}
                  </section>
                </FadeIn>
              ))}

              <Citation title={contentData.title} />

              <FadeIn>
                <section id="nguon-trich-dan">
                  <h2>Nguồn trích dẫn</h2>
                  <hr className="my-8" />
                  <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">
                    {footnotes.map((note) => (
                      <li key={note.id} id={`fn-${note.id}`}>
                        {note.url ? (
                          <>
                            {note.label},{" "}
                            <a
                              href={note.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-slate-800 underline decoration-yellow-700/70 underline-offset-2 hover:text-yellow-800"
                            >
                              {note.url}
                            </a>
                          </>
                        ) : (
                          note.label
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              </FadeIn>
            </article>
          </main>
        </div>

        <footer className="mt-20 border-t border-stone-200 py-12 text-center no-print">
          <p className="text-sm font-medium text-stone-500 uppercase tracking-widest">
            © 2026 Báo Cáo Chuyên Sâu Về Tầm Quan Trọng Của Cầu Nguyện
          </p>
        </footer>

        <FloatingControls 
          items={tocItems}
          isFocus={isFocus}
          onFocusToggle={() => setIsFocus(!isFocus)}
          onSearchTrigger={() => setTriggerSearch(prev => prev + 1)}
        />
      </div>
    );
}
