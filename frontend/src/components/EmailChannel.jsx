import { PrimaryButton, MessageContainer } from '../components/ui'

const EmailChannel = ({ messages, activeChannel, handleCreateTicket }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ marginBottom: '1rem' }}>E-Mail-Konversation</h2>

      <MessageContainer>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{
              backgroundColor: '#f1f1f1',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              wordBreak: 'break-word'
            }}>
              <strong>{msg.subject || 'Ohne Betreff'}</strong>
              <p>{msg.content}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#999' }}>Noch keine Nachrichten.</p>
        )}
      </MessageContainer>

      {/* Ticket erstellen Button */}
      {activeChannel && (
        <div style={{ textAlign: 'center' }}>
          <PrimaryButton onClick={handleCreateTicket}>
            🎟️ Ticket erstellen
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}

export default EmailChannel
