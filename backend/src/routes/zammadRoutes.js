// src/routes/zammadRoutes.js
const express = require('express');
const {
  createTicket,
  getTicket,
  replyToTicket,
  closeTicket
} = require('../services/zammadClient');

const router = express.Router();

// POST /api/zammad/tickets → Neues Ticket anlegen
router.post('/tickets', createTicket);

// GET /api/zammad/tickets/:id → Ticketdetails abrufen
router.get('/tickets/:id', getTicket);

// POST /api/zammad/tickets/:id/reply → Ticket beantworten
router.post('/tickets/:id/reply', replyToTicket);

// PUT /api/zammad/tickets/:id/close → Ticket schließen
router.put('/tickets/:id/close', closeTicket);

module.exports = router;
