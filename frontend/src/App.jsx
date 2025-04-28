import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Overview from './pages/Overview'
import OpenTickets from './pages/OpenTickets'
import ConversationsPage from './pages/ConversationsPage'



// ➡️ Platzhalter-Komponenten
const Requests = () => <h1>Anfragen-Seite</h1>;
const Tickets = () => <h1>Tickets-Seite</h1>;

// ➡️ Routenliste
const routes = [
  { id: 'overview', label: 'Übersicht', component: Overview },
  { id: 'requests', label: 'Anfragen', component: Requests },
  { id: 'tickets', label: 'Tickets', component: Tickets },
  { id: 'dashboard', label: 'Dashboard', component: Dashboard },
  { id: 'settings', label: 'Settings', component: Settings },
  { id: 'open-tickets', label: 'Offene Tickets', component: OpenTickets },
  { id: 'website-chats', label: 'Websitechats', component: () => <ConversationsPage channel="website-chats" /> },
  { id: 'emails-info', label: 'E-Mails (info@easeEstate.com)', component: () => <ConversationsPage channel="emails-info" /> },
  { id: 'emails-phillip', label: 'E-Mails (phillip@growento.com)', component: () => <ConversationsPage channel="emails-phillip" /> }

  
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    const activeRoute = routes.find(route => route.id === activeTab)
    if (activeRoute && activeRoute.component) {
      const Component = activeRoute.component
      return <Component />
    }
    return <Overview />  // Fallback
  }

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  )
}

export default App
