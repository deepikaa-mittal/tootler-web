"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Article,
  EntitlementStatus,
  QuizQuestion,
  UserHighlight,
  UserProfile,
  UserRetentionCard,
  UserStudyNote,
} from './types';
import {
  INITIAL_USER,
  MOCK_ARTICLES,
  MOCK_QUIZ_QUESTIONS,
  MOCK_RETENTION_CARDS,
} from './mock-data';

interface StoreContextType {
  // Articles
  articles: Article[];
  bookmarkedIds: string[];
  toggleBookmark: (articleId: string) => void;
  likedIds: string[];
  toggleLike: (articleId: string) => void;

  // Annotations
  highlights: Record<string, UserHighlight[]>;
  addHighlight: (articleId: string, text: string, color?: 'yellow' | 'blue' | 'green') => void;
  removeHighlight: (articleId: string, highlightId: string) => void;
  studyNotes: Record<string, UserStudyNote[]>;
  addStudyNote: (articleId: string, note: string, paragraphIndex?: number) => void;
  deleteStudyNote: (articleId: string, noteId: string) => void;

  // Retention Cards (SM-2)
  retentionCards: UserRetentionCard[];
  dueTodayRetentionCards: UserRetentionCard[];
  completeRetentionReview: (cardId: string, isCorrect: boolean) => void;

  // Quizzes
  dailyQuiz: QuizQuestion[];
  quizCompleted: boolean;
  lastQuizScore: { score: number; total: number; percentage: number } | null;
  submitDailyQuiz: (answers: Record<string, number>) => { score: number; total: number; percentage: number };

  // Profile & Streak
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  incrementStreak: () => void;

  // Tootler Pro Entitlements & Gating
  entitlement: EntitlementStatus;
  subscribePro: () => void;
  setEntitlementTrialExpired: () => void;
  setEntitlementPro: () => void;
  setEntitlementFree: () => void;

  // Reset
  resetAll: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'tootler_stem_state_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const [articles] = useState<Article[]>(MOCK_ARTICLES);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['1', '2']);
  const [likedIds, setLikedIds] = useState<string[]>(['1']);

  const [highlights, setHighlights] = useState<Record<string, UserHighlight[]>>({
    '1': [
      {
        id: 'hl_sample_1',
        articleId: '1',
        text: 'The threshold theorem proves that if the physical gate error rate p remains below a critical fault-tolerance threshold',
        color: 'yellow',
        createdAt: new Date().toISOString(),
      },
    ],
  });

  const [studyNotes, setStudyNotes] = useState<Record<string, UserStudyNote[]>>({
    '1': [
      {
        id: 'sn_sample_1',
        articleId: '1',
        paragraphIndex: 1,
        note: 'Key milestone: Code distance d=7 requires ~1,000 physical transmons per single logical qubit.',
        createdAt: new Date().toISOString(),
      },
    ],
  });

