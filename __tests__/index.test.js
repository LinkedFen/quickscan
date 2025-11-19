const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/index.html'); // Updated path

describe('Index HTML Tests', () => {
    test('Index HTML loads successfully', () => {
        expect(fs.existsSync(indexPath)).toBe(true);
    });
});