import React from 'react';
import { WorkOrder } from '../types';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  UserCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

interface WorkOrdersSectionProps {
  workOrders?: WorkOrder[];
  onOpenVerificationModal?: (defectId: string) => void;
  onUpdateStatus?: (workOrderId: string, status: WorkOrder['status']) => void;
}

export const WorkOrdersSection: React.FC<WorkOrdersSectionProps> = ({
  workOrders = [],
  onOpenVerificationModal = (_id: string) => {},
  onUpdateStatus = (_id: string, _status: WorkOrder['status']) => {}
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Ranked Municipal Work Orders and SLA Queue
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-950 text-amber-300 border border-amber-800 font-bold">
              {workOrders.length} In Queue
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automatic contractor dispatching prioritized by severity, traffic exposure, cavity depth, and multi bus cluster confidence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-300">
            Average SLA Turnaround: <strong className="text-emerald-400">28.4 Hours</strong>
          </span>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {workOrders.map((wo) => {
          const isClosed = wo.status === 'Verified Closed';
          const isInProgress = wo.status === 'In Progress';
          const isAssigned = wo.status === 'Assigned';

          return (
            <div
              key={wo.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition flex flex-col lg:flex-row lg:items-start justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-cyan-400 text-xs">
                    {wo.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                    wo.priority.includes('P0') 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : wo.priority.includes('P1')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {wo.priority}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs font-semibold text-slate-300">
                    {wo.department}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {wo.defectTitle}
                </h3>

                {/* Priority Rationale Box */}
                {wo.priorityReason && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300">Priority Rationale: </span>
                      <span>{wo.priorityReason}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-400 pt-1">
                  <span>Location: <strong className="text-slate-200">{wo.location}</strong></span>
                  <span>Contractor: <strong className="text-slate-200">{wo.contractor}</strong></span>
                  <span>Est Budget: <strong className="text-amber-400 font-mono">₹{wo.costINR.toLocaleString()}</strong></span>
                  <span>Logged: <strong className="text-slate-300 font-mono">{wo.createdDate}</strong></span>
                </div>
              </div>

              {/* Status & Action Buttons */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">SLA Window</div>
                  <div className="text-xs font-mono font-bold text-slate-200">{wo.slaHours}h Countdown</div>
                </div>

                <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border ${
                  isClosed
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : isInProgress
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {wo.status}
                </span>

                {isClosed ? (
                  <button
                    onClick={() => onOpenVerificationModal(wo.defectId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Audit Proof</span>
                  </button>
                ) : isInProgress ? (
                  <button
                    onClick={() => onOpenVerificationModal(wo.defectId)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify Repair Loop</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateStatus(wo.id, 'In Progress')}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Mark In Progress
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
