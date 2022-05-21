import styles from "../styles/AddMusic.module.css"
import { useContext, useState } from "react"
import AppLevelContext from "../context/AppLevelContext"
import Logo from "../assets/logo-blue.png"
import { toast } from "react-toastify"

const AddMusic = ({ setAddMusicMode }) => {
  const { addMusic } = useContext(AppLevelContext)
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
    toast.dark("Music upload started...")
    let newFormData = {
      files: "",
      artists: [],
      name: "",
      photo: "",
    }
    newFormData.name = amMusicData.name
    newFormData.artists = amMusicData.artists

    if (
      amMusicData.photo !== "" &&
      amMusicData.name !== "" &&
      amMusicData.artists !== []
    ) {
      const data = new FormData()
      data.append("file", amMusicData.photo)
      data.append("upload_preset", "zxitcnxs")
      data.append("cloud_name", "dgrgeu1mv")
      fetch("https://api.cloudinary.com/v1_1/dgrgeu1mv/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          newFormData.photo = data.url
          toast.dark("Upload resuming...")
        })
        .catch((err) => {
          console.log(err)
          toast.dark("Music couldn't upload")
        })
    }
    if (
      amMusicData.files !== "" &&
      amMusicData.name !== "" &&
      amMusicData.artists !== []
    ) {
      const data = new FormData()
      data.append("file", amMusicData.files)
      data.append("upload_preset", "zxitcnxs")
      data.append("cloud_name", "dgrgeu1mv")
      fetch("https://api.cloudinary.com/v1_1/dgrgeu1mv/video/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          newFormData.files = data.url
          addMusic(newFormData)
          setAddMusicMode(false)
        })
        .catch((err) => {
          console.log(err)
          toast.dark("Music couldn't upload")
        })
    }
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
        <span onClick={() => setAddMusicMode(false)}>X</span>
        <img src={Logo} alt="" />
        <p>Add Music</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="files">Audio File(Required)</label>
          <input
            type="file"
            name="files"
            onChange={(e) => handleChange(e)}
            accept="audio/*"
          />
          <label htmlFor="name">Track Name(Required)</label>
          <input
            type="text"
            name="name"
            placeholder="Track's Name"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="artist">Artists(Atleast one Required)</label>
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
          <label htmlFor="photo">Track Image(Required)</label>
          <input
            type="file"
            name="photo"
            onChange={(e) => handleChange(e)}
            accept=".png, .jpg, .jpeg, .jfif"
          />
          <button type="submit">Publish Music</button>
        </form>
      </div>
    </div>
  )
}
export default AddMusic
