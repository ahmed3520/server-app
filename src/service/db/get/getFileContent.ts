import { FileContent, IFileContent } from "../../../model/fileContent";
import { Response } from "../../../types/Response";

export async function getFileContent(fileId: number): Promise<Response> {
  try {
    const fileContent = await FileContent.findOne({ fileId });
    return {
      type: "Success",
      statusCode: 200,
      message: "File content retrieved successfully",
      response: fileContent,
    };
  } catch (error) {
    console.error("Error retrieving file content:", error);
    return {
      type: "Error",
      message: "Error retrieving file content",
      statusCode: 500,
    };
  }
}
