import { useEffect, useState } from 'react';
import { socket } from '../services/socket'; // Pfad ggf. anpassen

function EmailChannel() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Listener für neue E-Mail-Nachrichten
    socket.on('new-email-message', (data) => {
      console.log('Neue E-Mail empfangen:', data);
      setEmails((prev) => [data, ...prev]); // Neue Mails oben
    });

    // Cleanup bei Komponenten-Demontage
    return () => {
      socket.off('new-email-message');
    };
  }, []);

  return (
    <div>
      <h2>📩 Neue E-Mails</h2>
      {emails.map((mail, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
          <p><strong>Absender:</strong> {mail.senderName} &lt;{mail.senderEmail}&gt;</p>
          <p><strong>Betreff:</strong> {mail.subject}</p>
          <p><strong>Datum:</strong> {new Date(mail.timestamp).toLocaleString()}</p>
          <p><strong>Nachricht:</strong></p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{mail.messageContent}</pre>
        </div>
      ))}
    </div>
  );
}

export default EmailChannel;