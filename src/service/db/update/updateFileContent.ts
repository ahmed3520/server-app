import { FileContent, IFileContent } from "../../../model/fileContent";
import { Response } from "../../../types/Response";
export async function updateFileContent(
  fileId: number,
  updatedData: Partial<IFileContent>
): Promise<Response> {
  console.log("updated content=>", fileId, updatedData);
  if (!fileId || !updatedData) {
    return {
      type: "Error",
      statusCode: 400,
      message: "You need to pass the fileId and the new Updated document.",
    };
  }
  const fileContent = await FileContent.findOneAndUpdate(
    { fileId },
    updatedData,
    { new: true }
  );
  if (fileContent) {
    return {
      type: "Success",
      statusCode: 200,
      message: "File content updated successfully",
      response: fileContent,
    };
  } else {
    return {
      type: "Error",
      message: "Error updating file content",
      statusCode: 400,
    };
  }
}
