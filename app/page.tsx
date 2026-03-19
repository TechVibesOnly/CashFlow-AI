"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/src/lib/store';
import { useRouter } from 'next/navigation';

const ParticleMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random()
          }}
          animate={{ 
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-ember-primary/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full"
      />
    </div>
  );
};

const LogoTicker = () => {
  const logos = ['QuickBooks', 'Zoho', 'Tally', 'Xero', 'Busy', 'SAP', 'Oracle'];
  return (
    <div className="w-full py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 items-center whitespace-nowrap px-12"
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl font-display font-bold text-white/20 tracking-tighter uppercase italic">
            {logo}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const { setLoggedIn } = useUIStore();

  const handleLogin = () => {
    setLoggedIn(true);
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-cosmos-bg text-white relative flex flex-col items-center justify-center overflow-x-hidden">
      <GradientMesh />
      <ParticleMesh />

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-12 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ember-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,125,38,0.3)]">
            <Zap className="text-black fill-black" size={20} />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tight">CashFlow AI</h1>
        </div>
        <div className="flex items-center gap-8">
          <button className="text-sm font-bold text-white/60 hover:text-white transition-colors">Pricing</button>
          <button className="text-sm font-bold text-white/60 hover:text-white transition-colors">Features</button>
          <button 
            onClick={handleLogin}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ember-primary/10 border border-ember-primary/20 text-ember-primary text-xs font-bold uppercase tracking-widest">
            <Zap size={14} className="fill-ember-primary" />
            Empowering 2,000+ Indian SMBs
          </div>
          
          <h1 className="text-7xl md:text-8xl font-display font-bold tracking-tight leading-[0.9]">
            Your Business&apos;s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-primary to-ember-secondary">
              Financial Co-Pilot
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/40 font-sans max-w-2xl mx-auto leading-relaxed">
            93% accurate 90-day cash flow forecasts. <br />
            Built specifically for the complexities of Indian SMBs.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <button 
              onClick={handleLogin}
              className="group relative px-10 py-5 bg-ember-primary text-black font-bold rounded-2xl shadow-[0_0_40px_rgba(242,125,38,0.3)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative flex items-center gap-2 text-lg">
                Start Free Trial <ArrowRight size={20} />
              </span>
            </button>
            
            <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={14} className="fill-white" />
              </div>
              Watch 2-min Demo
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 max-w-6xl w-full"
        >
          {[
            { label: "93% Forecast Accuracy", sub: "Proprietary ML Models" },
            { label: "2,000+ SMBs", sub: "Trust us daily" },
            { label: "₹20,750/mo", sub: "Pays for itself in 45 days" }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <CheckCircle2 className="text-ember-primary mb-2" size={24} />
              <p className="text-xl font-display font-bold">{badge.label}</p>
              <p className="text-white/30 text-sm">{badge.sub}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Social Proof Ticker */}
      <div className="w-full mt-32">
        <LogoTicker />
      </div>

      {/* Auth Options Footer */}
      <footer className="w-full py-20 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Get Started Instantly</p>
          <div className="flex gap-4">
            <button onClick={handleLogin} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Continue with Google
            </button>
            <button onClick={handleLogin} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              Continue with Email
            </button>
          </div>
        </div>
        <button className="text-white/30 hover:text-ember-primary transition-colors text-sm">
          CA Firm? <span className="font-bold">White-label login →</span>
        </button>
      </footer>
    </div>
  );
}
