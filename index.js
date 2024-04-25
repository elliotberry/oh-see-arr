import { createWorker } from 'tesseract.js';
const worker = await createWorker('eng');
import captureAndDelete from './cap.js';


(async () => {
  const base64Image = await captureAndDelete();
    const { data: { text } } = await worker.recognize(`data:image/png;base64,${base64Image}`);
    console.log(text);
    await worker.terminate();
})();
