import React from 'react'

const ProjectHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

      {/* 🔹 Projektinfos (zweizeilig, größer) */}
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-black">Projekt: Wohnung XY</h1>

        <div className="text-sm text-gray-400 flex flex-wrap gap-x-6">
          <span>Abschnitt: Bad, Küche</span>
          <span>Fortschritt: 6 von 12 Tasks erledigt</span>
          <span>Letztes Update: 28. Mai 2025 – 14:32 Uhr</span>
        </div>
      </div>

      {/* 🔸 Buttonzeile */}
      <div className="flex flex-wrap justify-start md:justify-end gap-3 mt-4 md:mt-0">
        <button className="bg-transparent border border-gray-500 text-gray-300 px-4 py-2 rounded hover:bg-[#3f3b46] transition">
          Neues Ticket
        </button>
        <button className="bg-transparent border border-gray-500 text-gray-300 px-4 py-2 rounded hover:bg-[#3f3b46] transition">
          Widget hinzufügen
        </button>
        <button className="bg-transparent border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition">
          Eskalation
        </button>
      </div>
    </div>
  )
}

export default ProjectHeader
