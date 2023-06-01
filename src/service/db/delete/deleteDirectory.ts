import ExplorerItem from "../../../model/foldersPath";
import { getFolderCustomizedByid } from "../../../utils/getFoldersByCustomId";
import { Response } from "../../../types/Response";

export async function deleteDirectory(folderId: string): Promise<Response> {
  try {
    // Find the folder
    const folder = await getFolderCustomizedByid(folderId);
    if (!folder) {
      console.error("Invalid folder ID");
      return {
        type: "Error",
        statusCode: 400,
        message: "Invalid folder ID",
      };
    }

    // Delete the folder
    const res = await ExplorerItem.deleteOne({ _id: folder._id });
    if (!res) {
      return {
        type: "Error",
        statusCode: 400,
        message: "something went wrong",
      };
    }
    return {
      type: "Success",
      statusCode: 200,
      message: "Folder deleted successfully",
      response: res,
    };
  } catch (error) {
    console.error("Failed to delete directory:", error);
    return {
      type: "Error",
      statusCode: 400,
      message: (error as Error).message,
    };
  }
}
