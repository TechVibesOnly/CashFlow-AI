"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StatCard, ForecastChart, InsightCard } from '@/src/components/DashboardElements';
import { Search, Bell, Calendar, Zap } from 'lucide-react';
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

export const DashboardHome = () => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-12 max-w-[1600px] mx-auto space-y-12"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="space-y-2">
        <h2 className="text-4xl font-display font-bold tracking-tight">Good morning, Rajesh.</h2>
        <p className="text-white/40 text-lg">Your cash runway is looking healthy at <span className="text-emerald-400 font-bold">14 months</span>.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={8420000} trend="up" trendValue={12.5} />
        <StatCard title="Operating Expenses" value={3210000} trend="down" trendValue={4.2} />
        <StatCard title="Net Profit" value={5210000} trend="up" trendValue={18.1} />
        <StatCard title="Accounts Receivable" value={1240000} trend="up" trendValue={2.4} />
      </motion.div>

      {/* Main Dashboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forecast Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <ForecastChart />
        </motion.div>

        {/* Insights Feed (Pinterest Style) */}
        <motion.div variants={item} className="space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            AI Insights
            <span className="px-2 py-0.5 rounded-full bg-ember-primary/20 text-ember-primary text-[10px] font-bold uppercase">Live</span>
          </h3>
          <div className="space-y-6">
            <InsightCard 
              type="alert"
              title="Impending Cash Crunch"
              description="Raw material costs in Surat are projected to spike by 15% next month. Consider hedging now."
              amount={450000}
            />
            <InsightCard 
              type="success"
              title="Tax Optimization Found"
              description="Your recent equipment purchase qualifies for Section 32 depreciation. Claim it to save on GST."
              amount={125000}
            />
            <InsightCard 
              type="success"
              title="Vendor Negotiation"
              description="Bhaskar Logistics has lowered rates for bulk shipments. Switching could save you 8% monthly."
              amount={85000}
            />
          </div>
        </motion.div>
      </div>

      {/* Secondary Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-xl font-display font-bold mb-6">Top Expense Categories</h3>
          <div className="space-y-6">
            {[
              { label: 'Raw Materials', value: 45, color: 'bg-ember-primary' },
              { label: 'Logistics', value: 25, color: 'bg-white/20' },
              { label: 'Salaries', value: 20, color: 'bg-white/10' },
              { label: 'Marketing', value: 10, color: 'bg-white/5' },
            ].map((cat) => (
              <div key={cat.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">{cat.label}</span>
                  <span className="font-mono">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn("h-full rounded-full", cat.color)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ember-primary/10 to-transparent pointer-events-none" />
          <div className="w-16 h-16 bg-ember-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <Search className="text-ember-primary" size={32} />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">Ask CashFlow AI</h3>
          <p className="text-white/40 mb-8 max-w-xs">&quot;What happens to my runway if I hire 5 more weavers in April?&quot;</p>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-ember-primary transition-all duration-300">
            Start Analysis
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
