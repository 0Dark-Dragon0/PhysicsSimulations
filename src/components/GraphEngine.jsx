import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

/**
 * GraphEngine plots real-time Physics data.
 * @param {Array} data - Array of data points e.g. [{ x: 1, v: 10, e: 5 }]
 * @param {String} xKey - Key for X axis
 * @param {Array} lines - Array of objects defining lines e.g. [{ key: 'v', color: '#ef4444', name: 'Potential (V)' }]
 */
export default function GraphEngine({ data, xKey = 'x', lines = [], title = 'Live Plot' }) {
  
  // Custom tooltip for better dark theme styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-xl">
          <p className="text-slate-400 text-xs font-mono mb-2">{xKey}: {label}</p>
          {payload.map((p, i) => (
            <p key={i} className="text-sm font-bold font-mono" style={{ color: p.color }}>
              {p.name}: {p.value.toFixed(1)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
      <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4">
        {title}
      </h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey={xKey} 
              stroke="#64748b" 
              tick={{ fill: '#64748b', fontSize: 10 }}
              tickFormatter={(val) => Number(val).toFixed(1)}
            />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: line.color, stroke: '#0f172a', strokeWidth: 2 }}
                isAnimationActive={false} // Disable to avoid lag on rapid dragging
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
