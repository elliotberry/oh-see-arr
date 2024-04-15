import screencapture from "screencapture"
import fs from "node:fs/promises"

const capture = () => {
  return new Promise((resolve, reject) => {
    screencapture((err, imagePath) => {
      fs.readFile(imagePath).then((data) => {
        resolve([data, imagePath])
      })
    })
  })
}

const captureAndDelete = async () => {
  const [data, imagePath] = await capture()
  await fs.unlink(imagePath)
  return data.toString("base64")
}
export default captureAndDelete
