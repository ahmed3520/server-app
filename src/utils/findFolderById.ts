import UserModel from "../model/user";
import ExplorerItem, { IExplorerItem } from "../model/foldersPath";

interface IFolderResponse {
  id: number;
  parentId: number | null;
  name: string;
  isFolder: boolean;
  author?: string;
  items: IFolderResponse[];
}

export async function getItemsInFolder(
  folderId: string
): Promise<IFolderResponse | null> {
  try {
    const folder = await ExplorerItem.findOne({ id: folderId });
    if (!folder || !folder.isFolder) {
      return null;
    }

    const items = await getAllChildren(folderId);

    const json: IFolderResponse = {
      id: folder.id,
      parentId: folder.parentId,
      name: folder.name,
      isFolder: folder.isFolder,
      items: items,
      author: folder.author,
    };

    // Return the JSON object.
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getAllChildren(parentId: string): Promise<IFolderResponse[]> {
  const children = await ExplorerItem.find({ parentId: parentId });
  const childItems: IFolderResponse[] = [];

  for (const child of children) {
    const childItem: IFolderResponse = {
      id: child.id,
      parentId: child.parentId,
      name: child.name,
      isFolder: child.isFolder,
      items: await getAllChildren(child.id),
      author: child.author,
    };
    childItems.push(childItem);
  }

  return childItems;
}
