import styles from "../styles/Queue.module.css"
import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { FaPlayCircle } from "react-icons/fa"

const QueueItem = ({ track, idf }) => {
  const { nowPlaying, setNowPlaying } = useContext(AppLevelContext)
  return (
    <div className={styles.qWrapper}>
      <div
        className={
          idf === nowPlaying ? styles.activeQueueItem : styles.disabledQueueItem
        }
        onClick={() => setNowPlaying(idf)}
      >
        <FaPlayCircle />
        {idf + 1 + "."}
        <div className={styles.qInfo}>
          <p>{track?.name}</p>
          <p className={styles.artistName}>{track?.artists[0]}</p>
        </div>
      </div>
    </div>
  )
}
export default QueueItem
