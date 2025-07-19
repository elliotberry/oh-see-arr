import { createWorker } from "tesseract.js"
import captureAndDelete from "./capture.js"
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const parent = dirname(__filename);
const tessdataPath = resolve(`${parent}/tessdata`);

;(async () => {
  const worker = await createWorker("eng", 1, { options: {corePath: tessdataPath, workerPath: tessdataPath, cachePath: tessdataPath, langPath: tessdataPath, dataPath: tessdataPath}})
  const base64Image = await captureAndDelete()
  const {
    data: { text }
  } = await worker.recognize(`data:image/png;base64,${base64Image}`)
  console.log(text)
  await worker.terminate()
})()
