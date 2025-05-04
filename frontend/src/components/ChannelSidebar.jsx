import React from 'react'

const ChannelSidebar = ({ channels, activeChannel, setActiveChannel, activeSource, messages }) => {
  // Filtert nur Channels der aktiven Quelle (E-Mail oder Websitechat)
  const filteredChannels = channels.filter(channel => channel.source === activeSource)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Überschrift mit aktiver Quelle */}
      <div style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '1px solid #ccc' }}>
        {activeSource || 'Kanal'}
      </div>

      {/* Liste der passenden Channels */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {filteredChannels.length > 0 ? (
          filteredChannels.map(channel => (
            <div
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                backgroundColor: activeChannel === channel.id ? '#e0e0e0' : 'transparent',
                borderBottom: '1px solid #eee',
                transition: 'background-color 0.2s'
              }}
            >
              {/* Initialen-Kranz */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: '1rem',
                fontSize: '1rem'
              }}>
                {channel.title ? channel.title.slice(0, 2).toUpperCase() : '??'}
              </div>

              {/* Name anzeigen */}
              <div style={{ fontWeight: '500', fontSize: '1rem' }}>
                {channel.title}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '1rem', color: '#999' }}>
            Keine Unterhaltungen vorhanden.
          </div>
        )}
      </div>

    </div>
  )
}

export default ChannelSidebar