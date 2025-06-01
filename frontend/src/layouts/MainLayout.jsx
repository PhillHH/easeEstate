import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const MainLayout = ({ activeTab, setActiveTab, activeSource, setActiveSource, children }) => {
  return (
    <div className="flex flex-col h-screen w-screen">

      
      {/* 🔝 Topbar */}
      <div className="h-[60px] w-full bg-[#333] text-white flex items-center pl-4">
        <Topbar />
      </div>

      {/* 🔄 Sidebar + Content */}
      <div className="flex flex-1">
        
        {/* 🧭 Sidebar – dunkel, keine Ränder */}
        <div className="w-64 bg-[#1c1c22]">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeSource={activeSource}
            setActiveSource={setActiveSource}
          />
        </div>

        {/* 📄 Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#24232a] p-6">
          {children}
        </div>

      </div>
    </div>
  )
}

export default MainLayout
