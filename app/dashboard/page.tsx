"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/src/components/Sidebar';
import { StatCard, ForecastChart, InsightCard } from '@/src/components/DashboardElements';
import { Search, Bell, Calendar, Zap } from 'lucide-react';
import { useUIStore } from '@/src/lib/store';
import { cn } from '@/src/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

import { DashboardHome } from '@/src/components/DashboardHome';
import { ForecastView } from '@/src/components/ForecastView';
import { LeakDetectorView } from '@/src/components/LeakDetectorView';
import { ScenarioStudioView } from '@/src/components/ScenarioStudioView';
import { CreditScoreView } from '@/src/components/CreditScoreView';

export default function DashboardPage() {
  const { activeTab } = useUIStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardHome />;
      case 'Forecast':
        return <ForecastView />;
      case 'Cash Leaks':
        return <LeakDetectorView />;
      case 'Scenarios':
        return <ScenarioStudioView />;
      case 'Credit Score':
        return <CreditScoreView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20">
              <Zap size={40} />
            </div>
            <h2 className="text-2xl font-display font-bold">Coming Soon</h2>
            <p className="text-white/40 max-w-xs">The {activeTab} module is currently being calibrated for your business data.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cosmos-bg text-white selection:bg-ember-primary/30">
      <Sidebar />
      
      <main className={cn("min-h-screen", activeTab !== 'Scenarios' ? "pl-64" : "pl-64")}>
        {/* Top Navigation Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-cosmos-bg/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">CashFlow AI</span>
              <span className="text-white/10">/</span>
              <span className="text-white">{activeTab}</span>
            </div>
            
            <div className="h-8 w-px bg-white/5 mx-2" />
            
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {['Last 30', 'Last 90', 'Custom'].map(range => (
                <button 
                  key={range}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                    range === 'Last 90' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-ember-primary/10 border border-ember-primary/20 rounded-xl text-ember-primary text-xs font-bold hover:bg-ember-primary/20 transition-all">
              <Zap size={14} className="fill-ember-primary" />
              Ask AI
            </button>
            
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-ember-primary rounded-full border-2 border-cosmos-bg" />
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold">Rajesh Singh</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Surat Textiles Ltd.</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-primary to-ember-secondary flex items-center justify-center text-black font-bold">
                RS
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  );
}
