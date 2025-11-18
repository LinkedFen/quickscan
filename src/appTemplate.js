export const appTemplate = `
<div class="app">
  <header>
    <h1>Quick Scan Logistieke Ketenvolwassenheid</h1>
    <p>
      Beantwoord <strong>2 vragen per dimensie</strong> en vul uw <strong>naam</strong> en
      <strong>e-mailadres</strong> in. Wij schalen uw organisatie op een volwassenheidsniveau (1–5) per dimensie en
      tonen een visual met gerichte adviezen om naar het volgende niveau door te groeien. Resultaten worden pas zichtbaar
      na het volledig invullen.
    </p>
  </header>

  <main>
    <!-- Vragenlijst -->
    <section aria-label="Vragenlijst">
      <h2 class="section-title">Vragenlijst</h2>

      <div class="card">
        <h3 style="font-size:1rem;margin:0 0 10px;font-weight:600;">Contactgegevens</h3>
        <div class="grid-2">
          <div>
            <label for="name" class="field-label">Naam</label>
            <input id="name" type="text" placeholder="Voor- en achternaam" class="text-input" />
            <div id="error-name" class="error-text" style="display:none;"></div>
          </div>
          <div>
            <label for="email" class="field-label">E-mailadres</label>
            <input id="email" type="email" placeholder="naam@organisatie.nl" class="text-input" />
            <div id="error-email" class="error-text" style="display:none;"></div>
          </div>
        </div>
        <label class="checkbox-row">
          <input id="consent" type="checkbox" />
          <span>Ik ga akkoord dat Supply Value contact opneemt om de resultaten op te volgen.</span>
        </label>
        <div id="error-consent" class="error-text" style="display:none;margin-top:4px;">
          Accepteer dit om de resultaten te bekijken.
        </div>
      </div>

      <div id="dimensions-container" class="grid-2"></div>

      <div class="actions-row">
        <button id="show-results" type="button" class="btn btn-secondary">
          Toon resultaten
        </button>
        <div id="notify-status" class="status-banner" role="status" aria-live="polite"></div>
        <span id="progress-text" class="hint-text">0 van 10 vragen beantwoord.</span>
      </div>
      <div id="hint-all" class="hint-text errorish" style="margin-top:4px;display:none;">
        Beantwoord alle vragen, vul naam &amp; e-mail in en accepteer contactopname om resultaten te tonen.
      </div>
    </section>

    <!-- Resultaten -->
    <section id="results-section" aria-label="Resultaten">
      <h2 class="section-title">Uw volwassenheidsprofiel (1–5) &amp; advies</h2>

      <div id="results-grid" class="grid-2-narrow">
        <div class="card">
          <h3 style="font-size:0.95rem;margin:0 0 10px;font-weight:600;">Interactieve visualisatie</h3>
          <div style="height:320px;">
            <canvas id="radarChart"></canvas>
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
        <button id="download-pdf" type="button" class="btn btn-primary">
          Download PDF
        </button>
        <span class="hint-text">De PDF bevat de visual en samenvatting op A4-formaat.</span>
      </div>
    </section>

    <footer>
      © Supply Value – Quick Scan Logistieke Ketenvolwassenheid. Deze tool positioneert uw organisatie op vijf dimensies
      en geeft richting aan de volgende stap. Voor een verdiepende nulmeting en onderbouwde ROI-case kan een uitgebreide
      assessment worden uitgevoerd.
    </footer>
  </main>
</div>
`
