import { useEffect, useContext, useState } from "react"
import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/Profile.module.css"
import { useParams } from "react-router-dom"
import { AiFillEdit, AiFillPlaySquare } from "react-icons/ai"
import EditProfile from "../components/EditProfile"
import AddMusic from "../components/AddMusic"
import MusicCard from "../components/MusicCard"
import EditMusic from "../components/EditMusic"

const Profile = () => {
  const {
    getUser,
    userProfileData,
    userData,
    getUserMusics,
    userMusics,
    getUserLikedMusics,
    userLikedMusics,
  } = useContext(AppLevelContext)
  const [editMode, setEditMode] = useState(false)
  const [addMusicMode, setAddMusicMode] = useState(false)
  const [editMusicMode, setEditMusicMode] = useState(false)
  const [editMusicId, setEditMusicId] = useState("")
  const [showAdded, setShowAdded] = useState(true)

  const params = useParams()

  document.title = userProfileData?.username

  useEffect(() => {
    getUser(params.id)
    getUserMusics(params.id)
    getUserLikedMusics(params.id)
    // eslint-disable-next-line
  }, [params.id])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bgImg}></div>
        <div className={styles.userInfo}>
          <img src={userProfileData?.photo} alt="" />
          <p>{userProfileData?.username}</p>
        </div>
        <div className={styles.userBio}>
          <p>{userProfileData?.bio}</p>
        </div>
        <div className={styles.controlPanel}>
          {userProfileData._id === userData?._id ? (
            <>
              <p onClick={() => setEditMode(true)}>
                <AiFillEdit /> Edit Profile
              </p>
              <p onClick={() => setAddMusicMode(true)}>
                <AiFillPlaySquare /> Add Music
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className={styles.uaTitle}>
          <p
            className={showAdded ? styles.activeTitle : styles.disabledTitle}
            onClick={() => setShowAdded(true)}
          >
            Tracks Uploaded
          </p>
          <p
            className={!showAdded ? styles.activeTitle : styles.disabledTitle}
            onClick={() => setShowAdded(false)}
          >
            Liked Tracks
          </p>
        </div>
        <div className={styles.uaMusic}>
          {showAdded && userMusics !== ""
            ? userMusics?.map((music, idx) => (
                <MusicCard
                  music={music}
                  key={idx}
                  setEditMusicMode={setEditMusicMode}
                  setEditMusicId={setEditMusicId}
                />
              ))
            : ""}
          {!showAdded && userLikedMusics !== ""
            ? userLikedMusics?.map((music, idx) => (
                <MusicCard
                  music={music}
                  key={idx}
                  setEditMusicMode={setEditMusicMode}
                  setEditMusicId={setEditMusicId}
                />
              ))
            : ""}
        </div>
      </div>
      {editMode ? <EditProfile setEditMode={setEditMode} /> : ""}
      {addMusicMode ? <AddMusic setAddMusicMode={setAddMusicMode} /> : ""}
      {editMusicMode ? (
        <EditMusic
          setEditMusicMode={setEditMusicMode}
          editMusicId={editMusicId}
        />
      ) : (
        ""
      )}
    </>
  )
}
export default Profile
