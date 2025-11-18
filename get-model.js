import { readFile, writeFile } from "node:fs/promises";
import {Buffer} from "node:buffer";
import { homedir } from "node:os";
import { createOCREngine } from "tesseract-wasm";
import { loadWasmBinary } from "tesseract-wasm/node";
import { resolve as resolvePath } from "node:path";
import createFolderIfItDoesNotExist from "elliotisms/createFolderIfItDoesNotExist"

const getModel = async () => {
     await createFolderIfItDoesNotExist(`${homedir()}/.oh-see-arr`)
  const wasmBinary = await loadWasmBinary();
  const engine = await createOCREngine({ wasmBinary });

  const modelPath = `${homedir()}/.oh-see-arr/eng.traineddata`;
  let model;
  try {
    model = await readFile(resolvePath(modelPath));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      const modelURL = "https://github.com/tesseract-ocr/tessdata_fast/raw/main/eng.traineddata";
      const response = await fetch(modelURL);
      if (!response.ok) {
        throw new Error(`Failed to download Tesseract model: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      await writeFile(modelPath, Buffer.from(arrayBuffer));
    } else {
      throw error;
    }
  }
  model = await readFile(resolvePath(modelPath));
  engine.loadModel(model);
  return engine;
};
export default getModel;