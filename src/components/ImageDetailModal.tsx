import React from 'react';
import { RoadDefect } from '../types';
import { SEVERITY_BADGES, CATEGORY_LABELS } from '../data/mockData';
import { X, Send, Crosshair, Bus, Clock } from 'lucide-react';

interface ImageDetailModalProps {
  defect: RoadDefect;
  onClose: () => void;
  onDispatchWorkOrder: (defectId: string) => void;
}

export const ImageDetailModal: React.FC<ImageDetailModalProps> = ({
  defect,
  onClose,
  onDispatchWorkOrder
}) => {
  const catMeta = CATEGORY_LABELS[defect.category];
  const sevMeta = SEVERITY_BADGES[defect.severity];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${sevMeta.badge}`}>
              {sevMeta.label}
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">{defect.id}</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300">{defect.highwayCode}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {defect.title}
          </h3>
          <p className="text-xs text-slate-400">
            Location: {defect.roadName} ({defect.chainageKm}) • GPS: {defect.lat.toFixed(4)}° N, {defect.lng.toFixed(4)}° E
          </p>
        </div>

        {/* Modal Body: Image with AI Bounding Box and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-y-auto pr-1">
          
          {/* Left 2 Cols: High Resolution Evidence Frame with Synthetic AI Bounding Box */}
          <div className="lg:col-span-2 relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-700 h-72 sm:h-96">
            <img
              src={defect.beforeImage}
              alt={defect.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Simulated Edge YOLOv8 Bounding Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            {/* AI Bounding Box */}
            <div className="absolute top-[40%] left-[32%] w-[42%] h-[32%] border-2 border-rose-500 bg-rose-500/15 rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.7)] pointer-events-none">
              <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                <Crosshair className="w-3 h-3" />
                <span>{defect.category.toUpperCase()} • {Math.round(defect.confidence * 100)}% CONF</span>
              </div>
              <div className="absolute -bottom-5 right-0 bg-black/80 text-rose-300 font-mono text-[9px] px-1.5 py-0.5 rounded">
                Risk Score: {defect.aiRiskScore} / 100
              </div>
            </div>

            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
              Edge Keyframe Capture • 1080p RGB • Anonymized
            </div>
          </div>

          {/* Right Col: Multi Bus Observation Chain */}
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 font-bold flex items-center justify-between">
                <span>Multi Bus Cluster Fusion</span>
                <span className="text-emerald-400">{defect.busSightingsCount} Sightings</span>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto text-xs">
                {defect.verifiedBuses.map((obs) => (
                  <div key={obs.id} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                    <div className="flex items-center justify-between font-bold text-cyan-300">
                      <span>{obs.busId}</span>
                      <span className="font-mono text-emerald-400">{Math.round(obs.confidence * 100)}%</span>
                    </div>
                    <div className="text-slate-400 flex items-center justify-between">
                      <span>{obs.routeNumber}</span>
                      <span>{obs.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Suggested Remediation</div>
              <div className="text-slate-200 font-semibold">{defect.suggestedAction}</div>
              <div className="text-[11px] text-amber-400 font-mono">
                Est. Repair Cost: ₹{defect.estimatedRepairCostINR.toLocaleString()}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Assigned Authority: <strong className="text-white">{defect.assignedDept}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDispatchWorkOrder(defect.id);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Work Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
