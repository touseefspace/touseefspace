import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { getPosts } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Blog & Notes | touseefspace",
  description:
    "Technical notes and architectural dispatches on Next.js, AI automation, database ledgers, and building calm digital software spaces.",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const allPosts = await getPosts();

  // Extract unique tags across all posts
  const allTags = Array.from(
    new Set(allPosts.flatMap((post: any) => post.tags || []))
  );

  // Filter posts if activeTag is provided
  const filteredPosts = activeTag
    ? allPosts.filter((post: any) =>
        post.tags?.some((t: string) => t.toLowerCase() === activeTag.toLowerCase())
      )
    : allPosts;

  const featuredPost = !activeTag ? filteredPosts.find((p: any) => p.featured) : null;
  const remainingPosts = featuredPost
    ? filteredPosts.filter((p: any) => p._id !== featuredPost._id)
    : filteredPosts;

  return (
    <div className="page-shell pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="section-label">Writing & Dispatches</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">Engineering Thoughts</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--ink-primary)">
          Systems, architectures, and practical AI.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Notes on turning messy business workflows into reliable software, event-driven ledgers, and practical LLM extraction pipelines.
        </p>
      </div>

      {/* Tag Filtering Chips */}
      {allTags.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-2.5 border-b border-(--border-subtle) pb-6">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all ${
              !activeTag
                ? "tag-filter-active"
                : "tag-filter-inactive"
            }`}
          >
            {!activeTag && (
              <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0 animate-pulse" />
            )}
            All Topics ({allPosts.length})
          </Link>
          {allTags.map((t: any) => {
            const isSelected = activeTag?.toLowerCase() === t.toLowerCase();
            return (
              <Link
                key={t}
                href={isSelected ? "/blog" : `/blog?tag=${encodeURIComponent(t)}`}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all ${
                  isSelected
                    ? "tag-filter-active"
                    : "tag-filter-inactive"
                }`}
              >
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0 animate-pulse" />
                )}
                #{t}
              </Link>
            );
          })}
        </div>
      )}

      {/* Featured Post Spotlight */}
      {featuredPost && (
        <div className="mt-10">
          <Link
            href={`/blog/${featuredPost.slug}`}
            aria-label={`Read featured article: ${featuredPost.title}`}
            className="group block rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 sm:p-10 transition-all hover:border-(--border-strong) hover:shadow-lg"
          >
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 font-mono text-xs text-(--ink-muted)">
                  <span className="rounded tag-filter-active px-2 py-0.5 text-[11px] font-semibold">
                    Featured
                  </span>
                  {featuredPost.publishedAt && (
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  {featuredPost.estimatedReadTime && (
                    <>
                      <span>·</span>
                      <span>{featuredPost.estimatedReadTime}</span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-(--ink-primary) group-hover:text-(--ink-secondary) transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
                  {featuredPost.excerpt}
                </p>

                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredPost.tags.map((t: string) => (
                      <span key={t} className="tech-tag text-xs font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--ink-primary) group-hover:translate-x-1 transition-transform">
                    Read full article <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Cover visual container */}
              <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-subtle)">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <div className="h-full w-full bg-linear-to-br from-(--bg-subtle) via-(--bg-surface) to-(--bg-primary) flex items-center justify-center p-8 text-center">
                    <BookOpen className="h-12 w-12 text-(--ink-muted) opacity-40 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Remaining Posts */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {remainingPosts.map((post: any) => (
          <Link
            key={post._id || post.slug}
            href={`/blog/${post.slug}`}
            aria-label={`Read article: ${post.title}`}
            className="group flex flex-col justify-between rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 sm:p-8 transition-all hover:border-(--border-strong) hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-(--ink-muted)">
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
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
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--ink-primary) group-hover:text-(--ink-secondary) transition-colors">
                {post.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-(--ink-secondary) line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-(--border-subtle) flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags?.slice(0, 3).map((t: string) => (
                  <span key={t} className="tech-tag text-[11px] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-(--ink-primary) group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read <ArrowRight size={13} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-16">
          <EmptyState
            badge={activeTag ? `Tag: #${activeTag}` : "Curating Articles"}
            title={activeTag ? `No articles tagged #${activeTag}` : "Articles currently being drafted."}
            description={
              activeTag
                ? "There are currently no notes or dispatches filed under this topic. Reset the filter to view all published entries."
                : "Architectural dispatches and engineering notes are being written in Sanity CMS. Check back shortly or view selected projects."
            }
            icon={<BookOpen className="h-6 w-6 stroke-[1.75]" />}
            actionLabel={activeTag ? "Clear Filter" : "View Projects"}
            actionHref={activeTag ? "/blog" : "/projects"}
            secondaryLabel={activeTag ? "View Projects" : "Return Home"}
            secondaryHref={activeTag ? "/projects" : "/"}
          />
        </div>
      )}
    </div>
  );
}
