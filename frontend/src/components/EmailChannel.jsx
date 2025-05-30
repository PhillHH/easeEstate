// src/components/EmailChannel.jsx
import { useState } from 'react'
import { MessageContainer, TicketButton, ReplyButton } from './ui'
import { createTicketFromConversation } from '../services/ticketService'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

/**
 * E-Mail-Komponente mit eingebundenem SimpleEditor.
 */
const EmailChannel = ({ messages, activeChannel }) => {
  const firstMessage = messages[0] || {}

  return (
    <div className="flex flex-col h-full px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">E-Mail-Konversation</h2>

      {/* Leiste über dem Container */}
      <div className="flex justify-between items-center w-full max-w-[800px] mx-auto mb-4 px-2">
        <button
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 bg-gray-100 px-3 py-1.5 rounded-md shadow-sm"
          disabled
        >
          <span className="text-lg font-bold text-gray-400">＋</span>
          Konversation benennen
        </button>

        <button
          className="text-sm bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1.5 shadow-sm hover:bg-gray-50 cursor-not-allowed"
          disabled
        >
          Ohne Ticket lösen
        </button>
      </div>

      {/* Umrahmter Gesamtcontainer */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {/* Kopfbereich */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm overflow-hidden">
                {firstMessage.avatarUrl ? (
                  <img
                    src={firstMessage.avatarUrl}
                    alt="Profilbild"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>
                    {firstMessage.sender
                      ? firstMessage.sender
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .toUpperCase()
                      : '?'}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {firstMessage.sender || 'Unbekannt'}
                </span>
                <span className="text-xs text-gray-600">
                  Re: {firstMessage.subject || 'Ohne Betreff'}
                </span>
                {firstMessage.email && (
                  <span className="text-xs text-gray-500">
                    Reply-To: {firstMessage.email}
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs text-gray-500 whitespace-nowrap">
              {firstMessage.timestamp
                ? new Date(firstMessage.timestamp).toLocaleString()
                : 'Zeit: k. A.'}
            </div>
          </div>
        </div>

        {/* Nachrichtenbereich */}
        <MessageContainer>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-4 rounded-xl mb-3 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm overflow-auto">
                    {msg.avatarUrl ? (
                      <img
                        src={msg.avatarUrl}
                        alt="Profilbild"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span>
                        {msg.sender
                          ? msg.sender
                              .split(' ')
                              .map((part) => part[0])
                              .join('')
                              .toUpperCase()
                          : '?'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">
                      {msg.sender || 'Unbekannt'}
                    </div>
                    <p className="text-gray-800 text-[15px] whitespace-pre-line leading-relaxed mt-1">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Noch keine Nachrichten.</p>
          )}
        </MessageContainer>
      </div>

      {/* SimpleEditor integriert in fester Box */}
    <div className="editor-wrapper dark bg-white text-black dark:bg-[#0e0e11] dark:text-white rounded-md border mx-auto mt-6 overflow-auto" style={{ height: '300px', maxWidth: '1000px' }}>
  <SimpleEditor />
</div>

      {/* Buttons */}
      {activeChannel && (
        <div className="flex flex-wrap gap-4 mt-6">
          <TicketButton activeChannel={activeChannel} source="E-Mail" />
          <ReplyButton activeChannel={activeChannel} />
        </div>
      )}
    </div>
  )
}

export default EmailChannel;
