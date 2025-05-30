// src/components/widgets/ptboard/DonutChart.jsx

import React from 'react'

/**
 * DonutChart – Mehrschichtiger Donut-Chart zur Statusdarstellung
 * @param {Array} werte – z. B. [20, 20, 20, 20]
 * @param {Array} farben – CSS-Farbcodes, z. B. ['#facc15', '#0fd9d9', '#fb7185', '#a78bfa']
 * @param {Array} labels – Optional, z. B. ['Offen', 'In Bearbeitung', 'Erledigt', 'Zurückgestellt']
 */
const DonutChart = ({ werte, farben, labels }) => {
  const radius = 50
  const umfang = 2 * Math.PI * radius

  // Berechne Offsets für Segmente
  let offset = 0
  const gesamt = werte.reduce((sum, val) => sum + val, 0)

  return (
    <svg width="126" height="126" viewBox="0 0 126 126">
      <g transform="rotate(-90 63 63)">
        {werte.map((wert, i) => {
          const dasharray = (wert / gesamt) * umfang
          const dashoffset = offset
          offset += dasharray

          return (
            <circle
              key={i}
              cx="63"
              cy="63"
              r={radius}
              fill="transparent"
              stroke={farben[i]}
              strokeWidth="10"
              strokeDasharray={`${dasharray} ${umfang}`}
              strokeDashoffset={-dashoffset}
              strokeLinecap="round"
            />
          )
        })}
      </g>
    </svg>
  )
}

export default DonutChart
