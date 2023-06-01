import { FileContent, IFileContent } from "../../../model/fileContent";
import { Response } from "../../../types/Response";
export async function createFileContent(
  fileId: number,
  title: string,
  cover: string,
  text: string
): Promise<Response> {
  try {
    const fileContent = await FileContent.create({
      fileId,
      title,
      cover,
      text,
    });
    return {
      type: "Success",
      statusCode: 200,
      message: "File content created successfully",
      response: fileContent,
    };
  } catch (error) {
    console.error("Error creating file content:", error);
    return {
      type: "Error",
      message: "Error creating file content",
      statusCode: 500,
    };
  }
}
