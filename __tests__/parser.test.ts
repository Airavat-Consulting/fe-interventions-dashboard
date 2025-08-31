import fs from 'fs';
import path from 'path';
import { parseInterventionWorkbook } from '../lib/parsers';

describe('parseInterventionWorkbook', () => {
  it('parses the sample workbook into products and settings', () => {
    const buf = fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'Intervention_Products_EU_with_ETS.xlsx'));
    const result = parseInterventionWorkbook(buf.buffer);
    expect(result.roadProducts.length).toBeGreaterThan(0);
    expect(result.seaProducts.length).toBeGreaterThan(0);
    expect(result.etsSettings.etsPriceEur).toBeGreaterThan(0);
  });
});