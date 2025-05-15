// src/components/EmailChannel.jsx
import { useState } from 'react'
import { MessageContainer, TicketButton, ReplyButton } from './ui'
import { createTicketFromConversation } from '../services/ticketService'

/**
 * Stellt E-Mail-Konversationen dar, inklusive Nachrichtenverlauf
 * und Ticket-Erstellung per globalem Button
 */
const EmailChannel = ({ messages, activeChannel }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ marginBottom: '1rem' }}>E-Mail-Konversation</h2>

      {/* Nachrichtenbereich im zentrierten MessageContainer */}
      <MessageContainer>
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
              {/* Meta-Infos zur Nachricht */}
              <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#333' }}>
                <strong>Von:</strong> {msg.sender || 'Unbekannt'}
                {msg.email && (
                  <span style={{ fontSize: '0.85rem', color: '#555' }}> ({msg.email})</span>
                )}
                <br />
                <strong>Betreff:</strong> {msg.subject || 'Ohne Betreff'}<br />
                <strong>Zeit:</strong> {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'k. A.'}
              </div>

              {/* Nachrichtentext */}
              <p>{msg.content}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#999' }}>Noch keine Nachrichten.</p>
        )}
      </MessageContainer>

      {/* 🎟️ Ticket erstellen + ✉️ Antworten */}
      {activeChannel && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <TicketButton activeChannel={activeChannel} source="E-Mail" />
          <ReplyButton activeChannel={activeChannel} />
        </div>
      )}
    </div>
  )
}

export default EmailChannel