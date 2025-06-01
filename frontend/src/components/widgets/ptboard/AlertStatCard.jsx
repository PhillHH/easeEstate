// 📂 src/components/widgets/ptboard/AlertStatCard.jsx

import React from 'react'

const AlertStatCard = ({
  count,
  label,
  textClass,
  entries = [],
  borderColor = '#f87171',
  metaText = ''
}) => {
  return (
    <div className="flex w-full h-full gap-5">
      {/* Link: Statuszähler + Label + Trenner */}
      <div className="flex flex-col items-center justify-center min-w-[80px] pr-5 border-r border-white/20 text-center">
        <div className={`text-3xl font-bold ${textClass}`}>{count}</div>
        <div className={`text-sm font-medium ${textClass}`}>{label}</div>
      </div>

      {/* Rechts: Meldungen */}
      <div className="flex-1 flex flex-col justify-center gap-3 h-full overflow-hidden">
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {entries.slice(0, 2).map((entry, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border-2 shadow-md"
              style={{
                borderColor,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)'
              }}
            >
              <div className="flex flex-col min-w-0">
                <p className="font-semibold text-white text-[15px] leading-snug truncate">
                  {entry.title}
                </p>
                <p className="text-xs text-gray-400 leading-tight truncate">
                  {entry.description}
                </p>
              </div>
              <div className="text-2xl text-white opacity-60 hover:opacity-100 transition -mr-1">
                ➤
              </div>
            </div>
          ))}
        </div>

        {metaText && (
          <div className="text-xs text-gray-400 italic">{metaText}</div>
        )}
      </div>
    </div>
  )
}

export default AlertStatCard
