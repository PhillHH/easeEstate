// src/services/zammadClient.js
const axios = require('axios');

const BASE_URL = process.env.ZAMMAD_BASE_URL;
const TOKEN = process.env.ZAMMAD_TOKEN;
const GROUP_ID = process.env.GROUP_ID;
const CUSTOMER_ID_DEFAULT = process.env.CUSTOMER_ID_DEFAULT;

const headers = {
  Authorization: `Token token=${TOKEN}`,
  'Content-Type': 'application/json'
};

// 🎫 Ticket erstellen
async function createTicket(req, res) {
  try {
    const { title, message, tags, group_id, customer_id } = req.body;
console.log('🧪 Payload an Zammad:', {
  title,
  group_id: group_id || GROUP_ID,
  customer_id: customer_id || CUSTOMER_ID_DEFAULT,
  article: {
    subject: title,
    body: message,
    type: 'web',
    internal: false
  },
  tags
});

    const response = await axios.post(`${BASE_URL}/tickets`, {
      title,
      group_id: group_id || GROUP_ID,
      customer_id: customer_id || CUSTOMER_ID_DEFAULT,
      article: {
        subject: title,
        body: message,
        type: 'web',
        internal: false
      },
      tags
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Tickets:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ticket konnte nicht erstellt werden' });
  }
}

// ✅ Ticket abrufen
async function getTicket(req, res) {
  try {
    const ticketId = req.params.id;
    const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Fehler beim Abrufen des Tickets:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ticket konnte nicht abgerufen werden' });
  }
}

// 📨 Ticket beantworten
async function replyToTicket(req, res) {
  try {
    const ticketId = req.params.id;
    const { message } = req.body;

    const response = await axios.post(`${BASE_URL}/tickets/${ticketId}/articles`, {
      body: message,
      subject: 'Antwort',
      type: 'email',
      internal: false
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Fehler beim Antworten auf Ticket:', error.response?.data || error.message);
    res.status(500).json({ error: 'Antwort konnte nicht gesendet werden' });
  }
}

// 🚫 Ticket schließen
async function closeTicket(req, res) {
  try {
    const ticketId = req.params.id;

    const response = await axios.put(`${BASE_URL}/tickets/${ticketId}`, {
      state_id: 4 // "closed" (kannst du mit GET /ticket_states prüfen)
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Fehler beim Schließen des Tickets:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ticket konnte nicht geschlossen werden' });
  }
}

module.exports = {
  createTicket,
  getTicket,
  replyToTicket,
  closeTicket
};
