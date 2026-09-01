import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  Bus, 
  Eye, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Lock,
  Compass
} from 'lucide-react';
import { RoadDefect, DefectCategory, SeverityLevel } from '../types';
import { CATEGORY_LABELS, SEVERITY_BADGES } from '../data/mockData';

interface DefectsSectionProps {
  defects?: RoadDefect[];
  selectedDefect?: RoadDefect | null;
  onSelectDefect?: (defect: RoadDefect) => void;
  onInspectImage?: (defect: RoadDefect) => void;
  onOpenVerificationModal?: (defect: RoadDefect) => void;
  onDispatchWorkOrder?: (defectId: string) => void;
}

export const DefectsSection: React.FC<DefectsSectionProps> = ({
  defects = [],
  selectedDefect = null,
  onSelectDefect = (_d: RoadDefect) => {},
  onInspectImage = (_d: RoadDefect) => {},
  onOpenVerificationModal = (_d: RoadDefect) => {},
  onDispatchWorkOrder = (_id: string) => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredDefects = (defects || []).filter(defect => {
    const matchesSearch = 
      defect.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.roadName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.highwayCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.chainageKm?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || defect.category === selectedCategory;
    const matchesSev = selectedSeverity === 'all' || defect.severity === selectedSeverity;

    return matchesSearch && matchesCat && matchesSev;
  });

  const activeDefect = selectedDefect || filteredDefects[0] || (defects && defects[0]) || null;

  return (
    <div className="space-y-6">
      {/* Header and Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Defect Registry and Evidence Vault
              </h2>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Multi Bus Corroborated
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Photographic evidence, spatial clustering confirmation, and edge AI detection metadata captured by public transit fleet cameras.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Cluster Merge Rate</div>
              <div className="text-sm font-bold text-emerald-400 font-mono">96.4% Merged</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Total Registry</div>
              <div className="text-sm font-bold text-white font-mono">{defects.length} Defects</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by road, corridor, or defect title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Defect Categories</option>
              <option value="pothole">Potholes</option>
              <option value="alligator_crack">Alligator Fatigue Cracks</option>
              <option value="longitudinal_crack">Linear Cracks</option>
              <option value="waterlogging">Waterlogging Hazards</option>
              <option value="faded_lane_marking">Faded Road Markings</option>
              <option value="damaged_divider">Damaged Dividers</option>
              <option value="damaged_traffic_sign">Damaged Signs</option>
              <option value="damaged_manhole">Sunken Manholes</option>
            </select>
          </div>

          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Severity Levels</option>
              <option value="critical">Critical Severity (P0)</option>
              <option value="high">High Severity (P1)</option>
              <option value="medium">Medium Severity (P2)</option>
              <option value="low">Low Severity (P3)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left List + Right Comprehensive Evidence Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Defect Card List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>Showing {filteredDefects.length} items</span>
            <span>Sorted by Risk Priority</span>
          </div>

          <div className="space-y-3 max-h-[820px] overflow-y-auto pr-1">
            {filteredDefects.map((def) => {
              const isSelected = activeDefect && activeDefect.id === def.id;
              const catInfo = CATEGORY_LABELS[def.category] || CATEGORY_LABELS.pothole;
              const sevInfo = SEVERITY_BADGES[def.severity] || SEVERITY_BADGES.medium;

              return (
                <div
                  key={def.id}
                  onClick={() => onSelectDefect(def)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img 
                        src={def.thumbnail} 
                        alt={def.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800"
                      />
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${sevInfo.dot}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${sevInfo.badge}`}>
                          {sevInfo.label}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${catInfo.bg} ${catInfo.color} ${catInfo.border}`}>
                          {catInfo.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 ml-auto">
                          {(def.confidence * 100).toFixed(0)}% AI Conf
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white truncate mb-0.5">
                        {def.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 truncate">
                        {def.roadName}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400 mt-1 flex items-center gap-1">
                        <Bus className="w-3 h-3" />
                        <span>{def.busSightingsCount} Transit Buses Confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Detailed Visual Evidence and Multi Bus Confirmation */}
        <div className="lg:col-span-7">
          {activeDefect ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {activeDefect.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      • {activeDefect.highwayCode}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      • {activeDefect.chainageKm}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {activeDefect.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activeDefect.roadName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectImage(activeDefect)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Expand Keyframe</span>
                  </button>
                  {activeDefect.status === 'repaired_verified' && (
                    <button
                      onClick={() => onOpenVerificationModal(activeDefect)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>View Verification Proof</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Photographic Evidence Card with AI Bounding Box Overlay Simulation */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img 
                  src={activeDefect.beforeImage} 
                  alt={activeDefect.title} 
                  className="w-full h-72 object-cover"
                />

                {/* Simulated YOLO AI Bounding Box */}
                <div className="absolute inset-x-12 inset-y-10 border-2 border-rose-500 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                  <div className="absolute -top-3.5 left-2 bg-rose-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    YOLOv8: {activeDefect.category} ({(activeDefect.confidence * 100).toFixed(1)}%)
                  </div>
                </div>

                {/* Live Edge Blur Notice */}
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Privacy Shield: Automatic Plate & Face Blur Active</span>
                </div>

                {/* GPS Tag Overlay */}
                <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{activeDefect.lat.toFixed(4)}° N, {activeDefect.lng.toFixed(4)}° E</span>
                </div>
              </div>

              {/* Multi Bus Confirmation Audit Log */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                    <Bus className="w-3.5 h-3.5 text-cyan-400" />
                    Multi Bus Corroboration Chain ({activeDefect.busSightingsCount} Sighting Passes)
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    Spatial Temporal Cluster Validated
                  </span>
                </div>

                <div className="space-y-2">
                  {activeDefect.verifiedBuses.map((obs) => (
                    <div 
                      key={obs.id}
                      className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/90 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                          <Bus className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">{obs.busId}</span>
                            <span className="text-[11px] text-slate-400">{obs.routeNumber}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Vehicle Speed: {obs.speedKmh} km/h • Camera: {obs.cameraAngle}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] font-mono font-semibold text-emerald-400">
                          {(obs.visualSimilarity * 100).toFixed(0)}% Visual Match
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {obs.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remediations & Priority Rationale */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">AI Priority Rationale:</span>
                  <span className="font-semibold text-amber-300">{activeDefect.trafficExposure}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeDefect.priorityReason}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-300">
                  <span>Suggested Action: <strong>{activeDefect.suggestedAction}</strong></span>
                  <span className="font-mono text-cyan-300 font-bold">₹{activeDefect.estimatedRepairCostINR.toLocaleString()}</span>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
