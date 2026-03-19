import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertTriangle, 
  Beaker, 
  Star, 
  Plug, 
  FileText,
  Settings, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useUIStore } from '../lib/store';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: TrendingUp, label: 'Forecast' },
  { icon: AlertTriangle, label: 'Cash Leaks', badge: '3 new' },
  { icon: Beaker, label: 'Scenarios' },
  { icon: Star, label: 'Credit Score' },
  { icon: Plug, label: 'Integrations' },
  { icon: FileText, label: 'Reports' },
];

const secondaryItems = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help & Support' },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <aside className="w-64 h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-ember-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,125,38,0.3)]">
          <Zap className="text-black fill-black" size={20} />
        </div>
        <h1 className="text-xl font-display font-bold tracking-tight">CashFlow AI</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            onClick={() => setActiveTab(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
              activeTab === item.label 
                ? "bg-ember-primary/10 text-ember-primary" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} className={cn(activeTab === item.label ? "text-ember-primary" : "text-white/40 group-hover:text-white")} />
            <span className="font-medium text-sm">{item.label}</span>
            {item.badge && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-ember-primary/20 text-ember-primary text-[10px] font-bold uppercase">
                {item.badge}
              </span>
            )}
            {activeTab === item.label && !item.badge && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ember-primary" />}
          </motion.button>
        ))}
        
        <div className="my-4 border-t border-white/5" />
        
        {secondaryItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <item.icon size={18} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 py-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-ember-primary/20 to-transparent border border-ember-primary/10">
          <p className="text-xs text-ember-primary font-bold uppercase tracking-widest mb-2">Pro Plan</p>
          <p className="text-xs text-white/60 mb-4 leading-relaxed">Unlock ML-powered predictive analytics.</p>
          <button className="w-full py-2 bg-ember-primary text-black text-xs font-bold rounded-lg hover:bg-ember-secondary transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
};
