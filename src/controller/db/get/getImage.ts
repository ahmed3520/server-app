{
  /*import { getImage as getImageFromDB } from "../../../service/db/get/getImage";

export async function getImage(req: any, res: any) {
  const { imageId } = req.params;
  if (!imageId) {
    return res.status(400).json({
      type: "Error",
      message: "you need to pass image ID as param in URL.",
      statusCode: 400,
    });
  }
  const { type, message, statusCode, response } = await getImageFromDB(imageId);

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
*/
}
