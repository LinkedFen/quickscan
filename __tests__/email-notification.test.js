const fs = require('fs');
const path = require('path');

describe('Email Notification Setup Tests', () => {
    describe('Netlify Function', () => {
        const netlifyFunctionPath = path.join(__dirname, '../netlify/functions/quickscan-notify.js');
        let functionContent;

        beforeAll(() => {
            if (fs.existsSync(netlifyFunctionPath)) {
                functionContent = fs.readFileSync(netlifyFunctionPath, 'utf-8');
            }
        });

        test('Netlify function file exists', () => {
            expect(fs.existsSync(netlifyFunctionPath)).toBe(true);
        });

        test('Netlify function exports handler', () => {
            expect(functionContent).toContain('exports.handler');
        });

        test('Netlify function checks HTTP method', () => {
            expect(functionContent).toContain('httpMethod');
        });

        test('Netlify function validates required fields', () => {
            expect(functionContent).toContain('name');
            expect(functionContent).toContain('email');
            expect(functionContent).toContain('pdfBase64');
        });

        test('Netlify function uses environment variables', () => {
            expect(functionContent).toContain('process.env.NOTIFICATION_EMAIL');
            expect(functionContent).toContain('process.env.SENDGRID_API_KEY');
        });
    });

    describe('Vercel Function', () => {
        const vercelFunctionPath = path.join(__dirname, '../api/quickscan-notify.js');
        let functionContent;

        beforeAll(() => {
            if (fs.existsSync(vercelFunctionPath)) {
                functionContent = fs.readFileSync(vercelFunctionPath, 'utf-8');
            }
        });

        test('Vercel function file exists', () => {
            expect(fs.existsSync(vercelFunctionPath)).toBe(true);
        });

        test('Vercel function exports default handler', () => {
            expect(functionContent).toContain('export default');
            expect(functionContent).toContain('function handler');
        });

        test('Vercel function checks HTTP method', () => {
            expect(functionContent).toContain('req.method');
        });

        test('Vercel function validates required fields', () => {
            expect(functionContent).toContain('name');
            expect(functionContent).toContain('email');
            expect(functionContent).toContain('pdfBase64');
        });

        test('Vercel function uses environment variables', () => {
            expect(functionContent).toContain('process.env.NOTIFICATION_EMAIL');
            expect(functionContent).toContain('process.env.SENDGRID_API_KEY');
        });
    });

    describe('Configuration Files', () => {
        test('Netlify config file exists', () => {
            const netlifyConfigPath = path.join(__dirname, '../netlify.toml');
            expect(fs.existsSync(netlifyConfigPath)).toBe(true);
        });

        test('Vercel config file exists', () => {
            const vercelConfigPath = path.join(__dirname, '../vercel.json');
            expect(fs.existsSync(vercelConfigPath)).toBe(true);
        });

        test('Environment example file exists', () => {
            const envExamplePath = path.join(__dirname, '../.env.example');
            expect(fs.existsSync(envExamplePath)).toBe(true);
        });

        test('Netlify config contains function directory', () => {
            const netlifyConfigPath = path.join(__dirname, '../netlify.toml');
            const configContent = fs.readFileSync(netlifyConfigPath, 'utf-8');
            expect(configContent).toContain('functions');
            expect(configContent).toContain('netlify/functions');
        });

        test('Environment example contains required variables', () => {
            const envExamplePath = path.join(__dirname, '../.env.example');
            const envContent = fs.readFileSync(envExamplePath, 'utf-8');
            expect(envContent).toContain('NOTIFICATION_EMAIL');
            expect(envContent).toContain('SENDGRID_API_KEY');
            expect(envContent).toContain('FROM_EMAIL');
        });
    });

    describe('Documentation', () => {
        test('Email notification setup guide exists', () => {
            const setupGuidePath = path.join(__dirname, '../EMAIL_NOTIFICATION_SETUP.md');
            expect(fs.existsSync(setupGuidePath)).toBe(true);
        });

        test('Quick start guide exists', () => {
            const quickStartPath = path.join(__dirname, '../QUICK_START_EMAIL.md');
            expect(fs.existsSync(quickStartPath)).toBe(true);
        });

        test('README references email notification setup', () => {
            const readmePath = path.join(__dirname, '../README.md');
            const readmeContent = fs.readFileSync(readmePath, 'utf-8');
            expect(readmeContent).toContain('Email Notifications');
            expect(readmeContent).toContain('EMAIL_NOTIFICATION_SETUP.md');
        });

        test('Setup guide contains Netlify instructions', () => {
            const setupGuidePath = path.join(__dirname, '../EMAIL_NOTIFICATION_SETUP.md');
            const guideContent = fs.readFileSync(setupGuidePath, 'utf-8');
            expect(guideContent).toContain('Netlify');
            expect(guideContent).toContain('SendGrid');
        });

        test('Setup guide contains Vercel instructions', () => {
            const setupGuidePath = path.join(__dirname, '../EMAIL_NOTIFICATION_SETUP.md');
            const guideContent = fs.readFileSync(setupGuidePath, 'utf-8');
            expect(guideContent).toContain('Vercel');
        });
    });

    describe('Package Configuration', () => {
        test('Package.json includes SendGrid as optional dependency', () => {
            const packagePath = path.join(__dirname, '../package.json');
            const packageContent = fs.readFileSync(packagePath, 'utf-8');
            const packageJson = JSON.parse(packageContent);
            expect(packageJson.optionalDependencies).toBeDefined();
            expect(packageJson.optionalDependencies['@sendgrid/mail']).toBeDefined();
        });
    });
});
