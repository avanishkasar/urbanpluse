import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { HourlyDetectionData, RoadSegment } from '../types';
import { Clock, PieChart as PieIcon } from 'lucide-react';

interface AnalyticsChartsProps {
  hourlyData?: HourlyDetectionData[];
  segments?: RoadSegment[];
}

const CATEGORY_PIE_DATA = [
  { name: 'Potholes (Critical)', value: 42, color: '#f43f5e' },
  { name: 'Alligator Fatigue Cracks', value: 28, color: '#f97316' },
  { name: 'Faded Lane Markings', value: 16, color: '#a855f7' },
  { name: 'Monsoon Waterlogging', value: 9, color: '#3b82f6' },
  { name: 'Damaged Dividers', value: 5, color: '#10b981' }
];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  hourlyData = []
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* 1. Main Hourly Detection Chart */}
      <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Defects Detected by Hour (24 Hours Fleet Stream)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Spikes align with morning peak (08:00 to 10:00) and evening peak (17:00 to 20:00) public transit routes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Total: 842 Events
            </span>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hourlyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="hour" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: '#334155' }} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}
                formatter={(value: number, name: string) => [
                  `${value} defects`,
                  name === 'potholes' ? 'Potholes' :
                  name === 'cracks' ? 'Cracks' :
                  name === 'markings' ? 'Faded Lines' : 'Waterlogging'
                ]}
              />
              <Bar dataKey="potholes" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} />
              <Bar dataKey="cracks" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
              <Bar dataKey="markings" stackId="a" fill="#a855f7" radius={[0, 0, 0, 0]} />
              <Bar dataKey="waterlogging" stackId="a" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend Footnotes */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#f43f5e]" /> Potholes</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#f97316]" /> Fatigue Cracks</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#a855f7]" /> Faded Lines</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#06b6d4]" /> Waterlogging</span>
          </div>
          <span className="font-mono text-emerald-400 text-[11px]">Continuous Fleet Ingestion Active</span>
        </div>
      </div>

      {/* 2. Defect Category Distribution */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Defect Classification
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Road Damage Dataset and custom fine tuned YOLO weights.
          </p>
        </div>

        {/* Donut Chart */}
        <div className="h-44 w-full my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORY_PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {CATEGORY_PIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '11px'
                }}
                formatter={(value: number) => [`${value}% share`, 'Proportion']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown List */}
        <div className="space-y-1.5 text-xs">
          {CATEGORY_PIE_DATA.slice(0, 3).map((item) => (
            <div key={item.name} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
              <span className="font-mono font-bold text-slate-100">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
