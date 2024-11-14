import { createWorker } from "tesseract.js"
import captureAndDelete from "./capture.js"

;(async () => {
  const worker = await createWorker("eng")
  const base64Image = await captureAndDelete()
  const {
    data: { text }
  } = await worker.recognize(`data:image/png;base64,${base64Image}`)
  console.log(text)
  await worker.terminate()
})()
