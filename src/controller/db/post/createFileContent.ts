import { createFileContent } from "../../../service/db/post/createFileContent";
export async function createFileContentController(
  req: any,
  res: any
): Promise<void> {
  const { fileId, title, cover, text } = req.body;
  console.log("create file id=>", fileId, title, cover, text);
  const { type, message, statusCode, response } = await createFileContent(
    fileId,
    title,
    cover,
    text
  );

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
