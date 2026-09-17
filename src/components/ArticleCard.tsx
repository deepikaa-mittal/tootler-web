"use client";

import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { useStore } from '@/lib/store';
import SubjectBadge from './SubjectBadge';
import {
  Bookmark,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { bookmarkedIds, toggleBookmark } = useStore();
  const isBookmarked = bookmarkedIds.includes(article.id);

  if (featured) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-linear-to-br from-white via-white to-brand-50/30 p-6 shadow-sm sm:p-8 transition hover:shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Editor&apos;s Lead Pick
            </span>
            <SubjectBadge subject={article.subject} size="sm" />
            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-neutral-700">
              {article.paper}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.source}</span>
          </div>
        </div>

        <Link href={`/article/${article.id}`} className="group block">
          <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-brand-600 sm:text-2xl transition-colors">
            {article.title}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        </Link>

        {/* STEM Quick Anchors */}
        <div className="mt-5 rounded-2xl bg-neutral-50/80 p-3.5 border border-neutral-100">
          <p className="text-[11px] font-bold tracking-wider text-brand-700 uppercase">
            ⚡ Key Scientific &amp; Engineering Tenets:
          </p>
          <ul className="mt-1.5 space-y-1 text-xs text-neutral-700">
            {article.prelimsPointers.slice(0, 2).map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span className="line-clamp-1">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>By {article.author.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                isBookmarked
                  ? 'border-brand-300 bg-brand-50 text-brand-700 font-semibold'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-brand-600 text-brand-600' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save for Retention'}</span>
            </button>

            <Link
              href={`/article/${article.id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-brand-600"
            >
              <span>Explore Research</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-all hover:border-brand-200 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <SubjectBadge subject={article.subject} size="sm" />
            <span className="rounded-md border border-neutral-100 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
              {article.paper}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(article.id)}
            className="p-1 text-neutral-400 hover:text-brand-600 transition"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-brand-600 text-brand-600' : ''}`} />
          </button>
        </div>

        <Link href={`/article/${article.id}`} className="block">
          <h3 className="text-base font-bold tracking-tight text-neutral-900 group-hover:text-brand-600 line-clamp-2 transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-xs text-neutral-600 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        </Link>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span className="truncate max-w-[150px] font-medium">{article.source}</span>
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1 text-neutral-400">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
          <Link
            href={`/article/${article.id}`}
            className="font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-0.5"
          >
            Read
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
