"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import {
  Crown,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function ProPaywallPage() {
  const {
    entitlement,
    subscribePro,
    setEntitlementTrialExpired,
    setEntitlementPro,
    setEntitlementFree
  } = useStore();

  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [justSubscribed, setJustSubscribed] = useState(false);

  const isPro = entitlement.hasPremiumAccess;
  const isTrial = entitlement.tier === 'trial';
  const isExpired = entitlement.reason === 'trial_expired';

  const handleSubscribe = () => {
    subscribePro();
    setJustSubscribed(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
    setTimeout(() => setJustSubscribed(false), 5000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
      
      {/* Top Status Alert Banner if Trial Expired */}
      {isExpired && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 flex items-start gap-3 shadow-xs">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold">Your 7-Day Free Trial Has Expired</p>
            <p className="mt-0.5 text-rose-700">
              Access to Spaced Repetition (SM-2) decks and unlimited Daily Mastery Quizzes is currently locked. Subscribe below to restore full access.
            </p>
          </div>
        </div>
      )}

      {/* Hero Pro Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-linear-to-br from-neutral-950 via-brand-950 to-neutral-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
            <Crown className="h-4 w-4 text-amber-400 fill-amber-400" />
            TOOTLER PRO ACCESS
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Accelerate Your Research Mastery with AI Retention
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Eliminate memory decay with algorithmic spaced repetition, unlimited peer-reviewed STEM quizzes, and comprehensive technical architecture frameworks.
          </p>

          {/* Current Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md border border-white/10">
            <span className={`h-2.5 w-2.5 rounded-full ${isPro ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span>
              Current Status:{' '}
              <strong>
                {isPro
                  ? isTrial
                    ? `Active 7-Day Trial (${entitlement.trialDaysRemaining || 5} days remaining)`
                    : 'Subscribed Pro Member'
                  : 'Free Tier / Access Gated'}
              </strong>
            </span>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-40 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      {/* Success Banner when Subscribed */}
      {justSubscribed && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-md flex items-center justify-between gap-3 animate-fade-up">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-bold">
              Success! Your Tootler Pro subscription is now active. All gated features are unlocked!
            </span>
          </div>
          <Link
            href="/revise"
            className="rounded-xl bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800"
          >
            Launch Revision
          </Link>
        </div>
      )}

      {/* Feature Comparison Grid */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-neutral-900 text-center">
          What&apos;s Included with Tootler Pro
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">SM-2 Spaced Repetition</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Automated cognitive scheduling expands intervals as recall strengthens, cementing facts before prelims.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Unlimited AI Quizzes</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Targeted statement evaluations mapped to every editorial topic with detailed syllabus citations.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">System Design Frameworks</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Full dimensional breakdown: core tenets, physical bottlenecks, and technical trade-offs across STEM architectures.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Highlighter &amp; Notes Sync</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Save color-coded highlights and custom margins directly to your personalized library for swift offline revision.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setBillingCycle('annual')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              billingCycle === 'annual'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Annual Billing (Save 33%)
          </button>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              billingCycle === 'monthly'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Monthly Billing
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          {/* Free Tier Card */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Free Starter</span>
              <p className="text-2xl font-black text-neutral-900">₹0 <span className="text-xs font-normal text-neutral-500">/ forever</span></p>
              <p className="text-xs text-neutral-600">Essential research paper access for ongoing STEM awareness.</p>
              
              <ul className="space-y-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Daily STEM Digest</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Curated Archives Access</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-400">
                  <span>✕ Locked SM-2 Spaced Repetition</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-400">
                  <span>✕ Locked Unlimited Quizzes</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setEntitlementFree()}
              className="mt-6 w-full rounded-xl border border-neutral-200 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
            >
              Current Free Plan
            </button>
          </div>

          {/* Pro Tier Card (Highlighted) */}
          <div className="relative rounded-3xl border-2 border-brand-500 bg-linear-to-b from-brand-50/40 via-white to-white p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div className="absolute -top-3 right-6 rounded-full bg-brand-600 px-3 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Tootler Pro</span>
              <p className="text-3xl font-black text-neutral-900">
                {billingCycle === 'annual' ? '₹3,999' : '₹499'}
                <span className="text-xs font-normal text-neutral-500">
                  {billingCycle === 'annual' ? ' / year (₹333/mo)' : ' / month'}
                </span>
              </p>
              <p className="text-xs text-neutral-600">Complete AI retention suite with 7-day risk-free trial.</p>

              <ul className="space-y-2.5 text-xs text-neutral-800 pt-2 border-t border-neutral-200">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  <span><strong>Full SM-2 Spaced Retention Deck</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  <span><strong>Unlimited Daily Technical Quizzes</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  <span>Architecture Frameworks &amp; Milestone Papers</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={handleSubscribe}
                className="w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2"
              >
                <Crown className="h-4 w-4 text-amber-300" />
                <span>{isPro ? 'Renew Subscription (Mock)' : 'Subscribe Now (Mock)'}</span>
              </button>
              <p className="text-center text-[10px] text-neutral-400">
                Simulated checkout • Immediately unlocks all gating rules
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Verification Simulation Switcher (Scenario A from verification guide) */}
      <div className="rounded-3xl border border-neutral-200/80 bg-neutral-50 p-6 text-center space-y-3">
        <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
          Testing &amp; Verification Panel (Verification Guide Scenarios)
        </h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Easily simulate the gating checks described in <code>verification_guide.md</code> by toggling user entitlement states:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => setEntitlementTrialExpired()}
            className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
          >
            Scenario A: Set Trial Expired (Lock Features)
          </button>

          <button
            onClick={() => handleSubscribe()}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
          >
            Scenario A: Subscribe Now (Unlock Features)
          </button>
        </div>
      </div>

    </div>
  );
}
