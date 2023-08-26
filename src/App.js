import React, { useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';

import './App.css';

const readImage = async (imageUrl) => {
  const { data: { text } } = await Tesseract.recognize(
    imageUrl,
    'jpn',
    // { logger: m => console.log(m) }
  )
  console.log(text);
  return text;
};

// const doOCR = async (imageUrl) => {
//   const worker = createWorker({
//     logger: m => console.log(m),
//   });
//   await worker.load(imageUrl);
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize();
//   return text;
// };

function App() {
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    (async() => {
      // doOCR('https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
      readImage('https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
    })();
  }, [ocr]);
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
