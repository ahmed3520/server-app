import { nanoid } from "nanoid";
import fs from "fs";
import { Response } from "../../../types/Response";
import path = require("path");
interface File {
  data: Buffer;
  mimetype: string;
}

async function handleUploadImage(file: File): Promise<Response> {
  console.log("file===>", file);
  //const fileKey = Object.keys(file)[0];
  //const fileValue = file[fileKey];
  //console.log("file", fileValue.data);
  const imageRenamed = nanoid();
  const fileExt = file.mimetype.split("/").pop();

  try {
    await fs.promises.writeFile(
      path.resolve(__dirname, `../../../images/${imageRenamed}.${fileExt}`),
      file.data
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "file uploaded successfully",
      response: `${imageRenamed}.${fileExt}`,
    };
  } catch (err) {
    console.error(err);
    return {
      type: "Error",
      statusCode: 400,
      message: (err as Error).message,
    };
  }
}

export default handleUploadImage;
