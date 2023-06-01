import { updateDirectory } from "../../../service/db/update/updateDirectory";
import ExplorerItem, { IExplorerItem } from "../../../model/foldersPath";

export async function updateDirectoryController(req: any, res: any) {
  const { id, newNode } = req.body;

  // Check if the required fields are present in the request body
  if (id! < 0 || !newNode) {
    return res.status(400).json({
      type: "Error",
      message: "Required fields are missing in the request body.",
      statusCode: 400,
    });
  }
  console.log("update node=>", newNode);
  const { type, message, statusCode, response } = await updateDirectory(
    id,
    newNode
  );
  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
