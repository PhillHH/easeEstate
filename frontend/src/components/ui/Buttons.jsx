export const PrimaryButton = ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props} style={styles.primary}>
      {children}
    </button>
  )
  
  export const GhostButton = ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props} style={styles.ghost}>
      {children}
    </button>
  )
  
  const styles = {
    primary: {
      padding: '0.5rem 1rem',
      backgroundColor: '#4e54c8',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
    },
    ghost: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      color: '#4e54c8',
      border: '1px solid #4e54c8',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
    },
  }