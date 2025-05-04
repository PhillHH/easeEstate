import { useEffect } from 'react'
import { createTicketFromConversation } from '../services/ticketService'
import { PrimaryButton } from '../components/ui'

const ChatWindow = ({ messages, activeChannel }) => {
  const handleCreateTicket = async () => {
    if (!activeChannel) return

    const conversation = {
      id: activeChannel,
      title: `Chat ID ${activeChannel}`,
      source: 'Websitechat'
    }

    try {
      const ticket = await createTicketFromConversation(conversation)
      alert(`Ticket erstellt mit ID ${ticket.id || 'unbekannt'}`)
    } catch (err) {
      alert('Fehler beim Erstellen des Tickets')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff', padding: '1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
        {activeChannel ? `Chat ID: ${activeChannel}` : 'Bitte eine Unterhaltung auswählen'}
      </div>

      {/* Nachrichtenbereich mit Scrollfenster */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100% - 100px)' }}>
        <div
          style={{
            overflowY: 'auto',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            flexGrow: 1,
            marginBottom: '1rem'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f1f1f1',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    wordBreak: 'break-word'
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

        {/* Ticket erstellen Button */}
        {activeChannel && (
          <div style={{ textAlign: 'center' }}>
            <PrimaryButton onClick={handleCreateTicket}>
              🎟️ Ticket erstellen
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatWindow
