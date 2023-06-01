import ExplorerItem, { IExplorerItem } from "../../../model/foldersPath";
import { getFolderCustomizedByid } from "../../../utils/getFoldersByCustomId";
import { Response } from "../../../types/Response";
import { createFileContent } from "../post/createFileContent";
export async function updateDirectory(
  folderId: string,
  newItem: IExplorerItem
): Promise<Response> {
  try {
    // Find the parent folder
    const folder = await getFolderCustomizedByid(folderId);
    if (!folder || !folder.isFolder) {
      console.error("Invalid folder ID or not a folder");
      return {
        type: "Error",
        statusCode: 400,
        message: "Invalid folder ID or not a folder",
      };
    }
    const explorerItem = new ExplorerItem(newItem);
    const savedDir = await explorerItem.save();
    // Add the new item to the parent folder's items array
    folder.items.push(savedDir.id);
    const savedParent = await folder.save();
    //now in this condition we check if the created item is a file not a folder..
    // if it's a file then we create a content for it instead of sending a nother request from the front-end
    if (!newItem.isFolder) {
      const { type, message, statusCode, response } = await createFileContent(
        newItem.id,
        "",
        "",
        ""
      );
      if (statusCode != 200) {
        console.log("type", message, statusCode, response);
        return {
          type: "Error",
          statusCode: 400,
          message: "Error while creating a file content of the file",
        };
      }
    }
    return {
      type: "Success",
      statusCode: 200,
      message: "file updated successfully",
      response: savedParent,
    };
  } catch (error) {
    console.error("Failed to update directory:", error);
    return {
      type: "Error",
      statusCode: 400,
      message: (error as Error).message,
    };
  }
}
