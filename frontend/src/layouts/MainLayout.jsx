import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const MainLayout = ({ activeTab, setActiveTab, setActiveSource, children }) => { // <-- setActiveSource hinzugefügt!
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      
      {/* Topbar über gesamte Breite */}
      <div style={{ height: '60px', width: '100%', backgroundColor: '#333', color: '#fff', display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
        <Topbar />
      </div>

      {/* Body: Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Sidebar */}
        <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '1rem 0' }}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveSource={setActiveSource} // <-- jetzt sauber übergeben
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </div>

      </div>
    </div>
  )
}

export default MainLayout
