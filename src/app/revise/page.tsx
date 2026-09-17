"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import { UserRetentionCard, QuizQuestion } from '@/lib/types';
import SubjectBadge from '@/components/SubjectBadge';
import {
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Trophy,
  ArrowRight,
  AlertTriangle,
  Flame,
  Crown,
  HelpCircle,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';

export default function RevisePage() {
  const router = useRouter();
  const {
    dueTodayRetentionCards,
    completeRetentionReview,
    dailyQuiz,
    quizCompleted,
    lastQuizScore,
    submitDailyQuiz,
    entitlement,
    user
  } = useStore();

  // Active view: 'overview' | 'quiz_running' | 'quiz_finished' | 'card_test'
  const [activeView, setActiveView] = useState<'overview' | 'quiz_running' | 'quiz_finished' | 'card_test'>('overview');

  // Daily Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [confidenceLevels, setConfidenceLevels] = useState<Record<string, 'High' | 'Medium' | 'Low'>>({});
  const [showAnswerExplanation, setShowAnswerExplanation] = useState(false);
  const [quizResults, setQuizResults] = useState<{ score: number; total: number; percentage: number } | null>(null);

  // Retention Card Modal state
  const [selectedRetentionCard, setSelectedRetentionCard] = useState<UserRetentionCard | null>(null);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [activeCardTest, setActiveCardTest] = useState<UserRetentionCard | null>(null);
  const [cardSelectedOption, setCardSelectedOption] = useState<number | null>(null);
  const [cardSubmitted, setCardSubmitted] = useState(false);

  // Paywall check helper
  const checkAccessOrPaywall = () => {
    if (!entitlement.hasPremiumAccess) {
      router.push('/pro');
      return false;
    }
    return true;
  };

  // Start Daily Quiz
  const handleStartDailyQuiz = () => {
    if (!checkAccessOrPaywall()) return;
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowAnswerExplanation(false);
    setActiveView('quiz_running');
  };

  // Select Option in Quiz
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showAnswerExplanation) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // Confirm Answer for current question
  const handleConfirmAnswer = () => {
    setShowAnswerExplanation(true);
  };

  // Next Question
  const handleNextQuestion = () => {
    setShowAnswerExplanation(false);
    if (currentQuizIndex < dailyQuiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Finished Quiz
      const result = submitDailyQuiz(selectedAnswers);
      setQuizResults(result);
      setActiveView('quiz_finished');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Retention Card Interaction
  const handleCardClick = (card: UserRetentionCard) => {
    if (!checkAccessOrPaywall()) return;
    setSelectedRetentionCard(card);
    setShowRevisionModal(true);
  };

  // Start Card Retest
  const handleStartCardRetest = (card: UserRetentionCard) => {
    setShowRevisionModal(false);
    setActiveCardTest(card);
    setCardSelectedOption(null);
    setCardSubmitted(false);
    setActiveView('card_test');
  };

  // Submit Card Retest
  const handleSubmitCardRetest = () => {
    if (cardSelectedOption === null || !activeCardTest) return;
    const isCorrect = activeCardTest.question.options[cardSelectedOption]?.isCorrect;
    completeRetentionReview(activeCardTest.id, isCorrect);
    setCardSubmitted(true);
  };

  const currentQ = dailyQuiz[currentQuizIndex];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Overview View */}
      {activeView === 'overview' && (
        <div className="space-y-8 animate-fade-up">
          
          {/* Header Banner */}
          <div className="rounded-3xl border border-neutral-200/80 bg-linear-to-r from-neutral-900 via-brand-950 to-neutral-900 p-6 sm:p-8 text-white shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Spaced Repetition SM-2
                  </span>
                  {!entitlement.hasPremiumAccess && (
                    <span className="flex items-center gap-1 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
                      Gated Preview
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Revision &amp; Spaced Retention Deck
                </h1>
                <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed">
                  Based on the SuperMemo-2 (SM-2) algorithm. Volatile STEM formulas, algorithmic complexities, and quantum gate fidelities expand in review intervals only when successfully recalled, preventing memory decay.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-4 border border-white/10 shrink-0">
                <span className="text-2xl font-extrabold text-amber-400">
                  {dueTodayRetentionCards.length}
                </span>
                <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                  Due Today
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Spaced Repetition Due Today Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-neutral-900">
                  High-Priority Review Cards
                </h2>
                <p className="text-xs text-neutral-500">
                  Tap any card to trigger the Reread &amp; Requiz revision loop.
                </p>
              </div>

              <span className="text-xs font-semibold text-neutral-500">
                {dueTodayRetentionCards.length} cards scheduled
              </span>
            </div>

            {dueTodayRetentionCards.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <h3 className="mt-2 text-sm font-bold text-neutral-900">All caught up for today!</h3>
                <p className="mt-1 text-xs text-neutral-600">
                  You have completed all scheduled SM-2 retention cards. New cards will appear as you read more STEM research papers.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dueTodayRetentionCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className="group cursor-pointer rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs transition-all hover:border-amber-400 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <SubjectBadge subject={card.subject} size="sm" />
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        Interval: {card.intervalDays}d
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                      {card.topicName}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-500 line-clamp-1">
                      From: {card.articleTitle}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-400 font-medium">
                        Mistakes: <strong className="text-neutral-700">{card.mistakeCount}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-amber-700 group-hover:translate-x-0.5 transition-transform">
                        Start Review Loop
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 2: Daily Mastery Quiz Callout */}
          <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                    Daily Challenge
                  </span>
                  {quizCompleted && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                      Completed Today ({lastQuizScore?.percentage}%)
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-neutral-900">
                  STEM Peer-Review: 5-Question Daily Challenge
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
                  Rigorous statement-evaluation questions strictly conforming to peer-reviewed technical standards. Includes mathematical derivations and journal citations.
                </p>
              </div>

              <button
                onClick={handleStartDailyQuiz}
                className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-600 shrink-0"
              >
                <span>{quizCompleted ? 'Re-take Challenge' : 'Launch Daily Quiz'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Reread & Requiz Revision Loop Modal (Scenario B from verification guide) */}
      {showRevisionModal && selectedRetentionCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl animate-fade-up">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <RotateCcw className="h-4 w-4" />
              Spaced Repetition Review Loop
            </div>

            <h3 className="text-lg font-extrabold text-neutral-900">
              Review: &ldquo;{selectedRetentionCard.topicName}&rdquo;
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To guarantee long-term retention according to cognitive memory science, please <strong>re-read the original article first</strong>, then complete the single-question requiz.
            </p>

            <div className="mt-5 rounded-2xl bg-neutral-50 p-4 border border-neutral-100 text-xs space-y-1">
              <p><strong className="text-neutral-700">Source:</strong> {selectedRetentionCard.articleTitle}</p>
              <p><strong className="text-neutral-700">Current Interval:</strong> {selectedRetentionCard.intervalDays} days</p>
              <p><strong className="text-neutral-700">Ease Factor:</strong> {selectedRetentionCard.easeFactor}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/article/${selectedRetentionCard.articleId}`}
                onClick={() => setShowRevisionModal(false)}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 px-4 py-3 text-xs font-bold text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50 transition"
              >
                <BookOpen className="h-4 w-4" />
                1. REREAD ARTICLE
              </Link>

              <button
                onClick={() => handleStartCardRetest(selectedRetentionCard)}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-xs font-bold text-white shadow-xs hover:bg-brand-700 transition"
              >
                <RotateCcw className="h-4 w-4" />
                2. REQUIZ NOW
              </button>
            </div>

            <button
              onClick={() => setShowRevisionModal(false)}
              className="mt-3 w-full text-center text-xs font-medium text-neutral-400 hover:text-neutral-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Card Retest Mode (Single retention question) */}
      {activeView === 'card_test' && activeCardTest && (
        <div className="space-y-6 animate-fade-up">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <button
              onClick={() => setActiveView('overview')}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900"
            >
              ← Back to Deck
            </button>
            <span className="text-xs font-bold text-amber-700">
              SM-2 Retest Challenge
            </span>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <SubjectBadge subject={activeCardTest.subject} size="sm" />
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-semibold text-neutral-600">{activeCardTest.topicName}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-relaxed whitespace-pre-line">
              {activeCardTest.question.prompt}
            </h3>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {activeCardTest.question.options.map((opt, i) => {
                const isSelected = cardSelectedOption === i;
                const isCorrect = opt.isCorrect;

                let btnStyle = 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800';
                if (isSelected && !cardSubmitted) {
                  btnStyle = 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20';
                } else if (cardSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={cardSubmitted}
                    onClick={() => setCardSelectedOption(i)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-xs sm:text-sm transition ${btnStyle}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {cardSubmitted && (
              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 animate-fade-up">
                <div className="flex items-center gap-2 mb-2">
                  {activeCardTest.question.options[cardSelectedOption!]?.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Correct Answer! Interval expanded.
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                      <XCircle className="h-4 w-4" /> Incorrect. Scheduled for repetition.
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 whitespace-pre-line leading-relaxed">
                  {activeCardTest.question.explanation}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-500">
                  <strong>Syllabus Reference:</strong> {activeCardTest.question.syllabusReference}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end">
              {!cardSubmitted ? (
                <button
                  disabled={cardSelectedOption === null}
                  onClick={handleSubmitCardRetest}
                  className="rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-600 disabled:opacity-50 transition"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => setActiveView('overview')}
                  className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700 transition"
                >
                  Back to Revision Deck
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Daily Quiz Playing Screen */}
      {activeView === 'quiz_running' && currentQ && (
        <div className="space-y-6 animate-fade-up">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
              <span>Question {currentQuizIndex + 1} of {dailyQuiz.length}</span>
              <span>{Math.round(((currentQuizIndex + 1) / dailyQuiz.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-brand-600 transition-all duration-300"
                style={{ width: `${((currentQuizIndex + 1) / dailyQuiz.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <SubjectBadge subject={currentQ.subject} size="sm" />
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600">
                {currentQ.paper}
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-medium text-amber-600">{currentQ.difficulty}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </h3>

            {/* Option Choices */}
            <div className="mt-6 space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.optionIndex;
                const isCorrect = opt.isCorrect;

                let optionClass = 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800';
                if (isSelected && !showAnswerExplanation) {
                  optionClass = 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20';
                } else if (showAnswerExplanation) {
                  if (isCorrect) {
                    optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionClass = 'border-rose-500 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={showAnswerExplanation}
                    onClick={() => handleSelectOption(currentQ.id, opt.optionIndex)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-xs sm:text-sm transition ${optionClass}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showAnswerExplanation && (
              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 animate-fade-up">
                <div className="flex items-center gap-2 mb-2">
                  {currentQ.options[selectedAnswers[currentQ.id]]?.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Correct Answer!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                      <XCircle className="h-4 w-4" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 whitespace-pre-line leading-relaxed">
                  {currentQ.explanation}
                </p>

                <p className="mt-3 pt-2 border-t border-neutral-200 text-xs text-neutral-500">
                  <strong>UPSC Reference:</strong> {currentQ.syllabusReference}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-4">
              <button
                onClick={() => setActiveView('overview')}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-700"
              >
                Quit Quiz
              </button>

              {!showAnswerExplanation ? (
                <button
                  disabled={selectedAnswers[currentQ.id] === undefined}
                  onClick={handleConfirmAnswer}
                  className="rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-600 disabled:opacity-40 transition"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-700 transition"
                >
                  <span>{currentQuizIndex < dailyQuiz.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Finished Summary Screen */}
      {activeView === 'quiz_finished' && quizResults && (
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-xs text-center space-y-6 animate-fade-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 border-2 border-amber-300">
            <Trophy className="h-10 w-10 text-amber-500 animate-bounce" />
          </div>

          <div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Daily Challenge Completed
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Outstanding Effort!
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              You scored <strong className="text-neutral-900 font-bold">{quizResults.score} out of {quizResults.total} ({quizResults.percentage}%)</strong>
            </p>
          </div>

          <div className="mx-auto max-w-sm grid grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-4 border border-neutral-100 text-left">
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Accuracy</p>
              <p className="text-xl font-extrabold text-neutral-900">{quizResults.percentage}%</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Streak</p>
              <p className="text-xl font-extrabold text-orange-600 flex items-center gap-1">
                <Flame className="h-5 w-5 fill-orange-500" />
                {user.streakDays} Days
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveView('overview')}
              className="w-full sm:w-auto rounded-xl bg-neutral-900 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition"
            >
              Return to Revision Deck
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto rounded-xl border border-neutral-200 px-6 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition"
            >
              Explore Today&apos;s Feed
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
