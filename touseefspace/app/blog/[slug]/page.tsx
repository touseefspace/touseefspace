import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
  List,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import BlogCoverPlaceholder from "@/components/BlogCoverPlaceholder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | touseefspace",
    };
  }

  const description =
    post.excerpt ||
    `An article by Touseef Ahmed discussing ${post.title} — practical systems engineering, web performance, and AI automation.`;

  return {
    title: `${post.title} | touseefspace Blog`,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://touseefspace.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@touseefspace",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl =
    urlForImage(post.coverImage)?.width(1400).url() ||
    (typeof post.coverImage === "string" ? post.coverImage : post.coverImage?.url);

  // Extract H2 and H3 headings for Apple-style Table of Contents
  const headings =
    post.body
      ?.filter((b: any) => b._type === "block" && (b.style === "h2" || b.style === "h3"))
      .map((b: any) => {
        const text = b.children?.map((c: any) => c.text).join("") || "";
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        return { text, id, level: b.style };
      }) || [];

  return (
    <div className="page-shell pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Top Breadcrumb Navigation */}
      <nav className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-(--ink-muted) hover:text-(--ink-primary) transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Back to Writing
        </Link>
      </nav>

      {/* Main 12-Column Apple HIG Editorial Grid */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left/Center Column (8 cols): Primary Reading Measure */}
        <article className="lg:col-span-8 min-w-0 space-y-10">
          {/* Article Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-(--ink-muted)">
              {post.publishedAt && (
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {post.estimatedReadTime && (
                <>
                  <span>·</span>
                  <span>{post.estimatedReadTime}</span>
                </>
              )}
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t: string) => (
                      <span key={t} className="tech-tag text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--ink-primary) leading-[1.12]">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed text-(--ink-secondary)">
              {post.excerpt}
            </p>

            {/* Author Bio Snippet */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-(--border-subtle)">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-(--border-subtle) bg-(--bg-subtle)">
                <Image
                  src="/touseef.png"
                  alt="Touseef Ahmed"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-(--ink-primary)">Touseef Ahmed</div>
                <div className="text-xs text-(--ink-muted) font-mono">
                  AI Systems and Software Developer
                </div>
              </div>
            </div>
          </header>

          {/* Hero Visual: Render Uploaded Photo OR Apple Blueprint Placeholder */}
          <div className="overflow-hidden rounded-3xl border border-(--border-card) bg-(--bg-surface) shadow-xs">
            {coverImageUrl ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={coverImageUrl}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <BlogCoverPlaceholder title={post.title} tags={post.tags} />
            )}
          </div>

          {/* Article Body (Portable Text with In-Between Breakout Figures) */}
          <div className="prose-container">
            <PortableTextRenderer value={post.body} />
          </div>

          {/* Author Footer Card */}
          <footer className="pt-10 border-t border-(--border-subtle) space-y-10">
            <div className="rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-subtle)">
                <Image
                  src="/touseef.png"
                  alt="Touseef Ahmed"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-base font-bold text-(--ink-primary)">
                  Written by Touseef Ahmed
                </h2>
                <p className="text-xs sm:text-sm font-mono text-(--ink-muted)">
                  AI Systems and Software Developer
                </p>
                <p className="text-sm text-(--ink-secondary) leading-relaxed">
                  Designing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                  <Link href="/contact" className="text-(--ink-primary) font-semibold hover:underline">
                    Get in touch →
                  </Link>
                  <Link href="https://github.com/touseefspace" target="_blank" className="text-(--ink-muted) hover:text-(--ink-primary)">
                    GitHub
                  </Link>
                  <Link href="https://linkedin.com/in/touseefspace" target="_blank" className="text-(--ink-muted) hover:text-(--ink-primary)">
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-(--ink-muted) hover:text-(--ink-primary) transition-colors"
              >
                <ArrowLeft size={16} /> Back to all articles
              </Link>
              <Link
                href="/#selected-work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-(--ink-primary) hover:underline"
              >
                Explore Case Studies <ArrowRight size={16} />
              </Link>
            </div>
          </footer>
        </article>

        {/* Right Rail (4 cols): Sticky Sidebar with TOC & Quick Actions */}
        <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-8">
          {/* Table of Contents (On this page) */}
          {headings.length > 0 && (
            <div className="rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-(--ink-muted)">
                <List size={14} className="text-(--ink-primary)" aria-hidden="true" />
                <span>On this page</span>
              </div>
              <nav aria-label="Table of contents" className="space-y-2.5 text-sm">
                {headings.map((h: any, i: number) => (
                  <a
                    key={i}
                    href={`#${h.id}`}
                    className={`block leading-snug text-(--ink-muted) hover:text-(--ink-primary) transition-colors ${
                      h.level === "h3" ? "pl-4 text-xs" : "font-medium"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Quick Context / Specs Card */}
          <div className="rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3 text-(--ink-muted)">
              <span>ESTIMATED TIME</span>
              <span className="text-(--ink-primary) font-semibold">
                {post.estimatedReadTime || "5 min"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3 text-(--ink-muted)">
              <span>TOPICS</span>
              <span className="text-(--ink-primary) font-semibold">
                {post.tags?.slice(0, 2).join(", ") || "Systems"}
              </span>
            </div>
            <div className="flex items-center justify-between text-(--ink-muted)">
              <span>AUTHOR</span>
              <span className="text-(--ink-primary) font-semibold">Touseef Ahmed</span>
            </div>
          </div>

          {/* Discussion / Direct Consultation CTA */}
          <div className="rounded-3xl border border-(--border-card) bg-linear-to-br from-(--bg-subtle) via-(--bg-surface) to-(--bg-primary) p-6 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-mono text-(--ink-muted)">
              <MessageSquare size={13} className="text-emerald-500" aria-hidden="true" />
              <span>SYSTEMS ARCHITECTURE</span>
            </div>
            <h3 className="text-base font-bold text-(--ink-primary) leading-snug">
              Have questions about this architecture?
            </h3>
            <p className="text-xs text-(--ink-secondary) leading-relaxed">
              I collaborate with businesses to engineer custom workflows, ledgers, and automated pipelines.
            </p>
            <Link
              href="/contact"
              className="btn-primary w-full h-9 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-1.5 mt-2"
            >
              Discuss a Project <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
