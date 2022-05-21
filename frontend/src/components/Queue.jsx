import styles from "../styles/Queue.module.css"
import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import QueueItem from "./QueueItem"

const Queue = ({ setShowQueue }) => {
  const {
    queue,
    nowPlaying,
    setQueue,
    setNowPlaying,
    setMusicPause,
    setShowPlayer,
  } = useContext(AppLevelContext)

  const handleClear = () => {
    if (queue.length < 2) {
      let newArr = []
      setShowPlayer(false)
      setMusicPause(true)
      setQueue(newArr)
      setShowQueue(false)
    } else {
      let newArr = []
      let mPlayer = document.getElementById("audio")
      newArr.push(queue[nowPlaying])
      setNowPlaying(0)
      setQueue(newArr)
      setShowQueue(false)
      mPlayer?.play()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.list}>
          {queue?.length > 0
            ? queue?.map((track, idx) => (
                <QueueItem track={track} key={idx} idf={idx} />
              ))
            : ""}
        </div>
        <div className={styles.button}>
          <button className={styles.btn99} onClick={() => handleClear()}>
            Clear Queue
          </button>
        </div>
      </div>
    </div>
  )
}
export default Queue
