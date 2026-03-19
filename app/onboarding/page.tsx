"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Check,
  Upload,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/src/lib/store';
import { cn } from '@/src/lib/utils';

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
      <motion.div 
        className="h-full bg-ember-primary shadow-[0_0_10px_rgba(242,125,38,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${(step / 5) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [revenue, setRevenue] = useState(50);
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 w-full max-w-2xl"
    >
      <div className="space-y-2">
        <h2 className="text-4xl font-display font-bold">Tell us about your business</h2>
        <p className="text-white/40">This helps us calibrate our ML models for your industry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Business Name</label>
          <input 
            type="text" 
            placeholder="e.g. Surat Textiles Ltd." 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-ember-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Business Type</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-ember-primary outline-none transition-all appearance-none">
            <option>Manufacturing</option>
            <option>Retail</option>
            <option>Services</option>
            <option>Hospitality</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">City</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g. Surat" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-ember-primary outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase">Tier 2</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">GST Number (Optional)</label>
          <input 
            type="text" 
            placeholder="22AAAAA0000A1Z5" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-ember-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex justify-between items-end">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Monthly Revenue Range</label>
          <span className="text-2xl font-display font-bold text-ember-primary">₹{revenue}L+</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="1000" 
          value={revenue} 
          onChange={(e) => setRevenue(parseInt(e.target.value))}
          className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-ember-primary"
        />
        <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
          <span>₹1L</span>
          <span>₹10Cr+</span>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-ember-primary transition-all flex items-center justify-center gap-2"
      >
        Continue <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const software = [
    { name: 'QuickBooks', logo: 'QB' },
    { name: 'Zoho Books', logo: 'ZB' },
    { name: 'Tally Prime', logo: 'TP' },
    { name: 'Busy', logo: 'BA' },
    { name: 'Xero', logo: 'XR' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 w-full max-w-4xl"
    >
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-display font-bold">Connect your accounting</h2>
        <p className="text-white/40">We sync your historical data to build your baseline forecast.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {software.map((s) => (
          <button 
            key={s.name}
            onClick={onNext}
            className="p-8 glass rounded-2xl border border-white/5 hover:border-ember-primary/50 transition-all flex flex-col items-center gap-4 group"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold group-hover:bg-ember-primary/20 group-hover:text-ember-primary transition-all">
              {s.logo}
            </div>
            <span className="font-bold">{s.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Connect via OAuth</span>
          </button>
        ))}
        <button className="p-8 border-2 border-dashed border-white/5 rounded-2xl hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 text-white/40">
          <Upload size={32} />
          <span className="font-bold">Upload CSV</span>
        </button>
      </div>

      <div className="text-center">
        <button onClick={onNext} className="text-white/40 hover:text-white transition-colors text-sm font-bold">
          Skip for now — use demo data
        </button>
      </div>
    </motion.div>
  );
};

const Step3 = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 w-full max-w-2xl"
    >
      <div className="glass p-8 rounded-3xl border border-ember-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 bg-ember-primary/20 rounded-xl flex items-center justify-center text-ember-primary">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold">Bank-Grade Security</h3>
            <p className="text-white/40 leading-relaxed">
              CashFlow AI uses RBI&apos;s Account Aggregator framework. We never see your login credentials and only have read-only access to transaction data.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10">AES-256</div>
            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10">SOC 2 Type II</div>
            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10">ISO 27001</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 text-center">Select your primary bank</p>
        <div className="grid grid-cols-3 gap-4">
          {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'IDFC'].map(bank => (
            <button key={bank} onClick={onNext} className="py-4 glass rounded-xl font-bold hover:border-ember-primary/50 transition-all">
              {bank}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-ember-primary text-black font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(242,125,38,0.4)] transition-all flex items-center justify-center gap-2"
      >
        Authorize via AA Framework <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

const Step4 = ({ onNext }: { onNext: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const challenges = [
    'Managing GST payments',
    'Slow customer payments',
    'Seasonal cash crunches',
    'Planning for hiring',
    'Loan repayment planning',
    'Vendor payment timing'
  ];

  const toggle = (c: string) => {
    if (selected.includes(c)) setSelected(selected.filter(x => x !== c));
    else setSelected([...selected, c]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 w-full max-w-2xl"
    >
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-display font-bold">What&apos;s your biggest challenge?</h2>
        <p className="text-white/40">We&apos;ll customize your dashboard insights based on your goals.</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {challenges.map(c => (
          <button 
            key={c}
            onClick={() => toggle(c)}
            className={cn(
              "px-6 py-3 rounded-full border font-bold transition-all",
              selected.includes(c) 
                ? "bg-ember-primary border-ember-primary text-black" 
                : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={selected.length === 0}
        className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-ember-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        Generate My Forecast <TrendingUp size={20} />
      </button>
    </motion.div>
  );
};

const Step5 = ({ onFinish }: { onFinish: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl flex flex-col items-center text-center space-y-12"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-ember-primary/20 border-t-ember-primary rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="text-ember-primary animate-pulse" size={40} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">Analyzing 24 months of data...</h2>
              <p className="text-white/40 italic">Applying seasonal ML models for Surat Textiles...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 w-full"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 mx-auto mb-6">
                <Check size={40} />
              </div>
              <h2 className="text-5xl font-display font-bold">Your Forecast is Ready</h2>
              <p className="text-white/40 text-xl max-w-2xl mx-auto">
                Our models predict a <span className="text-ember-primary font-bold">potential cash gap on Day 47</span>. <br />
                We&apos;ve already identified 3 ways to bridge it.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 w-full aspect-[21/9] relative overflow-hidden">
              <div className="absolute inset-0 flex items-end px-12 pb-12 gap-2">
                {[40, 45, 38, 52, 60, 45, 30, 25, 35, 48, 55, 62].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className={cn(
                      "flex-1 rounded-t-lg relative group",
                      i === 7 ? "bg-ember-primary" : "bg-white/10"
                    )}
                  >
                    {i === 7 && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-ember-primary text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
                        Day 47: Gap Detected
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <button 
              onClick={onFinish}
              className="px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-ember-primary transition-all text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              See Full Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function OnboardingPage() {
  const router = useRouter();
  const { onboardingStep, setOnboardingStep, setCompletedOnboarding } = useUIStore();

  const next = () => setOnboardingStep(onboardingStep + 1);
  const finish = () => {
    setCompletedOnboarding(true);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cosmos-bg text-white flex flex-col items-center justify-center p-6">
      <ProgressBar step={onboardingStep} />
      
      <div className="fixed top-12 left-12 flex items-center gap-3">
        <div className="w-8 h-8 bg-ember-primary rounded-lg flex items-center justify-center">
          <Zap className="text-black fill-black" size={16} />
        </div>
        <h1 className="text-lg font-display font-bold tracking-tight">CashFlow AI</h1>
      </div>

      <AnimatePresence mode="wait">
        {onboardingStep === 1 && <Step1 key="s1" onNext={next} />}
        {onboardingStep === 2 && <Step2 key="s2" onNext={next} />}
        {onboardingStep === 3 && <Step3 key="s3" onNext={next} />}
        {onboardingStep === 4 && <Step4 key="s4" onNext={next} />}
        {onboardingStep === 5 && <Step5 key="s5" onFinish={finish} />}
      </AnimatePresence>

      {onboardingStep < 5 && (
        <div className="fixed bottom-12 flex items-center gap-8 text-white/20 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} /> Bank-Grade Security
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} /> RBI AA Framework
          </div>
        </div>
      )}
    </div>
  );
}
