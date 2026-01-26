const fs = require('fs');
const path = require('path');

describe('index.html structure', () => {
  let documentRoot;

  beforeAll(() => {
    const html = fs.readFileSync(
      path.join(__dirname, '..', 'index.html'),
      'utf8'
    );
    const dom = new DOMParser().parseFromString(html, 'text/html');
    documentRoot = dom;
  });

  test('pins Chart.js to version 4.4.4', () => {
    const chartScript = documentRoot.querySelector('script[src*="chart.js"]');
    expect(chartScript).not.toBeNull();
    expect(chartScript.src).toContain('chart.js@4.4.4/dist/chart.umd.min.js');
  });

  test('contains user contact fields and consent checkbox', () => {
    expect(documentRoot.getElementById('name')).not.toBeNull();
    expect(documentRoot.getElementById('email')).not.toBeNull();
    expect(documentRoot.getElementById('consent')).not.toBeNull();
  });

  test('renders radar chart canvas placeholder', () => {
    const canvas = documentRoot.getElementById('radarChart');
    expect(canvas).not.toBeNull();
    expect(canvas.tagName).toBe('CANVAS');
  });
});
