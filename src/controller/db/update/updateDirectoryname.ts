import { updateDirectory } from "../../../service/db/update/updateDirectoryname";

export async function updateDirectoryControllerName(req: any, res: any) {
  const { id, newName } = req.body;

  // Check if the required fields are present in the request body
  if (!id || !newName) {
    return res.status(400).json({
      type: "Error",
      message: "Required fields are missing in the request body.",
      statusCode: 400,
    });
  }

  const { type, message, statusCode, response } = await updateDirectory(
    id,
    newName
  );
  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
