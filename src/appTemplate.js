export const appTemplate = `
<div class="app">
  <header>
    <h1>Quick Scan Logistieke Ketenvolwassenheid</h1>
    <p>
      Beantwoord <strong>2 vragen per dimensie (10 vragen totaal)</strong> en ontdek direct uw volwassenheidsprofiel. 
      Wij schalen uw organisatie op een volwassenheidsniveau (1–5) per dimensie en tonen een visual met gerichte adviezen 
      om naar het volgende niveau door te groeien.
    </p>
  </header>

  <main>
    <!-- Vragenlijst -->
    <section aria-label="Vragenlijst">
      <h2 class="section-title">Vragenlijst</h2>
      
      <div class="progress-bar-container">
        <div id="progress-bar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="10">
          <div id="progress-bar-fill" class="progress-bar-fill"></div>
        </div>
        <span id="progress-text" class="progress-text" aria-live="polite">Voortgang: 0/10 voltooid</span>
      </div>

      <div id="dimensions-container" class="grid-2"></div>
      
      <div id="hint-questions" class="hint-text errorish" style="margin-top:4px;display:none;" role="alert">
        Beantwoord alle 10 vragen om uw resultaten te bekijken.
      </div>

      <!-- Contact Opt-in -->
      <div class="card contact-optin-card">
        <h3 style="font-size:1rem;margin:0 0 8px;font-weight:600;">Ontvang uw resultaten per e-mail</h3>
        <p class="optin-motivation">
          <strong>Optioneel:</strong> Vul uw gegevens in om een PDF-kopie van uw resultaten per e-mail te ontvangen 
          én maak direct een afspraak voor een <strong>gratis kennismakingsgesprek van één uur</strong> met onze supply chain experts.
        </p>
        <div class="grid-2">
          <div>
            <label for="name" class="field-label">Naam (optioneel)</label>
            <input id="name" type="text" placeholder="Voor- en achternaam" class="text-input" aria-required="false" />
            <div id="error-name" class="error-text" style="display:none;" role="alert"></div>
          </div>
          <div>
            <label for="email" class="field-label">E-mailadres (optioneel)</label>
            <input id="email" type="email" placeholder="naam@organisatie.nl" class="text-input" aria-required="false" />
            <div id="error-email" class="error-text" style="display:none;" role="alert"></div>
          </div>
        </div>
        <label class="checkbox-row">
          <input id="consent" type="checkbox" aria-required="false" />
          <span>Ik ga akkoord dat Supply Value contact opneemt om de resultaten op te volgen.</span>
        </label>
        <div class="privacy-link">
          <a href="#privacy-statement" id="privacy-link" class="link-text">Lees onze privacyverklaring</a>
        </div>
        <div id="error-consent" class="error-text" style="display:none;margin-top:4px;" role="alert">
          Accepteer de voorwaarden om uw gegevens te delen.
        </div>
      </div>

      <div class="actions-row">
        <button id="show-results" type="button" class="btn btn-secondary" aria-label="Toon volwassenheidsprofiel resultaten">
          Toon resultaten
        </button>
        <div id="notify-status" class="status-banner" role="status" aria-live="polite"></div>
      </div>
    </section>

    <!-- Resultaten -->
    <section id="results-section" aria-label="Resultaten" style="display:none;">
      <h2 class="section-title">Uw volwassenheidsprofiel (1–5) &amp; advies</h2>
      
      <div id="results-text-summary" class="card text-summary" role="region" aria-label="Tekstuele samenvatting van resultaten">
        <h3 style="font-size:0.95rem;margin:0 0 8px;font-weight:600;">Tekstuele samenvatting (voor schermlezers)</h3>
        <p id="text-summary-content" style="font-size:0.85rem;line-height:1.6;color:#374151;"></p>
      </div>

      <div id="results-grid" class="grid-2-narrow">
        <div class="card">
          <h3 style="font-size:0.95rem;margin:0 0 10px;font-weight:600;">Interactieve visualisatie</h3>
          <div style="height:380px;">
            <canvas id="radarChart" aria-label="Radar grafiek met volwassenheidsniveaus per dimensie"></canvas>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size:0.95rem;margin:0 0 10px;font-weight:600;">Advies: stap naar het volgende niveau</h3>
          <div id="dimension-results"></div>
        </div>
      </div>

      <div class="card" style="margin-top:18px;">
        <h3 style="font-size:0.95rem;margin:0 0 8px;font-weight:600;">Advies (samenvatting)</h3>
        <p id="narrative-text" style="font-size:0.9rem;line-height:1.6;color:#374151;margin:0;"></p>
      </div>

      <div class="actions-row">
        <button id="download-pdf" type="button" class="btn btn-primary" aria-label="Download resultaten als PDF">
          Download PDF
        </button>
        <span class="hint-text">De PDF bevat de visual en samenvatting op A4-formaat.</span>
      </div>
    </section>

    <!-- Privacy Statement Modal -->
    <div id="privacy-modal" class="modal" role="dialog" aria-labelledby="privacy-modal-title" aria-modal="true" style="display:none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="privacy-modal-title">Privacyverklaring</h2>
          <button id="close-privacy-modal" class="modal-close" aria-label="Sluit privacyverklaring">&times;</button>
        </div>
        <div class="modal-body">
          <h3>Doel van gegevensverzameling</h3>
          <p>
            Supply Value verzamelt uw naam en e-mailadres uitsluitend voor follow-up doeleinden. 
            Dit omvat het versturen van een PDF met uw scan resultaten en het plannen van een gratis kennismakingsgesprek 
            om uw logistieke ketenvolwassenheid verder te bespreken.
          </p>
          
          <h3>Gegevensbeheerder</h3>
          <p>
            De verantwoordelijke voor de verwerking van uw persoonsgegevens is <strong>Supply Value</strong>.
          </p>
          
          <h3>Bewaartermijn</h3>
          <p>
            Uw gegevens worden bewaard voor een periode van <strong>24 maanden</strong> na het invullen van de scan, 
            tenzij u eerder verzoekt om verwijdering of indien er een lopende zakelijke relatie bestaat.
          </p>
          
          <h3>Uw rechten</h3>
          <p>
            U heeft te allen tijde het recht om:
          </p>
          <ul>
            <li>Inzage te vragen in uw opgeslagen persoonsgegevens</li>
            <li>Correctie te vragen van onjuiste of onvolledige gegevens</li>
            <li>Verwijdering (recht op vergetelheid) van uw gegevens te verzoeken</li>
            <li>Bezwaar te maken tegen de verwerking van uw gegevens</li>
            <li>Dataportabiliteit te verzoeken (overdracht van uw gegevens)</li>
          </ul>
          <p>
            Voor het uitoefenen van deze rechten of voor vragen over onze privacyverklaring, 
            kunt u contact opnemen met Supply Value via de contactgegevens op onze website.
          </p>
          
          <h3>Gegevensbeveiliging</h3>
          <p>
            Supply Value neemt passende technische en organisatorische maatregelen om uw persoonsgegevens 
            te beschermen tegen ongeautoriseerde toegang, verlies, of misbruik.
          </p>
        </div>
      </div>
    </div>

    <footer>
      © Supply Value – Quick Scan Logistieke Ketenvolwassenheid. Deze tool positioneert uw organisatie op vijf dimensies
      en geeft richting aan de volgende stap. Voor een verdiepende nulmeting en onderbouwde ROI-case kan een uitgebreide
      assessment worden uitgevoerd.
    </footer>
  </main>
</div>
`
