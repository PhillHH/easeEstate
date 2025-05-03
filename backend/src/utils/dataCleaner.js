// Diese Funktion bereinigt die empfangenen Webhook-Daten, je nach Quelle (email oder webchat)

function cleanWebhookData(data, type = 'fallback') {
  const conversationId = data.conversation?.id || data.id;
  const timestamp = data.created_at || new Date().toISOString();

  if (type === 'email') {
    const emailData = data.content_attributes?.email || {};

    return {
      conversationId,
      senderName: data.sender?.name || 'Unbekannt',
      senderEmail: emailData.from?.[0] || null,
      recipientEmail: emailData.to?.[0] || null,
      subject: emailData.subject || '(kein Betreff)',
      messageContent: emailData.text_content?.full || data.content,
      messageId: emailData.message_id || null,
      date: emailData.date || timestamp,
      timestamp,
      channel: data.channel || 'Channel::Email',
    };
  }

  if (type === 'webchat') {
    return {
      conversationId,
      senderName: data.sender?.name || 'Unbekannt',
      messageContent: data.content,
      timestamp,
      channel: data.channel || 'Channel::WebWidget',
    };
  }

  // Fallback
  return {
    conversationId,
    senderName: data.sender?.name || 'Unbekannt',
    messageContent: data.content,
    timestamp,
    channel: data.channel || 'unbekannt',
  };
}

module.exports = { cleanWebhookData };
