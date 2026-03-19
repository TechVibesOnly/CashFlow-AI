"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Zap, 
  Clock, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  ShieldAlert,
  Ghost
} from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

const LeakCard = ({ severity, icon: Icon, title, description, cost, trend }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass p-6 rounded-3xl border border-white/5 space-y-6 group relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
          severity === 'High' ? "bg-red-500/10 text-red-400 border border-red-500/20" :
          severity === 'Medium' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        )}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            severity === 'High' ? "bg-red-500" : severity === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
          )} />
          {severity}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-ember-primary transition-colors">
          <Icon size={20} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-display font-bold">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{description}</p>
      </div>

      <div className="pt-4 border-t border-white/5 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Cost Impact</p>
          <p className="text-xl font-display font-bold text-ember-primary">₹{cost}/mo</p>
        </div>
        <div className="h-8 w-24 flex items-end gap-1">
          {trend.map((h: number, i: number) => (
            <div 
              key={i} 
              className="flex-1 bg-ember-primary/20 rounded-t-sm" 
              style={{ height: `${h}%` }} 
            />
          ))}
        </div>
      </div>

      <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
        Action Required <ArrowRight size={14} />
      </button>
    </motion.div>
  );
};

export const LeakDetectorView = () => {
  return (
    <div className="p-12 max-w-[1600px] mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-display font-bold tracking-tight">Cash Leak Detector</h2>
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">4 Critical Leaks</span>
          </div>
        </div>
        <p className="text-white/40 text-lg">AI found 4 leaks costing you <span className="text-white font-bold">₹47,200/month</span>.</p>
      </div>

      {/* Leaks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LeakCard 
          severity="High"
          icon={Ghost}
          title="Unused SaaS Subscriptions"
          description="You're paying for 3 tools (Slack Pro, Adobe CC, Canva) with <2% usage in last 90 days."
          cost="12,400"
          trend={[20, 40, 35, 50, 45, 60, 55]}
        />
        <LeakCard 
          severity="Medium"
          icon={ShieldAlert}
          title="Vendor Concentration Risk"
          description="Bhaskar Logistics now accounts for 38% of your total outflows. Single point of failure detected."
          cost="8,500"
          trend={[60, 55, 70, 65, 80, 75, 90]}
        />
        <LeakCard 
          severity="High"
          icon={Clock}
          title="Late Payment Penalties"
          description="You paid ₹14,500 in interest to 4 vendors last month due to 3-day delays in wire transfers."
          cost="14,500"
          trend={[10, 20, 15, 40, 30, 80, 70]}
        />
        <LeakCard 
          severity="Medium"
          icon={TrendingUp}
          title="Subscription Price Creep"
          description="Your AWS bill has increased by 18% month-over-month without a corresponding traffic spike."
          cost="6,200"
          trend={[30, 35, 40, 45, 50, 60, 70]}
        />
        <LeakCard 
          severity="Low"
          icon={AlertTriangle}
          title="Holiday Transaction Anomaly"
          description="₹4,200 spent at 'Office Supplies' on a Sunday. Flagged as non-standard business behavior."
          cost="4,200"
          trend={[5, 5, 5, 5, 5, 5, 100]}
        />
        <LeakCard 
          severity="High"
          icon={CreditCard}
          title="Overdue Receivables"
          description="₹18.4L in invoices are now >45 days overdue. This is your primary cash flow bottleneck."
          cost="1,40,000"
          trend={[40, 50, 60, 70, 80, 90, 100]}
        />
      </div>

      {/* AR Aging Table */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold">AR Aging Analysis</h3>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Accounts Receivable by Due Date</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">0-30 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">31-60 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">61+ Days</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Invoice #</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Days Overdue</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Reliance Retail', inv: '#INV-882', amount: '₹8,50,000', days: 12, status: '0-30', color: 'text-emerald-400' },
                { name: 'Aditya Birla', inv: '#INV-885', amount: '₹4,20,000', days: 34, status: '31-60', color: 'text-amber-400' },
                { name: 'Raymond Ltd', inv: '#INV-890', amount: '₹12,10,000', days: 58, status: '31-60', color: 'text-amber-400' },
                { name: 'FabIndia', inv: '#INV-892', amount: '₹2,80,000', days: 92, status: '61+', color: 'text-red-400' },
                { name: 'Surat Silks', inv: '#INV-895', amount: '₹5,40,000', days: 105, status: '61+', color: 'text-red-400' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-bold">{row.name}</td>
                  <td className="px-8 py-6 text-white/40 font-mono text-sm">{row.inv}</td>
                  <td className="px-8 py-6 font-mono font-bold">{row.amount}</td>
                  <td className="px-8 py-6">
                    <span className={cn("font-bold", row.color)}>{row.days} Days</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter",
                      row.status === '0-30' ? "bg-emerald-500/10 text-emerald-400" :
                      row.status === '31-60' ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    )}>
                      {row.status} Days
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all">
                      <MessageSquare size={14} className="fill-emerald-400" />
                      WhatsApp Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
