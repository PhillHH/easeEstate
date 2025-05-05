// src/components/ui/Buttons.jsx

import { createTicketFromConversation } from '../../services/ticketService'

/**
 * Primärer Button mit Standard-Design
 */
export const PrimaryButton = ({ children, onClick, ...props }) => (
  <button onClick={onClick} {...props} style={styles.primary}>
    {children}
  </button>
)

/**
 * Ghost-Button (Transparenter Stil)
 */
export const GhostButton = ({ children, onClick, ...props }) => (
  <button onClick={onClick} {...props} style={styles.ghost}>
    {children}
  </button>
)

/**
 * Globale Ticket-Button-Komponente, die API-Aufruf kapselt
 */
export const TicketButton = ({ activeChannel, source = 'Unbekannt' }) => {
  const handleClick = async () => {
    if (!activeChannel) return

    const conversation = {
      id: activeChannel,
      title: `Chat ID ${activeChannel}`,
      source: source,
    }

    try {
      const ticket = await createTicketFromConversation(conversation)
      alert(`Ticket erstellt mit ID: ${ticket.id || 'unbekannt'}`)
    } catch (err) {
      alert('Fehler beim Erstellen des Tickets')
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <PrimaryButton onClick={handleClick}>
        🎟️ Ticket erstellen
      </PrimaryButton>
    </div>
  )
}

const styles = {
  primary: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4e54c8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  ghost: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#4e54c8',
    border: '1px solid #4e54c8',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
}
