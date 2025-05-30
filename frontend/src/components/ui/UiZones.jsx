// Layout-Zonen für die Chatansicht, Nachrichtenbereich etc.

export const MessageContainer = ({ children }) => (
  <div
    style={{
      overflowY: 'auto',         // Scrollbar bei Überlauf
      flexGrow: 1,               // Nimmt gesamten verfügbaren Platz ein
      padding: '1rem',
      background: '#f9fafb',     // Sehr helles Grau, wie eingebettet
      borderRadius: '12px',     // Weichere Ecken für modernes UI
      maxHeight: '60vh',
      width: '100%',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)', // leichtes Inner-Shadow für optische Einbettung
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}
  >
    {children}
  </div>
)

export const SectionBox = ({ children }) => (
  <div style={{
    padding: '1rem',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    marginBottom: '1rem'
  }}>
    {children}
  </div>
)
