import React, { useState } from 'react';
import { RoadDefect } from '../types';
import { CATEGORY_LABELS, SEVERITY_BADGES } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Eye, 
  Bus
} from 'lucide-react';

interface RecentDetectionsTableProps {
  defects?: RoadDefect[];
  onSelectDefect?: (defect: RoadDefect) => void;
  onDispatchWorkOrder?: (defectId: string) => void;
  onInspectImage?: (defect: RoadDefect) => void;
}

export const RecentDetectionsTable: React.FC<RecentDetectionsTableProps> = ({
  defects = [],
  onSelectDefect = (_d: RoadDefect) => {},
  onDispatchWorkOrder = (_id: string) => {},
  onInspectImage = (_d: RoadDefect) => {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredDefects = (defects || []).filter((defect) => {
    const matchesSearch = 
      defect.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defect.roadName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defect.highwayCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defect.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = selectedCategory === 'all' || defect.category === selectedCategory;
    const matchesSev = selectedSeverity === 'all' || defect.severity === selectedSeverity;

    return matchesSearch && matchesCat && matchesSev;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Recent Fleet AI Detections and Verified Hotspots
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {filteredDefects.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated real time observations from public transit dashcams and edge YOLO inference.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search highway, defect, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none w-52"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Defect Classes</option>
            <option value="pothole">Potholes</option>
            <option value="alligator_crack">Alligator Cracks</option>
            <option value="longitudinal_crack">Linear Cracks</option>
            <option value="waterlogging">Waterlogging</option>
            <option value="faded_lane_marking">Faded Markings</option>
            <option value="damaged_divider">Damaged Dividers</option>
            <option value="damaged_manhole">Sunken Manholes</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical (P0)</option>
            <option value="high">High (P1)</option>
            <option value="medium">Medium (P2)</option>
            <option value="low">Low (P3)</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-y border-slate-800">
            <tr>
              <th className="py-3 px-3">Evidence Preview</th>
              <th className="py-3 px-3">Defect Type and ID</th>
              <th className="py-3 px-3">Severity</th>
              <th className="py-3 px-3">Corridor and GPS Coordinates</th>
              <th className="py-3 px-3">Multi Bus Verification</th>
              <th className="py-3 px-3">AI Risk Score</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredDefects.map((defect) => {
              const catMeta = CATEGORY_LABELS[defect.category] || { label: defect.category, color: 'text-slate-300', bg: 'bg-slate-800', border: 'border-slate-700' };
              const sevMeta = SEVERITY_BADGES[defect.severity];

              return (
                <tr 
                  key={defect.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                >
                  {/* Evidence Thumbnail */}
                  <td className="py-3 px-3" onClick={() => onInspectImage(defect)}>
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 group-hover:border-cyan-400 transition shadow">
                      <img
                        src={defect.thumbnail}
                        alt={defect.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Eye className="w-4 h-4 text-cyan-300" />
                      </div>
                      <span className="absolute bottom-0 right-0 px-1 rounded-tl bg-black/80 font-mono text-[8px] text-cyan-300 font-bold">
                        {Math.round(defect.confidence * 100)}%
                      </span>
                    </div>
                  </td>

                  {/* Defect Details */}
                  <td className="py-3 px-3" onClick={() => onSelectDefect(defect)}>
                    <div className="font-bold text-white group-hover:text-cyan-300 transition">
                      {defect.title}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${catMeta.bg} ${catMeta.color} border ${catMeta.border}`}>
                        {catMeta.label}
                      </span>
                      <span className="font-mono text-slate-500 text-[11px]">{defect.id}</span>
                    </div>
                  </td>

                  {/* Severity Badge */}
                  <td className="py-3 px-3" onClick={() => onSelectDefect(defect)}>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold ${sevMeta.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sevMeta.dot}`} />
                      {sevMeta.label}
                    </span>
                  </td>

                  {/* Location & GPS */}
                  <td className="py-3 px-3" onClick={() => onSelectDefect(defect)}>
                    <div className="font-semibold text-slate-200">
                      {defect.roadName}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span className="text-cyan-400 font-bold">{defect.chainageKm}</span>
                      <span>({defect.lat.toFixed(4)}° N, {defect.lng.toFixed(4)}° E)</span>
                    </div>
                  </td>

                  {/* Multi-Bus Verification Status */}
                  <td className="py-3 px-3" onClick={() => onSelectDefect(defect)}>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[11px] flex items-center gap-1">
                        <Bus className="w-3 h-3 text-emerald-400" />
                        {defect.busSightingsCount} Fleet Buses
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {defect.lastSeen}
                    </div>
                  </td>

                  {/* AI Risk Score */}
                  <td className="py-3 px-3" onClick={() => onSelectDefect(defect)}>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full ${
                            defect.aiRiskScore > 85 ? 'bg-rose-500' :
                            defect.aiRiskScore > 65 ? 'bg-amber-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${defect.aiRiskScore}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-200 text-xs">
                        {defect.aiRiskScore} / 100
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right space-x-1.5">
                    <button
                      onClick={() => onSelectDefect(defect)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px] transition cursor-pointer"
                      title="Inspect GIS Details"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => onDispatchWorkOrder(defect.id)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition shadow-sm cursor-pointer"
                      title="Dispatch repair work order"
                    >
                      Work Order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredDefects.length === 0 && (
        <div className="text-center py-10 text-slate-500 text-xs">
          No road defects match the selected filters.
        </div>
      )}
    </div>
  );
};
