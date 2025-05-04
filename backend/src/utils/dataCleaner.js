// Diese Funktion bereinigt die empfangenen Webhook-Daten, je nach Quelle (email oder webchat)

function cleanWebhookData(data, type = 'fallback') {
  const message = data.message || data; // Nutze message direkt, falls vorhanden (Chatwoot-Format)
  const conversationId = message.conversation_id || data.conversation?.id || data.id;
  const timestamp = message.created_at || data.created_at || new Date().toISOString();

  if (type === 'email') {
    const emailData = message.content_attributes?.email || {};

    return {
      conversationId,
      senderName: message.sender?.name || emailData.from?.[0] || 'Unbekannt',
      email: emailData.from?.[0] || null,
      subject: emailData.subject || '(kein Betreff)',
      messageContent: emailData.text_content?.full || message.content,
      timestamp: emailData.date || timestamp,
      channel: data.channel || message.channel || 'Channel::Email',
    };
  }

  if (type === 'webchat') {
    return {
      conversationId,
      senderName: message.sender?.name || 'Unbekannt',
      messageContent: message.content,
      timestamp,
      channel: message.channel || 'Channel::WebWidget',
    };
  }

  // Fallback
  return {
    conversationId,
    senderName: message.sender?.name || 'Unbekannt',
    messageContent: message.content,
    timestamp,
    channel: message.channel || 'unbekannt',
  };
}

module.exports = { cleanWebhookData };
