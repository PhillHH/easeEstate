import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TicketForm from "./forms/TicketForm";

/**
 * Popup für die Ticketerstellung – lädt ausgelagertes Formular
 */
const TicketPopup = ({ activeChannel, source, onClose }) => {
  // 🧲 Dragging-Logik (Verschieben per Maus)
  const [dragging, setDragging] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const startDragging = (e) => {
    if (e.target.closest(".drag-handle")) {
      setDragging(true);
    }
  };

  const drag = (e) => {
    if (dragging) {
      setX((prevX) => prevX + e.movementX);
      setY((prevY) => prevY + e.movementY);
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* 🟡 Hintergrundoverlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        {/* 🟢 Sichtbares Popup-Fenster */}
        <Dialog.Content
          className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-50 max-w-[800px] w-[90%] bg-white rounded-xl shadow-xl border border-gray-200 p-6"
          style={{ transform: `translate(${x}px, ${y}px)` }}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseMove={drag}
        >
          {/* 🧩 Kopfzeile mit Titel und Beschreibung */}
          <Dialog.Title className="drag-handle text-xl font-bold">
            🎟️ Ticket erstellen
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mt-1 mb-4">
            Bitte fülle die Felder aus, um ein neues Ticket zu erstellen.
          </Dialog.Description>

          {/* 📋 Formular wird eingebunden */}
          <TicketForm
            activeChannel={activeChannel}
            source={source}
            onClose={onClose}
          />

          {/* ❌ Schließen-Button oben rechts */}
          <Dialog.Close asChild>
            <button
              aria-label="Schließen"
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TicketPopup;
