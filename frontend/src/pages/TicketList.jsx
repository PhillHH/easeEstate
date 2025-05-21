import React, { useEffect, useState } from "react";
import { getAllTickets } from "../services/ticketService";

// 🔧 Farb- und Icon-Logik für Ticketstatus
const getStatusProps = (status) => {
  const dot = <span className="mr-1 text-gray-400">•</span>;
  if (!status || typeof status !== "string") {
    return { color: "bg-gray-100 text-gray-500", icon: dot };
  }

  switch (status.toLowerCase()) {
    case "neu":
      return { color: "bg-yellow-100 text-yellow-800", icon: dot };
    case "offen":
      return { color: "bg-blue-100 text-blue-800", icon: dot };
    case "geschlossen":
      return { color: "bg-gray-200 text-gray-800", icon: dot };
    default:
      return { color: "bg-gray-100 text-gray-500", icon: dot };
  }
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets().then((data) => {
      setTickets(data);
    });
  }, []);

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold">🎫 Ticketübersicht</h1>

      <div className="flex flex-col overflow-y-auto pr-2 mt-4">
        {tickets.map((ticket) => {
          const statusProps = getStatusProps(ticket.state);

          return (
            <React.Fragment key={ticket.id}>
              {/* Karte */}
              <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-md hover:shadow-lg transition flex justify-between items-start">
                {/* Linker Bereich */}
                <div className="flex-1">
                  <div className="text-xs text-gray-400 font-mono mb-1">#{ticket.id}</div>
                  <h2 className="text-lg font-semibold">{ticket.title}</h2>
                  <hr className="my-2 border-t border-gray-200" />
                  <div className="text-sm text-gray-600">
                    Erstellt am: {new Date(ticket.created_at).toLocaleDateString()}<br />
                    Zugewiesen an: {ticket.assignee || "–"}<br />
                    Gruppe: {ticket.group_id || "–"}
                  </div>
                </div>

                {/* Rechter Bereich */}
                <div className="flex flex-col items-end text-right gap-2 min-w-[180px] ml-4">
                  <span className={`inline-flex items-center px-2 py-1 text-sm rounded ${statusProps.color}`}>
                    {statusProps.icon}
                    {ticket.state}
                  </span>
                  <div className="text-sm text-gray-600">
                    {ticket.tags?.join(", ") || "Keine Tags"}
                  </div>
                  <button className="bg-violet-600 text-white px-3 py-1 text-sm rounded hover:bg-violet-700">
                    Mehr anzeigen
                  </button>
                </div>
              </div>

              {/* HARDCODED ABSTAND */}
              <div style={{ height: "24px" }}></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TicketList;
