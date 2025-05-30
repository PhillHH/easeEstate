import React from 'react'

const TimelineWidget = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-6 cursor-pointer rounded-none 
                 flex flex-col justify-between 
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">🕒 Timeline</h2>
        <p className="text-gray-300 mt-2">Zeitliche Abläufe und Fristen</p>
      </div>

      {/* Footer / Vorschau-Zeile */}
      <div className="mt-4 text-sm text-gray-400">
        Nächste Frist: 5. Juni · Elektrikertermin um 14:00 Uhr
      </div>
    </div>
  )
}

export default TimelineWidget
