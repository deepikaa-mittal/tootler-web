"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ArticleCard from '@/components/ArticleCard';
import SubjectBadge from '@/components/SubjectBadge';
import { SubjectCategory } from '@/lib/types';
import {
  BookOpen,
  Bookmark,
  Search,
  FolderKanban,
  FileText,
  Clock,
  ArrowRight,
  Library as LibraryIcon,
  Compass,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const COLLECTIONS: { name: SubjectCategory; count: number; desc: string }[] = [
  { name: 'Quantum & Physics', count: 24, desc: 'Surface code QEC, neutral atom tweezers, transmon gates' },
  { name: 'AI & Machine Learning', count: 32, desc: 'Sparse attention, FlashAttention-3, Mixture-of-Depths, KV-cache' },
  { name: 'Semiconductors & Hardware', count: 19, desc: 'High-NA EUV, GAA nanosheets, Backside Power Delivery (BSPDN)' },
  { name: 'Biotech & Genomics', count: 16, desc: 'CRISPR-Cas13 RNA editing, collateral suppression, LNP delivery' },
  { name: 'Clean Energy & Fusion', count: 14, desc: 'Compact REBCO tokamaks, B^4 scaling, Lawson triple products' },
  { name: 'Mathematics & Cryptography', count: 18, desc: 'Lattice cryptography, ML-KEM/Kyber, ML-DSA, Shor vulnerabilities' },
];

export default function LibraryPage() {
  const { articles, bookmarkedIds, studyNotes } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'notes'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Bookmarked articles
  const savedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  // Filtered curated articles
  const filteredArticles = articles.filter((art) => {
    const matchesSubject = selectedSubject === 'All' || art.subject === selectedSubject;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.syllabusMapping.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Flat list of all user study notes with article title
  const allNotes = Object.entries(studyNotes).flatMap(([artId, notes]) => {
    const art = articles.find((a) => a.id === artId);
    return notes.map((n) => ({
      ...n,
      articleTitle: art?.title || 'Unknown Editorial',
      articleSubject: art?.subject,
    }));
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
      
      {/* Header Banner */}
      <div className="rounded-3xl border border-neutral-200/80 bg-linear-to-r from-neutral-900 via-brand-950 to-neutral-900 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-400 border border-brand-500/30 mb-2">
              <LibraryIcon className="h-3.5 w-3.5" />
              Comprehensive GS Repository
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Read Library &amp; Archives
            </h1>
            <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Permanent archive of all curated editorials, syllabus-tagged topics, personal highlights, and revision notes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3.5 text-center border border-white/10">
              <p className="text-xl font-extrabold text-white">{articles.length}</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Editorials</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3.5 text-center border border-white/10">
              <p className="text-xl font-extrabold text-amber-400">{savedArticles.length}</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400">Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Curated Archive ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'saved'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved for Revision ({savedArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'notes'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>My Notes ({allNotes.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search archive or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-3 text-xs text-neutral-900 shadow-xs focus:border-brand-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tab Content: Curated Archive */}
      {activeTab === 'all' && (
        <div className="space-y-8">
          
          {/* Subject Collections Grid */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 mb-3">
              Subject Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLLECTIONS.map((col) => (
                <div
                  key={col.name}
                  onClick={() => setSelectedSubject(col.name === selectedSubject ? 'All' : col.name)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    selectedSubject === col.name
                      ? 'border-brand-600 bg-brand-50/50 shadow-xs ring-1 ring-brand-600'
                      : 'border-neutral-200/80 bg-white hover:border-neutral-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <SubjectBadge subject={col.name} size="sm" />
                    <span className="text-xs font-bold text-neutral-500">{col.count} Articles</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {col.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Articles Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                {selectedSubject === 'All' ? 'All Archived Editorials' : `${selectedSubject} Articles`}
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  ({filteredArticles.length} found)
                </span>
              </h2>

              {selectedSubject !== 'All' && (
                <button
                  onClick={() => setSelectedSubject('All')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Show all subjects
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Saved Articles */}
      {activeTab === 'saved' && (
        <div>
          {savedArticles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
              <Bookmark className="mx-auto h-8 w-8 text-neutral-400" />
              <h3 className="mt-2 text-sm font-semibold text-neutral-900">No saved articles yet</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Bookmark articles on the feed or while reading to access them quickly here.
              </p>
              <button
                onClick={() => setActiveTab('all')}
                className="mt-4 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Browse Archive
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: My Notes */}
      {activeTab === 'notes' && (
        <div>
          {allNotes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
              <FileText className="mx-auto h-8 w-8 text-neutral-400" />
              <h3 className="mt-2 text-sm font-semibold text-neutral-900">No study notes recorded</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Open any article in the reader to jot down custom revision notes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {allNotes.map((note) => (
                <div key={note.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {note.articleTitle}
                    </span>
                    {note.articleSubject && <SubjectBadge subject={note.articleSubject} size="sm" />}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    &quot;{note.note}&quot;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <Link
                      href={`/article/${note.articleId}`}
                      className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                    >
                      Open Article
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
