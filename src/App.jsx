import "./App.css";
import PDFMerger from "pdf-merger-js/browser";
import React, { useState } from "react";

const App = () => {
  let [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const [page, setPage] = useState(true);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPdfFiles(files);
  };

  const handleMerge = async () => {
    const merger = new PDFMerger();

    for (const file of pdfFiles) {
      await merger.add(file);
    }

    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);
    setMergedPdfUrl(url);
    setPage(false);
  };
  const handleClose = () => {
    setPage(true);
    setPdfFiles([]);
  };
  const handleOpenTranslate = () => {
    window.takeData.ipcRenderer.send("translate-open");
  };

  return (
    <>
      {page ? (
        <div className="container d-flex flex-column align-items-center my-5">
          <div className="justify-content-center">
            <input
              className="mb-5 form-control form-control-lg "
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {pdfFiles.length === 0 ? (
            <h1 className="text-center">Add Pdf</h1>
          ) : (
            <button className="mb-3 btn btn-success" onClick={handleMerge}>
              Merge PDFs
            </button>
          )}
        </div>
      ) : (
        <>
          {mergedPdfUrl && (
            <iframe
              title="pdf-viewer"
              src={mergedPdfUrl}
              width="100%"
              height="1000vh"
            />
          )}
          <div className="row justify-content-center align-items-center">
            <button
              className="btn btn-danger d-flex justify-content-center align-items-center"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
