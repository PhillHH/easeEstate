import React from 'react'
import DonutChartStacked from './DonutChartStacked'
import CardScroller from './CardScroller'

const StatusWidget = ({ onClick }) => {
  const werte = [20, 4, 10, 2]
  const farben = ['#22c55e', '#fb923c', '#facc15', '#a78bfa']
  const labels = ['Erledigt', 'In Bearbeitung', 'Offen', 'Zurückgestellt']
  const total = werte.reduce((sum, val) => sum + val, 0)

  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-6 cursor-pointer rounded-none 
                 flex flex-col justify-between gap-6
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
    >
      {/* Kopfbereich */}
      <div className="flex items-baseline gap-3 mt-0.5">
        <h2 className="text-xl font-semibold text-white">📈 Status</h2>
        <p className="text-gray-300 text-base">Gesamtüberblick der Ticket-Status</p>
      </div>

      {/* Donut + Legende + Tickets nebeneinander im 25/25/50 Layout */}
      <div className="flex flex-row w-full items-start overflow-hidden">
        {/* Donut */}
        <div className="w-[25%] flex flex-col items-center mt-2">
          <div className="w-[210px] h-[210px]">
            <DonutChartStacked werte={werte} farben={farben} />
          </div>
        </div>

        {/* Legende */}
        <div className="w-[25%] flex flex-col gap-2 text-[1.05rem] pt-8 mt-2">
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

        {/* Ticketbereich (Scroller) */}
  <div className="w-[50%] flex flex-col gap-6 overflow-x-auto -mt-6">



          <CardScroller
            title="Zuletzt aktualisiert"
            items={[
              { label: 'Ticket Eins', color: '#10b981' },
              { label: 'Ticket Zwei', color: '#f59e0b' },
              { label: 'Ticket Drei', color: '#3b82f6' },
              { label: 'Ticket Vier', color: '#e11d48' },
              { label: 'Ticket A', color: '#8b5cf6' },
              { label: 'Ticket B', color: '#ef4444' },
              { label: 'Ticket C', color: '#14b8a6' },
            ]}
          />
          <CardScroller
            title="Zuletzt abgeschlossen"
            items={[
              { label: 'Ticket A', color: '#8b5cf6' },
              { label: 'Ticket B', color: '#ef4444' },
              { label: 'Ticket C', color: '#14b8a6' },
              { label: 'Ticket A', color: '#8b5cf6' },
              { label: 'Ticket B', color: '#ef4444' },
              { label: 'Ticket C', color: '#14b8a6' },
            ]}
          />
        </div>
      </div>

      {/* Fußzeile: Gesamtanzahl Tickets – ganz links */}
      <div className="text-sm text-gray-400 mt-2 pl-1">
        {total} Tickets insgesamt
      </div>
    </div>
  )
}

export default StatusWidget
