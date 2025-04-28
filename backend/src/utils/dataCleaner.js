function cleanWebhookData(webhookData) {
    // Loggen des kompletten webhookData zum Testen
    console.log('Webhook Data:');
    console.log(JSON.stringify(webhookData, null, 2));
  
    return {
      conversationId: webhookData.conversation?.id,
      senderName: webhookData.sender?.name,
      messageContent: webhookData.content,
      // Korrekte Referenz zum Channel
      channel: webhookData.conversation?.channel || 'No channel found',  // Fallback, falls channel undefined ist
      timestamp: webhookData.created_at
    };
  }
  
  module.exports = { cleanWebhookData };
  