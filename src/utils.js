export const getFileExtension = (filename = '') => {
  // filename = "Student Information - Sheet1.html"
  const fileTextSplit = filename.split('.'); // ['Student Information - Sheet1', 'html']
  return fileTextSplit[fileTextSplit.length - 1]; // html
};

export const isCSVFile = (file) => { 
  // file = {name: "Student Information - Sheet1.html", size: 161}
  return getFileExtension(file.name) === 'csv';
  // getFileExtension("Student Information - Sheet1.csv")
  // "html" === "csv"
};

export const getFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const { result } = event.target;
      resolve(result);
    };
    reader.onerror = (event) => {
      reject(event.target.error);
    };
    reader.readAsText(file);
  });
};

export const getFileContentByCallback = (
  file,
  onFileContentSuccess,
  onFileContentError
) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const { result } = event.target;
    onFileContentSuccess(result);
  };
  reader.onerror = (event) => {
    onFileContentError(event.target.error);
  };
  reader.readAsText(file);
};

export const convertCsvToJSON = (csvData) => {
  const [headerLine, ...dataLines] = csvData.split('\n');
  const headers = replaceCommasInLine(headerLine)
    .split(',')
    .map((word) => replaceChars(word));
  const data = dataLines.map((line) => {
    return replaceCommasInLine(line)
      .trim()
      .split(',')
      .map((word) => replaceChars(word)); // "  Syed  "
  });
  return {
    headers,
    data,
  };
};

export const replaceChars = (word) =>
  word.replaceAll('@@@', ',').replaceAll('"', '').trim();

export const replaceCommasInLine = (lineString) => {
  const quotesPositions = [];
  for (let i = 0; i < lineString.length; i++) {
    if (lineString[i] === '"') {
      quotesPositions.push(i);
    }
  }
  const commaIndexes = [];
  for (let i = 0; i < quotesPositions.length / 2; i++) {
    // i=0*2,1*2,2*2
    const startIndex = quotesPositions[i * 2];
    const endIndex = quotesPositions[i * 2 + 1];
    const word = lineString.substring(startIndex, endIndex + 1);

    word.split('').forEach((char, index) => {
      if (char === ',') {
        commaIndexes.push(index + startIndex);
      }
    });
  }

  const chars = [...lineString];
  commaIndexes.forEach((index) => {
    chars[index] = '@@@';
  });
  return chars.join('').trim();
};
