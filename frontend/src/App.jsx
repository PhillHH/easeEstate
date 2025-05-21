import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Overview from './pages/Overview'
import OpenTickets from './pages/OpenTickets'
import ConversationsPage from './pages/ConversationsPage'
import TicketList from './pages/TicketList' 


// ➡️ Platzhalter-Komponenten
const Requests = () => <h1>Anfragen-Seite</h1>
const Tickets = () => <h1>Tickets-Seite</h1>

// ➡️ Routenliste
const routes = [
  { id: 'overview', label: 'Übersicht', component: Overview },
  { id: 'requests', label: 'Anfragen', component: Requests },
  { id: 'open-tickets', label: 'Offene Tickets', component: TicketList },
  { id: 'dashboard', label: 'Dashboard', component: Dashboard },
  { id: 'settings', label: 'Settings', component: Settings },
  { id: 'open-tickets', label: 'Offene Tickets', component: OpenTickets }
  // ❌ ConversationsPage kommt jetzt NICHT hier rein! (Sonderbehandlung)
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSource, setActiveSource] = useState('Websitechat') // ✅ neu: Quelle setzen (Websitechat / E-Mail)

  const renderContent = () => {
    // Sonderfall für ConversationsPage (Websitechats, Emails)
    if (['website-chats', 'emails-info', 'emails-phillip'].includes(activeTab)) {
      return <ConversationsPage activeSource={activeSource} /> // ✅ activeSource sauber übergeben
    }

    // Normale Seiten
    const activeRoute = routes.find(route => route.id === activeTab)
    if (activeRoute && activeRoute.component) {
      const Component = activeRoute.component
      return <Component />
    }

    return <Overview />  // Fallback (zur Sicherheit)
  }

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeSource={activeSource} // ✅
      setActiveSource={setActiveSource} // ✅
    >
      {renderContent()}
    </MainLayout>
  )
}

export default App
