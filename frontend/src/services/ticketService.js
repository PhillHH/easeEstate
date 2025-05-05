
/**
 * Erstellt ein neues Ticket aus einer Konversation
 * @param {Object} conversation - Die Konversation, aus der das Ticket erstellt wird
 * @returns {Promise<Object>} - Das erstellte Ticket (oder Fehler)
 */
export async function createTicketFromConversation(conversation) {
  const ticketPayload = {
    title: `Ticket zu ${conversation.title || 'unbenanntem Kontakt'}`,
    source: conversation.source,
    channelId: conversation.id,
    createdAt: new Date().toISOString(),
    status: 'open',
  }

  try {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketPayload)
    })

    if (!response.ok) {
      throw new Error('Ticket konnte nicht erstellt werden')
    }

    const createdTicket = await response.json()
    return createdTicket
  } catch (error) {
    console.error('[TicketService] Fehler beim Erstellen:', error)
    throw error
  }
}

/**
 * Ticket nachträglich schließen
 */
export async function closeTicket(ticketId) {
  try {
    const response = await fetch(`/api/tickets/${ticketId}/close`, { method: 'POST' })
    return response.ok
  } catch (err) {
    console.error('[TicketService] Fehler beim Schließen:', err)
    return false
  }
}
