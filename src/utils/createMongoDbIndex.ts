import ExplorerItem, { IExplorerItem } from "../model/foldersPath";

// Create index function
export async function createAscendingIndex(): Promise<void> {
  try {
    // Get the collection
    const collection = ExplorerItem.collection;

    // Create the index
    await collection.createIndex({ id: 1 });

    console.log("Index created successfully.");
  } catch (error) {
    console.error("Failed to create index:", error);
  }
}

// Call the createAscendingIndex function
