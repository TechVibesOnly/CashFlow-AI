"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine,
  ReferenceDot
} from 'recharts';
import { Info, Zap, Users, Landmark, FileText, ChevronRight, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

const mockForecastData = [
  { date: 'Jan 15', actual: 12.5, p50: 12.5, p10: 12.5, p90: 12.5 },
  { date: 'Jan 22', actual: 13.2, p50: 13.2, p10: 13.2, p90: 13.2 },
  { date: 'Jan 29', actual: 14.8, p50: 14.8, p10: 14.8, p90: 14.8 },
  { date: 'Feb 05', actual: 14.2, p50: 14.2, p10: 14.2, p90: 14.2 },
  { date: 'Feb 12', actual: null, p50: 15.1, p10: 14.5, p90: 15.8 },
  { date: 'Feb 19', actual: null, p50: 14.2, p10: 13.2, p90: 15.5 },
  { date: 'Feb 26', actual: null, p50: 16.5, p10: 15.0, p90: 18.2 },
  { date: 'Mar 05', actual: null, p50: 15.8, p10: 14.2, p90: 17.5 },
  { date: 'Mar 12', actual: null, p50: 14.5, p10: 12.8, p90: 16.2 },
  { date: 'Mar 19', actual: null, p50: 13.2, p10: 11.5, p90: 15.5 },
  { date: 'Mar 26', actual: null, p50: 12.8, p10: 10.2, p90: 15.8 },
  { date: 'Apr 02', actual: null, p50: 14.2, p10: 11.5, p90: 17.2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border border-white/10 shadow-2xl min-w-[200px]">
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-white/60">{entry.name}</span>
              </div>
              <span className="text-sm font-mono font-bold">₹{entry.value}L</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-[10px] text-ember-primary font-bold flex items-center gap-1">
            <Zap size={10} /> WHAT&apos;S DRIVING THIS?
          </p>
          <p className="text-[10px] text-white/40 mt-1">GST cycle + Seasonal demand spike</p>
        </div>
      </div>
    );
  }
  return null;
};

