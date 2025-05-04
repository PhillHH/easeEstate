// Layout-Zonen für die Chatansicht, Nachrichtenbereich etc.

export const MessageContainer = ({ children }) => (
    <div style={{
      overflowY: 'auto',
      flexGrow: 1,
      padding: '1rem',
      background: '#fafafa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxHeight: '60vh'
    }}>
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
  