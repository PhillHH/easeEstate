import { useState } from 'react'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { Button } from '../button'
import { createTicketFromConversation } from '../../../services/ticketService'

// Lokaler Layout-Block mit Abstand und Label
const FormRow = ({ label, htmlFor, children }) => {
  return (
    <div className="flex flex-col gap-2 mb-8 bg-yellow-100">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-base font-medium text-gray-800"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

const TicketForm = ({ activeChannel, source, onClose }) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState('')
  const [groupId, setGroupId] = useState('')
  const [customerId, setCustomerId] = useState('')

const handleSubmit = async () => {
  const payload = {
    title: title || `Ticket zu ${activeChannel}`,
    description: message,
    tags,
    group_id: parseInt(groupId),
    customer_id: parseInt(customerId),
    source,
    id: activeChannel
  }

  try {
    const created = await createTicketFromConversation(payload)
    alert(`Ticket erstellt mit ID: ${created.id || 'unbekannt'}`)
    onClose()
  } catch (err) {
    alert('Fehler beim Erstellen des Tickets')
    console.error(err)
  }
}

  return (
    <form
      className="w-[90%] max-w-[800px] mx-auto px-[50px] py-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormRow label="Titel" htmlFor="title">
        <Input
          id="title"
          className="w-full h-14 px-4 text-lg"
          placeholder="z. B. Rohrbruch im Keller"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>

      <FormRow label="Beschreibung" htmlFor="message">
        <Textarea
          id="message"
          className="w-full text-lg px-4 py-3 min-h-[160px]"
          placeholder="z. B. Das Wasser steht 10 cm hoch!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormRow>

      <FormRow label="Tags" htmlFor="tags">
        <Input
          id="tags"
          className="w-full h-14 px-4 text-lg min-h-[25px] "
          placeholder="z. B. notfall,keller"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </FormRow>

      <FormRow label="Zuweisung" htmlFor="group">
        <Input
          id="group"
          type="number"
          className="w-full h-14 px-4 text-lg"
          placeholder=" Hier kommt später ein Dropdown hin z.B Hausmeiter, Klempner etc"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </FormRow>

     <FormRow label="Kunden/Mieternummer" htmlFor="customer">
  <Input
    id="customer"
    type="number"
    className="w-full h-14 px-4 text-lg" // ✅ richtige Klassen für Input
    placeholder="Später mit Suche in DB (jQuery für Echtzeitsuche)"
    value={customerId}
    onChange={(e) => setCustomerId(e.target.value)}
  />
</FormRow>

<div style={{ height: '30px' }} />

      <div className="flex justify-end gap-4 mt-10 pt-6">
        <Button type="submit" onClick={handleSubmit}>💾 Ticket speichern</Button>
        <Button variant="ghost" type="button" onClick={onClose}>Abbrechen</Button>
      </div>
      <div style={{ height: '30px' }} />
    </form>
  )
}

export default TicketForm
