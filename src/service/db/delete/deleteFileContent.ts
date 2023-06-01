import { FileContent, IFileContent } from "../../../model/fileContent";
import { Response } from "../../../types/Response";
export async function deleteFileContent(
  fileId: number,
  updatedData: Partial<IFileContent>
): Promise<Response | null> {
  try {
    const fileContent = await FileContent.deleteOne({ fileId });
    return {
      type: "Success",
      statusCode: 200,
      message: "File deleted successfully",
      response: fileContent,
    };
  } catch (error) {
    console.error("Error updating file content:", error);
    return {
      type: "Error",
      message: "Error deleting file content",
      statusCode: 500,
    };
  }
}
