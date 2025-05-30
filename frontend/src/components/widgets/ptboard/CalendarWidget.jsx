import React from 'react'
import DashboardWidgetContainer from './DashboardWidgetContainer'

const CalendarWidget = () => {
  return (
    <DashboardWidgetContainer
      title="🗓 Kalender"
      preview="Heute: 2 Termine, 1 Deadline"
    >
      {/* 📅 Detailansicht – Dummy-Inhalt */}
      <p className="text-gray-700 mb-4">
        Dies ist die Monatsübersicht. Hier könnten z. B. Kalender, Deadlines, Events angezeigt werden.
      </p>

      <ul className="list-disc pl-6 text-gray-600">
        <li>01. Juni: Schlüsselübergabe</li>
        <li>04. Juni: Elektrikertermin</li>
        <li>07. Juni: Mieterbesprechung</li>
      </ul>
    </DashboardWidgetContainer>
  )
}

export default CalendarWidget
