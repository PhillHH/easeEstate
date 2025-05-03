// Importiere benötigte Module
const fs = require('fs');
const { cleanWebhookData } = require('../utils/dataCleaner');

// Hauptfunktion zur Verarbeitung eingehender Webhooks
async function handleChatwootWebhook(req, res, io) {
  try {
    const webhookData = req.body;

    // Vollständige Webhook-Daten ins Terminal loggen
    console.log('Voller Webhook empfangen:');
    console.log(JSON.stringify(webhookData, null, 2));

    // Nur Nachrichten mit Typ 'incoming' verarbeiten
    const messageType = webhookData.message_type;
    if (messageType !== 'incoming') {
      console.log(`Ignoriert: message_type ist ${messageType}`);
      return res.status(200).send('Nicht verarbeitet – kein incoming');
    }

    // Kanaltyp bestimmen
    const channel = webhookData.channel;
    let cleanedData;

    if (channel === 'Channel::Email') {
      console.log('📩 E-Mail erkannt!');
      cleanedData = cleanWebhookData(webhookData, 'email');
    } else if (channel === 'Channel::WebWidget') {
      console.log('💬 Websitechat erkannt!');
      cleanedData = cleanWebhookData(webhookData, 'webchat');
    } else {
      console.log('❓ Unbekannter Kanal:', channel);
      cleanedData = cleanWebhookData(webhookData); // Fallback
    }

    // Bereinigte Daten loggen
    console.log('Bereinigte Nachricht:', cleanedData);

    // In Datei speichern (nur zu Debugzwecken)
    fs.writeFile('cleanedData.json', JSON.stringify(cleanedData, null, 2), (err) => {
      if (err) {
        console.error('Fehler beim Speichern der Daten:', err);
      } else {
        console.log('Bereinigte Daten wurden in cleanedData.json gespeichert!');
      }
    });

    // Per WebSocket an Frontend schicken
    
    if (cleanedData.channel === 'Channel::Email') {
      io.emit('new-email-message', cleanedData);
    } else {
      io.emit('new-message', cleanedData); // für Webchat und andere Kanäle
    }
    
    res.status(200).send('Webhook verarbeitet');
  } catch (error) {
    console.error('Fehler beim Verarbeiten des Webhooks:', error.message);
    res.status(500).send('Fehler beim Verarbeiten des Webhooks');
  }
}

module.exports = { handleChatwootWebhook };
