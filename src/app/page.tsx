"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ArticleCard from '@/components/ArticleCard';
import { SubjectCategory, PaperTag } from '@/lib/types';
import {
  Flame,
  Search,
  Sparkles,
  BookOpen,
  RotateCcw,
  Target,
  ArrowRight,
  TrendingUp,
  Cpu,
  Atom,
  Binary,
  Dna,
  Zap,
  HelpCircle,
  CheckCircle,
  Microscope
} from 'lucide-react';

const SUBJECT_FILTERS: (SubjectCategory | 'All')[] = [
  'All',
  'AI & Machine Learning',
  'Quantum & Physics',
  'Semiconductors & Hardware',
  'Biotech & Genomics',
  'Clean Energy & Fusion',
  'Mathematics & Cryptography',
];

const DOMAIN_FILTERS: (PaperTag | 'All')[] = [
  'All',
  'Research Paper',
  'Deep Tech',
  'System Architecture',
  'Hardware Spec',
  'Applied Math',
];

export default function HomeFeed() {
  const { articles, user, dueTodayRetentionCards, quizCompleted, lastQuizScore } = useStore();
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'All'>('All');
  const [selectedDomain, setSelectedDomain] = useState<PaperTag | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered articles
  const filteredArticles = articles.filter((art) => {
    const matchesSubject = selectedSubject === 'All' || art.subject === selectedSubject;
    const matchesDomain = selectedDomain === 'All' || art.paper === selectedDomain;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.syllabusMapping.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.prelimsPointers.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesDomain && matchesSearch;
  });

  const featuredArticle = articles[0];
  const regularArticles = filteredArticles.filter((art) => art.id !== featuredArticle.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Hero STEM Intelligence Banner */}
      <section className="mb-8 overflow-hidden rounded-3xl border border-neutral-200/80 bg-linear-to-br from-neutral-950 via-[#0A1128] to-neutral-900 p-6 text-white shadow-xl sm:p-10 relative">
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300 border border-violet-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                Bleeding-Edge STEM Intelligence
              </span>
              <span className="flex items-center gap-1 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-400 border border-orange-500/30">
                <Flame className="h-3.5 w-3.5 fill-orange-400" />
                {user.streakDays} Day Research Streak
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
              Every Breakthrough That Matters. <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-blue-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                One Clear STEM Feed.
              </span>
            </h1>

            <p className="mt-3 text-sm text-neutral-300 leading-relaxed sm:text-base max-w-xl">
              From arXiv preprints to production silicon. Curating peer-reviewed breakthroughs across Artificial Intelligence, Quantum Physics, Advanced Semiconductors, and Biotechnology with integrated cognitive spaced repetition (SM-2).
            </p>
          </div>

          {/* Daily Reading & Research Goal Widget */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/30 border-2 border-indigo-400">
                <span className="text-sm font-bold text-white">3/5</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-neutral-200 uppercase tracking-wider">
                  Daily Paper Goal
                </p>
                <p className="text-xs text-neutral-300 mt-0.5">
                  60% Complete • 2 deep-dives left
                </p>
              </div>
            </div>

            <Link
              href="/revise"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-400"
            >
              <span>Daily STEM Quiz</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </section>

      {/* Main Grid: Articles on Left, Sticky Widgets on Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column: Feed & STEM Category Filters (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search & Topic Filters */}
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search breakthroughs, arXiv papers, equations (e.g. 'Surface Code', 'High-NA EUV', 'Cas13', 'REBCO')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 shadow-xs placeholder:text-neutral-400 focus:border-brand-500 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Subject Filters Carousel */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUBJECT_FILTERS.map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    selectedSubject === subj
                      ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                      : 'bg-white border border-neutral-200/80 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>

            {/* Domain / Paper Type Secondary Filter */}
            <div className="flex items-center gap-2 pt-1 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">Format:</span>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {DOMAIN_FILTERS.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`rounded-md px-2 py-0.5 text-xs transition shrink-0 ${
                      selectedDomain === domain
                        ? 'bg-brand-100 text-brand-800 font-bold'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Article Spotlight */}
          {selectedSubject === 'All' && selectedDomain === 'All' && searchQuery === '' && (
            <div>
              <ArticleCard article={featuredArticle} featured={true} />
            </div>
          )}

          {/* Regular Articles Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <Microscope className="h-4 w-4 text-brand-600" />
                {selectedSubject === 'All' ? 'Curated STEM Breakthroughs' : `${selectedSubject} Papers`}
                <span className="ml-1 text-xs font-normal text-neutral-500">
                  ({filteredArticles.length} {filteredArticles.length === 1 ? 'deep-dive' : 'deep-dives'})
                </span>
              </h2>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-neutral-400" />
                <h3 className="mt-2 text-sm font-semibold text-neutral-900">No matching STEM papers found</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Try clearing your search query or selecting a different STEM domain filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject('All');
                    setSelectedDomain('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(selectedSubject === 'All' && selectedDomain === 'All' && searchQuery === ''
                  ? regularArticles
                  : filteredArticles
                ).map((art) => (
                  <ArticleCard key={art.id} article={art} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: STEM Widgets & Retention Center (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Spaced Repetition (SM-2) Callout */}
          <div className="rounded-3xl border border-amber-200/80 bg-linear-to-b from-amber-50/70 to-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <RotateCcw className="h-4 w-4 text-amber-600" />
                Spaced Retention Deck
              </span>
              <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                {dueTodayRetentionCards.length} DUE TODAY
              </span>
            </div>

            <h3 className="text-sm font-bold text-neutral-900">
              Technical Concepts Due For Review
            </h3>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              SuperMemo-2 (SM-2) intervals lock volatile STEM formulas and theorems into long-term memory.
            </p>

            <div className="mt-4 space-y-2">
              {dueTodayRetentionCards.slice(0, 2).map((card) => (
                <div key={card.id} className="rounded-xl border border-amber-200/50 bg-white p-2.5 text-xs">
                  <p className="font-semibold text-neutral-900 truncate">{card.topicName}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Mistakes: {card.mistakeCount} • Interval: {card.intervalDays}d</p>
                </div>
              ))}
            </div>

            <Link
              href="/revise"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-amber-700"
            >
              <span>Launch Retention Review</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Daily STEM Mastery Quiz Widget */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1">
                <Target className="h-4 w-4" />
                Daily STEM Challenge
              </span>
              {quizCompleted ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="h-3 w-3" />
                  Score: {lastQuizScore?.percentage}%
                </span>
              ) : (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                  5 Questions
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-neutral-900">
              Today&apos;s Engineering &amp; Physics Challenge
            </h3>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              Test statement-level accuracy on quantum error correction, high-NA lithography, and LLM attention kernels.
            </p>

            <Link
              href="/revise"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-600"
            >
              <span>{quizCompleted ? 'Re-take Challenge' : 'Start Daily Quiz (2 min)'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* High-Yield STEM Topics */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              <TrendingUp className="h-4 w-4 text-brand-600" />
              Trending Research Keywords
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {[
                'SurfaceCodeQEC',
                'HighNAEUV',
                'FlashAttention3',
                'MixtureOfDepths',
                'CRISPRCas13',
                'REBCOFusion',
                'MLKEM768',
                'BacksidePower',
                'RayleighCriterion',
                'OpticalTweezers'
              ].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearchQuery(keyword)}
                  className="rounded-lg border border-neutral-100 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition"
                >
                  #{keyword}
                </button>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}