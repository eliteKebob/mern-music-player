import styles from "../styles/EditMusic.module.css"
import { useContext, useState } from "react"
import AppLevelContext from "../context/AppLevelContext"
import Logo from "../assets/logo-blue.png"
import { toast } from "react-toastify"

const EditMusic = ({ setEditMusicMode, editMusicId }) => {
  const { updateMusic } = useContext(AppLevelContext)
  const [amMusicData, setAmMusicData] = useState({
    files: "",
    artists: [],
    name: "",
    photo: "",
  })

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.dark("Update started.")
    let newFormData = {
      files: "",
      artists: [],
      name: "",
      photo: "",
    }
    newFormData.name = amMusicData.name
    newFormData.artists = amMusicData.artists
    if (amMusicData.photo !== "") {
      const data = new FormData()
      data.append("file", amMusicData.photo)
      data.append("upload_preset", "zxitcnxs")
      data.append("cloud_name", "dgrgeu1mv")
      await fetch("https://api.cloudinary.com/v1_1/dgrgeu1mv/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          newFormData.photo = data.url
          toast.dark("Update resuming...")
        })
        .catch((err) => {
          console.log(err)
          toast.dark("Music couldn't update")
        })
    }
    if (amMusicData.files !== "") {
      const data = new FormData()
      data.append("file", amMusicData.files)
      data.append("upload_preset", "zxitcnxs")
      data.append("cloud_name", "dgrgeu1mv")
      await fetch("https://api.cloudinary.com/v1_1/dgrgeu1mv/video/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          newFormData.files = data.url
        })
        .catch((err) => {
          console.log(err)
          toast.dark("Music couldn't update")
        })
    }
    updateMusic(editMusicId, newFormData)
  }

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setAmMusicData({ ...amMusicData, [e.target.name]: e.target.files[0] })
    }
    if (e.target.name === "name") {
      setAmMusicData({ ...amMusicData, [e.target.name]: e.target.value })
    }
    if (e.target.name === "artist") {
      let newArr = amMusicData.artists
      newArr[e.target.id] = e.target.value
      setAmMusicData({ ...amMusicData, artists: newArr })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.amFormControl}>
        <span onClick={() => setEditMusicMode(false)}>X</span>
        <img src={Logo} alt="" />
        <p>Update Music(You can leave fields blank you don't want to update)</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="files">Audio File</label>
          <input
            type="file"
            name="files"
            onChange={(e) => handleChange(e)}
            accept="audio/*"
          />
          <label htmlFor="name">Track Name</label>
          <input
            type="text"
            name="name"
            placeholder="Track's name"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="artist">Artists</label>
          <div className={styles.artists}>
            <input
              type="text"
              name="artist"
              id="0"
              placeholder="Artist's Name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              name="artist"
              id="1"
              placeholder="Artist's Name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              name="artist"
              id="2"
              placeholder="Artist's Name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label htmlFor="photo">Track Image</label>
          <input
            type="file"
            name="photo"
            onChange={(e) => handleChange(e)}
            accept=".png, .jpg, .jpeg, .jfif"
          />
          <button type="submit">Update Music</button>
        </form>
      </div>
    </div>
  )
}
export default EditMusic
