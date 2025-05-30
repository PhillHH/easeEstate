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
      {/* Header-Bereich */}
      <div className="flex items-center gap-6 flex-wrap pl-1">
  <h2 className="text-xl font-semibold text-red-400 whitespace-nowrap">📣 Alerts</h2>
  <p className="text-base text-gray-300">Wichtige Meldungen und Eskalationen</p>
</div>

      {/* Statuskarten mit flexibler Verteilung */}
      <div className="flex flex-col gap-3 flex-1 min-h-0">
        <AlertStatCard
          count={8}
          label="Kritisch"
          bgClass="bg-gray-600"
          textClass="text-red-400"
          buttonColor="red"
          entries={[
            { title: "#1043 – Wasserrohrbruch", description: "Frist: heute · keine Rückmeldung" },
            { title: "#1044 – Heizungsstörung", description: "Eskalation · keine Zuweisung" }
          ]}
        />
        <AlertStatCard
          count={12}
          label="Offen"
          bgClass="bg-gray-600"
          textClass="text-yellow-200"
          buttonColor="yellow"
          metaText="zuletzt geöffnet"
          entries={[
            { title: "#1051 – Fenster undicht", description: "Keine Zuweisung · Rückmeldung fehlt" }
          ]}
        />
        <AlertStatCard
          count={18}
          label="Erledigt"
          bgClass="bg-gray-600"
          textClass="text-green-300"
          buttonColor="green"
          metaText="zuletzt erledigt"
          entries={[
            { title: "#1032 – Lichtschalter repariert", description: "Erledigt · abgeschlossen 27. Mai" }
          ]}
        />
      </div>

      {/* Fußbereich */}
      <div className="text-sm text-gray-400">
        2 offene Eskalationen · Letzte Warnung: 12:44 Uhr
      </div>
    </div>
  )
}

export default AlertsWidget

