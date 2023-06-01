import handleUploadImage from "../../../service/db/post/uploadImage";
interface File {
  data: Buffer;
  mimetype: string;
}
export async function uploadImageController(req: any, res: any) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      type: "Error",
      message: "No files were uploaded.",
      statusCode: 400,
    });
  }
  for (const f of Object.values(req.files)) {
    const { type, message, statusCode, response } = await handleUploadImage(
      f as File
    );
    console.log(statusCode, message);
    res.status(statusCode).json({
      type,
      message,
      response,
    });
    return;
  }
}
