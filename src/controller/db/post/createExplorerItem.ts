import createExplorerItem from "../../../service/db/post/initializeFolders";
import ExplorerItem, { IExplorerItem } from "../../../model/foldersPath";

export async function createExplorerItemController(req: any, res: any) {
  const { id, parentId, name, isFolder, contentId, title, cover, items } =
    req.body;

  // Check if the required fields are present in the request body
  if (id! < 0 || !name || !isFolder) {
    console.log(id, parentId, name, isFolder, contentId, title, cover, items);
    return res.status(400).json({
      type: "Error",
      message: "Required fields are missing in the request body.",
      statusCode: 400,
    });
  }
  const data: {
    id: number;
    parentId: number | null;
    name: string;
    isFolder: boolean;
    contentId?: string;
    title?: string;
    cover?: string;
    items?: IExplorerItem[];
  } = {
    id,
    parentId: parentId || null,
    name,
    isFolder,
    contentId,
    title,
    cover,
    items,
  };
  const { type, message, statusCode, response } = await createExplorerItem(
    data
  );
  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
