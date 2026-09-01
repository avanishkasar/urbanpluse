import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Layers, 
  Car, 
  Droplets, 
  Clock, 
  ChevronRight, 
  Info, 
  Sparkles,
  ArrowUpRight,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { RoadSegment, RoadDefect } from '../types';
import { CATEGORY_LABELS, SEVERITY_BADGES } from '../data/mockData';

interface RoadsSectionProps {
  segments?: RoadSegment[];
  defects?: RoadDefect[];
  selectedSegment?: RoadSegment | null;
  onSelectSegment?: (segment: RoadSegment) => void;
  onSelectDefect?: (defect: RoadDefect) => void;
}

export const RoadsSection: React.FC<RoadsSectionProps> = ({
  segments = [],
  defects = [],
  selectedSegment = null,
  onSelectSegment = (_seg: RoadSegment) => {},
  onSelectDefect = (_d: RoadDefect) => {}
}) => {
  const activeSegment = selectedSegment || segments[0] || {
    id: 'SEG-DEFAULT',
    name: 'Delhi-Gurugram Expressway',
    highwayCode: 'NH 48',
    startKm: 14.2,
    endKm: 42.0,
    laneCount: 8,
    healthScore: 68,
    status: 'High Maintenance Priority',
    potholeDensity: 'Critical (4.2 / km)',
    drainageRisk: 'High (Waterlogging at underpasses)',
    trafficVolume: '185,000 PCU / day',
    lastInspected: '12 mins ago (Bus DTC-4092)',
    priority: 'Immediate Attention'
  };

  const getStatusColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 70) return 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10';
    if (score >= 55) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 85) return 'bg-gradient-to-r from-emerald-500 to-teal-400';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-500 to-amber-400';
    if (score >= 55) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-rose-600 to-orange-500';
  };

  const segmentDefects = (defects || []).filter(d => 
    d.roadName?.toLowerCase().includes(activeSegment.highwayCode?.toLowerCase() || '') ||
    d.highwayCode?.toLowerCase() === activeSegment.highwayCode?.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Road Health Index and Corridor Profiles
            </h2>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              0 to 100 Health Scale
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Continuous municipal infrastructure condition grading powered by multi bus dashcam telemetry. Scores dynamically adjust based on defect count, cavity depth, axle load exposure, and waterlogging.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Total Scanned Network</div>
            <div className="text-sm font-bold text-white font-mono">133.1 KM Corridor</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg) => {
          const isSelected = activeSegment.id === seg.id;
          return (
            <div
              key={seg.id}
              onClick={() => onSelectSegment(seg)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    {seg.highwayCode}
                  </span>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusColor(seg.healthScore)}`}>
                    {seg.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {seg.name}
                </h3>
                <div className="text-[11px] text-slate-400 mb-3 font-mono">
                  KM {seg.startKm.toFixed(1)} to KM {seg.endKm.toFixed(1)} • {seg.laneCount} Lanes
                </div>

                {/* Score Dial */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-3">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[11px] text-slate-400">Health Score</span>
                    <span className="text-2xl font-extrabold font-mono text-white">
                      {seg.healthScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getScoreBarColor(seg.healthScore)}`} 
                      style={{ width: `${seg.healthScore}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {seg.activeDefectsCount} Active Defects
                </span>
                <span className="text-cyan-400 font-mono text-[11px] font-medium flex items-center gap-0.5">
                  Inspect Factors <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Corridor Deep Dive & Transparent Health Score Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Factor Breakdown & Causal Explanation */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Health Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Corridor Inspection Deep Dive
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeSegment.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${getStatusColor(activeSegment.healthScore)}`}>
                  Health: {activeSegment.healthScore} / 100 ({activeSegment.status})
                </span>
              </div>
            </div>

            {/* Why the score changed banner */}
            <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-amber-900/40 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-2">
                  <span>Score Change Analysis:</span>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200">
                    {activeSegment.recentScoreChange}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSegment.scoreExplanation}
                </p>
              </div>
            </div>

            {/* 6 Explainable Mathematical Factors */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Contributing Factor Decomposition
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* 1. Defect Penalty */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Active Defect Deductions</div>
                  <div className="text-lg font-bold font-mono text-rose-400">
                    {activeSegment.factors.defectPenalty} pts
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Based on {activeSegment.activeDefectsCount} physical clusters
                  </div>
                </div>

                {/* 2. Severity Multiplier */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Severity Weight Multiplier</div>
                  <div className="text-lg font-bold font-mono text-amber-400">
                    {activeSegment.factors.severityMultiplier}x
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Accounts for depth and area
                  </div>
                </div>

                {/* 3. Traffic Volume Exposure */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Traffic Volume Exposure</div>
                  <div className="text-lg font-bold font-mono text-cyan-400">
                    {activeSegment.factors.trafficExposureWeight}x
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {activeSegment.dailyTrafficVolume}
                  </div>
                </div>

                {/* 4. Waterlogging Impact */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Waterlogging Erosion Index</div>
                  <div className="text-lg font-bold font-mono text-blue-400">
                    {activeSegment.factors.waterloggingImpact} pts
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Subbase moisture vulnerability
                  </div>
                </div>

                {/* 5. Deterioration Velocity */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Deterioration Velocity</div>
                  <div className="text-lg font-bold font-mono text-orange-400">
                    {activeSegment.factors.deteriorationVelocity}x
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Crack expansion rate per week
                  </div>
                </div>

                {/* 6. Recency Adjustment */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-1">Sensor Freshness Weight</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    {activeSegment.factors.recencyAdjustment}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Live transit fleet verified
                  </div>
                </div>
              </div>
            </div>

            {/* Deterioration Risk Horizon Forecast */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase font-mono text-slate-400 font-semibold mb-1">
                  Predictive Maintenance Horizon
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{activeSegment.riskHorizonLabel}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                    {activeSegment.deteriorationRisk30d}% Probability
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-400">Recommended Next Action</div>
                <div className="text-xs font-semibold text-cyan-300">
                  Execute Cold mix Bituminous Patching
                </div>
              </div>
            </div>
          </div>

          {/* Active Defects on this Corridor */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">
                Active Defect Registry for {activeSegment.highwayCode}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {segmentDefects.length} items logged
              </span>
            </div>

            <div className="space-y-2.5">
              {segmentDefects.map((def) => {
                const catInfo = CATEGORY_LABELS[def.category] || CATEGORY_LABELS.pothole;
                const sevInfo = SEVERITY_BADGES[def.severity] || SEVERITY_BADGES.medium;

                return (
                  <div
                    key={def.id}
                    onClick={() => onSelectDefect(def)}
                    className="p-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={def.thumbnail} 
                        alt={def.title} 
                        className="w-12 h-12 rounded-lg object-cover border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${sevInfo.badge}`}>
                            {sevInfo.label}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${catInfo.bg} ${catInfo.color} ${catInfo.border}`}>
                            {catInfo.label}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {def.chainageKm}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">
                          {def.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {def.busSightingsCount} Buses Verified
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {def.lastSeen}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Corridor Technical Specifications */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
              Corridor Structural Metadata
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Highway Code</span>
                <span className="font-mono font-bold text-white">{activeSegment.highwayCode}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Pavement Surface</span>
                <span className="font-semibold text-slate-200">{activeSegment.surfaceType}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Carriageway Configuration</span>
                <span className="font-semibold text-slate-200">{activeSegment.laneCount} Lanes Dual Carriageway</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Chainage Bounds</span>
                <span className="font-mono text-slate-200">KM {activeSegment.startKm.toFixed(1)} to KM {activeSegment.endKm.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Daily Traffic Volume</span>
                <span className="font-mono text-slate-200">{activeSegment.dailyTrafficVolume}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Transit Fleet Lines</span>
                <span className="font-semibold text-cyan-300">Route 717, Route 543, Jaipur InterCity</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Governing Authority</span>
                <span className="font-semibold text-emerald-400">NHAI Regional Division</span>
              </div>
            </div>
          </div>

          {/* Quick Health Index Reference Guide */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
              Municipal Health Score Tiers
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="font-bold">85 to 100: Optimal</span>
                <span className="text-[11px]">Routine Maintenance</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300">
                <span className="font-bold">70 to 84: Fair</span>
                <span className="text-[11px]">Minor Joint Sealing</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <span className="font-bold">55 to 69: Degraded</span>
                <span className="text-[11px]">Slurry Seal & Patching</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <span className="font-bold">0 to 54: Critical</span>
                <span className="text-[11px]">Emergency Resurfacing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
