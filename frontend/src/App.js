import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const generateText = async () => {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setResult(data.text);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Creche System Resource Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic (e.g., How to choose a nanny)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={generateText} style={{ padding: '10px', width: '100%' }}>Generate Resource</button>
      <h3>Generated Text:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;
