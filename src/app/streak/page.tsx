"use client";

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import {
  Flame,
  Trophy,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';

const MILESTONES = [
  { id: 'm1', name: 'First Spark', days: 1, achieved: true, icon: '🔥', desc: 'Completed your first technical deep dive.' },
  { id: 'm2', name: '7-Day Scholar', days: 7, achieved: true, icon: '🌱', desc: 'One solid week of uninterrupted STEM literature review.' },
  { id: 'm3', name: '14-Day Dedication', days: 14, achieved: true, icon: '⚡', desc: 'Fortnight of continuous revision and quiz testing.' },
  { id: 'm4', name: '21-Day Habit Master', days: 21, achieved: false, icon: '🏆', desc: 'Permanent neuro-habit formation unlocked.' },
  { id: 'm5', name: '30-Day Iron Will', days: 30, achieved: false, icon: '👑', desc: 'Elite top 1% STEM researcher consistency.' },
];

export default function StreakPage() {
  const { user, dueTodayRetentionCards, quizCompleted, incrementStreak } = useStore();

  // Generate 35 mock days for the interactive heatmap
  const daysGrid = Array.from({ length: 35 }).map((_, i) => {
    const dayNumber = i + 1;
    // Highlight last 14 days as active
    const isActive = dayNumber >= 15 && dayNumber <= 28;
    const isToday = dayNumber === 28;
    return {
      dayNumber,
      isActive,
      isToday,
      readArticles: isActive ? (isToday ? 3 : Math.floor(Math.random() * 3) + 3) : 0,
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
      
      {/* Hero Streak Flame Card */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-linear-to-r from-orange-600 via-amber-600 to-neutral-900 p-6 sm:p-10 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white border border-white/20 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Consistency Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-3">
              <span>{user.streakDays} Days</span>
              <Flame className="h-10 w-10 text-yellow-300 fill-yellow-300 animate-pulse" />
            </h1>
            <p className="mt-2 text-sm sm:text-base text-orange-100 max-w-lg leading-relaxed">
              You are currently on a 14-day research streak! Daily consistency is the single greatest predictor of mastery across complex STEM disciplines.
            </p>
          </div>

          <div className="flex flex-row sm:flex-col gap-3 shrink-0">
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10 backdrop-blur-md text-center min-w-[120px]">
              <p className="text-2xl font-black text-yellow-300">18</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-200">Longest Streak</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10 backdrop-blur-md text-center min-w-[120px]">
              <p className="text-2xl font-black text-emerald-300">84%</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-200">Quiz Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Habit Checklist */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Today&apos;s Daily Study Targets
            </h2>
            <p className="text-xs text-neutral-500">
              Complete these three daily rituals to maintain your active streak.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            2 of 3 Completed
          </span>
        </div>

        <div className="space-y-3">
          {/* Target 1 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Read 3 STEM Research Deep Dives</p>
                <p className="text-xs text-neutral-500">Completed 3 of 3 today • Quantum Computing &amp; AI architectures covered</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Done ✓</span>
          </div>

          {/* Target 2 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${quizCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {quizCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Attempt Daily Prelims Radar Quiz</p>
                <p className="text-xs text-neutral-500">
                  {quizCompleted ? '5 Questions answered with instant scoring' : '5 Questions pending review'}
                </p>
              </div>
            </div>
            {quizCompleted ? (
              <span className="text-xs font-bold text-emerald-600">Done ✓</span>
            ) : (
              <Link
                href="/revise"
                className="rounded-xl bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-600 transition"
              >
                Start Quiz
              </Link>
            )}
          </div>

          {/* Target 3 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${dueTodayRetentionCards.length === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {dueTodayRetentionCards.length === 0 ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Clear SM-2 Spaced Retention Deck</p>
                <p className="text-xs text-neutral-500">
                  {dueTodayRetentionCards.length === 0
                    ? 'All scheduled cards reviewed'
                    : `${dueTodayRetentionCards.length} review cards scheduled for today`}
                </p>
              </div>
            </div>
            {dueTodayRetentionCards.length === 0 ? (
              <span className="text-xs font-bold text-emerald-600">Done ✓</span>
            ) : (
              <Link
                href="/revise"
                className="rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition"
              >
                Clear Deck
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* GitHub-style 35-Day Activity Heatmap Grid */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-600" />
              Activity Heatmap (Last 5 Weeks)
            </h2>
            <p className="text-xs text-neutral-500">
              Each block represents a calendar day of reading and quiz activity.
            </p>
          </div>

          {/* Streak Freeze Shield Info */}
          <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-1.5 border border-blue-200 text-xs font-semibold text-blue-700">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>1 Streak Freeze Active</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-neutral-400 uppercase">
              {day}
            </div>
          ))}

          {daysGrid.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center rounded-xl p-2 sm:p-3 text-xs transition-all ${
                day.isActive
                  ? day.isToday
                    ? 'bg-amber-500 text-white font-extrabold shadow-md scale-105 ring-2 ring-amber-400 ring-offset-2'
                    : 'bg-emerald-500 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <span className="text-[10px] sm:text-xs">Day {day.dayNumber}</span>
              {day.isActive && (
                <span className="text-[9px] opacity-90 sm:block hidden">
                  {day.readArticles} arts
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral-500">
          <span>Less active</span>
          <span className="h-3 w-3 rounded-xs bg-neutral-100" />
          <span className="h-3 w-3 rounded-xs bg-emerald-200" />
          <span className="h-3 w-3 rounded-xs bg-emerald-500" />
          <span className="h-3 w-3 rounded-xs bg-amber-500" />
          <span>More active</span>
        </div>
      </div>

      {/* Milestone Badges Collection */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          Streak Milestones &amp; Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MILESTONES.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-4 transition-all ${
                m.achieved
                  ? 'border-amber-200 bg-linear-to-br from-amber-50/50 to-white shadow-xs'
                  : 'border-neutral-200 bg-neutral-50/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-2xl">{m.icon}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.achieved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {m.achieved ? 'Unlocked ✓' : `${m.days} Days Target`}
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900">{m.name}</h3>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
