import React from 'react';
import { SubjectCategory } from '@/lib/types';

interface SubjectBadgeProps {
  subject: SubjectCategory;
  size?: 'sm' | 'md';
}

const SUBJECT_STYLES: Record<SubjectCategory, { bg: string; text: string; border: string }> = {
  'AI & Machine Learning': { bg: 'bg-[#EDE9FE]', text: 'text-[#6D28D9]', border: 'border-[#6D28D9]/20' },
  'Quantum & Physics': { bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]', border: 'border-[#0369A1]/20' },
  'Semiconductors & Hardware': { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#B45309]/20' },
  'Biotech & Genomics': { bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]', border: 'border-[#15803D]/20' },
  'Aerospace & Space Tech': { bg: 'bg-[#E0E7FF]', text: 'text-[#4338CA]', border: 'border-[#4338CA]/20' },
  'Clean Energy & Fusion': { bg: 'bg-[#FFEDD5]', text: 'text-[#C2410C]', border: 'border-[#C2410C]/20' },
  'Mathematics & Cryptography': { bg: 'bg-[#FCE7F3]', text: 'text-[#BE185D]', border: 'border-[#BE185D]/20' },
  'Robotics & Systems': { bg: 'bg-[#F1F5F9]', text: 'text-[#334155]', border: 'border-[#334155]/20' },
};

export default function SubjectBadge({ subject, size = 'sm' }: SubjectBadgeProps) {
  const style = SUBJECT_STYLES[subject] || { bg: 'bg-neutral-100', text: 'text-neutral-700', border: 'border-neutral-200' };
  
  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border ${style.bg} ${style.text} ${style.border} ${
        size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
      } tracking-tight transition-colors shrink-0`}
    >
      {subject}
    </span>
  );
}
