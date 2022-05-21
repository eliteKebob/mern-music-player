import { useState, useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/Profile.module.css"
import { useParams } from "react-router-dom"

const EditProfile = ({ setEditMode }) => {
  const { updateUser } = useContext(AppLevelContext)
  const [epFormData, setEpFormData] = useState({
    bio: "",
    photo: "",
  })

  const params = useParams()

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (epFormData.photo !== "") {
      const data = new FormData()
      data.append("file", epFormData.photo)
      data.append("upload_preset", "zxitcnxs")
      data.append("cloud_name", "dgrgeu1mv")
      fetch("https://api.cloudinary.com/v1_1/dgrgeu1mv/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.url)
          let newFormData = {
            photo: data.url,
            bio: epFormData.bio,
          }
          updateUser(params.id, newFormData)
          setEditMode(false)
        })
        .catch((err) => console.log(err))
    }
    if (epFormData.photo === "") {
      updateUser(params.id, epFormData)
    }
  }

  const handleChange = (e) => {
    if (e.target.type === "text") {
      setEpFormData({ ...epFormData, [e.target.name]: e.target.value })
    }
    if (e.target.type === "file") {
      setEpFormData({ ...epFormData, [e.target.name]: e.target.files[0] })
    }
  }
  return (
    <div className={styles.epWrapper}>
      <div className={styles.epFormControl}>
        <span onClick={() => setEditMode(false)}>X</span>
        <p>Edit Profile</p>
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <label htmlFor="bio">Biography</label>
          <input
            type="text"
            placeholder="Your New Biography"
            name="bio"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="photo">Profile Photo</label>
          <input
            type="file"
            name="photo"
            onChange={(e) => handleChange(e)}
            accept=".png, .jpg, .jpeg"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}
export default EditProfile
