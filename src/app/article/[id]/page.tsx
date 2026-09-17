"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import SubjectBadge from '@/components/SubjectBadge';
import {
  ArrowLeft,
  Bookmark,
  Highlighter,
  FileText,
  HelpCircle,
  Clock,
  Sparkles,
  Share2,
  Trash2,
  Plus,
  ChevronRight,
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export default function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;
  const router = useRouter();

  const {
    articles,
    bookmarkedIds,
    toggleBookmark,
    highlights,
    addHighlight,
    removeHighlight,
    studyNotes,
    addStudyNote,
    deleteStudyNote
  } = useStore();

  const article = articles.find((a) => a.id === articleId) || articles[0];
  const isBookmarked = bookmarkedIds.includes(article.id);

  // Reading state
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [highlightMode, setHighlightMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'article' | 'mains' | 'notes'>('article');
  const [noteInput, setNoteInput] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const articleHighlights = highlights[article.id] || [];
  const articleNotes = studyNotes[article.id] || [];

  // Handle text selection for highlighting
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      setSelectedText(selection.toString().trim());
    }
  };

  const executeHighlight = (color: 'yellow' | 'blue' | 'green' = 'yellow') => {
    if (selectedText) {
      addHighlight(article.id, selectedText, color);
      setSelectedText('');
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addStudyNote(article.id, noteInput.trim());
    setNoteInput('');
    setShowNoteModal(false);
  };

  const fontClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-4 mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Font Size Adjuster */}
          <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1 text-xs">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'sm' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'base' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
              title="Medium text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'lg' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(article.id)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
              isBookmarked
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-brand-600 text-brand-600' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Quick Link to Quiz */}
          <Link
            href="/revise"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Requiz</span>
          </Link>
        </div>
      </div>

      {/* UPSC Syllabus Mapping Card Banner */}
      <div className="mb-6 rounded-2xl border border-brand-200/80 bg-linear-to-r from-brand-50/70 via-white to-brand-50/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
            {article.syllabusMapping.paper}
          </span>
          <SubjectBadge subject={article.subject} size="sm" />
          <span className="text-xs text-neutral-500">• {article.source}</span>
        </div>
        <p className="text-xs font-bold text-neutral-800 tracking-wide uppercase">
          Syllabus Topic:
        </p>
        <p className="text-xs sm:text-sm font-semibold text-neutral-900 mt-0.5">
          {article.syllabusMapping.topic}
        </p>
        <p className="text-xs text-neutral-600 mt-0.5">
          Subtopic: {article.syllabusMapping.subTopic}
        </p>
      </div>

      {/* Article Title Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl leading-tight">
          {article.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
          {article.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-100 py-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800">{article.author.name}</span>
            <span>•</span>
            <span>{article.author.role}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </header>

      {/* Selection Floating Action Toolbar */}
      {selectedText && (
        <div className="sticky top-20 z-40 mb-4 flex items-center justify-between rounded-2xl border border-neutral-300 bg-neutral-900 px-4 py-2 text-white shadow-xl animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-300 truncate max-w-[200px] sm:max-w-xs">
              &quot;{selectedText}&quot;
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 hidden sm:inline">Highlight:</span>
            <button
              onClick={() => executeHighlight('yellow')}
              className="h-5 w-5 rounded-full bg-yellow-400 ring-2 ring-transparent hover:ring-white transition"
              title="Yellow highlight"
            />
            <button
              onClick={() => executeHighlight('blue')}
              className="h-5 w-5 rounded-full bg-blue-400 ring-2 ring-transparent hover:ring-white transition"
              title="Blue highlight"
            />
            <button
              onClick={() => executeHighlight('green')}
              className="h-5 w-5 rounded-full bg-emerald-400 ring-2 ring-transparent hover:ring-white transition"
              title="Green highlight"
            />
            <button
              onClick={() => {
                setNoteInput(`Note on: "${selectedText.substring(0, 40)}..." `);
                setShowNoteModal(true);
              }}
              className="ml-2 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold text-white hover:bg-white/30"
            >
              Add Note
            </button>
            <button
              onClick={() => setSelectedText('')}
              className="ml-1 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Reading Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Selection */}
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('article')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'article'
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Research Paper / Deconstruct
            </button>
            <button
              onClick={() => setActiveTab('mains')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'mains'
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Engineering &amp; Systems Framework
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'notes'
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <FileText className="h-4 w-4" />
              Research Notes ({articleNotes.length})
            </button>
          </div>

          {/* Tab 1: Editorial Paragraphs */}
          {activeTab === 'article' && (
            <div
              onMouseUp={handleMouseUp}
              className={`prose prose-neutral max-w-none text-neutral-800 ${fontClasses[fontSize]} space-y-6`}
            >
              {article.paragraphs.map((p, idx) => (
                <div key={idx} className="relative group">
                  <p className="leading-relaxed">{p}</p>
                </div>
              ))}

              {/* High-Yield Prelims Anchor Box */}
              <div className="my-8 rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-brand-900 uppercase tracking-wider mb-3">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  Key Engineering &amp; Theoretical Tenets
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                  {article.prelimsPointers.map((pointer, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-600 font-bold">✓</span>
                      <span>{pointer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PYQ Previous Year Question Anchor Box */}
              <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Milestone Research &amp; Historical Paper Connection
                  </span>
                  <span className="rounded-md bg-amber-200/70 px-2 py-0.5 text-xs font-bold text-amber-900">
                    {article.pyq.year} • {article.pyq.paper}
                  </span>
                </div>
                <blockquote className="text-xs sm:text-sm font-semibold italic text-neutral-900 mt-1">
                  &quot;{article.pyq.question}&quot;
                </blockquote>
              </div>
            </div>
          )}

          {/* Tab 2: Mains Analytical Framework */}
          {activeTab === 'mains' && (
            <div className="space-y-6 animate-fade-up">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
                <h3 className="text-sm font-bold text-brand-700 uppercase tracking-wider mb-3">
                  1. Architectural &amp; Theoretical Dimensions
                </h3>
                <div className="space-y-2 text-sm text-neutral-700">
                  {article.mainsPerspectives.coreDimensions.map((dim, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                        {i + 1}
                      </span>
                      <span>{dim}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
                <h3 className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-3">
                  2. Engineering Bottlenecks &amp; Physical Limits
                </h3>
                <div className="space-y-2 text-sm text-neutral-700">
                  {article.mainsPerspectives.criticalAnalysis.map((crit, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl bg-rose-50/50 p-3 border border-rose-100">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-white p-6 shadow-xs">
                <h3 className="text-xs font-bold text-brand-800 uppercase tracking-wider mb-2">
                  3. System Design &amp; Research Challenge
                </h3>
                <p className="text-sm font-semibold text-neutral-900 leading-relaxed italic">
                  &quot;{article.mainsPerspectives.modelQuestion}&quot;
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: User Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900">
                  Study Notes for this Article ({articleNotes.length})
                </h3>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-neutral-800 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Note
                </button>
              </div>

              {articleNotes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-neutral-300" />
                  <p className="mt-2 text-sm font-medium text-neutral-700">No notes saved yet</p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Capture key concepts, constitutional articles, or answer writing points.
                  </p>
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="mt-3 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100"
                  >
                    Create First Note
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {articleNotes.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs"
                    >
                      <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">{n.note}</p>
                      <button
                        onClick={() => deleteStudyNote(article.id, n.id)}
                        className="text-neutral-400 hover:text-rose-600 transition p-1"
                        title="Delete note"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Key Terms & Highlights (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Quick Requiz Callout */}
          <div className="rounded-3xl border border-brand-200 bg-linear-to-b from-brand-50/80 to-white p-5 shadow-xs">
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
              Knowledge Check
            </span>
            <h3 className="mt-1 text-sm font-bold text-neutral-900">
              Ready to test your retention?
            </h3>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              Complete the targeted review question mapped specifically to this article.
            </p>
            <Link
              href="/revise"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-brand-700"
            >
              <span>Start Article Quiz</span>
              <RotateCcw className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Highlights in this Article */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Highlighter className="h-3.5 w-3.5 text-yellow-500" />
                Saved Highlights ({articleHighlights.length})
              </h3>
            </div>

            {articleHighlights.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">
                Select any text in the article above to highlight it.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {articleHighlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="flex items-start justify-between gap-2 rounded-xl bg-amber-50/70 border border-amber-200/60 p-2.5 text-xs text-neutral-800"
                  >
                    <p className="line-clamp-3 leading-relaxed">&ldquo;{hl.text}&rdquo;</p>
                    <button
                      onClick={() => removeHighlight(article.id, hl.id)}
                      className="text-neutral-400 hover:text-rose-600 shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Conceptual Glossary */}
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-xs">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Key Terminology &amp; Precedents
            </h3>

            <div className="space-y-3">
              {article.keyTerms.map((term, i) => (
                <div key={i} className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-3">
                  <p className="text-xs font-bold text-neutral-900">{term.term}</p>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Note Creation Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl animate-fade-up">
            <h3 className="text-base font-bold text-neutral-900">Add Study Note</h3>
            <p className="mt-1 text-xs text-neutral-500">
              Attached to &quot;{article.title}&quot;
            </p>

            <form onSubmit={handleSaveNote} className="mt-4 space-y-4">
              <textarea
                rows={4}
                required
                placeholder="Write your observation, answer perspective, or revision pointer..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 p-3 text-sm focus:border-brand-500 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-brand-600 transition"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
