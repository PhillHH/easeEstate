import React, { useState } from 'react';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { createTicketFromConversation } from '../../../services/ticketService';

// 🔧 Layoutkomponente für Abstand + Label
const FormRow = ({ label, htmlFor, children }) => (
  <div className="flex flex-col gap-2 mb-6">
    {label && (
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    {children}
  </div>
);

// 🧾 Hauptformular
const TicketForm = ({ activeChannel, source, onClose }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState('');
  const [groupId, setGroupId] = useState('');
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async () => {
    const payload = {
      title: title || `Ticket zu ${activeChannel}`,
      description: message,
      tags,
      group_id: parseInt(groupId),
      customer_id: parseInt(customerId),
      source,
      id: activeChannel
    };

    try {
      const created = await createTicketFromConversation(payload);
      alert(`✅ Ticket erstellt mit ID: ${created.id || 'unbekannt'}`);
      onClose();
    } catch (err) {
      alert('❌ Fehler beim Erstellen des Tickets');
      console.error(err);
    }
  };

  return (
    <form
      className="w-full max-w-[800px] mx-auto px-6 py-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormRow label="Titel" htmlFor="title">
        <Input
          id="title"
          placeholder="z. B. Rohrbruch im Keller"
          className="h-12 px-4 text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormRow>

      <FormRow label="Beschreibung" htmlFor="message">
        <Textarea
          id="message"
          className="min-h-[140px] px-4 py-3 text-base"
          placeholder="Was genau ist passiert?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormRow>

      <FormRow label="Tags" htmlFor="tags">
        <Input
          id="tags"
          placeholder="z. B. notfall,keller"
          className="h-12 px-4 text-base"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </FormRow>

      <FormRow label="Zuweisung (Gruppe)" htmlFor="group">
        <Input
          id="group"
          type="number"
          placeholder="z. B. 1 (Hausmeister), 2 (Technik)"
          className="h-12 px-4 text-base"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </FormRow>

      <FormRow label="Kunden-ID" htmlFor="customer">
        <Input
          id="customer"
          type="number"
          placeholder="z. B. 12345"
          className="h-12 px-4 text-base"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </FormRow>

      <div className="flex justify-end gap-4 mt-8">
        <Button onClick={handleSubmit}>💾 Ticket speichern</Button>
        <Button variant="ghost" type="button" onClick={onClose}>
          Abbrechen
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;
