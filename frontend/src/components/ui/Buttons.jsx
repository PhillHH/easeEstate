// src/components/ui/Buttons.jsx

import { useState } from 'react'
import { createTicketFromConversation } from '../../services/ticketService'
import TicketPopup from './TicketPopup' 
import { Button } from './button' // shadcn-Komponente
import { sendReplyMessage } from '../../services/replyService'

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
 *  * Globale Ticket-Button-Komponente mit shadcn-Popup
 */
export const TicketButton = ({ activeChannel, source = 'Unbekannt' }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ textAlign: 'left', marginTop: '0rem' }}>
      <Button onClick={() => setVisible(true)}>
        🎟️ Ticket erstellen
      </Button>

      {visible && (
        <TicketPopup
          activeChannel={activeChannel}
          source={source}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  )
}

/**
 * Antwort-Button mit Textfeld und Senden-Funktion
 */
export const ReplyButton = ({ activeChannel }) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')

const handleSend = async () => {
  if (!text.trim()) return alert('Bitte Text eingeben.')

  // Neue Nachricht sofort lokal in localStorage speichern
  const newMessage = {
    chatId: activeChannel,
    content: text,
    sender: 'Du',
    timestamp: new Date().toISOString(),
    email: null,
    subject: 'Antwort',
  }

  const messages = JSON.parse(localStorage.getItem('messages')) || []
  messages.push(newMessage)
  localStorage.setItem('messages', JSON.stringify(messages))
// ⚠️ Neues Custom Event auslösen
window.dispatchEvent(new Event('new-local-message'))


  try {
    // Danach über Middleware senden
    await sendReplyMessage(activeChannel, text)
    alert('Antwort gesendet')
    setText('')
    setVisible(false)
  } catch (err) {
    alert('Fehler beim Senden der Antwort')
  }
}


  return (
    <div style={{ flexGrow: 1 }}>
      <PrimaryButton onClick={() => setVisible(!visible)}>
        ✉️ Antworten
      </PrimaryButton>

      {visible && (
        <div style={{ marginTop: '0.75rem' }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Antwort eingeben..."
            style={{
              width: '100%',
              maxWidth: '800px',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              resize: 'vertical',
              marginBottom: '0.5rem',
              marginLeft: 0,
              marginRight: 'auto', // ← linksbündig
              display: 'block'
            }}
          />
          <PrimaryButton onClick={handleSend}>
            📤 Senden
          </PrimaryButton>
        </div>
      )}
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
