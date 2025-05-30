// src/components/widgets/ptboard/DonutChartStacked.jsx

import React from 'react'

/**
 * DonutChartStacked – Dynamischer mehrschichtiger Donut-Chart
 * Besteht aus echten <circle>-Elementen mit unterschiedlichen Radien
 * Props:
 *  - werte: Array mit Werten (absolut)
 *  - farben: Array mit Farben
 *  - radiusStart: Basisradius (z. B. 80)
 *  - ringBreite: Dicke der einzelnen Kreise (z. B. 10)
 */
const DonutChartStacked = ({ werte, farben, radiusStart = 80, ringBreite = 10 }) => {
  const gesamt = werte.reduce((sum, val) => sum + val, 0)
  const center = 100

  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" className="rotate-[-90deg]">
      {werte.map((wert, i) => {
        const radius = radiusStart - i * (ringBreite + 6)
        const umfang = 2 * Math.PI * radius
        const anteil = wert / gesamt

        return (
          <>
            <circle
              key={`bg-${i}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#3e3d43"
              strokeWidth={ringBreite}
            />

            <circle
              key={`fg-${i}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={farben[i]}
              strokeWidth={ringBreite}
              strokeDasharray={`${anteil * umfang} ${umfang}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </>
        )
      })}
    </svg>
  )
}

export default DonutChartStacked
