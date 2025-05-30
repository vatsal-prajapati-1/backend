import { Router } from "express";
import {
  getAllVideos,
  getVideoById,
  publishAVideo,
  updateVideoDetails,
  updateVideoFile,
  updateVideoThumbnail,
  deleteVideo,
  getVideosByUser,
  togglePublishStatus,
  getAllVideosOfAChannel,
  getAllVideosOfACategory,
  getAllVideosOfATag,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllVideos);
router.route("/:videoId").get(getVideoById);
router.route("/user/:userId").get(getVideosByUser);
router.route("/channel/:name").get(getAllVideosOfAChannel);
router.route("/category/:name").get(getAllVideosOfACategory);
router.route("/tag/:tag").get(getAllVideosOfATag);

// Secured routes
router.route("/publish").post(
  jwtVerify,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/update-video/:videoId").patch(jwtVerify, updateVideoDetails);
router
  .route("/update-video-file/:videoId")
  .patch(jwtVerify, upload.single("videoFile"), updateVideoFile);
router
  .route("/update-thumbnail/:videoId")
  .patch(jwtVerify, upload.single("thumbnail"), updateVideoThumbnail);
router.route("/:videoId").delete(jwtVerify, deleteVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
