"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine
} from 'recharts';
import { 
  Zap, 
  Users, 
  Landmark, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Save, 
  Layers,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockBaseData = [
  { date: 'W1', base: 12.5, scenario: 12.5 },
  { date: 'W2', base: 13.2, scenario: 13.2 },
  { date: 'W3', base: 14.8, scenario: 14.8 },
  { date: 'W4', base: 14.2, scenario: 14.2 },
  { date: 'W5', base: 15.1, scenario: 15.1 },
  { date: 'W6', base: 14.2, scenario: 14.2 },
  { date: 'W7', base: 16.5, scenario: 16.5 },
  { date: 'W8', base: 15.8, scenario: 15.8 },
  { date: 'W9', base: 14.5, scenario: 14.5 },
  { date: 'W10', base: 13.2, scenario: 13.2 },
  { date: 'W11', base: 12.8, scenario: 12.8 },
  { date: 'W12', base: 14.2, scenario: 14.2 },
];

export const ScenarioStudioView = () => {
  const [revenueChange, setRevenueChange] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);
  const [latePayment, setLatePayment] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const scenarioData = useMemo(() => {
    return mockBaseData.map((d, i) => {
      let multiplier = 1 + (revenueChange / 100);
      let expenseOffset = (expenseChange / 12) * i;
      let scenarioVal = d.base * multiplier - expenseOffset;
      
      if (latePayment && i > 4) {
        scenarioVal -= 5; // Simulate late payment impact
      }

      const val = Math.max(0, parseFloat(scenarioVal.toFixed(1)));
      return {
        ...d,
        scenario: val,
        // For the fill logic
        better: val > d.base ? val : d.base,
        worse: val < d.base ? val : d.base,
        diff: val - d.base
      };
    });
  }, [revenueChange, expenseChange, latePayment]);

  const presets = [
    "GST payment next week",
    "Hire 3 employees",
    "Big client pays 30 days late",
    "Take a ₹10L working capital loan",
    "Seasonal revenue drop (monsoon)",
    "+ Custom Scenario"
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex overflow-hidden">
      {/* Left Panel: Controls (40%) */}
      <div className="w-[40%] border-r border-white/5 bg-cosmos-card/50 overflow-y-auto custom-scrollbar p-12 space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-bold tracking-tight">Scenario Planning Studio</h2>
          <p className="text-white/40 text-sm">Model the impact of business decisions before you make them.</p>
        </div>

        {/* Presets */}
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Scenario Presets</p>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button 
                key={p}
                onClick={() => setActivePreset(p)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  activePreset === p 
                    ? "bg-ember-primary border-ember-primary text-black" 
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Builder Sections */}
        <div className="space-y-10">
          {/* Revenue Changes */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Revenue Changes</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-white/60">Monthly Revenue Delta</label>
                  <span className={cn("text-lg font-display font-bold", revenueChange >= 0 ? "text-emerald-400" : "text-red-400")}>
                    {revenueChange > 0 ? '+' : ''}{revenueChange}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="100" 
                  value={revenueChange} 
                  onChange={(e) => setRevenueChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-ember-primary"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="space-y-1">
                  <p className="text-sm font-bold">Top client pays 30 days late</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Impacts Day 30-60</p>
                </div>
                <button 
                  onClick={() => setLatePayment(!latePayment)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    latePayment ? "bg-ember-primary" : "bg-white/10"
                  )}
                >
                  <motion.div 
                    animate={{ x: latePayment ? 24 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg" 
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Expense Changes */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Expense Changes</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-white/60">Add Recurring Expense</label>
                  <span className="text-lg font-display font-bold text-red-400">₹{expenseChange}L/mo</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={expenseChange} 
                  onChange={(e) => setExpenseChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-ember-primary"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 space-y-4">
          <button className="w-full py-4 bg-ember-primary text-black font-bold rounded-2xl shadow-[0_0_30px_rgba(242,125,38,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            Run Scenario <Zap size={18} className="fill-black" />
          </button>
        </div>
      </div>

      {/* Right Panel: Live Forecast (60%) */}
      <div className="flex-1 p-12 bg-cosmos-bg relative flex flex-col">
        <div className="flex-1 flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-display font-bold">Live Impact Analysis</h3>
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Real-time projection based on scenario inputs</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-white/40" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Baseline</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 border-t-2 border-dashed border-ember-primary" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Scenario: {activePreset || 'Custom'}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 glass rounded-3xl p-8 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scenarioData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(val) => `₹${val}L`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                
                {/* Fill Logic: Green for better, Red for worse */}
                <Area 
                  type="monotone" 
                  dataKey="scenario" 
                  stroke="none"
                  fill={revenueChange >= 0 && !latePayment ? "url(#greenGrad)" : "url(#redGrad)"}
                  animationDuration={300}
                />

                <Area 
                  type="monotone" 
                  dataKey="base" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth={2}
                  fill="none" 
                  dot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="scenario" 
                  stroke="#F27D26" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fill="none" 
                  dot={false}
                  animationDuration={300}
                />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Danger Zone', fill: '#ef4444', fontSize: 10, fontWeight: 800 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Insight Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-ember-primary/10 border border-ember-primary/20 rounded-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-ember-primary/20 rounded-xl flex items-center justify-center text-ember-primary">
              <Zap size={20} className="fill-ember-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">
                This scenario reduces your Day-47 cash gap by <span className="text-ember-primary">₹2.1L</span>.
              </p>
              <p className="text-xs text-white/40 mt-1">
                Consider collecting <span className="text-white font-bold">₹85K receivable</span> from <span className="text-white font-bold">Raymond Ltd</span> first to optimize liquidity.
              </p>
            </div>
            <button className="px-4 py-2 bg-ember-primary text-black text-xs font-bold rounded-lg">
              Apply Strategy
            </button>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-2">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Projected Runway</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-display font-bold">11 Months</p>
                <span className="text-red-400 text-xs font-bold mb-1">-3 Months</span>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-2">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Min. Cash Balance</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-display font-bold">₹4.2L</p>
                <span className="text-red-400 text-xs font-bold mb-1">-₹2.1L</span>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-2">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Risk Level</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-display font-bold text-amber-400">Elevated</p>
                <span className="text-amber-400 text-xs font-bold mb-1">Warning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
