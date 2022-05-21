import express from "express"

import {
  getAllMusic,
  getMusic,
  addMusic,
  deleteMusic,
  updateMusic,
  likeMusic,
  unlikeMusic,
  searchMusic,
  recentTracks,
  mostLikedTracks,
} from "../controllers/music.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllMusic)
router.get("/:id", getMusic)
router.post("/recent", recentTracks)
router.post("/mostliked", mostLikedTracks)
router.post("/search", searchMusic)
router.post("/", protect, addMusic)
router.delete("/:id", protect, deleteMusic)
router.put("/:id", protect, updateMusic)
router.put("/:id/like", protect, likeMusic)
router.put("/:id/unlike", protect, unlikeMusic)

export default router
