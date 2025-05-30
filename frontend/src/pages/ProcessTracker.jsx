// 📂 src/pages/ProcessTracker.jsx

import React, { useState } from 'react'
import StatusWidget from '../components/widgets/ptboard/StatusWidget'
import TimelineWidget from '../components/widgets/ptboard/TimelineWidget'
import AlertsWidget from '../components/widgets/ptboard/AlertsWidget'
import TeamWidget from '../components/widgets/ptboard/TeamWidget'
import ProjectHeader from '../components/widgets/ptboard/ProjectHeader'
import ExpandedWidget from '../components/widgets/ptboard/ExpandedWidget'

const ProcessTracker = () => {
  // 🧠 Aktives Widget (z. B. 'status', 'timeline') für Overlay
  const [expandedWidget, setExpandedWidget] = useState(null)

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-6 py-6 h-[80vh] relative">
      {/* 📌 Kopfbereich */}
      <ProjectHeader />

      {/* 🧱 Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[2fr_3fr] auto-rows-fr gap-6 h-full">
        <div className="md:col-span-2 md:row-span-1 h-full">
          <StatusWidget onClick={() => setExpandedWidget('status')} />
        </div>

        <div className="md:row-span-2 h-full">
          <TimelineWidget onClick={() => setExpandedWidget('timeline')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2 md:row-start-2 h-full">
          <AlertsWidget onClick={() => setExpandedWidget('alerts')} />
          <TeamWidget onClick={() => setExpandedWidget('team')} />
        </div>
      </div>

      {/* 🔍 Erweiterte Ansicht, überlagert alles */}
      {expandedWidget && (
        <ExpandedWidget widget={expandedWidget} onClose={() => setExpandedWidget(null)} />
      )}
    </div>
  )
}

export default ProcessTracker
