const mongoose = require("mongoose")

const musicSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 30,
      minLength: 2,
    },
    artists: [
      {
        type: String,
        maxLength: 20,
        minLength: 2,
      },
    ],
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/ios-8-photo-icon/ios-8-photo-icon-24.jpg",
    },
    files: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Music", musicSchema)
