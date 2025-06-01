// 📂 src/components/widgets/ptboard/TeamWidget.jsx

import React from 'react'
import TeamCard from './TeamCard' // 🧱 Avatar-Karte im Stil der Ticketboxen

/**
 * 👥 TeamWidget-Komponente
 * 
 * Statische Darstellung des Teams mit manueller Farbcodierung:
 * 🟩 Grün = aktiv heute
 * ⬜ Grau = inaktiv / nicht vor Ort
 * 🟥 Rot = kritisch / sofortiger Handlungsbedarf
 */

const TeamWidget = ({ onClick }) => {
  // 📦 Statischer Dummy-Datensatz mit Farben direkt zugewiesen
const team = [
  {
    name: 'Herr Becker',
    role: 'Hausverwalter',
    avatar: '📋',
    timestamp: 'heute 08:15 Uhr',
    task: 'Wohnungsschlüssel für Maler übergeben',
    avatarUrl: 'https://i.pravatar.cc/150?u=becker',
    borderColor: '#4ade80' // Grün = aktiv
  },
  {
    name: 'Sabine Krüger',
    role: 'Bauleitung',
    avatar: '📐',
    timestamp: 'heute 07:50 Uhr',
    task: 'Baustellenabnahme vorbereiten',
    avatarUrl: 'https://i.pravatar.cc/150?u=krueger',
    borderColor: '#4ade80'
  },
  {
    name: 'Daniel Vogt',
    role: 'Elektriker',
    avatar: '💡',
    timestamp: 'gestern 09:02 Uhr',
    task: 'Leitungen in Etage 3 prüfen',
    avatarUrl: 'https://i.pravatar.cc/150?u=vogt',
    borderColor: '#9ca3af' // Grau = nicht aktiv
  },
  {
    name: 'Ali Demir',
    role: 'Hausmeisterdienst',
    avatar: '🔧',
    timestamp: 'gestern 16:40 Uhr',
    task: 'Wasserleck in Keller dokumentieren',
    avatarUrl: 'https://i.pravatar.cc/150?u=demir',
    borderColor: '#9ca3af'
  },
  {
    name: 'Lena Busch',
    role: 'Technischer Dienst',
    avatar: '🧯',
    timestamp: 'heute 09:01 Uhr',
    task: 'Heizungsausfall in Einheit 12A beheben',
    avatarUrl: 'https://i.pravatar.cc/150?u=busch',
    borderColor: '#f87171' // Rot = kritisch
  }
]


  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-6 cursor-pointer rounded-none 
                 flex flex-col 
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
    >
      {/* 📌 Titelzeile: Titel und Untertitel nebeneinander */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-green-400 flex items-center gap-4">
          👥 Team
          <span className="text-white font-normal text-base opacity-80">
            Wer arbeitet woran?
          </span>
        </h2>
      </div>

      {/* 🧱 Kartenliste */}
      <div
        className="flex flex-col gap-3 overflow-y-auto pr-1"
        onClick={(e) => e.stopPropagation()}
      >
        {team.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
      </div>
    </div>
  )
}

export default TeamWidget
