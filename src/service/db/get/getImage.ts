import fs from "fs";
import path from "path";

import { Response } from "../../../types/Response";

export async function getImage(req: any, res: any) {
  const imageId = req.params.imageId;
  const filePath = `../../../images/${imageId}`;
  const imagePath = path.join(__dirname, filePath);
  try {
    const image = await fs.promises.readFile(imagePath);
    res.set("Content-Type", "image/jpeg"); // Set the appropriate MIME type for your image
    res.send(image); // Send the image data as the response body
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to read image file");
  }
}
