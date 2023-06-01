import ExplorerItem from "../../../model/foldersPath";
import { Response } from "../../../types/Response";

export async function updateDirectory(
  itemId: string,
  newName: string
): Promise<Response> {
  try {
    // Find the item to be renamed
    const item = await ExplorerItem.findOne({ id: itemId });
    if (!item) {
      console.error("Invalid item ID");
      return {
        type: "Error",
        statusCode: 400,
        message: "Invalid item ID",
      };
    }

    // Update the name of the item
    item.name = newName;
    const savedItem = await item.save();

    return {
      type: "Success",
      statusCode: 200,
      message: "Item renamed successfully",
      response: savedItem,
    };
  } catch (error) {
    console.error("Failed to rename item:", error);
    return {
      type: "Error",
      statusCode: 400,
      message: (error as Error).message,
    };
  }
}
