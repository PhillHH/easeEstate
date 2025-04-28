const ChannelSidebar = ({ channel }) => {
    return (
      <div style={{ padding: '1rem' }}>
        <h3>{getChannelName(channel)}</h3>
  
        <ul style={{ marginTop: '1rem' }}>
          <li>Max Mustermann</li>
          <li>Gast #1234</li>
          <li>Kunde XYZ</li>
          {/* Später dynamisch laden */}
        </ul>
      </div>
    )
  }
  
  const getChannelName = (channel) => {
    switch (channel) {
      case 'website-chats':
        return 'Website-Chats'
      case 'whatsapp-chats':
        return 'WhatsApp-Chats'
      case 'instagram-chats':
        return 'Instagram-Chats'
      case 'emails-info':
        return 'E-Mail (info@easeEstate.com)'
      case 'emails-phillip':
        return 'E-Mail (phillip@growento.com)'
      default:
        return 'Unbekannter Kanal'
    }
  }
  
  export default ChannelSidebar
  