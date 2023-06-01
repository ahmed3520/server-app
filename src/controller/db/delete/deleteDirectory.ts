import { deleteDirectory } from "../../../service/db/delete/deleteDirectory";

export async function deleteDirectoryController(req: any, res: any) {
  const { id } = req.body;

  // Check if the required fields are present in the request body
  if (id! < 0) {
    return res.status(400).json({
      type: "Error",
      message: "Required fields are missing in the request body.",
      statusCode: 400,
    });
  }

  const { type, message, statusCode } = await deleteDirectory(id);
  return res.status(statusCode).json({
    type,
    message,
  });
}
