import Image from "next/image";
import type { ContentBlock } from "@/content/types";
import { Diagram } from "@/components/Diagrams";
import { BASE_PATH } from "@/lib/basePath";

function Callout({ tone, text }: { tone?: string; text: string }) {
  const styles: Record<string, string> = {
    info: "bg-amber-50 border-brand text-brand-ink",
    warning: "bg-red-50 border-red-400 text-red-900",
    success: "bg-green-50 border-green-500 text-green-900",
  };
  const cls = styles[tone ?? "info"] ?? styles.info;
  return (
    <div className={`rounded-2xl border-l-4 p-4 my-4 text-sm leading-relaxed ${cls}`}>
      {text}
    </div>
  );
}

export function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3 key={i} className="text-xl font-extrabold text-brand-ink mt-8 first:mt-0">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-base leading-relaxed text-neutral-800">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="list-disc pl-5 space-y-1.5 text-neutral-800">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span className="flex-none w-6 h-6 rounded-full bg-brand text-brand-ink font-bold text-xs flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span className="text-neutral-800">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "phrases":
            return (
              <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                {block.title && (
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-2">
                    {block.title}
                  </p>
                )}
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-neutral-800 italic">
                      «{item.replace(/^«|»$/g, "")}»
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "callout":
            return <Callout key={i} tone={block.tone} text={block.text} />;
          case "image":
            return (
              <figure key={i} className="my-5">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                  <Image
                    src={`${BASE_PATH}${block.src}`}
                    alt={block.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-neutral-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "imageGrid":
            return (
              <div key={i} className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {block.images.map((img, j) => (
                  <figure key={j}>
                    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                      <Image
                        src={`${BASE_PATH}${img.src}`}
                        alt={img.alt}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-1.5 text-center text-xs text-neutral-500">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          case "diagram":
            return <Diagram key={i} name={block.name} caption={block.caption} />;
          case "video":
            return (
              <figure key={i} className="my-5">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900">
                  <video
                    controls
                    preload="none"
                    poster={block.poster ? `${BASE_PATH}${block.poster}` : undefined}
                    className="w-full h-auto"
                  >
                    <source src={`${BASE_PATH}${block.src}`} type="video/mp4" />
                  </video>
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-neutral-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-neutral-200">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-100">
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j} className="text-left font-bold p-3 text-neutral-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-t border-neutral-200">
                        {row.map((cell, k) => (
                          <td key={k} className="p-3 align-top text-neutral-800">
                            {cell}
                          </td>
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
      })}
    </div>
  );
}
