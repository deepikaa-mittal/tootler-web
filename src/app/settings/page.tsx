"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { checkBackendHealth } from '@/lib/api';
import {
  Settings as SettingsIcon,
  User,
  Target,
  Server,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser, resetAll } = useStore();

  const [name, setName] = useState(user.name);
  const [targetExam, setTargetExam] = useState(user.targetExam);
  const [targetYear, setTargetYear] = useState(user.targetYear);
  const [optionalSubject, setOptionalSubject] = useState(user.optionalSubject);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live backend check
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'offline'>('checking');

  const checkBackend = async () => {
    setBackendStatus('checking');
    const isHealthy = await checkBackendHealth();
    setBackendStatus(isHealthy ? 'connected' : 'offline');
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      targetExam,
      targetYear: Number(targetYear),
      optionalSubject,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
          <SettingsIcon className="h-4 w-4" />
          User Preferences &amp; Config
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Account &amp; Study Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500">
          Personalize your target exam year, optional syllabus focus, and developer connectivity.
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-up">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Profile configuration saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
          <User className="h-4 w-4 text-brand-600" />
          Researcher Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 focus:border-brand-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm text-neutral-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Target Field / Program
            </label>
            <input
              type="text"
              required
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 focus:border-brand-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Target Year
            </label>
            <input
              type="number"
              required
              min={2026}
              max={2030}
              value={targetYear}
              onChange={(e) => setTargetYear(Number(e.target.value))}
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 focus:border-brand-500 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              STEM Specialization / Focus Area
            </label>
            <input
              type="text"
              required
              value={optionalSubject}
              onChange={(e) => setOptionalSubject(e.target.value)}
              placeholder="e.g. Quantum Information, High-NA Lithography, LLM Systems Architecture"
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2 text-sm text-neutral-900 focus:border-brand-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-600 transition"
          >
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* Backend Integration Diagnostics */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Server className="h-4 w-4 text-brand-600" />
            Backend API Connectivity
          </h2>
          <button
            onClick={checkBackend}
            className="text-xs font-semibold text-brand-600 hover:text-brand-800"
          >
            Re-check Health
          </button>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed">
          The Tootler web platform operates in hybrid mode: it automatically pairs with the local FastAPI backend (<code>http://localhost:8000/api/v1</code>) if running, while providing an offline-capable reactive mock engine when running standalone.
        </p>

        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div
            className={`h-3 w-3 rounded-full ${
              backendStatus === 'connected'
                ? 'bg-emerald-500'
                : backendStatus === 'checking'
                ? 'bg-amber-400 animate-ping'
                : 'bg-neutral-400'
            }`}
          />
          <div className="text-xs">
            <p className="font-bold text-neutral-900">
              {backendStatus === 'connected'
                ? 'Connected to FastAPI Backend (port 8000)'
                : backendStatus === 'checking'
                ? 'Pinging localhost:8000...'
                : 'Offline Standalone Mode (High-Fidelity Mock Engine Active)'}
            </p>
            <p className="text-neutral-500 mt-0.5">
              Endpoint: <code>http://localhost:8000/api/v1/health</code>
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset State */}
      <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900">Reset Local Demonstration State</h3>
          <p className="text-xs text-rose-700 mt-0.5">
            Clears cached highlights, notes, and quiz history from your browser&apos;s localStorage.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all demonstration data to factory defaults?')) {
              resetAll();
              alert('Demonstration state reset successfully.');
            }
          }}
          className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition shrink-0"
        >
          Reset Demo State
        </button>
      </div>

    </div>
  );
}
