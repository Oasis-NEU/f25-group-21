import { useState, useEffect } from "react";
import "./App.css";

function App() {

  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPdfUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
      setSelectedFile(null);
      setResponse(null);
    
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setResponse(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.response ?? "No response from server.");
    } catch (error) {
      console.error(error);
      setResponse("Error uploading or analyzing resume.");
    }
  };
  
 
  return (
    <div className="app">
      <div className="container">
        <h1>Resume Reviewer</h1>
        <p>Upload your resume to get ATS score and feedback</p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          {selectedFile && ( 
            <button type="submit" disabled={!selectedFile}>
            Analyze Resume
          </button>)
          }
         
        </form>

        {pdfUrl && selectedFile && (
          <div className="pdf-preview">
            <div className="preview-header">
              <h2>Resume Preview</h2>
              <button 
                type="button" 
                onClick={handleRemoveFile}
                className="remove-btn">
                Remove File
              </button>
            </div>
            <div className="preview-container">
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              >
              </object>
            </div>
          </div>
        )}

        {response && (
          <div className="response">
            <h2>Suggestions:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
