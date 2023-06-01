import { updateFileContent } from "../../../service/db/update/updateFileContent";
export async function updatefileController(req: any, res: any): Promise<void> {
  const { fileId, updatedData } = req.body;

  const { type, message, statusCode, response } = await updateFileContent(
    fileId,
    updatedData
  );

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
