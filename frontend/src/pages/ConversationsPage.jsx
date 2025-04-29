import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChannelSidebar from '../components/ChannelSidebar'
import ChatWindow from '../components/ChatWindow'

// ✅ activeSource wird als Prop von außen übergeben
const ConversationsPage = ({ activeSource }) => {
  // State für Channels (z. B. Websitechats, E-Mails etc.)
  const [channels, setChannels] = useState(() => {
    const storedChannels = localStorage.getItem('channels')
    return storedChannels ? JSON.parse(storedChannels) : []
  })

  // State für Nachrichten
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages')
    return storedMessages ? JSON.parse(storedMessages) : []
  })

  // Aktiver Channel (zeigt welche Unterhaltung geöffnet ist)
  const [activeChannel, setActiveChannel] = useState(null)

  useEffect(() => {
    const socket = io('http://20.51.155.134:5000') // Deine echte Serveradresse

    socket.on('new-message', (data) => {
      console.log('Neue Nachricht empfangen:', data)

      const { conversationId, senderName, messageContent, channel } = data

      // Quelle bestimmen (z. B. Websitechat oder E-Mail)
      const source = channel === 'Channel::Email' ? 'E-Mail' : 'Websitechat'

      // Channel anlegen (nur wenn nicht schon vorhanden)
      setChannels(prevChannels => {
        const exists = prevChannels.find(c => c.id === conversationId)
        if (!exists) {
          const updated = [...prevChannels, {
            id: conversationId,
            title: senderName || 'Unbekannter Kunde',
            source
          }]
          localStorage.setItem('channels', JSON.stringify(updated))
          return updated
        }
        return prevChannels
      })

      // Nachricht speichern
      setMessages(prevMessages => {
        const updated = [...prevMessages, {
          chatId: conversationId,
          content: messageContent
        }]
        localStorage.setItem('messages', JSON.stringify(updated))
        return updated
      })

      // Falls kein aktiver Channel gesetzt ist → diesen setzen
      if (!activeChannel) {
        setActiveChannel(conversationId)
      }
    })

    return () => socket.disconnect()
  }, [activeChannel])

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
          activeSource={activeSource} // ✅ von außen erhalten
          messages={messages}
        />
      </div>

      {/* Chat-Fenster rechts */}
      <div style={{ flexGrow: 1, padding: '1rem' }}>
        <ChatWindow
          messages={filteredMessages}
          activeChannel={activeChannel}
        />
      </div>

    </div>
  )
}

export default ConversationsPage
