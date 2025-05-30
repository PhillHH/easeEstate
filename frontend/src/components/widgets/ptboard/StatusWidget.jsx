// src/components/widgets/ptboard/StatusWidget.jsx

import React from 'react'
import DonutChartStacked from './DonutChartStacked'

const StatusWidget = ({ onClick }) => {
  const werte = [20, 4, 10, 2]
  const farben = ["#22c55e", "#fb923c", "#facc15", "#a78bfa"]
  const labels = ["Erledigt", "In Bearbeitung", "Offen", "Zurückgestellt"]

  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-6 cursor-pointer rounded-none 
                 flex flex-col justify-between 
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
    >
      {/* Kopfbereich */}
      <div>
        <div className="flex items-baseline gap-3 mb-1 mt-0.5">
          <h2 className="text-xl font-semibold text-white">📈 Status</h2>
          <p className="text-gray-300 text-base">Gesamtüberblick der Ticket-Status</p>
        </div>
      </div>

      {/* Donut + Legende nebeneinander */}
      <div className="flex flex-row items-center justify-start gap-6 my-4">
        <div className="w-[210px] h-[210px]">
          <DonutChartStacked werte={werte} farben={farben} />
        </div>

        <div className="flex flex-col gap-2 text-[1.05rem]">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full border-2"
                style={{ borderColor: farben[index] }}
              />
              <span className="font-semibold text-white">{label}</span>
              <span className="ml-1 text-gray-400">{werte[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gesamtanzahl */}
      <div className="text-sm text-gray-400">
        {werte.reduce((sum, val) => sum + val, 0)} Tickets insgesamt
      </div>
    </div>
  )
}

export default StatusWidget

