import React, { useCallback, useState, useMemo } from 'react';
import {
  isCSVFile,
  getFileContent,
  convertCsvToJSON,
} from './utils';
import './style.css';

export default function App() {
  const [fileError, setFileError] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const onFileChange = useCallback((event) => {
    const file = event.target.files[0];
    const isValidCSVFile = isCSVFile(file); // .html | !false -> true
    setFileError(!isValidCSVFile);
    console.log(file);

    if (isValidCSVFile) {
      getFileContent(file)
        .then((fileData) => {
          setCsvData(fileData);
        })
        .catch((fileError) =>
          console.log(':: ERROR READING FILE ::', fileError)
        );
    }

    // getFileContentByCallback(
    //   file,
    //   (fileData) => console.log(':: Callback based result ::', fileData),
    //   (fileError) => console.log(':: ERROR READING FILE ::', fileError)
    // );
  }, []);

  const { headers, data } = useMemo(() => {
    if (!csvData) {
      return {
        headers: [],
        data: [],
      };
    }
    return convertCsvToJSON(csvData);
    /*
    {
      headers,
      data,
    };
    */
  }, [csvData]);

  console.log(':: HEADER AND DATA ::', { headers, data });

  return (
    <div>
      <h1>CSV TO Table</h1>
      <p>
        Please upload <strong>.csv</strong> to see some magic happen :)
      </p>

      {fileError && (
        <p style={{ color: 'red' }}>Please provide correct .csv file </p>
      )}

      <input data-testid="inputFile" type="file" accept=".csv" onChange={onFileChange} />

      <table border="1">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((columns, idx) => (
            <tr key={idx}>
              {columns.map((column) => (
                <td key={column}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
