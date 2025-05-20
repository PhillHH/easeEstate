import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from './dialog'
import TicketForm from './forms/TicketForm'

/**
 * Popup für die Ticketerstellung – lädt ausgelagertes Formular
 */
const TicketPopup = ({ activeChannel, source, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
<DialogContent className="w-full max-w-[1200px] px-0">
  <DialogHeader>
    <DialogTitle>🎟️ Ticket erstellen</DialogTitle>
  </DialogHeader>

  <div className="mt-6">
    <TicketForm
      activeChannel={activeChannel}
      source={source}
      onClose={onClose}
    />
  </div>
</DialogContent>
    </Dialog>
  )
}

export default TicketPopup
