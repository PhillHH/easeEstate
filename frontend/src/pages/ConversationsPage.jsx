import ChannelSidebar from '../components/ChannelSidebar'
import ChatWindow from '../components/ChatWindow'

const ConversationsPage = ({ channel }) => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      
      {/* Linke Channel-Sidebar innerhalb vom Content */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
        <ChannelSidebar channel={channel} />
      </div>

      {/* Rechter Chatbereich */}
      <div style={{ flexGrow: 1, padding: '1rem' }}>
        <ChatWindow />
      </div>

    </div>
  )
}

export default ConversationsPage
