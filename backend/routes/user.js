const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth.js")

const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  likeMusic,
  getUserAddedMusics,
  getUserLikedMusics,
} = require("../controllers/user.js")

router.post("/", registerUser)
router.post("/login", loginUser)
router.put("/:id", protect, updateUser)
router.get("/:id", getUser)
router.put("/", protect, likeMusic)
router.get("/:id/addedmusics", getUserAddedMusics)
router.get("/:id/likedmusics", getUserLikedMusics)

module.exports = router
