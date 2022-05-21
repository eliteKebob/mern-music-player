import styles from "../styles/RecentTracks.module.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { CgPlayListAdd, CgPlayButtonO } from "react-icons/cg"

const SingleRecentTrack = ({ music }) => {
  const { addMusicToQ, setShowPlayer, queue, setQueue, setNowPlaying } =
    useContext(AppLevelContext)
  const navigate = useNavigate()

  const handleClick = () => {
    addMusicToQ(music)
    setShowPlayer(true)
  }

  const handlePlay = () => {
    let newArr = queue
    newArr.push(music)
    setQueue(newArr)
    setNowPlaying(newArr.length - 1)
    setShowPlayer(true)
  }
  return (
    <div className={styles.stWrapper}>
      <div className={styles.musicContent}>
        <CgPlayButtonO title="Play" onClick={() => handlePlay()} />
        <CgPlayListAdd title="Add to Queue" onClick={() => handleClick()} />
        <img src={music?.photo} alt="trackphoto" />
        <div className={styles.musicInfo}>
          <p>{music?.name}</p>
          <div className={styles.artistsInfo}>
            {music?.artists?.length > 1 ? (
              music?.artists?.map((artist, idx) => (
                <p className={styles.artist} key={idx}>
                  {artist}
                  {music?.artists?.length - 1 > idx ? "," : ""}
                </p>
              ))
            ) : (
              <p className={styles.artist}>{music?.artists[0]}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.userInfo}>
        <img
          src={music?.user?.photo}
          alt="userphoto"
          onClick={() => navigate(`/users/${music?.user?._id}`)}
        />
        <p onClick={() => navigate(`/users/${music?.user?._id}`)}>
          {music?.user?.username}
        </p>
      </div>
    </div>
  )
}
export default SingleRecentTrack
