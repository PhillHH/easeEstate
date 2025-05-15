// dataCleaner.js
// Diese Funktion bereinigt die empfangenen Webhook-Daten je nach Kanal (email, webchat oder fallback)

function cleanWebhookData(data, type = 'fallback') {
  // Fallback: conversationId und Zeitstempel ermitteln
  const conversationId = data.conversation?.id || data.id || data.messages?.[0]?.conversation_id;
  const timestamp =
    data.created_at ||
    data.messages?.[0]?.created_at ||
    new Date().toISOString();

  // 🛠️ Kanal sicher erkennen
  const detectedChannel =
    data.channel ||
    data.conversation?.channel ||
    data.messages?.[0]?.channel ||
    'unbekannt';

  // 📨 E-Mail-Nachrichten
  if (type === 'email') {
    const emailData =
      data.content_attributes?.email ||
      data.messages?.[0]?.content_attributes?.email || {};

    const senderEmail =
      emailData.from?.[0] ||
      data.sender?.email ||
      data.messages?.[0]?.sender?.email ||
      null;

    const subject =
      emailData.subject ||
      data.additional_attributes?.mail_subject ||
      data.messages?.[0]?.additional_attributes?.mail_subject ||
      '(kein Betreff)';

    const content =
      emailData.text_content?.full ||
      data.content ||
      data.messages?.[0]?.content ||
      '[kein Inhalt]';

    const messageTime =
      emailData.date ||
      data.created_at ||
      data.messages?.[0]?.created_at ||
      timestamp;

    return {
      conversationId,
      senderName: data.sender?.name ||
                  data.messages?.[0]?.sender?.name ||
                  senderEmail ||
                  'Unbekannt',
      email: senderEmail,
      subject,
      messageContent: content,
      timestamp: messageTime,
      channel: 'Channel::Email'
    };
  }

  // 💬 Websitechat-Nachrichten
  if (type === 'webchat') {
    return {
      conversationId,
      senderName: data.sender?.name ||
                  data.messages?.[0]?.sender?.name ||
                  'Unbekannt',
      messageContent: data.content ||
                      data.messages?.[0]?.content ||
                      '[kein Inhalt]',
      timestamp,
      channel: 'Channel::WebWidget'
    };
  }

  // ❓ Fallback für andere Quellen
  return {
    conversationId,
    senderName: data.sender?.name ||
                data.messages?.[0]?.sender?.name ||
                'Unbekannt',
    messageContent: data.content ||
                    data.messages?.[0]?.content ||
                    '[kein Inhalt]',
    timestamp,
    channel: detectedChannel
  };
}

module.exports = { cleanWebhookData };
