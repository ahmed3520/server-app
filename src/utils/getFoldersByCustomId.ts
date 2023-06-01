import ExplorerItem, { IExplorerItem } from "../model/foldersPath";

export async function getFolderCustomizedByid(
  folderId: string
): Promise<IExplorerItem | null> {
  try {
    const query = ExplorerItem.findOne({ id: folderId });
    console.log("query=>", query);
    const items = await query.exec();
    console.log("items=>", items);

    return items;
  } catch (error) {
    console.error("Failed to retrieve items:", error);
    return null;
  }
}
