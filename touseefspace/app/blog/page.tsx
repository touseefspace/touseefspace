import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPosts } from "@/lib/queries";
import { resolveSanityImageUrl } from "@/sanity/image";
import BlogCoverPlaceholder from "@/components/BlogCoverPlaceholder";
import BlogFilters, { MobileActiveFilterPills } from "@/components/BlogFilters";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Blog & Notes | touseefspace",
  description:
    "Observations from building software, lessons learned along the journey, and essays on craft, curiosity, and life.",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; tag?: string }>;
}) {
  const { type: rawType, tag: rawTag } = await searchParams;
  const activeType =
    rawType && ["technical", "experience", "essay"].includes(rawType.toLowerCase())
      ? rawType.toLowerCase()
      : undefined;
  const activeTag = rawTag ? rawTag.trim() : undefined;

  const allPosts = await getPosts();

  // Compute format counts across the entire post library
  const formatCounts = {
    all: allPosts.length,
    technical: allPosts.filter((p) => (p.postType || "technical") === "technical").length,
    experience: allPosts.filter((p) => p.postType === "experience").length,
    essay: allPosts.filter((p) => p.postType === "essay").length,
  };

  // Posts filtered by format dimension
  const postsInActiveFormat = activeType
    ? allPosts.filter((p) => (p.postType || "technical") === activeType)
    : allPosts;

  // Extract context-aware tags from posts in active format with counts
  const tagCountMap: Record<string, number> = {};
  postsInActiveFormat.forEach((post) => {
    (post.tags || []).forEach((t: string) => {
      tagCountMap[t] = (tagCountMap[t] || 0) + 1;
    });
  });

  const availableTags = Object.entries(tagCountMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  // Apply final combined filter (format + tag)
  const filteredPosts = postsInActiveFormat.filter((post) => {
    if (!activeTag) return true;
    return post.tags?.some((t: string) => t.toLowerCase() === activeTag.toLowerCase());
  });

  const isFiltered = Boolean(activeType || activeTag);
  const featuredPost = !isFiltered ? filteredPosts.find((p) => p.featured) : null;
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => (p._id || p.id) !== (featuredPost._id || featuredPost.id))
    : filteredPosts;

  return (
    <div className="page-shell relative pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="section-label">Writing & Dispatches</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">Stories & Dispatches</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--ink-primary)">
          Systems, stories, and life lessons.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Observations from building software, lessons learned along the journey, and essays on craft, curiosity, and life.
        </p>
      </div>

      {/* Mobile-Only Active Filter Badges */}
      <MobileActiveFilterPills activeType={activeType} activeTag={activeTag} />

      {/* Desktop Reserved Control Bar & Divider + Mobile Floating Trigger */}
      <BlogFilters
        activeType={activeType}
        activeTag={activeTag}
        formatCounts={formatCounts}
        availableTags={availableTags}
        totalFilteredCount={filteredPosts.length}
        totalPostsCount={allPosts.length}
      >

      {/* Featured Post Spotlight (Rendered in unfiltered feed) */}
      {featuredPost && (() => {
        const featuredCoverUrl = resolveSanityImageUrl(
          featuredPost.coverImage as Parameters<typeof resolveSanityImageUrl>[0],
          1000
        );
        const postTypeLabel =
          featuredPost.postType === "experience"
            ? "Field Note"
            : featuredPost.postType === "essay"
            ? "Essay"
            : null;

        return (
          <div className="mt-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              aria-label={`Read featured article: ${featuredPost.title}`}
              className="group block rounded-3xl border border-(--border-card) bg-(--bg-surface) p-5 sm:p-7 lg:p-10 transition-all hover:border-(--border-strong) hover:shadow-lg"
            >
              {/* Mobile View (< lg): Exactly matches grid card hierarchy */}
              <div className="lg:hidden flex flex-col justify-between">
                <div>
                  {/* 1. Topmost: Metadata row (Date, minutes read, featured/type badge) */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-(--ink-muted) mb-3.5">
                    <span className="rounded tag-filter-active px-2 py-0.5 text-[11px] font-semibold">
                      Featured
                    </span>
                    {postTypeLabel && (
                      <span className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--ink-secondary)">
                        {postTypeLabel}
                      </span>
                    )}
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

                  {/* 2. Cover Visual Container */}
                  <div className="relative aspect-16/10 sm:aspect-2/1 w-full overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-subtle) mb-4">
                    {featuredCoverUrl ? (
                      <Image
                        src={featuredCoverUrl}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <BlogCoverPlaceholder
                        title={featuredPost.title}
                        tags={featuredPost.tags}
                        postType={featuredPost.postType}
                        compact
                      />
                    )}
                  </div>

                  {/* 3. Title and excerpt */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--ink-primary) group-hover:text-(--ink-secondary) transition-colors">
                      {featuredPost.title}
                    </h2>

                    {/* Sub descriptive text hidden on mobile view to save space */}
                    <p className="hidden sm:block text-sm sm:text-base leading-relaxed text-(--ink-secondary) line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>

                {/* 4. Bottom Divider Line (tightened on mobile) & Action */}
                <div className="pt-3.5 mt-3.5 sm:pt-6 sm:mt-6 border-t border-(--border-subtle) flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredPost.tags && featuredPost.tags.length > 0 && featuredPost.tags.slice(0, 3).map((t: string) => (
                      <span key={t} className="tech-tag text-[11px] font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-(--ink-primary) group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read full article <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Desktop View (lg and up): Full 2-column spotlight layout */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-(--ink-muted)">
                    <span className="rounded tag-filter-active px-2 py-0.5 text-[11px] font-semibold">
                      Featured
                    </span>
                    {postTypeLabel && (
                      <span className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--ink-secondary)">
                        {postTypeLabel}
                      </span>
                    )}
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

                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--ink-primary) group-hover:text-(--ink-secondary) transition-colors">
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
                  {featuredCoverUrl ? (
                    <div className="relative aspect-16/10 w-full overflow-hidden">
                      <Image
                        src={featuredCoverUrl}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <BlogCoverPlaceholder
                      title={featuredPost.title}
                      tags={featuredPost.tags}
                      postType={featuredPost.postType}
                    />
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })()}

      {/* Grid of Posts */}
      {gridPosts.length > 0 && (
        <div className={`grid gap-8 md:grid-cols-2 ${featuredPost ? "mt-12" : "mt-6"}`}>
          {gridPosts.map((post) => {
            const postCoverUrl = resolveSanityImageUrl(
              post.coverImage as Parameters<typeof resolveSanityImageUrl>[0],
              600
            );
            const postTypeLabel =
              post.postType === "experience"
                ? "Field Note"
                : post.postType === "essay"
                ? "Essay"
                : null;

            return (
              <Link
                key={post._id || post.slug}
                href={`/blog/${post.slug}`}
                aria-label={`Read article: ${post.title}`}
                className="group flex flex-col justify-between rounded-3xl border border-(--border-card) bg-(--bg-surface) p-5 sm:p-7 transition-all hover:border-(--border-strong) hover:shadow-md"
              >
                <div>
                  {/* 1. Metadata Line at the topmost, just above the image */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-(--ink-muted) mb-3.5">
                    {postTypeLabel && (
                      <span className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--ink-secondary)">
                        {postTypeLabel}
                      </span>
                    )}
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

                  {/* 2. Cover Visual Container */}
                  <div className="relative aspect-16/10 sm:aspect-2/1 w-full overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-subtle) mb-4">
                    {postCoverUrl ? (
                      <Image
                        src={postCoverUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <BlogCoverPlaceholder
                        title={post.title}
                        tags={post.tags}
                        postType={post.postType}
                        compact
                      />
                    )}
                  </div>

                  {/* 3. Title and excerpt */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--ink-primary) group-hover:text-(--ink-secondary) transition-colors">
                      {post.title}
                    </h2>

                    {/* Sub descriptive text hidden on mobile view to save space */}
                    <p className="hidden sm:block text-sm sm:text-base leading-relaxed text-(--ink-secondary) line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* 4. Bottom Divider Line (tightened on mobile) & Action */}
                <div className="pt-3.5 mt-3.5 sm:pt-6 sm:mt-6 border-t border-(--border-subtle) flex items-center justify-between">
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
            );
          })}
        </div>
      )}

      {/* Contextual Empty State */}
      {filteredPosts.length === 0 && (() => {
        const formatLabel =
          activeType === "experience"
            ? "Field Notes"
            : activeType === "essay"
            ? "Essays"
            : activeType === "technical"
            ? "Engineering Articles"
            : "Articles";

        const emptyBadge = activeTag
          ? `${formatLabel} · #${activeTag}`
          : `Format: ${formatLabel}`;

        const emptyTitle = activeTag
          ? `No ${formatLabel.toLowerCase()} found tagged #${activeTag}`
          : `No ${formatLabel.toLowerCase()} published yet.`;

        const emptyDescription = isFiltered
          ? "We couldn't find any articles matching this filter combination. Try adjusting the format or clearing your topic filter."
          : "Articles and dispatches are currently being drafted in Sanity CMS. Check back soon or browse case studies.";

        return (
          <div className="mt-16">
            <EmptyState
              badge={emptyBadge}
              title={emptyTitle}
              description={emptyDescription}
              icon={<BookOpen className="h-6 w-6 stroke-[1.75]" />}
              actionLabel={isFiltered ? "Clear All Filters" : "View Projects"}
              actionHref={isFiltered ? "/blog" : "/projects"}
              secondaryLabel={isFiltered ? "View Projects" : "Return Home"}
              secondaryHref={isFiltered ? "/projects" : "/"}
            />
          </div>
        );
      })()}
      </BlogFilters>
    </div>
  );
}
