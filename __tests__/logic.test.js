/* eslint-env jest */

global.__QUICKSCAN_NO_AUTO_INIT = true;

const {
  answers,
  DIMENSIONS,
  emailValid,
  contactValid,
  allAnsweredAndValid,
  calcResults,
  levelFromValues,
  narrativeFromResults,
  downloadPdf,
  resetAnswers
} = require('../app');

describe('form validation', () => {
  beforeEach(() => {
    resetAnswers();
    document.body.innerHTML = `
      <input id="name" value="" />
      <input id="email" value="" />
      <input id="consent" type="checkbox" />
    `;
  });

  test('emailValid validates typical email patterns', () => {
    expect(emailValid('user@example.com')).toBe(true);
    expect(emailValid(' USER@EXAMPLE.COM ')).toBe(true);
    expect(emailValid('missing-at')).toBe(false);
    expect(emailValid('user@invalid')).toBe(false);
    expect(emailValid('')).toBe(false);
  });

  test('allAnsweredAndValid requires contact details and consent', () => {
    DIMENSIONS.forEach((d) => {
      answers[d.key].q1 = 4;
      answers[d.key].q2 = 5;
    });

    document.getElementById('name').value = 'Tester';
    document.getElementById('email').value = 'tester@example.com';

    expect(allAnsweredAndValid()).toBe(false);

    document.getElementById('consent').checked = true;
    expect(allAnsweredAndValid()).toBe(true);
  });

  test('contactValid can be reused without DOM', () => {
    expect(
      contactValid({ name: 'A', email: 'a@example.com', consent: true })
    ).toBe(true);
    expect(
      contactValid({ name: '', email: 'a@example.com', consent: true })
    ).toBe(false);
    expect(contactValid({ name: 'A', email: 'bad', consent: true })).toBe(
      false
    );
  });
});

describe('scoring logic', () => {
  beforeEach(() => {
    resetAnswers();
  });

  test('levelFromValues averages answers and clamps range', () => {
    expect(levelFromValues(1, 5)).toBe(3);
    expect(levelFromValues(5, 5)).toBe(5);
    expect(levelFromValues(0, 0)).toBe(1);
  });

  test('calcResults uses dimension advice and averaging', () => {
    DIMENSIONS.forEach((d) => {
      answers[d.key].q1 = 3;
      answers[d.key].q2 = 4;
    });

    const results = calcResults();
    expect(results).toHaveLength(DIMENSIONS.length);
    const first = results[0];
    expect(first.level).toBe(4);
    expect(first.nextAdvice).toBeTruthy();
  });

  test('narrativeFromResults highlights low and high dimensions', () => {
    const results = [
      { label: 'A', level: 2 },
      { label: 'B', level: 4 },
      { label: 'C', level: 5 }
    ];

    const narrative = narrativeFromResults(results);
    expect(narrative).toContain('A');
    expect(narrative).toContain('B');
  });
});

describe('PDF generation', () => {
  beforeEach(() => {
    resetAnswers();
    document.body.innerHTML = `
      <div id="results-grid"></div>
      <div id="narrative-text">Narrative text</div>
      <input id="name" value="Tester" />
      <input id="email" value="tester@example.com" />
    `;
  });

  test('downloadPdf delegates to html2canvas and jsPDF', async () => {
    const mockCanvas = {
      toDataURL: jest.fn(() => 'data:image/png;base64,123'),
      width: 200,
      height: 100
    };

    global.html2canvas = jest.fn(() => Promise.resolve(mockCanvas));

    const addImage = jest.fn();
    const save = jest.fn();
    const setFontSize = jest.fn();
    const text = jest.fn();
    const splitTextToSize = jest.fn(() => ['line']);
    const getWidth = jest.fn(() => 400);
    const getHeight = jest.fn(() => 600);
    const addPage = jest.fn();

    global.window.jspdf = {
      jsPDF: jest.fn(() => ({
        internal: { pageSize: { getWidth, getHeight } },
        addImage,
        save,
        setFontSize,
        text,
        splitTextToSize,
        addPage
      }))
    };

    await downloadPdf([]);

    expect(global.html2canvas).toHaveBeenCalledWith(
      document.getElementById('results-grid'),
      { scale: 2 }
    );
    expect(addImage).toHaveBeenCalled();
    expect(save).toHaveBeenCalled();
  });
});
