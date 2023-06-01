import { getFileContent } from "../../../service/db/get/getFileContent";

export async function getFileContentController(req: any, res: any) {
  const { fileId } = req.params;
  if (!fileId) {
    return res.status(400).json({
      type: "Error",
      message: "you need to pass folderIdas param in URL.",
      statusCode: 400,
    });
  }
  const { type, message, statusCode, response } = await getFileContent(fileId);

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
