import React, { useState } from 'react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [openMenu, setOpenMenu] = useState(null)

  const topMenuItems = [
    {
      id: 'overview',
      label: 'Übersicht'
    },
    {
      id: 'requests',
      label: 'Anfragen',
      subItems: [
        { id: 'new-request', label: 'Neue Anfrage' },
        { id: 'request-history', label: 'Verlauf' }
      ]
    },
    {
      id: 'conversations',
      label: 'Unterhaltungen',
      subItems: [
        { id: 'website-chats', label: 'Websitechats' },
        { id: 'emails-info', label: 'E-Mails (info@easeEstate.com)' },
        { id: 'emails-phillip', label: 'E-Mails (phillip@growento.com)' }
      ]
    },
    {
      id: 'tickets',
      label: 'Tickets',
      subItems: [
        { id: 'open-tickets', label: 'Offene Tickets' },
        { id: 'closed-tickets', label: 'Geschlossene Tickets' }
      ]
    }
  ]

  const bottomMenuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'settings', label: 'Settings' }
  ]

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f4f4f4' }}>
      
      {/* Top Menü */}
      <div style={{ padding: '1rem' }}>
        {topMenuItems.map(item => (
          <div key={item.id} style={{ marginBottom: '0.5rem' }}>
            <div
              onClick={() => {
                toggleMenu(item.id)
                if (!item.subItems) setActiveTab(item.id)
              }}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                backgroundColor: activeTab === item.id ? '#ddd' : 'transparent',
                borderRadius: '8px'
              }}
            >
              {item.label}
            </div>

            {/* SubItems */}
            {openMenu === item.id && item.subItems && (
              <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                {item.subItems.map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      backgroundColor: activeTab === sub.id ? '#ddd' : 'transparent',
                      borderRadius: '6px',
                      marginBottom: '0.25rem'
                    }}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Bottom Menü */}
      <div style={{ padding: '1rem' }}>
        {bottomMenuItems.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: activeTab === item.id ? '#ddd' : 'transparent',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
