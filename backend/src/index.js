// Bibliotheken importieren
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Express-App erstellen
const app = express();

// Middleware einrichten
app.use(cors()); // Erlaubt Anfragen von anderen Domains (z.B. dein Frontend)
app.use(express.json()); // Erlaubt das Parsen von JSON-Daten im Body

// Test-Route, um zu prüfen, ob der Server läuft
app.get('/', (req, res) => {
  res.send('EaseEstate Backend läuft!');
});

// Webhook-Route für Chatwoot
app.post('/webhook/chatwoot', async (req, res) => {
  const eventData = req.body; // Chatwoot schickt hier Infos rein

  console.log('Webhook empfangen:', eventData);

  try {
    const { message, conversation } = eventData;

    // Sicherstellen, dass es sich um eine eingehende Nachricht handelt
    if (message && message.message_type === 'incoming') {
      console.log('Eingehende Nachricht:', message.content);

      // Optional: Automatisch eine Antwort senden
      await axios.post(
        `${process.env.CHATWOOT_URL}/api/v1/conversations/${conversation.id}/messages`,
        {
          content: 'Danke für deine Nachricht! Wir melden uns gleich bei dir.',
          message_type: 0, // 0 = outgoing message
        },
        {
          headers: {
            api_access_token: process.env.CHATWOOT_API_TOKEN,
          },
        }
      );

      console.log('Automatische Antwort gesendet.');
    }

    res.status(200).send('Webhook verarbeitet');
  } catch (error) {
    console.error('Fehler beim Verarbeiten des Webhooks:', error.message);
    res.status(500).send('Fehler beim Verarbeiten des Webhooks');
  }
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EaseEstate Backend läuft auf Port ${PORT}`);
});
