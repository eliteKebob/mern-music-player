import express from "express"

import {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  likeMusic,
  getUserAddedMusics,
  getUserLikedMusics,
} from "../controllers/user.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post("/", registerUser)
router.post("/login", loginUser)
router.put("/:id", protect, updateUser)
router.get("/:id", getUser)
router.put("/", protect, likeMusic)
router.get("/:id/addedmusics", getUserAddedMusics)
router.get("/:id/likedmusics", getUserLikedMusics)

export default router
