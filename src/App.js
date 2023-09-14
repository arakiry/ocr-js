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

const doOCR = async (worker, imageUrl) => {
  const start = performance.now();
  const { data: { text, blocks } } = await worker.recognize(imageUrl);
  const end = performance.now();
  console.log(end - start);
  console.log(text);
  console.log(blocks);
  return text;
};

function App() {
  const [ocr, setOcr] = useState('Recognizing...');
  
  useEffect(() => {
    (async() => {
      const worker = await createWorker({
        // logger: m => console.log(m),
      });
      await worker.loadLanguage('jpn');
      await worker.initialize('jpn');

      // doOCR(worker, 'https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
      doOCR(worker, '/sample1.png').then((text) => { setOcr(text); });
      // readImage(worker, 'https://tesseract.projectnaptha.com/img/eng_bw.png').then((text) => { setOcr(text); });
    })();
  }, [ocr]);
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
