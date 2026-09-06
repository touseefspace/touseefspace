"use client";

import React, { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, ExternalLink } from "lucide-react";
import { urlForImage } from "@/sanity/image";

function CodeBlockComponent({ value }: { value: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value?.code) return;
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-(--border-card) bg-(--bg-surface) shadow-xs">
      <div className="flex items-center justify-between border-b border-(--border-subtle) bg-(--bg-subtle) px-4 py-2 text-xs font-mono text-(--ink-muted)">
        <span>{value?.filename || value?.language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-(--ink-muted) hover:text-(--ink-primary) hover:bg-(--bg-surface) transition-colors cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-(--ink-primary)">
        <pre>
          <code>{value?.code}</code>
        </pre>
      </div>
    </div>
  );
}

function CalloutComponent({ value }: { value: any }) {
  const type = value?.type || "info";

  const labelMap: Record<string, string> = {
    tip: "PRINCIPLE",
    info: "NOTE",
    warning: "CAUTION",
    success: "VERIFIED",
  };

  const label = labelMap[type] || "NOTE";

  return (
    <aside className="my-8 sm:my-10 border-l border-(--border-strong) pl-5 sm:pl-6 py-1 bg-transparent">
      {/* Extremely quiet uppercase monospace label */}
      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-(--ink-muted) select-none">
        {label}
      </p>

      {/* Title */}
      {value?.title && (
        <h4 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-(--ink-primary)">
          {value.title}
        </h4>
      )}

      {/* Body text with generous line-height */}
      {value?.content && (
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-(--ink-secondary)">
          {value.content}
        </p>
      )}
    </aside>
  );
}

const portableTextComponents: PortableTextComponents = {
  types: {
    codeBlock: CodeBlockComponent,
    callout: CalloutComponent,
    image: ({ value }: { value: any }) => {
      const imageUrl = urlForImage(value)?.width(1200).url() || value?.url;
      if (!imageUrl) return null;

      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-surface)">
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={value?.alt || "Article illustration"}
              fill
              className="object-cover object-center"
            />
          </div>
          {value?.caption && (
            <figcaption className="p-3 text-center text-xs font-mono text-(--ink-muted) border-t border-(--border-subtle) bg-(--bg-subtle)">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children, value }: { children?: any; value?: any }) => {
      const text = value?.children?.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return (
        <h2 id={id} className="mt-10 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-(--ink-primary) scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: { children?: any; value?: any }) => {
      const text = value?.children?.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return (
        <h3 id={id} className="mt-8 mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-(--ink-primary) scroll-mt-24">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-(--ink-primary)">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-(--ink-primary) pl-5 italic text-(--ink-secondary)">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-6 list-disc space-y-2 text-base sm:text-lg text-(--ink-secondary)">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 text-base sm:text-lg text-(--ink-secondary)">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-(--ink-primary)">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-1.5 py-0.5 font-mono text-xs sm:text-sm text-(--ink-primary)">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noindex nofollow noreferrer" : undefined}
          className="inline-flex items-center gap-0.5 text-(--ink-primary) underline underline-offset-4 decoration-(--ink-muted) hover:decoration-(--ink-primary) transition-colors font-medium"
        >
          {children}
          {target === "_blank" && <ExternalLink className="inline h-3 w-3 ml-0.5 opacity-60" />}
        </Link>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}
