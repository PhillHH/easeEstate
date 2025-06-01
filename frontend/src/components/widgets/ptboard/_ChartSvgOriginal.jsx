// src/components/widgets/ptboard/ChartSvgOriginal.jsx

import React from 'react'

/**
 * Original-Chart-Komponente basierend auf Chart.svg
 * Jeder Pfad entspricht einem Status-Segment (z. B. Offen, Erledigt, etc.)
 * Props:
 *  - werte: Array mit Prozentwerten [0–1] (z. B. 0.25 = 25%)
 *  - farben: Array mit Farbwerten
 */
const ChartSvgOriginal = ({ werte, farben }) => {
  // Default-Werte wenn nichts übergeben wird
  const defaults = [0.25, 0.25, 0.25, 0.25]
  const defaultColors = ['#8676FF', '#01F1E3', '#FFBA69', '#FF708B']

  const prozent = werte || defaults
  const strokes = farben || defaultColors

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hintergrund-Kreis (dunkel) */}
      <path
        d="M67.6167 141.182C59.1289 141.182 50.7246 139.38 42.8829 135.878C35.0414 132.376 27.9163 127.243 21.9146 120.773C15.9131 114.302 11.1522 106.62 7.9042 98.1662C4.65602 89.7121 2.98438 80.6509 2.98438 71.5001C2.98438 62.3494 4.65602 53.2882 7.9042 44.8341C11.1522 36.3798 15.9131 28.6983 21.9146 22.2277C27.9163 15.7571 35.0414 10.6245 42.8829 7.12254C50.7246 3.62084 59.1289 1.81836 67.6167 1.81836C76.1043 1.81836 84.5089 3.62084 92.3504 7.12254C100.192 10.6245 107.317 15.7571 113.319 22.2277C119.32 28.6983 124.082 36.3801 127.329 44.8341C130.577 53.2882 132.249 62.3494 132.249 71.5003C132.249 80.6509 130.577 89.7121 127.329 98.1662C124.082 106.62 119.32 114.302 113.319 120.773C107.317 127.243 100.192 132.376 92.3504 135.878C84.5089 139.38 76.1043 141.182 67.6167 141.182Z"
        stroke="#212A36"
        strokeWidth="3.1"
        fill="none"
      />

      {/* Dynamische Segmente */}
      {[
        "M67.6165 141.182C53.4063 ... 35.1234 11.7725",
        "M67.6313 131.227C59.4229 ... 89.1618 16.4654",
        "M67.784 122.379C59.7886 ... 104.55 39.4304",
        "M67.6162 111.318C59.4563 ... 99.2473 92.0551"
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={strokes[i]}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${prozent[i] * 100} ${100}`}
          strokeDashoffset="0"
        />
      ))}
    </svg>
  )
}

export default ChartSvgOriginal
