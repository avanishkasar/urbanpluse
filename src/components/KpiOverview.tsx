import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCheck, 
  Clock, 
  TrendingUp, 
  Flame, 
  ArrowUpRight
} from 'lucide-react';

interface KpiOverviewProps {
  totalDefects: number;
  criticalCount: number;
  verifiedCount: number;
  pendingRepairs: number;
  onFilterSeverity?: (sev: string) => void;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({
  totalDefects,
  criticalCount,
  verifiedCount,
  pendingRepairs,
  onFilterSeverity
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Total Active Defects */}
      <div 
        onClick={() => onFilterSeverity && onFilterSeverity('all')}
        className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1">
              Total Active Defects
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {totalDefects.toLocaleString()}
              </span>
              <span className="text-xs font-mono font-medium text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +14.2% fleet scans
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Observed across 84 km²</span>
          <span className="font-mono text-cyan-300 font-medium flex items-center gap-0.5">
            View All <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 2. Critical Highways at Risk */}
      <div 
        onClick={() => onFilterSeverity && onFilterSeverity('critical')}
        className="group relative bg-slate-900/90 hover:bg-slate-900 border border-rose-900/40 hover:border-rose-700/60 rounded-2xl p-5 shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-orange-500" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-rose-300 font-semibold mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Critical Hazards at Risk
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-400 tracking-tight">
                {criticalCount}
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                P0 Immediate
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-rose-300/80">NH 48 and SPR Corridors</span>
          <span className="font-mono text-rose-400 font-medium">Escalated</span>
        </div>
      </div>

      {/* 3. Multi Bus Verified Reports */}
      <div 
        onClick={() => onFilterSeverity && onFilterSeverity('verified')}
        className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-700/60 rounded-2xl p-5 shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1">
              Multi Bus Verified Reports
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {verifiedCount}
              </span>
              <span className="text-xs font-mono font-medium text-emerald-300 flex items-center">
                <CheckCheck className="w-3.5 h-3.5 mr-0.5 text-emerald-400" />
                96.4% Multi Bus Conf
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Duplicate Merge: 96.4%</span>
          <span className="font-mono text-emerald-400 font-medium">Clustered</span>
        </div>
      </div>

      {/* 4. Repairs Pending */}
      <div 
        onClick={() => onFilterSeverity && onFilterSeverity('repairs')}
        className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-700/60 rounded-2xl p-5 shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1">
              Repairs Pending (SLA Queue)
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
                {pendingRepairs}
              </span>
              <span className="text-xs font-mono font-medium text-amber-300">
                Avg SLA: 28.4 hrs
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Est Budget: ₹4.82 Lakhs</span>
          <span className="font-mono text-amber-300 font-medium">AI Prioritized</span>
        </div>
      </div>

    </div>
  );
};
