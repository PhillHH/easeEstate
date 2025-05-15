// src/services/replyService.js

/**
 * sendReplyMessage
 * Sendet eine Antwortnachricht an das Backend, das sie an Chatwoot weiterleitet
 *
 * @param {string} conversationId - ID der Konversation in Chatwoot
 * @param {string} text - Nachrichtentext
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const sendReplyMessage = async (conversationId, text) => {
  const response = await fetch(`${BACKEND_URL}/api/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversationId,
      message: text
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.error || 'Unbekannter Fehler beim Senden')
  }

  return await response.json()
}