import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChannelSidebar from '../components/ChannelSidebar'
import ChatWindow from '../components/ChatWindow'
import EmailChannel from '../components/EmailChannel'

// ConversationsPage empfängt den aktiven Kommunikationskanal (z. B. "E-Mail" oder "Websitechat") von außen
const ConversationsPage = ({ activeSource }) => {
  const [channels, setChannels] = useState(() => {
    const storedChannels = localStorage.getItem('channels')
    return storedChannels ? JSON.parse(storedChannels) : []
  })

  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages')
    return storedMessages ? JSON.parse(storedMessages) : []
  })

  const [activeChannel, setActiveChannel] = useState(null)

  // Hilfsfunktion zur Verarbeitung eingehender Nachrichten
  const handleIncomingMessage = (data) => {
    const { conversationId, senderName, messageContent, channel } = data

    // Quelle aus channel oder Fallback auf aktiven Tab ableiten
    let source = 'Websitechat'
    if (channel === 'Channel::Email') source = 'E-Mail'
    if (!channel && activeSource === 'E-Mail') source = 'E-Mail'

    // Neuen Channel hinzufügen, wenn nicht vorhanden
    setChannels(prev => {
      const exists = prev.find(c => c.id === conversationId)
      if (!exists) {
        const updated = [...prev, {
          id: conversationId,
          title: senderName || 'Unbekannter Kunde',
          source
        }]
        localStorage.setItem('channels', JSON.stringify(updated))
        return updated
      }
      return prev
    })

    // Nachricht zur Unterhaltung hinzufügen
    setMessages(prev => {
      const updated = [...prev, {
        chatId: conversationId,
        content: messageContent,
        sender: senderName,
        email: data.email,
        subject: data.subject,
        timestamp: data.timestamp
      }]
      localStorage.setItem('messages', JSON.stringify(updated))
      return updated
    })

    // Erstinitialisierung des aktiven Chats
    if (!activeChannel) {
      setActiveChannel(conversationId)
    }
  }

  useEffect(() => {
    const socket = io('http://20.51.155.134:5000')

    // Nachrichten aus dem Website-Chat
    socket.on('new-message', (data) => {
      console.log('Websitechat empfangen:', data)
      handleIncomingMessage(data)
    })

    // Nachrichten aus dem E-Mail-Kanal
    socket.on('new-email-message', (data) => {
      console.log('Neue E-Mail empfangen:', data)
      handleIncomingMessage(data)
    })

    return () => socket.disconnect()
  }, [activeChannel, activeSource])

  // Nachrichten für den aktuell ausgewählten Chat filtern
  const filteredMessages = messages.filter(msg => msg.chatId === activeChannel)

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* ChannelSidebar: zeigt Kontakte & Titel je nach Quelle */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <ChannelSidebar
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          activeSource={activeSource}
          messages={messages}
        />
      </div>

      {/* Nachrichtenansicht – E-Mail oder Websitechat */}
      <div style={{ flexGrow: 1, padding: '1rem' }}>
        {activeSource === 'E-Mail' ? (
          <EmailChannel
            messages={filteredMessages}
          />
        ) : (
          <ChatWindow
            messages={filteredMessages}
            activeChannel={activeChannel}
          />
        )}
      </div>
    </div>
  )
}

export default ConversationsPage
