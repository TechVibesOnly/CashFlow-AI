import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { CountUp } from './CountUp';

const data = [
  { name: 'Oct', value: 4200000 },
  { name: 'Nov', value: 3800000 },
  { name: 'Dec', value: 5100000 },
  { name: 'Jan', value: 4800000 },
  { name: 'Feb', value: 6200000 },
  { name: 'Mar', value: 7500000 },
];

export const StatCard = ({ title, value, trend, trendValue, prefix = '₹' }: any) => (
  <motion.div 
    whileHover={{ scale: 1.015, y: -2 }}
    className="glass p-6 rounded-2xl group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
  >
    <div className="flex justify-between items-start mb-4">
      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{title}</p>
      <button className="text-white/20 hover:text-white transition-colors">
        <MoreHorizontal size={16} />
      </button>
    </div>
    <div className="flex items-baseline gap-1 mb-2">
      <span className="text-2xl font-display font-bold text-ember-primary">{prefix}</span>
      <CountUp end={value} className="text-3xl font-display font-bold tracking-tight" />
    </div>
    <div className={cn(
      "flex items-center gap-1 text-xs font-bold",
      trend === 'up' ? "text-emerald-400" : "text-rose-400"
    )}>
      {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{trendValue}% from last month</span>
    </div>
  </motion.div>
);

export const ForecastChart = () => (
  <div className="glass p-8 rounded-2xl h-[400px] flex flex-col">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-xl font-display font-bold mb-1">Cash Flow Forecast</h3>
        <p className="text-white/40 text-sm">ML-predicted runway for the next 6 months</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10 transition-all">Monthly</button>
        <button className="px-4 py-2 rounded-lg bg-ember-primary text-black text-xs font-bold">Quarterly</button>
      </div>
    </div>
    <div className="flex-1 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'Satoshi' }}
            dy={10}
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#F27D26', fontFamily: 'JetBrains Mono' }}
            cursor={{ stroke: 'rgba(242, 125, 38, 0.2)', strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#F27D26" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const InsightCard = ({ title, description, type, amount }: any) => (
  <motion.div 
    whileHover={{ scale: 1.015 }}
    className={cn(
      "glass p-6 rounded-2xl relative overflow-hidden group",
      type === 'alert' ? "border-rose-500/20" : "border-emerald-500/20"
    )}
  >
    <div className={cn(
      "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 blur-3xl opacity-10 transition-opacity group-hover:opacity-20",
      type === 'alert' ? "bg-rose-500" : "bg-emerald-500"
    )} />
    
    <div className="flex items-center gap-2 mb-4">
      <div className={cn(
        "w-2 h-2 rounded-full",
        type === 'alert' ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
      )} />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{type === 'alert' ? 'Critical Insight' : 'Optimization'}</span>
    </div>
    
    <h4 className="text-lg font-display font-bold mb-2 leading-tight">{title}</h4>
    <p className="text-white/50 text-sm leading-relaxed mb-4">{description}</p>
    
    {amount && (
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs text-white/30">Potential Impact</span>
        <span className={cn(
          "font-mono font-bold",
          type === 'alert' ? "text-rose-400" : "text-emerald-400"
        )}>₹{amount.toLocaleString('en-IN')}</span>
      </div>
    )}
  </motion.div>
);
