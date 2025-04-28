const express = require('express');
const { handleChatwootWebhook } = require('../controllers/webhookController');

function webhookRoutes(io) {
  const router = express.Router();

  // Route definieren: POST /webhook/chatwoot
  router.post('/chatwoot', (req, res) => handleChatwootWebhook(req, res, io));

  return router;
}

module.exports = webhookRoutes;
