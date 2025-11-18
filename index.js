#!/usr/bin/env node

import sharp from "sharp"
import captureAndDelete from "./capture.js"
import getModel from "./get-model.js"

const loadImageFromBase64 = async (base64) => {
  const buffer = Buffer.from(base64, "base64")
  const image = await sharp(buffer).ensureAlpha()
  const { width, height } = await image.metadata()
  return {
    data: await image.raw().toBuffer(),
    width,
    height
  }
}

const main = async () => {
  const engine = await getModel()

  const base64Image = await captureAndDelete()
  const image = await loadImageFromBase64(base64Image)
  engine.loadImage(image)

  const text = engine.getText()

  process.stdout.write(text)
}

main()
