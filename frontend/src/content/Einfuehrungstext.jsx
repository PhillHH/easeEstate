const Einfuehrungstext = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800 font-sans">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">
        easeEstate – Die Plattform für moderne Immobilien- und Handwerksprozesse
      </h1>

      <p className="mb-4 text-lg">
        <span className="font-medium text-gray-900">easeEstate</span> ist die digitale Plattform zur Kommunikation und Prozesssteuerung für Hausverwaltungen und Handwerksbetriebe – effizient, nachvollziehbar, kanalübergreifend.
      </p>
      <p className="mb-4 text-lg">
        Von der Schadensmeldung über die Auftragsvergabe bis zur vollständigen Abwicklung: easeEstate bringt Ordnung in komplexe Abläufe.
      </p>

      <hr className="my-12 border-gray-200" />

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Zielgruppen</h2>
      <div className="space-y-2 mb-10">
        <p><span className="font-semibold">Hausverwaltungen:</span> Zentrale Steuerung von Schadensmeldungen, Prozessen & Dienstleistern</p>
        <p><span className="font-semibold">Eigentümer & Investoren:</span> Live-Einblick in Maßnahmen, Fortschritt & Kosten</p>
        <p><span className="font-semibold">Handwerksbetriebe:</span> Eigenständige Nutzung zur Organisation von Baustellen & Teams – mit oder ohne Verwaltungsanbindung</p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warum easeEstate?</h2>
      <ul className="space-y-2 mb-10 list-disc list-inside text-gray-700">
        <li><strong>Multikanal-Kommunikation:</strong> Website & E-Mail zentral gebündelt</li>
        <li><strong>Ticketbasierter Workflow:</strong> Strukturierte Prozesse mit Zuständigkeiten & Zeitachsen</li>
        <li><strong>Benachrichtigungssystem:</strong> Automatische Updates für alle Beteiligten</li>
        <li><strong>Rollenbasierte Zugriffe:</strong> Optimiert für Verwaltung, Handwerker und Eigentümer</li>
        <li><strong>Eigenständiger Handwerkermodus:</strong> Auch ohne Verwaltung nutzbar – inkl. automatischer Auftragssynchronisierung</li>
        <li><strong>Headless & selbst gehostet:</strong> Modulare Architektur mit voller Datenhoheit</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Architektur auf den Punkt gebracht</h2>
      <ul className="space-y-2 mb-10 list-disc list-inside text-gray-700">
        <li><strong>Frontend:</strong> React – modern, performant, intuitiv</li>
        <li><strong>Middleware:</strong> Node.js – steuert Logik & Schnittstellen</li>
        <li><strong>Infrastruktur:</strong> Dockerisiert, mandantenfähig, API-first</li>
        <li><strong>Backend:</strong> Headless, performant, lokal betreibbar</li>
      </ul>

      <div className="mt-12 text-lg text-gray-800">
        <p className="mb-4 font-medium">easeEstate bringt Klarheit in Prozesse, wo bisher Unsicherheit herrschte.</p>
        <p>Keine überfrachteten Tools, keine Kommunikationsbrüche – nur transparente Abläufe, smarte Technik und echte Effizienz.</p>
        <p className="mt-6 font-semibold text-gray-900 text-xl">Bereit für den nächsten Schritt der Digitalisierung?<br />easeEstate ist die Lösung.</p>
      </div>
    </div>
  );
};

export default Einfuehrungstext;
