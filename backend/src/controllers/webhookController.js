const fs = require('fs');
const { cleanWebhookData } = require('../utils/dataCleaner');

async function handleChatwootWebhook(req, res, io) {
  const webhookData = req.body;

  // Logge den vollen Webhook-Datensatz ins Terminal
  console.log('Voller Webhook empfangen:');
  console.log(JSON.stringify(webhookData, null, 2));  // Loggt den vollständigen Webhook

  try {
    const { message_type } = webhookData;

    if (message_type === 'incoming') {
      // Bereinigung der Daten
      const cleanedData = cleanWebhookData(webhookData);

      // Bereinigte Daten ins Terminal loggen (für Debugging)
      console.log('Bereinigte Nachricht:', cleanedData);

      // Daten in eine JSON-Datei speichern
      fs.writeFile('cleanedData.json', JSON.stringify(cleanedData, null, 2), (err) => {
        if (err) {
          console.error('Fehler beim Speichern der Daten:', err);
        } else {
          console.log('Bereinigte Daten wurden in cleanedData.json gespeichert!');
        }
      });

      // Bereinigte Daten per WebSocket an Frontend senden
      io.emit('new-message', cleanedData);
    }

    res.status(200).send('Webhook verarbeitet');
  } catch (error) {
    console.error('Fehler beim Verarbeiten des Webhooks:', error.message);
    res.status(500).send('Fehler beim Verarbeiten des Webhooks');
  }
}

module.exports = { handleChatwootWebhook };
