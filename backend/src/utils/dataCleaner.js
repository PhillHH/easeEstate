// Diese Funktion bereinigt die empfangenen Webhook-Daten, je nach Quelle (email oder webchat)

function cleanWebhookData(data, type = 'fallback') {
  const conversationId = data.conversation?.id || data.id;
  const timestamp = data.created_at || new Date().toISOString();

  // 🛠️ Sichere Kanal-Erkennung
  const detectedChannel = data.channel || data.conversation?.channel || 'unbekannt';

  if (type === 'email') {
    const emailData = data.content_attributes?.email || {};

    return {
      conversationId,
      senderName: data.sender?.name || emailData.from?.[0] || 'Unbekannt',
      email: emailData.from?.[0] || null,
      subject: emailData.subject || '(kein Betreff)',
      messageContent: emailData.text_content?.full || data.content,
      timestamp: emailData.date || timestamp,
      channel: 'Channel::Email', // ✅ Fest gesetzt
    };
  }

  if (type === 'webchat') {
    return {
      conversationId,
      senderName: data.sender?.name || 'Unbekannt',
      messageContent: data.content,
      timestamp,
      channel: 'Channel::WebWidget', // ✅ Fest gesetzt
    };
  }

  // Fallback
  return {
    conversationId,
    senderName: data.sender?.name || 'Unbekannt',
    messageContent: data.content,
    timestamp,
    channel: detectedChannel, // Besser als 'unbekannt'
  };
}

module.exports = { cleanWebhookData };
