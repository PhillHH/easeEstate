// 📂 src/components/widgets/ptboard/AlertStatCard.jsx

import React from 'react'

const AlertStatCard = ({ count, label, info, bgClass, textClass, entries = [], buttonColor = 'red', metaText = '' }) => {
  const buttonStyles = {
    red: {
      border: 'border-red-400',
      text: 'text-red-400',
      hoverBg: 'hover:bg-red-500',
      hoverText: 'hover:text-white'
    },
    yellow: {
      border: 'border-yellow-300',
      text: 'text-yellow-300',
      hoverBg: 'hover:bg-yellow-400',
      hoverText: 'hover:text-black'
    },
    green: {
      border: 'border-green-400',
      text: 'text-green-400',
      hoverBg: 'hover:bg-green-500',
      hoverText: 'hover:text-white'
    }
  }

  const btn = buttonStyles[buttonColor] || buttonStyles.red

  return (
    <div className={`flex flex-1 px-4 py-3 rounded ${bgClass} shadow-inner w-full`}> 
      {/* Linker Bereich: Zahl + Label */}
      <div className="flex flex-col items-center justify-center pr-4 mr-4 border-r border-gray-500 min-w-[72px] text-center">
        <div className={`text-2xl font-semibold ${textClass}`}>{count}</div>
        <div className={`text-sm font-medium ${textClass}`}>{label}</div>
      </div>

      {/* Rechter Bereich: Info + Einträge */}
      <div className="flex flex-col justify-start w-full text-xs text-gray-200">
        {/* Infozeile */}
        <div className="opacity-90 mb-2 text-sm">{info}</div>

        {/* Einträge horizontal */}
        <div className="flex flex-col gap-2">
          {entries.slice(0, 2).map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 bg-[#2e2b33] px-3 py-2 rounded text-sm text-white w-full"
            >
              <div className="flex flex-col min-w-0 w-full">
                <span className="font-semibold truncate">{entry.title}</span>
                <span className="text-xs text-gray-400 truncate">{entry.description}</span>
              </div>
              <button
                className={`border ${btn.border} ${btn.text} bg-transparent text-xs px-3 py-1 rounded transition whitespace-nowrap ${btn.hoverBg} ${btn.hoverText} focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0`}
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                Öffnen
              </button>
            </div>
          ))}
        </div>

        {/* Zusatzinfo unterhalb der Karten */}
        {metaText && (
          <div className="mt-2 text-[0.7rem] text-gray-400 italic">
            {metaText}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertStatCard
