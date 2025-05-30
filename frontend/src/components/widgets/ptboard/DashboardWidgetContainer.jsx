import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DashboardWidgetContainer = ({ title, preview, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Kompakte Ansicht */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-xl border shadow p-6 cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{preview}</p>
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white p-8 shadow-2xl overflow-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{title} – Detailansicht</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ❌ Schließen
              </button>
            </div>

            {/* Detailinhalt */}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashboardWidgetContainer
