import { getFileExtension, isCSVFile, convertCsvToJSON } from "./utils"

describe("Utils Test", () => {


  it("Should return filename extension", () => {
    const htmlFile = 'index.html';
    const cssFile = 'style.css';
    const csvFile = 'data.csv';

    const htmlExtension = getFileExtension(htmlFile);
    expect(htmlExtension).toEqual('html');

    const files = [
      { name: cssFile, extension: 'css' },
      { name: csvFile, extension: 'csv' },
    ];

    files.forEach(file => {
      expect(getFileExtension(file.name)).toEqual(file.extension);
    });
  });

  it('Should return undefined for file without name', () => {
    const extension = getFileExtension();
    expect(extension).toEqual("");
  })

  it("Should be true for CSV File", () => {
    const file = {
      name: 'data.csv'
    }
    expect(isCSVFile(file)).toBeTruthy()
  });

  it("Should be false for NON CSV File", () => {
    const file = {
      name: 'data.html'
    }
    expect(isCSVFile(file)).toBeFalsy()
  });

  it("Should return headers and data", () => {
    const SAMPLE_DATA = `Name,Job
    Kalyan,UI Developer
    Samina,Web Engineer
    Muskan,UI Intern
    `
    const { headers, data } = convertCsvToJSON(SAMPLE_DATA); // { headers, data }
    expect(headers.length).toEqual(2);
  })


})