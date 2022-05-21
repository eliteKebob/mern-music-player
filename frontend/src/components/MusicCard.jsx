import styles from "../styles/MusicCard.module.css"
import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { CgPlayListAdd, CgPlayButtonO, CgCloseO, CgEnter } from "react-icons/cg"

const MusicCard = ({ music, setEditMusicMode, setEditMusicId }) => {
  const {
    addMusicToQ,
    userData,
    deleteMusic,
    setShowPlayer,
    queue,
    setQueue,
    setNowPlaying,
  } = useContext(AppLevelContext)

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

  const handleDelete = () => {
    // eslint-disable-next-line
    if (window.confirm(`You want to delete ${music?.name}?`) == true) {
      deleteMusic(music._id)
    } else {
      return
    }
  }

  const handleEdit = () => {
    setEditMusicId(music?._id)
    setEditMusicMode(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={music?.photo} alt="trackphoto" />
        <div className={styles.info}>
          <p className={styles.name}>{music?.name}</p>
          <div className={styles.info2}>
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
          <div className={styles.mcControl}>
            <div className={styles.icon}>
              <CgPlayButtonO title="Play" onClick={() => handlePlay()} />
            </div>
            <div className={styles.icon}>
              <CgPlayListAdd
                title="Add to Queue"
                onClick={() => handleClick()}
              />
            </div>
            {userData?._id === music?.user ? (
              <>
                <div className={styles.icon}>
                  <CgEnter title="Update Track" onClick={() => handleEdit()} />
                </div>
                <div className={styles.icon}>
                  <CgCloseO
                    title="Delete Track"
                    onClick={() => handleDelete()}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MusicCard
