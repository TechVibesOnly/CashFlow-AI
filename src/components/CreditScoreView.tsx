"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Download, 
  Share2, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

const ScoreGauge = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setDisplayScore(Math.floor(easeOutQuart * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-72 h-72 transform -rotate-90">
        {/* Background Track */}
        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        {/* Progress Arc */}
        <motion.circle
          cx="144"
          cy="144"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl font-mono font-bold text-white tracking-tighter"
        >
          {displayScore}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-ember-primary font-bold uppercase tracking-[0.2em] text-sm mt-2"
        >
          Excellent
        </motion.span>
      </div>
    </div>
  );
};

const FactorBar = ({ label, score, trend }: { label: string, score: number, trend: 'up' | 'down' | 'neutral' }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-white/60">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono font-bold">{score}/100</span>
          {trend === 'up' && <TrendingUp size={14} className="text-emerald-400" />}
          {trend === 'down' && <TrendingDown size={14} className="text-red-400" />}
          {trend === 'neutral' && <Minus size={14} className="text-white/20" />}
        </div>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "h-full flex-1 rounded-sm",
              i < score / 10 ? (score > 70 ? "bg-emerald-400" : score > 40 ? "bg-yellow-400" : "bg-red-400") : "bg-white/5"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const LoanCard = ({ lender, amount, rate, logo }: { lender: string, amount: string, rate: string, logo: string }) => {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-ember-primary/30 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
          <img src={logo} alt={lender} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          Pre-Approved
        </div>
      </div>
      <div className="space-y-1 mb-6">
        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{lender}</p>
        <h4 className="text-xl font-display font-bold">Up to {amount}</h4>
        <p className="text-sm text-emerald-400 font-bold">@ {rate} p.a.</p>
      </div>
      <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-ember-primary hover:text-black transition-all flex items-center justify-center gap-2 group-hover:bg-ember-primary group-hover:text-black">
        Apply in 2 minutes <ArrowRight size={14} />
      </button>
    </div>
  );
};

export const CreditScoreView = () => {
  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-display font-bold tracking-tight">Cash Flow Health Score</h2>
            <p className="text-white/40 text-lg">Your financial credibility, calculated in real-time from your business operations.</p>
          </div>
          
          <div className="flex items-center gap-4 p-6 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Your score is Excellent</p>
              <p className="text-xs text-white/40">Better than 84% of SMBs in the Textile industry.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-ember-primary transition-all">
              <Download size={18} /> Generate Banker&apos;s Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              <Share2 size={18} /> Share with CA
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <ScoreGauge score={742} />
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass p-10 rounded-3xl space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Score Breakdown</h3>
            <span className="text-xs text-white/20 font-bold uppercase tracking-widest">Updated 2h ago</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <FactorBar label="Cash Flow Consistency" score={82} trend="up" />
            <FactorBar label="Receivables Health" score={64} trend="down" />
            <FactorBar label="Revenue Stability" score={90} trend="up" />
            <FactorBar label="Debt Service Coverage" score={71} trend="neutral" />
            <FactorBar label="Expense Discipline" score={80} trend="up" />
            <div className="p-6 bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col justify-center items-center text-center space-y-2">
              <p className="text-xs font-bold text-white/40">Improve your score</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Collect ₹1.2L overdue to reach 760</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            AI Recommendations
            <Zap size={18} className="text-ember-primary fill-ember-primary" />
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Reduce AR Aging', desc: 'Your receivables health is dragging the score down. 5 invoices are >45 days overdue.', impact: '+18 pts' },
              { title: 'Maintain Buffer', desc: 'Keeping a minimum balance of ₹5L for 3 consecutive months will boost consistency.', impact: '+12 pts' },
            ].map((rec, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm">{rec.title}</p>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">{rec.impact}</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Readiness Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-display font-bold">Loan Readiness</h3>
            <p className="text-sm text-white/40">Based on your score, you qualify for instant working capital from our partners.</p>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
            <Building2 size={16} /> Verified by RBI Account Aggregator
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoanCard 
            lender="Lendingkart" 
            amount="₹25L" 
            rate="14.5%" 
            logo="https://www.lendingkart.com/wp-content/uploads/2019/06/lendingkart-logo.png" 
          />
          <LoanCard 
            lender="Ugro Capital" 
            amount="₹40L" 
            rate="13.8%" 
            logo="https://www.ugrocapital.com/assets/images/logo.png" 
          />
          <LoanCard 
            lender="Capital Float" 
            amount="₹15L" 
            rate="15.2%" 
            logo="https://capitalfloat.com/wp-content/uploads/2020/07/cf-logo.png" 
          />
        </div>
      </div>
    </div>
  );
};
