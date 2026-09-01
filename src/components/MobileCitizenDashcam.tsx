import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Navigation, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Radio, 
  Sparkles, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MobileCitizenDashcamProps {
  onVerifyFromRoute: (defectId: string, isConfirmed: boolean) => void;
  onClose?: () => void;
}

export const MobileCitizenDashcam: React.FC<MobileCitizenDashcamProps> = ({
  onVerifyFromRoute
}) => {
  const [speed, setSpeed] = useState<number>(54);
  const [showVerificationPopup, setShowVerificationPopup] = useState<boolean>(true);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);
  const [instantReportSuccess, setInstantReportSuccess] = useState<boolean>(false);
  const [dashcamMode, setDashcamMode] = useState<'dashcam' | 'waze_nav'>('dashcam');
  const [detectedConfidence] = useState<number>(88);

  // Speedometer subtle fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.min(68, Math.max(44, Math.round(prev + delta)));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = (confirmed: boolean) => {
    if (confirmed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    setVerifiedSuccess(true);
    onVerifyFromRoute('DEF 2026 8941', confirmed);
    setTimeout(() => {
      setShowVerificationPopup(false);
      setVerifiedSuccess(false);
    }, 2800);
  };

  const handleInstantReport = () => {
    confetti({ particleCount: 35, origin: { y: 0.8 } });
    setInstantReportSuccess(true);
    setTimeout(() => {
      setInstantReportSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 w-full max-w-4xl mx-auto">
      
      {/* Top Simulator Mode Switch */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>Citizen and Dashcam Mobile Client</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Edge Sensing Node
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Real time on device inference and crowdsourced verification overlay.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setDashcamMode('dashcam')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                dashcamMode === 'dashcam'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashcam AI
            </button>
            <button
              onClick={() => setDashcamMode('waze_nav')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                dashcamMode === 'waze_nav'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Nav HUD
            </button>
          </div>
          
          <button
            onClick={() => setShowVerificationPopup(true)}
            className="text-xs px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            Trigger Verification Popup
          </button>
        </div>
      </div>

      {/* Simulated Smartphone Frame */}
      <div className="relative w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between">
        
        {/* Dynamic Island / Top Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 animate-pulse" />
        </div>

        {/* Smartphone Status Bar */}
        <div className="pt-2 px-6 flex items-center justify-between text-[11px] font-mono text-slate-200 z-40">
          <span className="font-bold">09:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-emerald-400 font-bold">5G Ultra</span>
            <div className="w-5 h-2.5 border border-slate-300 rounded-sm p-0.5 flex items-center">
              <div className="w-3.5 h-full bg-emerald-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Camera / Live Road Feed Viewport */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden select-none">
          
          {/* Dashcam Footage View */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80"
              alt="Live Dashcam View"
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark vignette overlay for HUD legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90" />
          </div>

          {/* AI Edge Bounding Box 1: Pothole Detected */}
          <div className="absolute top-[46%] left-[24%] w-[52%] h-[24%] pointer-events-none z-20">
            <div className="relative w-full h-full border-2 border-rose-500 bg-rose-500/10 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.6)]">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-rose-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-rose-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-rose-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-rose-400" />
              
              {/* AI Detection Label Header */}
              <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] font-extrabold px-2 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Pothole Detected ({detectedConfidence}% Conf)</span>
              </div>

              {/* Sub label for depth estimation */}
              <div className="absolute -bottom-5 right-0 bg-black/80 text-rose-300 font-mono text-[9px] px-1.5 py-0.5 rounded">
                Depth: ~12cm | Area: 0.4m²
              </div>
            </div>
          </div>

          {/* Top Navigation HUD */}
          <div className="absolute top-10 left-3 right-3 z-30 space-y-2">
            
            {/* Maneuver Card */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 text-white shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-cyan-500/20">
                  <Navigation className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-mono text-cyan-300 font-semibold">
                    In 350m • Keep Right
                  </div>
                  <div className="text-sm font-bold text-white">
                    NH 48 Gurugram Express
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-slate-200">18.4 km</div>
                <div className="text-[10px] text-slate-400">22 mins</div>
              </div>
            </div>

            {/* Live Road Health Risk Ribbon */}
            <div className="bg-rose-950/80 backdrop-blur-md border border-rose-800/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span className="font-bold">DEFECT HOTSPOT ZONE</span>
              </div>
              <span className="text-rose-200 font-bold bg-rose-900/80 px-1.5 py-0.5 rounded">
                Road Score: 54 / 100
              </span>
            </div>
          </div>

          {/* Instant Report Success Banner */}
          {instantReportSuccess && (
            <div className="absolute top-44 left-3 right-3 z-40 bg-emerald-900/95 border border-emerald-500 text-white rounded-2xl p-3 shadow-2xl text-center">
              <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Instant Citizen Geo Report Synced!</span>
              </div>
              <p className="text-[10px] text-slate-200 mt-0.5">
                Location and image streamed to municipal queue.
              </p>
            </div>
          )}

          {/* Bottom Speed and Telemetry HUD */}
          <div className="absolute bottom-4 left-3 right-3 z-30 flex items-end justify-between">
            
            {/* Speedometer Circle */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-2.5 shadow-2xl flex flex-col items-center w-24">
              <div className="text-2xl font-mono font-black text-cyan-400 leading-none">
                {speed}
              </div>
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                KM / H
              </div>
              <div className="mt-1 text-[9px] font-mono text-emerald-400 font-semibold">
                LIMIT 70
              </div>
            </div>

            {/* GPS and FPS Telemetry Tag */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2 text-right text-[10px] font-mono text-slate-300 space-y-0.5">
              <div className="text-cyan-300 font-semibold">KM 28.4 (Left Lane)</div>
              <div className="text-slate-400">GPS: 28.4595° N, 77.0266° E</div>
              <div className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                YOLOv8 Edge: 58.4 FPS
              </div>
            </div>

          </div>

          {/* Interactive "Verify Recent Detections on Route" Popup */}
          {showVerificationPopup && (
            <div className="absolute inset-x-3 bottom-24 z-40 animate-in fade-in duration-300">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-4 shadow-2xl text-white">
                
                {verifiedSuccess ? (
                  <div className="text-center py-3 space-y-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-1.5">
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="font-extrabold text-sm text-emerald-400">
                      Community Vote Recorded!
                    </div>
                    <div className="text-xs text-slate-300">
                      Multi bus fusion updated to <strong className="text-white">8 Confirmations</strong>.
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                          Route Verification Alert
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">120m ahead</span>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=200&q=80"
                          alt="Pothole"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Bus DL1P 4092 flagged a Severe Pothole
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                          Did your vehicle encounter or spot this defect?
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleVerify(true)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Defect</span>
                      </button>

                      <button
                        onClick={() => handleVerify(false)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition active:scale-95 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>False Alarm</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>

        {/* Smartphone Bottom Navigation Bar */}
        <div className="bg-slate-950/95 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-slate-400 z-40">
          <button 
            onClick={() => setDashcamMode('dashcam')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${dashcamMode === 'dashcam' ? 'text-cyan-400' : 'text-slate-500'}`}
          >
            <Camera className="w-4 h-4" />
            <span>Dashcam</span>
          </button>
          
          <button 
            onClick={handleInstantReport}
            className="flex items-center justify-center w-11 h-11 -mt-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full shadow-lg shadow-orange-500/30 border-2 border-slate-900 active:scale-90 transition cursor-pointer"
            title="Snap instant photo defect"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setDashcamMode('waze_nav')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${dashcamMode === 'waze_nav' ? 'text-cyan-400' : 'text-slate-500'}`}
          >
            <Navigation className="w-4 h-4" />
            <span>Navigation</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="pb-1.5 bg-slate-950 flex justify-center">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>

      </div>

    </div>
  );
};
