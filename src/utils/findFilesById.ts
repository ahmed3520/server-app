import ExplorerItem, { IExplorerItem } from "../model/foldersPath";

async function getFilesInFolder(
  folderId: number
): Promise<IExplorerItem[] | null> {
  try {
    const folder = await ExplorerItem.findOne({ id: folderId });
    if (!folder || !folder.isFolder) {
      return null;
    }

    const files = await ExplorerItem.find({
      parentId: folderId,
      isFolder: false,
    });
    return files;
  } catch (error) {
    return null;
  }
}
