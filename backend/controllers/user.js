import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Music from "../models/musicModel.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Fill all fields")
  }

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      token: generateToken(user._id),
      username: user.username,
      _id: user.id,
      photo: user.photo,
      bio: user.bio,
      musics: user.musics,
      likedMusics: user.likedMusics,
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { bio, photo } = req.body

  const fieldsToUpdate = {}
  if (photo) fieldsToUpdate.photo = photo
  if (bio) fieldsToUpdate.bio = bio

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { ...fieldsToUpdate },
    },
    { new: true }
  )

  res.status(200).json(user)
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  res.status(200).json(user)
})

const likeMusic = asyncHandler(async (req, res) => {
  const { id } = req.body
  const music = await Music.findById(id)
  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { musics: music._id },
  })
  res.status(200).json(user)
})

const getUserAddedMusics = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const musics = user.musics
  let newArr = []
  if (musics.length > 0) {
    for (let i = 0; i < musics.length; i++) {
      const item = await Music.findById(musics[i])
      newArr.push(item)
    }
  }
  res.status(200).json(newArr)
})

const getUserLikedMusics = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const likedMusics = user.likedMusics
  let newArr = []
  if (likedMusics.length > 0) {
    for (let i = 0; i < likedMusics.length; i++) {
      const item = await Music.findById(likedMusics[i])
      newArr.push(item)
    }
  }
  res.status(200).json(newArr)
})

export {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  likeMusic,
  getUserAddedMusics,
  getUserLikedMusics,
}
