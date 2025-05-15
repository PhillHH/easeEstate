// routes/replyRoutes.js
const express = require('express')
const { sendReplyToChatwoot } = require('../controllers/replyController')

const router = express.Router()

// POST /api/reply
router.post('/reply', sendReplyToChatwoot)

module.exports = router
