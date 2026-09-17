"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Compass,
  BookOpen,
  RotateCcw,
  Flame,
  User,
  Crown
} from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { dueTodayRetentionCards } = useStore();

  const ITEMS = [
    { label: 'Feed', href: '/', icon: Compass },
    { label: 'Library', href: '/library', icon: BookOpen },
    {
      label: 'Revise',
      href: '/revise',
      icon: RotateCcw,
      badge: dueTodayRetentionCards.length > 0 ? dueTodayRetentionCards.length : null,
    },
    { label: 'Streak', href: '/streak', icon: Flame },
    { label: 'Pro', href: '/pro', icon: Crown },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200/80 bg-white/95 backdrop-blur-lg md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 transition-all ${
                isActive ? 'text-brand-600 font-semibold' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
