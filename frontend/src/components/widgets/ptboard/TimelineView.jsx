// 📄 TimelineView.jsx
import React, { useState } from 'react'

// 📅 Dummy-Daten für Demonstrationszwecke
export const events = {
  '2025-06-08': [
    {
      time: '07:45',
      title: 'Tagesbesprechung mit Gewerken',
      company: 'Müller & Co.',
      person: 'Max Müller'
    },
    {
      time: '08:00',
      title: 'Wände im 1. OG spachteln',
      company: 'Malerbetrieb Schulze',
      person: 'Peter Schulze'
    },
    {
      time: '08:30',
      title: 'Schalter & Steckdosen montieren',
      company: 'Elektro Schmitt',
      person: 'Daniel Vogt',
      dependency: true
    },
    {
      time: '09:00',
      title: 'Wasseranschlüsse in Küche vorbereiten',
      company: 'Sanitär Riedel',
      person: 'Sabine Krüger'
    },
    {
      time: '09:30',
      title: 'Pause – Frühstück für alle Gewerke',
      company: 'Catering Brötchen & Mehr',
      person: '–'
    },
    {
      time: '10:00',
      title: 'Terrassentür einsetzen',
      company: 'Fensterbau Köhler',
      person: 'Max Fenster'
    },
    {
      time: '10:30',
      title: 'Parkett im Wohnzimmer verlegen',
      company: 'Bodenleger Brück',
      person: 'Ali Demir'
    },
    {
      time: '14:00',
      title: 'Stromanschluss prüfen',
      company: 'Elektro Schmitt',
      person: 'Daniel Vogt',
      dependency: true
    }
  ],
  '2025-06-07': [
    {
      time: '09:00',
      title: 'Fensterlieferung',
      company: 'Fensterlogistik GmbH',
      person: 'Fahrerteam Herr Klein'
    }
  ],

  '2025-06-09': [
    {
      time: '08:00',
      title: 'Heizung prüfen',
      company: 'Haustechnik Lange',
      person: 'Anna Schneider',
      dependency: true
    },
    {
      time: '09:30',
      title: 'Wanddurchbruch Küche',
      company: 'Bauunternehmen Stark',
      person: 'Leon Stark',
      dependency: true
    },
    {
      time: '11:00',
      title: 'Treppenhausreinigung',
      company: 'Reinigungsservice Klar',
      person: 'M. Klar'
    }
  ]
}



// 🔧 Monats- und Tagesauswahl + Anzeige von Events
const TimelineView = () => {
  const [selectedDate, setSelectedDate] = useState('2025-06-05')

  const handleChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const dayEvents = events[selectedDate] || []

  return (
    <div className="p-4 text-white">
      {/* 📅 Datumsauswahl */}
      <div className="mb-4">
        <label className="block mb-2">Datum auswählen:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleChange}
          className="text-black px-2 py-1 rounded"
        />
      </div>

      {/* 📋 Events anzeigen */}
      <div>
        {dayEvents.length === 0 ? (
          <p>Keine Termine für den ausgewählten Tag.</p>
        ) : (
          <ul className="space-y-2">
            {dayEvents.map((event, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-2">
                <strong>{event.time}</strong> – {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TimelineView
