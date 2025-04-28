const ChannelSidebar = ({ channels, activeChannel, setActiveChannel, activeSource }) => {
    // Hilfsfunktion: Initialen aus dem Titel ziehen
    const getInitials = (name) => {
      if (!name) return '??'
      const parts = name.split(' ')
      const initials = parts.map(p => p[0].toUpperCase()).join('')
      return initials.slice(0, 2) // Nur 2 Buchstaben
    }
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Bereichsüberschrift */}
        <div style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '1px solid #ccc' }}>
          {activeSource || 'Kanal'}
        </div>
  
        {/* Channel-Liste */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {channels.length > 0 ? (
            channels.map(channel => (
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
                {/* Avatar */}
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
                  {getInitials(channel.title)}
                </div>
  
                {/* Name */}
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
  