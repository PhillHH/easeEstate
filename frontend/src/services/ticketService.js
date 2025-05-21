
/**
 * Erstellt ein neues Ticket aus einer Konversation
 
 * @param {Object} conversation - Die Konversation, aus der das Ticket erstellt wird
 * @returns {Promise<Object>} - Das erstellte Ticket (oder Fehler)
 */
export async function createTicketFromConversation(conversation) {
  const ticketPayload = {
    title: conversation.title || 'Ticket ohne Titel',
    message: conversation.description || 'Keine Nachricht angegeben.',
    tags: conversation.tags || '',
    group_id: parseInt(conversation.group_id) || undefined,
    customer_id: parseInt(conversation.customer_id) || undefined
  }

  try {
    const response = await fetch('/api/zammad/tickets', {
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

/**
 * Holt alle Tickets vom Backend
 * 
// Sie verwendet den GET-Endpunkt /api/zammad/tickets.
// Wenn etwas schiefläuft, wird ein leerer Array zurückgegeben.

 */
export async function getAllTickets() {
  try {
    const response = await fetch('/api/zammad/tickets')
    if (!response.ok) throw new Error('Tickets konnten nicht geladen werden')
    return await response.json()
  } catch (error) {
    console.error('[TicketService] Fehler beim Laden:', error)
    return []
  }
}
