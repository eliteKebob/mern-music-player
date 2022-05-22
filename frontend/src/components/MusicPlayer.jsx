import { useContext, useEffect, useState } from "react"
import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/MusicPlayer.module.css"
import ControlButtons from "./ControlButtons"
import LikeIcon from "./LikeIcon"
import Queue from "./Queue"
import Volume from "./Volume"

const MusicPlayer = () => {
  const { queue, nowPlaying, musicPause, showPlayer } =
    useContext(AppLevelContext)
  const [timeSlider, setTimeSlider] = useState(0)
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0)
  const [totalDurationMinutes, setTotalDurationMinutes] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [repeatMode, setRepeatMode] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  useEffect(() => {
    let mPlayer = document.getElementById("player")
    mPlayer.load()
    mPlayer.addEventListener("timeupdate", seekUpdate)
    if (!musicPause) {
      document.title = `${queue[nowPlaying]?.name} - ${queue[nowPlaying]?.artists[0]}`
    }
    // eslint-disable-next-line
  }, [queue])

  const seekUpdate = () => {
    let mPlayer = document.getElementById("player")
    if (!isNaN(mPlayer?.duration)) {
      setTimeSlider(mPlayer?.currentTime * (100 / mPlayer?.duration))
      setCurrentMinutes(Math.floor(mPlayer?.currentTime / 60))
      setCurrentSeconds(
        Math.floor(
          mPlayer?.currentTime - Math.floor(mPlayer?.currentTime / 60) * 60
        )
      )
      setTotalDurationMinutes(Math.floor(mPlayer?.duration / 60))
      setTotalDurationSeconds(
        Math.floor(mPlayer?.duration - Math.floor(mPlayer?.duration / 60) * 60)
      )
    }
  }

  const handleSlider = (e) => {
    setTimeSlider(e.target.value)
    let mPlayer = document.getElementById("player")
    let seekto = mPlayer?.duration * (e.target.value / 100)
    mPlayer.currentTime = seekto
  }

  return (
    <>
      <div className={showPlayer ? styles.wrapper : styles.noDisplay}>
        <div className={styles.img}>
          <img src={queue[nowPlaying]?.photo} alt="trackphoto" />
        </div>
        <div className={styles.info}>
          <p>{queue[nowPlaying]?.name}</p>
          <div className={styles.artists}>
            {queue[nowPlaying]?.artists.length > 1 ? (
              queue[nowPlaying]?.artists?.map((artist, idx) => (
                <p key={idx}>{artist}</p>
              ))
            ) : (
              <p>{queue[nowPlaying]?.artists[0]}</p>
            )}
          </div>
        </div>
        <div className={styles.midPanel}>
          <LikeIcon />
        </div>
        <div className={styles.audioControls}>
          <audio
            id="player"
            src={queue[nowPlaying]?.files}
            loop={repeatMode ? true : false}
            autoPlay
          ></audio>
          <div className={styles.controlButtons}>
            <ControlButtons
              repeatMode={repeatMode}
              setRepeatMode={setRepeatMode}
            />
          </div>
          <div className={styles.timeSlider}>
            <p>
              {currentMinutes}:
              {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
            </p>
            <input
              type="range"
              name="time"
              min="0"
              max="100"
              value={timeSlider}
              onChange={(e) => handleSlider(e)}
            />
            <p>
              {totalDurationMinutes}:
              {totalDurationSeconds < 10
                ? `0${totalDurationSeconds}`
                : totalDurationSeconds}
            </p>
          </div>
        </div>
        <div className={styles.volume}>
          <Volume setShowQueue={setShowQueue} showQueue={showQueue} />
        </div>
      </div>
      {showQueue ? <Queue setShowQueue={setShowQueue} /> : ""}
    </>
  )
}
export default MusicPlayer
