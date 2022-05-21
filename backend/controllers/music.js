const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const Music = require("../models/musicModel.js")

const getAllMusic = asyncHandler(async (req, res) => {
  const music = await Music.find({})
  res.status(200).json(music)
})

const getMusic = asyncHandler(async (req, res) => {
  const music = await Music.findById(req.params.id).populate(
    "user",
    "_id username photo"
  )
  res.status(200).json(music)
})

const addMusic = asyncHandler(async (req, res) => {
  const { files, artists, name, photo } = req.body

  let music = await Music.create({
    files,
    artists,
    name,
    photo,
    user: req.user.id,
  })

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { musics: music._id },
    },
    { new: true }
  )

  res.status(200).json(user)
})

const deleteMusic = asyncHandler(async (req, res) => {
  let music = await Music.findByIdAndDelete(req.params.id)
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { musics: music._id },
    },
    {
      new: true,
    }
  )
  res.status(200).json(user)
})

const updateMusic = asyncHandler(async (req, res) => {
  const { files, photo, name, artists } = req.body

  const fieldsToUpdate = {}
  if (photo) fieldsToUpdate.photo = photo
  if (artists.length > 0) fieldsToUpdate.artists = artists
  if (files) fieldsToUpdate.files = files
  if (name) fieldsToUpdate.name = name
  let music = await Music.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ...fieldsToUpdate },
    },
    { new: true }
  )
  res.status(200).json(music)
})

const likeMusic = asyncHandler(async (req, res) => {
  let music = await Music.findById(req.params.id)
  let user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { likedMusics: music._id },
    },
    { new: true }
  )
  res.status(200).json(user)
})

const unlikeMusic = asyncHandler(async (req, res) => {
  let music = await Music.findById(req.params.id)
  let user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { likedMusics: music._id },
    },
    { new: true }
  )
  res.status(200).json(user)
})

const searchMusic = asyncHandler(async (req, res, next) => {
  const { query } = req.body

  if (!query) {
    return next({ message: "Track name cannot be empty", statusCode: 400 })
  }

  const musicss = await Music.find({
    name: { $regex: `${query}`, $options: "i" },
  })
    .limit(5)
    .populate("user", "_id username photo")

  res.status(200).json(musicss)
})

const recentTracks = asyncHandler(async (req, res) => {
  const tracks = await Music.find()
    .sort("-createdAt")
    .populate("user", "_id username photo")
    .limit(10)

  res.status(200).json(tracks)
})

const mostLikedTracks = asyncHandler(async (req, res) => {
  const allUsers = await User.find()

  let resp = []

  for (let i = 0; i < allUsers.length; i++) {
    resp.push(allUsers[i].likedMusics)
  }

  let merged = [].concat.apply([], resp)

  res.status(200).json(merged)
})

module.exports = {
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
}
