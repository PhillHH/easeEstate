import React from 'react'

// Einzelne Karte im Ticket-Scroller
const CardBox = ({ children, borderColor }) => {
  return (
    <div
      className="min-w-[160px] max-w-[160px] h-[90px] p-3 rounded-xl bg-white/5 border-2 flex-shrink-0 select-none cursor-default"
      style={{
        borderColor,
        boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
      }}
      onClick={(e) => e.stopPropagation()} // Nur Klick unterbinden
    >
      <div className="text-sm text-white opacity-90">{children}</div>
    </div>
  )
}

export default CardBox
