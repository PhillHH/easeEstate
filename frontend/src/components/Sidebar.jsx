import React, { useState } from 'react'
import {
  LayoutDashboard,
  Mail,
  MessagesSquare,
  Settings,
  Ticket,
  FilePlus,
  History,
  Inbox,
  BarChart3,
  Layers,
  MenuSquare,
  UserCircle
} from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab, setActiveSource }) => {
  const [openMenu, setOpenMenu] = useState(null)

  const topMenuItems = [
    { id: 'overview', label: 'Übersicht', icon: <BarChart3 size={18} /> },
    {
      id: 'requests',
      label: 'Anfragen',
      icon: <MenuSquare size={18} />,
      subItems: [
        { id: 'new-request', label: 'Neue Anfrage', icon: <FilePlus size={16} /> },
        { id: 'request-history', label: 'Verlauf', icon: <History size={16} /> }
      ]
    },
    {
      id: 'conversations',
      label: 'Unterhaltungen',
      icon: <MessagesSquare size={18} />,
      subItems: [
        { id: 'website-chats', label: 'Websitechats', icon: <Inbox size={16} />, source: 'Websitechat' },
        { id: 'emails-info', label: 'E-Mails (info@easeEstate.com)', icon: <Mail size={16} />, source: 'E-Mail' },
        { id: 'emails-phillip', label: 'E-Mails (phillip@growento.com)', icon: <Mail size={16} />, source: 'E-Mail' }
      ]
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: <Ticket size={18} />,
      subItems: [
        { id: 'open-tickets', label: 'Offene Tickets', icon: <Ticket size={16} /> },
        { id: 'closed-tickets', label: 'Geschlossene Tickets', icon: <Ticket size={16} /> }
      ]
    },
    { id: 'process-tracker', label: 'Prozess-Tracker', icon: <Layers size={18} /> } // ✅ Jetzt eigenständig
  ]

  const bottomMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ]

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div className="flex flex-col h-full bg-[#1c1c22] text-white px-4 py-6 w-64">

      {/* 👤 User Info */}
      <div className="flex items-center gap-3 mb-6 px-4">
        <UserCircle size={28} />
        <div>
          <p className="text-sm font-semibold leading-tight">Phillip Rugullis</p>
          <p className="text-xs text-green-400">eingeloggt</p>
        </div>
      </div>

      {/* Top Menu */}
      <div className="space-y-2">
        {topMenuItems.map(item => (
          <div key={item.id}>
            <div
              onClick={() => {
                toggleMenu(item.id)
                if (!item.subItems) setActiveTab(item.id)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 hover:bg-[#2a2a32] ${
                activeTab === item.id ? 'border border-violet-500 bg-[#3f3b46]' : ''
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>

            {openMenu === item.id && item.subItems && (
              <div className="ml-4 mt-2 space-y-1">
                {item.subItems.map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setActiveTab(sub.id)
                      if (sub.source) setActiveSource(sub.source)
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 hover:bg-[#2a2a32] ${
                      activeTab === sub.id ? 'border border-violet-500 bg-[#3f3b46]' : ''
                    }`}
                  >
                    {sub.icon}
                    <span className="text-sm">{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-grow"></div>

      {/* Bottom Menu */}
      <div className="space-y-2 pt-4 border-t border-white/10">
        {bottomMenuItems.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 hover:bg-[#2a2a32] ${
              activeTab === item.id ? 'border border-violet-500 bg-[#3f3b46]' : ''
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
