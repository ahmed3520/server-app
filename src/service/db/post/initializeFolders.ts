import ExplorerItem, { IExplorerItem } from "../../../model/foldersPath";
import { Response } from "../../../types/Response";

async function createExplorerItem(data: {
  id: number;
  parentId: number | null;
  name: string;
  isFolder: boolean;
  contentId?: string;
  title?: string;
  cover?: string;
  items?: IExplorerItem[];
}): Promise<Response> {
  //const fileKey = Object.keys(file)[0];
  //const fileValue = file[fileKey];
  //console.log("file", fileValue.data);

  try {
    const explorerItem = new ExplorerItem(data);
    const savedItem = await explorerItem.save();
    return {
      type: "Success",
      statusCode: 200,
      message: "file uploaded successfully",
      response: savedItem,
    };
  } catch (err) {
    console.error(err);
    return {
      type: "Error",
      statusCode: 400,
      message: (err as Error).message,
    };
  }
}

export default createExplorerItem;
