import { getFolderCustomizedByid } from "../../../utils/getFoldersByCustomId";
import { Response } from "../../../types/Response";
import { getItemsInFolder } from "../../..//utils/findFolderById";
export async function getInFolder(folderId: string) {
  console.log("folder id=>", folderId);
  try {
    const data = await getItemsInFolder(folderId);
    console.log("");
    if (!data) {
      return { type: "Error", message: "Could not find", statusCode: 400 };
    }
    return {
      type: "Success",
      statusCode: 200,
      message: "Folders retrieved successfully",
      response: data,
    };
  } catch (error) {
    console.log("get folder error:", error);
    return { type: "Error", message: "something went wrong", statusCode: 500 };
  }
}
