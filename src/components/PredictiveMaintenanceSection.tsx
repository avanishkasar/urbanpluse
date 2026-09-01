import React from 'react';
import { RoadSegment } from '../types';
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Activity, 
  ArrowRight, 
  Zap, 
  Flame,
  Info
} from 'lucide-react';

interface PredictiveMaintenanceSectionProps {
  segments?: RoadSegment[];
  onSelectSegment?: (seg: RoadSegment) => void;
}

export const PredictiveMaintenanceSection: React.FC<PredictiveMaintenanceSectionProps> = ({
  segments = [],
  onSelectSegment = (_seg: RoadSegment) => {}
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Road Health Index and Deterioration Risk Forecasting
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-950 text-rose-300 border border-rose-800 font-bold">
              Explainable AI
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Temporal tracking across repeated transit bus observations to forecast structural asphalt degradation horizons before critical pavement failure occurs.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span>Formula: Health Score = 100 − Σ(Defect × Traffic × Severity)</span>
        </div>
      </div>

      {/* Segment Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg) => {
          const isCritical = seg.healthScore < 60;
          const isDegraded = seg.healthScore >= 60 && seg.healthScore < 75;
          const isFair = seg.healthScore >= 75 && seg.healthScore < 85;

          const badgeColor = isCritical 
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            : isDegraded
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            : isFair
            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

          return (
            <div 
              key={seg.id}
              onClick={() => onSelectSegment(seg)}
              className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {seg.highwayCode}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${badgeColor}`}>
                    {seg.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 mb-2">
                  {seg.name}
                </h3>

                {/* Health Score Gauge */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Health Index</span>
                    <span className={`font-extrabold ${isCritical ? 'text-rose-400' : isDegraded ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {seg.healthScore} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-rose-500' : isDegraded ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${seg.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* Deterioration Risk Forecast */}
                <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Risk Horizon:
                    </span>
                    <span className={`font-mono font-bold ${seg.deteriorationRisk30d > 70 ? 'text-rose-400' : 'text-amber-400'}`}>
                      {seg.deteriorationRisk30d}% Prob
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-semibold">
                    {seg.riskHorizonLabel}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Traffic: <strong className="text-slate-300">{seg.dailyTrafficVolume}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{seg.activeDefectsCount} Active Defects</span>
                <span className="font-semibold text-cyan-400 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Inspect Factors <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
