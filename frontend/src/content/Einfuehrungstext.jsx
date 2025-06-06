const Einfuehrungstext = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-200 font-sans">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
        easeEstate – Die Plattform für die digitale Zukunft der Immobilienprozesse
      </h1>

      <p className="mb-4 text-lg text-gray-300">
        <span className="font-semibold text-white">easeEstate</span> ist kein weiteres Tool. Es ist die Basis für eine neue Art der Zusammenarbeit zwischen Hausverwaltungen, Eigentümern und Handwerksbetrieben – intelligent, integriert, unabhängig.
      </p>

      <p className="mb-4 text-lg text-gray-300">
        Sämtliche Schritte – von der ersten Schadensmeldung bis zur vollständigen Abwicklung – laufen in klaren, synchronisierten Workflows. In Echtzeit. Über alle Kanäle hinweg.
      </p>

      <hr className="my-12 border-gray-700" />

      <h2 className="text-2xl font-semibold text-white mb-4">Zielgruppen im Fokus</h2>
      <div className="space-y-3 mb-10 text-gray-300">
        <p><span className="text-white font-medium">Hausverwaltungen:</span> Zentrale Steuerung aller Prozesse mit klaren Zuständigkeiten</p>
        <p><span className="text-white font-medium">Eigentümer & Investoren:</span> Live-Daten zu Status, Fortschritt und Kostenkontrolle</p>
        <p><span className="text-white font-medium">Handwerksbetriebe:</span> Eigenständige Projektsteuerung – auch ohne Verwaltungsbindung</p>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4">Was easeEstate besonders macht</h2>
      <ul className="space-y-3 mb-10 list-disc list-inside text-gray-300">
        <li><strong>Multikanal-System:</strong> Alle Kommunikationswege intelligent gebündelt</li>
        <li><strong>Ticketengine mit Struktur:</strong> Prozesse mit Fristen, Verantwortlichkeiten und Statusverlauf</li>
        <li><strong>Notification Layer:</strong> Automatisierte Informationen für alle Beteiligten – präzise und störungsfrei</li>
        <li><strong>Rollenspezifische Interfaces:</strong> Optimierte Oberflächen für jede Nutzergruppe</li>
        <li><strong>Autarker Handwerkermodus:</strong> Projektsteuerung auch ohne Verwaltung – mit synchronisierten Updates</li>
        <li><strong>On-Prem oder Cloud:</strong> Selbst gehostet, datensouverän, maximal erweiterbar</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">Systemarchitektur im Überblick</h2>
      <ul className="space-y-3 mb-10 list-disc list-inside text-gray-300">
        <li><strong>Frontend:</strong> React + Tailwind – komponentenbasiert, responsiv, wartbar</li>
        <li><strong>Middleware:</strong> Node.js – zentrale Steuerlogik & API-Brücke</li>
        <li><strong>Backend:</strong> Headless, mandantenfähig, performante REST-Architektur</li>
        <li><strong>Deployment:</strong> Docker, API-first, CI/CD-ready</li>
      </ul>

      <div className="mt-12 text-lg text-gray-200">
        <p className="mb-4 font-medium text-gray-100">
          easeEstate ist kein Add-on – es ist der zentrale Nerv für operative Exzellenz.
        </p>
        <p className="mb-4">
          Keine Tool-Silos. Keine Funktionsinseln. Kein Datenchaos.
        </p>
        <p className="mt-6 font-semibold text-white text-xl leading-relaxed">
          Was gestern analog war, ist heute orchestriert.<br />
          easeEstate ist bereit für den nächsten Zustand der Immobilienwelt.
        </p>
      </div>
    </div>
  );
};

export default Einfuehrungstext;
