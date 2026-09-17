"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Flame,
  Crown,
  BookOpen,
  Sparkles,
  Search,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Compass,
  RotateCcw
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Today\'s Feed', href: '/', icon: Compass },
  { label: 'Read Library', href: '/library', icon: BookOpen },
  { label: 'Revise & SM-2', href: '/revise', icon: RotateCcw },
  { label: 'Streak & Heatmap', href: '/streak', icon: Flame },
  { label: 'Tootler Pro', href: '/pro', icon: Crown },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    user,
    entitlement,
    dueTodayRetentionCards,
    setEntitlementPro,
    setEntitlementTrialExpired,
    resetAll
  } = useStore();

  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPro = entitlement.hasPremiumAccess;
  const isTrial = entitlement.tier === 'trial';
  const isExpired = entitlement.reason === 'trial_expired';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Platform Tag */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition hover:opacity-90">
            <Image
              src="/tootler-logo.svg"
              alt="Tootler Logo"
              width={124}
              height={30}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <span className="hidden rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 border border-brand-200/60 md:inline-block">
            STEM &amp; Deep Tech AI
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-100 text-brand-700 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? 'text-brand-600' : 'text-neutral-400'
                  }`}
                />
                <span>{item.label}</span>
                {item.href === '/revise' && dueTodayRetentionCards.length > 0 && (
                  <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                    {dueTodayRetentionCards.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-3">
          
          {/* Daily Streak Flame Widget */}
          <Link
            href="/streak"
            className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/80 px-3 py-1 text-xs font-bold text-orange-700 shadow-xs transition hover:bg-orange-100/80"
            title="Current Daily Study Streak"
          >
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{user.streakDays} Days</span>
          </Link>

          {/* Pro Status Badge */}
          <Link
            href="/pro"
            className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-xs transition sm:flex ${
              isPro
                ? isTrial
                  ? 'border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'border border-amber-300 bg-linear-to-r from-amber-50 to-amber-100 text-amber-900 hover:from-amber-100 hover:to-amber-200'
                : 'border border-neutral-300 bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {isPro
                ? isTrial
                  ? `Trial (${entitlement.trialDaysRemaining || 5}d)`
                  : 'Pro Member'
                : 'Upgrade Pro'}
            </span>
          </Link>

          {/* Persona Switcher / Test Control */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 p-1 pl-2 pr-2.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                ER
              </div>
              <span className="hidden sm:inline-block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
              <span className="text-[10px] text-neutral-400">▼</span>
            </button>

            {/* Persona Switcher Dropdown */}
            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl ring-1 ring-black/5 z-50">
                <div className="border-b border-neutral-100 pb-2 mb-2">
                  <p className="text-xs font-semibold text-neutral-900">{user.name}</p>
                  <p className="text-[11px] text-neutral-500">{user.targetExam} ({user.targetYear})</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        isPro ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-[10px] font-medium text-neutral-600">
                      Status: {isPro ? (isTrial ? 'Active Free Trial' : 'Subscribed Pro') : 'Trial Expired / Free'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="px-2 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    Test Mode Persona Switch
                  </p>
                  <button
                    onClick={() => {
                      setEntitlementPro();
                      setShowPersonaMenu(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2">
                      <Crown className="h-3.5 w-3.5 text-amber-500" />
                      Pro Subscriber
                    </span>
                    {isPro && !isTrial && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                  </button>

                  <button
                    onClick={() => {
                      setEntitlementTrialExpired();
                      setShowPersonaMenu(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                      Expired Trial (Test Paywall)
                    </span>
                    {isExpired && <CheckCircle2 className="h-3.5 w-3.5 text-rose-500" />}
                  </button>
                </div>

                <div className="mt-2 border-t border-neutral-100 pt-2 flex items-center justify-between">
                  <Link
                    href="/settings"
                    onClick={() => setShowPersonaMenu(false)}
                    className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900"
                  >
                    <SettingsIcon className="h-3.5 w-3.5" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      resetAll();
                      setShowPersonaMenu(false);
                    }}
                    className="text-[11px] text-neutral-400 hover:text-rose-600 transition"
                  >
                    Reset Demo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 pt-2 pb-6 md:hidden">
          <div className="space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-brand-600" />
                    <span>{item.label}</span>
                  </div>
                  {item.href === '/revise' && dueTodayRetentionCards.length > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-bold text-white">
                      {dueTodayRetentionCards.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