  const [retentionCards, setRetentionCards] = useState<UserRetentionCard[]>(MOCK_RETENTION_CARDS);
  const [dailyQuiz] = useState<QuizQuestion[]>(MOCK_QUIZ_QUESTIONS);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [lastQuizScore, setLastQuizScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  const [entitlement, setEntitlement] = useState<EntitlementStatus>({
    hasPremiumAccess: true,
    tier: 'trial',
    reason: 'trial_active',
    trialDaysRemaining: 5,
    endsAt: new Date(Date.now() + 86400000 * 5).toISOString(),
  });

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.bookmarkedIds) setBookmarkedIds(parsed.bookmarkedIds);
        if (parsed.likedIds) setLikedIds(parsed.likedIds);
        if (parsed.highlights) setHighlights(parsed.highlights);
        if (parsed.studyNotes) setStudyNotes(parsed.studyNotes);
        if (parsed.retentionCards) setRetentionCards(parsed.retentionCards);
        if (parsed.user) setUser(parsed.user);
        if (parsed.entitlement) setEntitlement(parsed.entitlement);
        if (parsed.quizCompleted) setQuizCompleted(parsed.quizCompleted);
        if (parsed.lastQuizScore) setLastQuizScore(parsed.lastQuizScore);
      }
    } catch (e) {
      console.error('Failed to load local state:', e);
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      const stateToSave = {
        bookmarkedIds,
        likedIds,
        highlights,
        studyNotes,
        retentionCards,
        user,
        entitlement,
        quizCompleted,
        lastQuizScore,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save local state:', e);
    }
  }, [
    mounted,
    bookmarkedIds,
    likedIds,
    highlights,
    studyNotes,
    retentionCards,
    user,
    entitlement,
    quizCompleted,
    lastQuizScore,
  ]);

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const toggleLike = (articleId: string) => {
    setLikedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const addHighlight = (articleId: string, text: string, color: 'yellow' | 'blue' | 'green' = 'yellow') => {
    const newHl: UserHighlight = {
      id: 'hl_' + Date.now() + Math.random().toString(36).substring(2, 6),
      articleId,
      text,
      color,
      createdAt: new Date().toISOString(),
    };
    setHighlights((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newHl],
    }));
  };

  const removeHighlight = (articleId: string, highlightId: string) => {
    setHighlights((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] || []).filter((h) => h.id !== highlightId),
    }));
  };

  const addStudyNote = (articleId: string, note: string, paragraphIndex?: number) => {
    const newNote: UserStudyNote = {
      id: 'sn_' + Date.now() + Math.random().toString(36).substring(2, 6),
      articleId,
      paragraphIndex,
      note,
      createdAt: new Date().toISOString(),
    };
    setStudyNotes((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newNote],
    }));
  };

  const deleteStudyNote = (articleId: string, noteId: string) => {
    setStudyNotes((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] || []).filter((n) => n.id !== noteId),
    }));
  };

  // SM-2 Spaced Repetition Logic
  const completeRetentionReview = (cardId: string, isCorrect: boolean) => {
    setRetentionCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;

        let newEaseFactor = card.easeFactor;
        let newInterval = card.intervalDays;
        let mistakeCount = card.mistakeCount;

        if (isCorrect) {
          if (newInterval === 0) newInterval = 1;
          else if (newInterval === 1) newInterval = 3;
          else newInterval = Math.round(newInterval * newEaseFactor);

          newEaseFactor = Math.min(2.8, newEaseFactor + 0.1);
        } else {
          newInterval = 1;
          mistakeCount += 1;
          newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
        }

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + newInterval);

        return {
          ...card,
          intervalDays: newInterval,
          easeFactor: Number(newEaseFactor.toFixed(2)),
          mistakeCount,
          lastResult: isCorrect ? 'correct' : 'incorrect',
          nextReviewAt: nextDate.toISOString(),
          dueToday: false,
        };
      })
    );
  };

  const dueTodayRetentionCards = retentionCards.filter((card) => card.dueToday);

  // Daily Quiz Submission
  const submitDailyQuiz = (answers: Record<string, number>) => {
    let score = 0;
    dailyQuiz.forEach((q) => {
      const chosenOptionIndex = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (correctOption && chosenOptionIndex === correctOption.optionIndex) {
        score += 1;
      }
    });

    const result = {
      score,
      total: dailyQuiz.length,
      percentage: Math.round((score / dailyQuiz.length) * 100),
    };

    setQuizCompleted(true);
    setLastQuizScore(result);

    setUser((prev) => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      accuracyPercentage: Math.round((prev.accuracyPercentage + result.percentage) / 2),
      streakDays: prev.hasActiveStreakToday ? prev.streakDays : prev.streakDays + 1,
      hasActiveStreakToday: true,
    }));

    return result;
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const incrementStreak = () => {
    setUser((prev) => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      hasActiveStreakToday: true,
    }));
  };

  // Subscription Mock Operations
  const subscribePro = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    setEntitlement({
      hasPremiumAccess: true,
      tier: 'pro',
      reason: 'subscribed',
      endsAt: oneYearLater.toISOString(),
    });
  };

  const setEntitlementTrialExpired = () => {
    setEntitlement({
      hasPremiumAccess: false,
      tier: 'free',
      reason: 'trial_expired',
      trialDaysRemaining: 0,
      endsAt: new Date(Date.now() - 86400000).toISOString(),
    });
  };

  const setEntitlementPro = () => {
    subscribePro();
  };

  const setEntitlementFree = () => {
    setEntitlement({
      hasPremiumAccess: false,
      tier: 'free',
      reason: 'free_tier',
      trialDaysRemaining: 0,
    });
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setBookmarkedIds(['1', '2']);
    setLikedIds(['1']);
    setRetentionCards(MOCK_RETENTION_CARDS);
    setUser(INITIAL_USER);
    setQuizCompleted(false);
    setLastQuizScore(null);
    setEntitlement({
      hasPremiumAccess: true,
      tier: 'trial',
      reason: 'trial_active',
      trialDaysRemaining: 5,
      endsAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    });
  };

  return (
    <StoreContext.Provider
      value={{
        articles,
        bookmarkedIds,
        toggleBookmark,
        likedIds,
        toggleLike,
        highlights,
        addHighlight,
        removeHighlight,
        studyNotes,
        addStudyNote,
        deleteStudyNote,
        retentionCards,
        dueTodayRetentionCards,
        completeRetentionReview,
        dailyQuiz,
        quizCompleted,
        lastQuizScore,
        submitDailyQuiz,
        user,
        updateUser,
        incrementStreak,
        entitlement,
        subscribePro,
        setEntitlementTrialExpired,
        setEntitlementPro,
        setEntitlementFree,
        resetAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
