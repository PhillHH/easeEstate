// controllers/replyController.js

const axios = require('axios')

// Hole Umgebungsvariablen aus .env
const CHATWOOT_URL = process.env.CHATWOOT_API_URL
const CHATWOOT_TOKEN = process.env.CHATWOOT_API_TOKEN
const CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID

/**
 * sendReplyToChatwoot
 * Beantwortet eine bestehende Konversation mit einer Nachricht
 */
async function sendReplyToChatwoot(req, res) {
  const { conversationId, message } = req.body

  // 🧪 Eingangslog
  console.log('📥 Anfrage empfangen mit Body:', req.body)

  // Validierung
  if (!conversationId || !message) {
    console.warn('⚠️ Ungültiger Request: conversationId oder message fehlt.')
    return res.status(400).json({ error: 'conversationId und message sind erforderlich.' })
  }

  // Endpunkt aufbauen
  const endpoint = `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`

  // 🌐 Logge den API-Endpunkt und die Nutzdaten
  console.log('🌐 Sende an Chatwoot-Endpoint:', endpoint)
  console.log('📦 Nachrichtendaten:', {
    content: message,
    message_type: 'outgoing',
    content_type: 'text',
    private: false
  })

  try {
    const response = await axios.post(
      endpoint,
      {
        content: message,
        message_type: 'outgoing',
        content_type: 'text',
        private: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': CHATWOOT_TOKEN
        }
      }
    )

    console.log('✅ Antwort an Chatwoot gesendet:', response.data)
    res.status(200).json({ success: true, data: response.data })
  } catch (error) {
    console.error('❌ Fehler beim Senden an Chatwoot:', error.response?.data || error.message)
    res.status(500).json({ error: 'Fehler beim Senden an Chatwoot' })
  }
}

module.exports = { sendReplyToChatwoot }
