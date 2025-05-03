const ChatWindow = ({ messages, activeChannel }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', backgroundColor: '#ffffff', padding: '1rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
          {activeChannel ? `Chat ID: ${activeChannel}` : 'Bitte eine Unterhaltung auswählen'}
        </div>
  
        {/* Nachrichtenbereich */}
        <div
  style={{
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'left', // ✅ zentriert den inneren Container
    padding: '2rem 1rem'       // Abstand zum Rand
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: '800px', // ✅ Begrenzung auf max 800px
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}
  >
    {messages.length > 0 ? (
      messages.map((msg, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#f1f1f1',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            wordBreak: 'break-word' // ✅ Lange Wörter/Links umbrechen
          }}
        >
          {msg.content}
        </div>
      ))
    ) : (
      <p style={{ color: '#999' }}>Noch keine Nachrichten in diesem Chat.</p>
    )}
  </div>
</div>
  
      </div>
    )
  }
  
  export default ChatWindow
  