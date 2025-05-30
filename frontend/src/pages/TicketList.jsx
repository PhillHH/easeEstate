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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created_at"); // Standard: nach Erstellungsdatum
  const [filterObjekt, setFilterObjekt] = useState("alle");
  const [filterPrioritaet, setFilterPrioritaet] = useState("alle");

  // 📥 Tickets vom Backend laden
  useEffect(() => {
    getAllTickets().then((data) => {
      setTickets(data);
    });
  }, []);

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold">🎫 Ticketübersicht</h1>

      {/* 🔍 Such-, Sortier- und Filterleiste */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-6 w-[85%] mx-auto">
        <input
          type="text"
          placeholder="🔍 Suche nach Titel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-[45%]"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="created_at">📅 Erstellungsdatum</option>
          <option value="updated_at">🔁 Zuletzt aktualisiert</option>
          <option value="title">🔠 Titel (A–Z)</option>
        </select>

        <select
          value={filterObjekt}
          onChange={(e) => setFilterObjekt(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="alle">🏢 Alle Objekte</option>
          <option value="haus1">Haus 1</option>
          <option value="haus2">Haus 2</option>
        </select>

        <select
          value={filterPrioritaet}
          onChange={(e) => setFilterPrioritaet(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="alle">⚙️ Alle Prioritäten</option>
          <option value="hoch">Hoch</option>
          <option value="mittel">Mittel</option>
          <option value="niedrig">Niedrig</option>
        </select>
      </div>

      {/* 🧱 Grauer Container für die Karten */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg mt-6 px-8 py-4 w-[85%] mx-auto max-h-[65vh] overflow-y-auto">
        {tickets
          .filter((ticket) =>
            ticket.title?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((ticket) =>
            filterObjekt === "alle" ? true : ticket.objekt === filterObjekt
          )
          .filter((ticket) =>
            filterPrioritaet === "alle" ? true : ticket.prioritaet === filterPrioritaet
          )
          .sort((a, b) => {
            if (sortBy === "title") {
              return a.title?.localeCompare(b.title);
            }
            if (sortBy === "updated_at") {
              return new Date(b.updated_at) - new Date(a.updated_at);
            }
            return new Date(b.created_at) - new Date(a.created_at);
          })
          .map((ticket) => {
            const statusProps = getStatusProps(ticket.state);

            return (
              <React.Fragment key={ticket.id}>
                {/* 🎟️ Einzelne Ticketkarte */}
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-md hover:shadow-lg transition flex justify-between items-start">
                  {/* 🧱 Linke Seite */}
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

                  {/* 🧱 Rechte Seite */}
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

                {/* 📏 Abstand zwischen Karten */}
                <div style={{ height: "24px" }}></div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default TicketList;
