import express from "express";
import verifyToken from "../middleware/auth";
import { uploadImageController } from "../controller/db/post/uploadImage";
import { createExplorerItemController } from "../controller/db/post/createExplorerItem";
import { getInFolderController } from "../controller/db/get/getFolders";
import { getImage } from "../service/db/get/getImage";
import { getFileContentController } from "../controller/db/get/getFileContent";
import { updatefileController } from "../controller/db/update/updateFileContent";
import { createFileContentController } from "../controller/db/post/createFileContent";
import { updateDirectoryControllerName } from "../controller/db/update/updateDirectoryname";
import {
  loginController,
  createUserController,
  validateToken,
  updateUserController,
  deleteUserController,
  getUsersController,
} from "../controller/auth";
import { updateDirectoryController } from "../controller/db/update/updateDirectory";
import { deleteDirectoryController } from "../controller/db/delete/deleteDirectory";
const router = express.Router();
router.get("/ping", (req: any, res: any) => {
  res.send("pong");
});
router.post("/login", loginController);
router.post("/create-user", verifyToken, createUserController);
router.post("/validate", verifyToken, validateToken);
router.post("/upload-image", verifyToken, uploadImageController);
router.get("/get-image/:imageId", getImage);
router.put("/update-user", verifyToken, updateUserController);
router.get("/users", verifyToken, getUsersController);
router.delete("/delete-user", verifyToken, deleteUserController);
router.delete("/delete-directory", verifyToken, deleteDirectoryController);

router.post("/init-folders", verifyToken, createExplorerItemController);
router.get("/get-items/:folderId", getInFolderController);
router.put("/update-folder", verifyToken, updateDirectoryController);
router.put("/update-name", verifyToken, updateDirectoryControllerName);
router.post("/file-content", verifyToken, createFileContentController);
router.get("/file-content/:fileId", getFileContentController);
router.put("/file-content/:fileId", verifyToken, updatefileController);

export default router;
