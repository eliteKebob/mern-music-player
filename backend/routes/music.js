const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth.js")

const {
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
} = require("../controllers/music.js")

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

module.exports = router
