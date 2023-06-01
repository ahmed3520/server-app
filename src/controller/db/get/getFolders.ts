import { getInFolder } from "../../../service/db/get/getFolders";

export async function getInFolderController(req: any, res: any) {
  const { folderId } = req.params;
  if (!folderId) {
    return res.status(400).json({
      type: "Error",
      message: "you need to pass folderIdas param in URL.",
      statusCode: 400,
    });
  }
  const { type, message, statusCode, response } = await getInFolder(folderId);

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
