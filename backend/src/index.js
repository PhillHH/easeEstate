const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

// Import der Route
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const server = http.createServer(app);

// WebSocket-Teil lassen wir für später sauber modularisieren
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: "*" }
});

// WebSocket-Events minimal
io.on('connection', (socket) => {
  console.log('Frontend verbunden:', socket.id);
});

// Middleware
app.use(cors());
app.use(express.json());

// Test-Route
app.get('/', (req, res) => {
  res.send('EaseEstate Backend läuft!');
});

// Webhook-Route einbinden
app.use('/webhook', webhookRoutes(io)); // io wird weitergereicht an die Route

// Server starten
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`EaseEstate Backend läuft auf Port ${PORT}`);
});
