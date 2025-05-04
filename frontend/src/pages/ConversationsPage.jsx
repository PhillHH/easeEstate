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

  // Nachrichten verarbeiten und richtigen Channel zuordnen
  const handleIncomingMessage = (data) => {
    const { conversationId, senderName, messageContent, channel } = data

    // Quelle eindeutig bestimmen
    let source = 'Websitechat'
    if (channel === 'Channel::Email') {
      source = 'E-Mail'
    } else if (channel === 'Channel::WebWidget') {
      source = 'Websitechat'
    }

    // Channel aktualisieren oder neu hinzufügen
    setChannels(prev => {
      const updated = [...prev]
      const existingIndex = updated.findIndex(c => c.id === conversationId)

      if (existingIndex === -1) {
        updated.push({
          id: conversationId,
          title: senderName || 'Unbekannter Kunde',
          source,
        })
      } else {
        // Quelle ggf. nachtragen oder korrigieren
        if (!updated[existingIndex].source || updated[existingIndex].source !== source) {
          updated[existingIndex].source = source
        }
      }

      localStorage.setItem('channels', JSON.stringify(updated))
      return updated
    })

    // Nachricht hinzufügen
    setMessages(prev => {
      const updated = [...prev, {
        chatId: conversationId,
        content: messageContent,
        sender: senderName,
        email: data.email,
        subject: data.subject,
        timestamp: data.timestamp,
      }]
      localStorage.setItem('messages', JSON.stringify(updated))
      return updated
    })

    // Falls noch kein aktiver Chat gewählt wurde
    if (!activeChannel) {
      setActiveChannel(conversationId)
    }
  }

  useEffect(() => {
    const socket = io('http://20.51.155.134:5000')

    socket.on('new-message', (data) => {
      console.log('Websitechat empfangen:', data)
      handleIncomingMessage(data)
    })

    socket.on('new-email-message', (data) => {
      console.log('Neue E-Mail empfangen:', data)
      handleIncomingMessage(data)
    })

    return () => socket.disconnect()
  }, [activeChannel])

  // Nachrichten nach aktivem Channel filtern
  const filteredMessages = messages.filter(msg => msg.chatId === activeChannel)

  // Channels vorfiltern je nach Quelle (Websitechat oder E-Mail)
  const filteredChannels = channels.filter(channel => channel.source === activeSource)

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <ChannelSidebar
          channels={filteredChannels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          activeSource={activeSource}
          messages={messages}
        />
      </div>

      <div style={{ flexGrow: 1, padding: '1rem' }}>
        {activeSource === 'E-Mail' ? (
          <EmailChannel messages={filteredMessages} />
        ) : (
          <ChatWindow messages={filteredMessages} activeChannel={activeChannel} />
        )}
      </div>
    </div>
  )
}

export default ConversationsPage
