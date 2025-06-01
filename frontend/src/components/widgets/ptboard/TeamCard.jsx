// 📂 src/components/widgets/ptboard/TeamCard.jsx

import React from 'react'

/**
 * 👤 TeamCard-Komponente (optisch wie CardBox)
 * 
 * Zeigt Teammitglied-Infos im Stil der Ticketkarten mit Avatarbild.
 * Verwendet pravatar.cc als dynamische Platzhalterquelle.
 */

const TeamCard = ({
  name,
  role,
  timestamp,
  task,
  borderColor = '#4ade80',
  avatarUrl
}) => {
  return (
    <div
      className="w-full max-w-[100%] min-w-[160px] h-auto p-3 rounded-xl bg-white/5 border-2 flex-shrink-0 select-none cursor-default"
      style={{
        borderColor,
        boxShadow: '0 6px 12px rgba(0,0,0,0.25)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-3 text-white opacity-90">
        {/* Avatar-Bild */}
        <img
          src={avatarUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-gray-600"
        />

        {/* Textinhalt */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="font-semibold leading-tight">{name}</p>
              <p className="text-xs text-gray-400">{role}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{timestamp}</span>
          </div>
          <p className="text-sm text-gray-300 leading-snug">{task}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
