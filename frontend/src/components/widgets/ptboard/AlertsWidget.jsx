// 📂 src/components/widgets/ptboard/AlertsWidget.jsx

import React from 'react'
import AlertStatCard from './AlertStatCard'

const AlertsWidget = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-full w-full bg-[#34303a] hover:bg-[#3f3b46] border border-[#3f3b46] p-6 cursor-pointer rounded-none 
                 flex flex-col gap-4
                 transform transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-red-400 flex items-center gap-4">
          📣 Alerts
          <span className="text-white font-normal text-base opacity-80">
            Wichtige Meldungen und Eskalationen
          </span>
        </h2>
      </div>

      {/* Dynamisch verteilte Karten */}
      <div className="flex flex-col flex-1 gap-6 overflow-hidden">
        <AlertStatCard
          count={8}
          label="Kritisch"
          textClass="text-red-400"
          borderColor="#f87171"
          entries={[
            {
              title: "#1043 – Wasserrohrbruch",
              description: "Frist: heute · keine Rückmeldung"
            },
            {
              title: "#1044 – Heizungsstörung",
              description: "Eskalation · keine Zuweisung"
            }
          ]}
        />
        <AlertStatCard
          count={12}
          label="Offen"
          textClass="text-yellow-300"
          borderColor="#facc15"
          
          entries={[
            {
              title: "#1051 – Fenster undicht",
              description: "Keine Zuweisung · Rückmeldung fehlt"
            }
          ]}
        />
        <AlertStatCard
          count={18}
          label="Erledigt"
          textClass="text-green-300"
          borderColor="#4ade80"
         
          entries={[
            {
              title: "#1032 – Lichtschalter repariert",
              description: "Abgeschlossen am 27. Mai"
            }
          ]}
        />
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-400">
        2 offene Eskalationen · Letzte Warnung: 12:44 Uhr
      </div>
    </div>
  )
}

export default AlertsWidget
