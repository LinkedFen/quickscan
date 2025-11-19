const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/index.html');
const mainJsPath = path.join(__dirname, '../src/main.js');
const stylePath = path.join(__dirname, '../src/style.css');
const chartingPath = path.join(__dirname, '../src/charting.js');
const pdfExportPath = path.join(__dirname, '../src/pdfExport.js');
const appTemplatePath = path.join(__dirname, '../src/appTemplate.js');

describe('File Structure Tests', () => {
    test('Index HTML exists', () => {
        expect(fs.existsSync(indexPath)).toBe(true);
    });

    test('Main JS exists', () => {
        expect(fs.existsSync(mainJsPath)).toBe(true);
    });

    test('Style CSS exists', () => {
        expect(fs.existsSync(stylePath)).toBe(true);
    });

    test('Charting JS exists', () => {
        expect(fs.existsSync(chartingPath)).toBe(true);
    });

    test('PDF Export JS exists', () => {
        expect(fs.existsSync(pdfExportPath)).toBe(true);
    });

    test('App Template JS exists', () => {
        expect(fs.existsSync(appTemplatePath)).toBe(true);
    });
});

describe('Index HTML Content Tests', () => {
    let htmlContent;

    beforeAll(() => {
        htmlContent = fs.readFileSync(indexPath, 'utf-8');
    });

    test('Index HTML contains app div', () => {
        expect(htmlContent).toContain('<div id="app">');
    });

    test('Index HTML loads main.js', () => {
        expect(htmlContent).toContain('main.js');
    });

    test('Index HTML has correct title', () => {
        expect(htmlContent).toContain('Quick Scan Logistieke Ketenvolwassenheid');
    });

    test('Index HTML has correct language', () => {
        expect(htmlContent).toContain('lang="nl"');
    });

    test('Index HTML has viewport meta tag', () => {
        expect(htmlContent).toContain('name="viewport"');
    });
});

describe('Main JS Content Tests', () => {
    let mainJsContent;

    beforeAll(() => {
        mainJsContent = fs.readFileSync(mainJsPath, 'utf-8');
    });

    test('Main JS imports style.css', () => {
        expect(mainJsContent).toContain('import "./style.css"');
    });

    test('Main JS imports appTemplate', () => {
        expect(mainJsContent).toContain('import { appTemplate } from "./appTemplate"');
    });

    test('Main JS imports renderRadarChart', () => {
        expect(mainJsContent).toContain('import { renderRadarChart } from "./charting"');
    });

    test('Main JS imports exportResultsPdf', () => {
        expect(mainJsContent).toContain('import { exportResultsPdf } from "./pdfExport"');
    });

    test('Main JS defines DIMENSIONS array', () => {
        expect(mainJsContent).toContain('const DIMENSIONS = [');
    });

    test('Main JS contains all 5 dimensions', () => {
        expect(mainJsContent).toContain('key: "warehouse"');
        expect(mainJsContent).toContain('key: "transport"');
        expect(mainJsContent).toContain('key: "planning"');
        expect(mainJsContent).toContain('key: "itdata"');
        expect(mainJsContent).toContain('key: "collab"');
    });
});

describe('Charting JS Content Tests', () => {
    let chartingContent;

    beforeAll(() => {
        chartingContent = fs.readFileSync(chartingPath, 'utf-8');
    });

    test('Charting JS imports Chart.js', () => {
        expect(chartingContent).toContain('import Chart from "chart.js/auto"');
    });

    test('Charting JS exports renderRadarChart function', () => {
        expect(chartingContent).toContain('export function renderRadarChart');
    });

    test('Charting JS creates radar chart', () => {
        expect(chartingContent).toContain('type: "radar"');
    });
});

describe('PDF Export JS Content Tests', () => {
    let pdfExportContent;

    beforeAll(() => {
        pdfExportContent = fs.readFileSync(pdfExportPath, 'utf-8');
    });

    test('PDF Export JS imports html2canvas', () => {
        expect(pdfExportContent).toContain('import html2canvas from "html2canvas"');
    });

    test('PDF Export JS imports jsPDF', () => {
        expect(pdfExportContent).toContain('import { jsPDF } from "jspdf"');
    });

    test('PDF Export JS exports exportResultsPdf function', () => {
        expect(pdfExportContent).toContain('export async function exportResultsPdf');
    });

    test('PDF Export JS defines file name', () => {
        expect(pdfExportContent).toContain('FILE_NAME');
    });
});

describe('App Template Content Tests', () => {
    let appTemplateContent;

    beforeAll(() => {
        appTemplateContent = fs.readFileSync(appTemplatePath, 'utf-8');
    });

    test('App Template exports appTemplate', () => {
        expect(appTemplateContent).toContain('export const appTemplate');
    });

    test('App Template contains header', () => {
        expect(appTemplateContent).toContain('<header>');
    });

    test('App Template contains dimensions container', () => {
        expect(appTemplateContent).toContain('dimensions-container');
    });

    test('App Template contains results section', () => {
        expect(appTemplateContent).toContain('results-section');
    });

    test('App Template contains radar chart canvas', () => {
        expect(appTemplateContent).toContain('radarChart');
    });

    test('App Template contains download PDF button', () => {
        expect(appTemplateContent).toContain('download-pdf');
    });
});