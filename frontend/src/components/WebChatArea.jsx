import { useState, useEffect } from 'react'

const ChatArea = () => {
  const [conversations, setConversations] = useState([]) // Aktive Tabs
  const [activeConversationId, setActiveConversationId] = useState(null) // Aktiver Tab
  const [messages, setMessages] = useState({}) // Nachrichten nach Conversation-ID

  useEffect(() => {
    const socket = new WebSocket('ws://your-middleware-server/ws')

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'new_conversation') {
        // Neuen Tab anlegen
        setConversations(prev => [...prev, { id: data.id, name: data.name }])
        setMessages(prev => ({ ...prev, [data.id]: [] }))
      }

      if (data.type === 'new_message') {
        // Nachricht einem Chat zuordnen
        setMessages(prev => ({
          ...prev,
          [data.conversationId]: [...(prev[data.conversationId] || []), data.message]
        }))
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => setActiveConversationId(conv.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeConversationId === conv.id ? '#ddd' : '#f4f4f4',
              border: '1px solid #ccc',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {conv.name}
          </button>
        ))}
      </div>

      {/* Nachrichtenverlauf */}
      <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '300px', overflowY: 'auto' }}>
        {activeConversationId ? (
          (messages[activeConversationId] || []).map((msg, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              {msg}
            </div>
          ))
        ) : (
          <p>Wähle eine Unterhaltung</p>
        )}
      </div>

    </div>
  )
}

export default ChatArea