import React, { useState } from 'react';
import { RoadDefect } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  SplitSquareVertical,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClosedLoopVerificationModalProps {
  defect: RoadDefect;
  onClose: () => void;
  onVerifyRepairSuccess: (defectId: string) => void;
}

export const ClosedLoopVerificationModal: React.FC<ClosedLoopVerificationModalProps> = ({
  defect,
  onClose,
  onVerifyRepairSuccess
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isVerified, setIsVerified] = useState<boolean>(defect.status === 'repaired_verified');

  const handleVerify = () => {
    setIsVerified(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
    onVerifyRepairSuccess(defect.id);
  };

  const beforeImg = defect.beforeImage || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80';
  const afterImg = defect.afterImage || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Closed Loop Repair Verification
            </span>
            <span className="text-xs font-mono text-slate-400">{defect.id}</span>
          </div>
          <h3 className="text-lg font-extrabold text-white">
            {defect.title} • Verification Audit
          </h3>
          <p className="text-xs text-slate-400">
            Location: {defect.roadName} ({defect.chainageKm}) • Assigned: {defect.assignedDept}
          </p>
        </div>

        {/* Interactive Before and After Image Comparison Slider */}
        <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 select-none mb-4">
          
          {/* AFTER Image (Background) */}
          <img
            src={afterImg}
            alt="Repaired Asphalt"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-300 border border-emerald-700 font-mono text-xs font-bold z-10">
            AFTER: Repaired Bitumen Patch (Transit Bus Scan)
          </div>

          {/* BEFORE Image (Clipped Overlay) */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImg}
              alt="Before Damage"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '700px' }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-950/90 text-rose-300 border border-rose-700 font-mono text-xs font-bold z-10">
              BEFORE: Active Pothole Defect
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div 
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center -ml-0.5">
              <SplitSquareVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hidden Range Input for full touch and mouse drag control */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
          />
        </div>

        {/* Verification AI Confidence Report */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">AI Verification Match</div>
            <div className="text-emerald-400 font-extrabold text-base">98.4% Confidence</div>
            <div className="text-[10px] text-slate-500">SSIM Defect Clearance</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">Verification Source</div>
            <div className="text-cyan-400 font-extrabold text-base">Fleet Bus DL1P 1011</div>
            <div className="text-[10px] text-slate-500">Autonomous scan on Route 620</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[10px]">Work Order Status</div>
            <div className="text-amber-300 font-extrabold text-base">
              {isVerified ? 'VERIFIED CLOSED' : 'PENDING AUDIT'}
            </div>
            <div className="text-[10px] text-slate-500">SLA: Completed in 28h</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Drag slider left or right to compare before and after road surface.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              Close
            </button>
            {!isVerified ? (
              <button
                onClick={handleVerify}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve and Close Work Order</span>
              </button>
            ) : (
              <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Work Order Closed and Verified</span>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
