import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
// import Tesseract from 'tesseract.js';

import './App.css';

// const readImage = async (imageUrl) => {
//   const { data: { text } } = await Tesseract.recognize(
//     imageUrl,
//     'jpn',
//     // { rectangle: { top: 0, left: 0, width: 100, height: 100 } },
//     output
//     // { logger: m => console.log(m) }
//   )
//   console.log(text);
//   return text;
// };

const doOCR = async (imageUrl) => {
  const worker = await createWorker({
    // logger: m => console.log(m),
  });
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text, blocks } } = await worker.recognize(imageUrl);
  console.log(text);
  console.log(blocks);
  return text;
};

function App() {
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    (async() => {
      doOCR('https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
      // readImage('https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
    })();
  }, [ocr]);
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