export const ForecastView = () => {
  const [activeRange, setActiveRange] = useState('90-day');
  const [scenarioMode, setScenarioMode] = useState(false);

  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-display font-bold tracking-tight">90-Day Cash Flow Forecast</h2>
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">93.2% accuracy</span>
            </div>
          </div>
          <p className="text-white/40 text-lg">Predictive modeling based on 24 months of historical Tally data.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            {['30-day', '60-day', '90-day', '180-day'].map(range => (
              <button 
                key={range}
                onClick={() => setActiveRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all relative",
                  activeRange === range ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60",
                  range === '180-day' && "pr-8"
                )}
              >
                {range}
                {range === '180-day' && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] bg-ember-primary/20 text-ember-primary px-1 rounded">Pro+</span>
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setScenarioMode(!scenarioMode)}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all border",
              scenarioMode 
                ? "bg-ember-primary text-black border-ember-primary shadow-[0_0_20px_rgba(242,125,38,0.3)]" 
                : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
            )}
          >
            <Zap size={14} className={cn(scenarioMode ? "fill-black" : "fill-white/40")} />
            Scenario Mode
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="glass p-8 rounded-3xl relative overflow-hidden h-[500px]">
        <div className="absolute top-8 left-8 flex gap-6 z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-white" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Actual Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-ember-primary" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Forecast P50</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 border-t border-dashed border-white/20" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Confidence Band (P10-P90)</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockForecastData} margin={{ top: 60, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F27D26" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#F27D26" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
              tickFormatter={(val) => `₹${val}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area 
              type="monotone" 
              dataKey="p90" 
              stroke="none" 
              fill="url(#bandGradient)" 
              baseLine={8} // This is tricky in Recharts for range, usually we use two areas or a bar
            />
            {/* Recharts Area for range: we use dataKey as the top and 'p10' as the bottom */}
            <Area 
              type="monotone" 
              dataKey="p90" 
              stroke="none" 
              fill="rgba(242, 125, 38, 0.05)" 
              connectNulls
            />

            <Line 
              type="monotone" 
              dataKey="p10" 
              stroke="#ef4444" 
              strokeWidth={1} 
              strokeDasharray="4 4" 
              dot={false} 
              name="P10 Lower"
            />
            <Line 
              type="monotone" 
              dataKey="p90" 
              stroke="#10b981" 
              strokeWidth={1} 
              strokeDasharray="4 4" 
              dot={false} 
              name="P90 Upper"
            />
            <Line 
              type="monotone" 
              dataKey="p50" 
              stroke="#F27D26" 
              strokeWidth={3} 
              dot={false} 
              name="Forecast P50"
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#ffffff" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#ffffff', strokeWidth: 0 }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Actual Balance"
            />

            {/* Pinned Markers */}
            <ReferenceLine x="Feb 05" stroke="rgba(242, 125, 38, 0.3)" strokeDasharray="3 3" label={{ position: 'top', value: '₹ GST', fill: '#F27D26', fontSize: 10, fontWeight: 800 }} />
            <ReferenceLine x="Feb 26" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="3 3" label={{ position: 'top', value: '👥 Salary', fill: '#A855F7', fontSize: 10, fontWeight: 800 }} />
            <ReferenceLine x="Mar 19" stroke="rgba(59, 130, 246, 0.3)" strokeDasharray="3 3" label={{ position: 'top', value: '🏦 EMI', fill: '#3B82F6', fontSize: 10, fontWeight: 800 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 3-Column Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Col 1: Upcoming Obligations */}
        <div className="glass p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <ArrowCircleDown className="text-white/40" size={20} />
            Upcoming Obligations
          </h3>
          <div className="space-y-4">
            {[
              { date: 'Feb 15', desc: 'Advance Tax Q4', amount: '₹3.2L', urgency: 'High', color: 'text-red-400 bg-red-400/10' },
              { date: 'Feb 26', desc: 'Monthly Salaries', amount: '₹12.4L', urgency: 'Critical', color: 'text-purple-400 bg-purple-400/10' },
              { date: 'Mar 05', desc: 'GST Payment', amount: '₹1.8L', urgency: 'Medium', color: 'text-amber-400 bg-amber-400/10' },
              { date: 'Mar 19', desc: 'HDFC Loan EMI', amount: '₹5.4L', urgency: 'High', color: 'text-red-400 bg-red-400/10' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all group">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.date}</p>
                  <p className="text-sm font-bold">{item.desc}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-mono font-bold">{item.amount}</p>
                  <span className={cn("text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded", item.color)}>
                    {item.urgency}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2">
            View All Obligations <ChevronRight size={14} />
          </button>
        </div>

        {/* Col 2: Expected Inflows */}
        <div className="glass p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <ArrowCircleUp className="text-white/40" size={20} />
            Expected Inflows
          </h3>
          <div className="space-y-4">
            {[
              { customer: 'Reliance Retail', inv: '#INV-882', date: 'Feb 12', amount: '₹8.5L', status: 'Confirmed' },
              { customer: 'Aditya Birla', inv: '#INV-885', date: 'Feb 18', amount: '₹4.2L', status: 'Pending' },
              { customer: 'Raymond Ltd', inv: '#INV-890', date: 'Feb 22', amount: '₹12.1L', status: 'Overdue' },
              { customer: 'FabIndia', inv: '#INV-892', date: 'Mar 02', amount: '₹2.8L', status: 'Confirmed' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.date} • {item.inv}</p>
                  <p className="text-sm font-bold">{item.customer}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-mono font-bold">{item.amount}</p>
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded",
                    item.status === 'Overdue' ? 'text-red-400 bg-red-400/10' : 
                    item.status === 'Confirmed' ? 'text-emerald-400 bg-emerald-400/10' : 
                    'text-white/40 bg-white/5'
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2">
            Manage Receivables <ChevronRight size={14} />
          </button>
        </div>

        {/* Col 3: Critical Date Alerts */}
        <div className="glass p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <AlertCircle className="text-ember-primary" size={20} />
            Critical Date Alerts
          </h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/40">Day 12</span>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase">
                  Cash OK <CheckCircle2 size={12} />
                </div>
              </div>
              <p className="text-sm font-medium">₹3.2L advance tax due. Your projected balance covers this with ₹8L cushion.</p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/40">Day 34</span>
                <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold uppercase">
                  Shortfall Risk <AlertCircle size={12} />
                </div>
              </div>
              <p className="text-sm font-medium">₹1.8L GST payment. Balance will dip below ₹2L threshold.</p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/40">Day 47</span>
                <div className="flex items-center gap-1 text-red-400 text-[10px] font-bold uppercase">
                  CASH GAP <AlertCircle size={12} />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/20 space-y-2">
                <p className="text-sm font-bold text-red-400">₹5.4L loan EMI will fail.</p>
                <p className="text-xs text-white/60 leading-relaxed">
                  AI Suggestion: Collect from <span className="text-white font-bold">Raymond Ltd</span> before Day 40 to bridge this gap.
                </p>
                <button className="text-[10px] font-bold text-ember-primary uppercase tracking-widest hover:underline">
                  Send Reminder Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowCircleDown = ({ className, size }: { className?: string, size?: number }) => (
  <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center", className)}>
    <TrendingUp className="rotate-180" size={size || 16} />
  </div>
);

const ArrowCircleUp = ({ className, size }: { className?: string, size?: number }) => (
  <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center", className)}>
    <TrendingUp size={size || 16} />
  </div>
);
