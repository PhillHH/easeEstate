import React, { useState } from 'react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  // Menü auf/zu steuern
  const [openMenu, setOpenMenu] = useState(null)

  const mainMenu = [
    {
      id: 'overview',
      label: 'Übersicht',
      subItems: ['Statistik', 'Berichte']
    },
    {
      id: 'requests',
      label: 'Anfragen',
      subItems: ['Neue Anfrage', 'Verlauf']
    },
    {
      id: 'tickets',
      label: 'Tickets',
      subItems: ['Offene Tickets', 'Geschlossene Tickets']
    }
  ]

  const bottomMenu = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'settings', label: 'Settings' },
  ]

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f4f4f4' }}>
      
      {/* Hauptmenü oben */}
      <div style={{ padding: '1rem' }}>
        {mainMenu.map(menu => (
          <div key={menu.id} style={{ marginBottom: '0.5rem' }}>
            <div
              onClick={() => toggleMenu(menu.id)}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                backgroundColor: openMenu === menu.id ? '#ddd' : 'transparent',
                borderRadius: '8px'
              }}
            >
              {menu.label}
            </div>
            {/* SubItems ausklappen */}
            {openMenu === menu.id && (
              <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                {menu.subItems.map((sub, index) => (
                  <div key={index} style={{ padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leerer flexGrow Bereich */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Dashboard + Settings unten */}
      <div style={{ padding: '1rem' }}>
        {bottomMenu.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.id ? '#ddd' : 'transparent',
              marginBottom: '0.5rem',
              borderRadius: '8px'
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sidebar
