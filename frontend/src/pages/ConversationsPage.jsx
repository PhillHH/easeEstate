import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import ChannelSidebar from '../components/ChannelSidebar'
import ChatWindow from '../components/ChatWindow'

const ConversationsPage = () => {
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = io('http://20.51.155.134:5000') // Deine Backend-URL

    socket.on('new-message', (data) => {
      console.log('Neue Nachricht empfangen:', data) // <-- Debug-Log

      const { conversationId, senderName, messageContent } = data

      // Channels aktualisieren
      setChannels(prevChannels => {
        const exists = prevChannels.find(c => c.id === conversationId)
        if (!exists) {
          return [...prevChannels, { id: conversationId, title: senderName || 'Unbekannter Kunde' }]
        }
        return prevChannels
      })

      // Nachrichten aktualisieren
      setMessages(prevMessages => [...prevMessages, { chatId: conversationId, content: messageContent }])

      // Falls noch kein aktiver Channel: auf den ersten springen
      if (!activeChannel) {
        setActiveChannel(conversationId)
      }
    })

    return () => socket.disconnect()
  }, [activeChannel])

  // Nachrichten für aktiven Channel filtern
  const filteredMessages = messages.filter(msg => msg.chatId === activeChannel)

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      
      {/* Channel Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <ChannelSidebar
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
      </div>

      {/* Chat Window */}
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
