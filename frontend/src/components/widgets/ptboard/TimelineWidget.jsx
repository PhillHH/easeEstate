import React from 'react'
import { events } from './TimelineView'

const TimelineWidget = ({ onClick }) => {
  const days = ['2025-06-08', '2025-06-09']

  const currentTicketId = '#TK-1002'
  const doneTicketIds = ['#TK-1000', '#TK-1004']

  // Beispielhafte Abhängigkeit via dummy-Feld
  const combinedEvents = days.flatMap((date, dateIndex) => {
    const dailyEvents = events[date] || []
    return dailyEvents.map((event, index) => ({
      ...event,
      date,
      ticketId: `#TK-${1000 + dateIndex * 100 + index}`,
      dependency: event.dependency || false // z. B. übergeben aus Datenstruktur
    }))
  })

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-4 cursor-pointer rounded-xl 
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)] flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-white">🕒 Timeline</h2>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
        {combinedEvents.length === 0 ? (
          <p className="text-sm text-gray-400">Keine Termine verfügbar.</p>
        ) : (
          <>
            {days.map((day) => {
              const dayEvents = combinedEvents.filter((e) => e.date === day)
              return (
                <div key={day} className="flex flex-col gap-3">
                  {/* Tagesüberschrift mit Anzahl */}
                  <div className="flex justify-between items-center text-base text-gray-400 font-medium pb-1 border-b border-gray-600">
                    <span>{formatDate(day)}</span>
                    <span className="text-sm text-gray-500">{dayEvents.length} Termine</span>
                  </div>

                  {dayEvents.map((event) => {
                    const isCurrent = event.ticketId === currentTicketId
                    const isDone = doneTicketIds.includes(event.ticketId)
                    const isDependent = event.dependency === true

                    // Rahmenfarbe priorisiert nach Status
                    let borderClass = 'border-[#9ca3af]'
                    if (isDependent) borderClass = 'border-orange-400'
                    if (isCurrent) borderClass = 'border-yellow-400'

                    return (
                      <div key={event.ticketId} className="flex items-start gap-4 w-full pt-2" id={event.ticketId}>

                        <div className="w-14 text-right text-base text-gray-300 font-semibold pt-1">
                          {event.time}
                        </div>

                        <div
                          className={`w-full p-4 rounded-xl bg-white/5 border-2 select-none cursor-default ${borderClass} ${
                            isCurrent ? 'bg-yellow-200/10' : ''
                          } ${isDone ? 'opacity-60' : ''}`}
                          style={{
                            boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                            maxWidth: '100%'
                          }}
                        >
                          {/* Titel + Ticketnummer */}
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-base font-semibold text-white truncate max-w-[calc(100%-60px)]">
                              {event.title}
                            </div>
                            <div className="text-xs text-gray-400 font-mono flex-shrink-0">
                              {event.ticketId}
                            </div>
                          </div>

                          {/* Firma + Person + Done-Haken */}
                          <div className="flex flex-row items-center gap-4 mt-1 text-sm text-gray-300">
                            <span>🏢 {event.company}</span>
                            <span>👤 {event.person}</span>
                            {isDone && <span className="text-green-400">✅</span>}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default TimelineWidget
