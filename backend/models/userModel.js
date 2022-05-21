import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 20,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
      minLength: 1,
    },
    photo: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    bio: {
      type: String,
      maxLength: 40,
      minLength: 1,
    },
    musics: [{ type: mongoose.Schema.ObjectId, ref: "Music" }],
    likedMusics: [{ type: mongoose.Schema.ObjectId, ref: "Music" }],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)
