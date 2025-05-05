// src/components/EmailChannel.jsx
import { MessageContainer, TicketButton } from './ui'
import { createTicketFromConversation } from '../services/ticketService'

/**
 * Stellt E-Mail-Konversationen dar, inklusive Nachrichtenverlauf
 * und Ticket-Erstellung per globalem Button
 */
const EmailChannel = ({ messages, activeChannel }) => {
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

      {/* 🎟️ Ticket erstellen über globale Komponente */}
      {activeChannel && (
        <TicketButton activeChannel={activeChannel} source="E-Mail" />
      )}
    </div>
  )
}

export default EmailChannel