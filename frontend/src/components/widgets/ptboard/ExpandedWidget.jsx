// 📂 src/components/widgets/ptboard/ExpandedWidget.jsx

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ExpandedWidget = ({ widget, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={widget}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#2e2b33] bg-opacity-95 flex items-center justify-center p-6"
      >
        <div className="max-w-screen-xl w-full bg-[#34303a] text-white p-8 shadow-2xl rounded">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize">Erweiterte Ansicht: {widget}</h2>
            <button onClick={onClose} className="text-sm text-gray-300 hover:text-white">
              ❌ schließen
            </button>
          </div>

          {/* 🔍 Hier kannst du je nach Widget-ID eigenen Inhalt anzeigen */}
          <div className="text-gray-300">
            Inhalt für das Widget <strong>{widget}</strong> kommt hier hin.
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExpandedWidget
