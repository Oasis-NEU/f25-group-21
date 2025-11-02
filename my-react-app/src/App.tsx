import { useState } from 'react'
import './App.css'
import Authentication from './supabase'
import { supabase } from './supabase'
import { parseFile } from "./parsing";


function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFile) {
      console.log('File selected:', selectedFile.name)
      // TODO: Implement file upload logic
      const blobUrl = URL.createObjectURL(selectedFile)
      const parsedResume = parseFile(blobUrl);

    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Resume Reviewer</h1>
        <p>Upload your resume to get ATS score and feedback</p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          
          {selectedFile && (
            <p>Selected: {selectedFile.name}</p>
          )}

          <button type="submit" disabled={!selectedFile}>
            Analyze Resume
          </button>
        </form>
      </div>
    </div>
  )
}

export default App;
