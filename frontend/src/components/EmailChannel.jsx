const EmailChannel = ({ messages }) => {
  return (
    <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{ backgroundColor: '#fffbea', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 4px rgba(0,0,0,0.1)', wordBreak: 'break-word' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 'bold' }}>{msg.sender} ({msg.email})</div>
                {msg.subject && <div style={{ fontStyle: 'italic', color: '#555' }}>{msg.subject}</div>}
                {msg.timestamp && (
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
              <div>{msg.content}</div>
            </div>
          ))
        ) : (
          <p style={{ color: '#999' }}>Noch keine E-Mails in diesem Kanal.</p>
        )}
      </div>
    </div>
  )
}

export default EmailChannel
