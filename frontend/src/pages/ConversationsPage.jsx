import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChannelSidebar from '../components/ChannelSidebar'
import ChatWindow from '../components/ChatWindow'

const ConversationsPage = () => {
  // State für alle Channels
  const [channels, setChannels] = useState(() => {
    const storedChannels = localStorage.getItem('channels')
    return storedChannels ? JSON.parse(storedChannels) : []
  })

  // State für alle Nachrichten
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages')
    return storedMessages ? JSON.parse(storedMessages) : []
  })

  // Aktiver Channel (welcher Chat wird gerade angezeigt?)
  const [activeChannel, setActiveChannel] = useState(null)

  // Aktive Quelle (Websitechat, E-Mail usw.)
  const [activeSource, setActiveSource] = useState('Websitechat') // Standardmäßig Websitechats

  useEffect(() => {
    const socket = io('http://20.51.155.134:5000') // Deine Backend-URL

    socket.on('new-message', (data) => {
      console.log('Neue Nachricht empfangen:', data)

      const { conversationId, senderName, messageContent, channel } = data

      // Quelle aus Channel-Info bestimmen
      const source = channel === 'Channel::Email' ? 'E-Mail' : 'Websitechat'

      // Channel aktualisieren oder anlegen
      setChannels(prevChannels => {
        const exists = prevChannels.find(c => c.id === conversationId)
        if (!exists) {
          const updatedChannels = [...prevChannels, { id: conversationId, title: senderName || 'Unbekannter Kunde', source }]
          localStorage.setItem('channels', JSON.stringify(updatedChannels))
          return updatedChannels
        }
        return prevChannels
      })

      // Nachrichten aktualisieren
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, { chatId: conversationId, content: messageContent }]
        localStorage.setItem('messages', JSON.stringify(updatedMessages))
        return updatedMessages
      })

      // Falls noch kein aktiver Chat: den ersten setzen
      if (!activeChannel) {
        setActiveChannel(conversationId)
      }
    })

    return () => socket.disconnect()
  }, [activeChannel])

  // Nachrichten für den aktiven Chat filtern
  const filteredMessages = messages.filter(msg => msg.chatId === activeChannel)

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      
      {/* Channel Sidebar (zweite Sidebar) */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <ChannelSidebar
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          activeSource={activeSource}
          messages={messages}
        />
      </div>

      {/* Nachrichtenanzeige */}
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
