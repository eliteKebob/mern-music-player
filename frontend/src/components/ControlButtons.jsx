import styles from "../styles/MusicPlayer.module.css"
import { useContext, useState, useEffect } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg"
import { IoShuffle, IoPlayCircle, IoPauseCircle } from "react-icons/io5"
import { RiRepeatOneFill, RiRepeat2Fill } from "react-icons/ri"

const ControlButtons = ({ repeatMode, setRepeatMode }) => {
  const { queue, nowPlaying, setNowPlaying, musicPause, setMusicPause } =
    useContext(AppLevelContext)
  const [shuffleMode, setShuffleMode] = useState(false)

  useEffect(() => {
    let mPlayer = document.getElementById("player")
    mPlayer.load()
    mPlayer.addEventListener("ended", nextTrack)
    mPlayer.play()
    setMusicPause(false)
    // eslint-disable-next-line
  }, [nowPlaying])
  const playTrack = () => {
    let mPlayer = document.getElementById("player")
    setMusicPause(false)
    mPlayer?.play()
  }
  const prevTrack = () => {
    if (!shuffleMode) {
      if (nowPlaying > 0) {
        setNowPlaying(nowPlaying - 1)
      } else {
        setNowPlaying(queue?.length - 1)
      }
      playTrack()
    } else {
      if (queue?.length < 3) {
        if (nowPlaying > 0) {
          setNowPlaying(nowPlaying - 1)
        } else {
          setNowPlaying(queue?.length - 1)
        }
        playTrack()
      } else {
        setNowPlaying(Math.floor(Math.random() * queue?.length))
      }
    }
  }
  const handlePlay = () => {
    let mPlayer = document.getElementById("player")
    if (!musicPause) {
      setMusicPause(true)
      mPlayer?.pause()
    } else {
      playTrack()
    }
  }
  const nextTrack = () => {
    if (!shuffleMode) {
      if (nowPlaying < queue?.length - 1) {
        setNowPlaying(nowPlaying + 1)
      } else {
        setNowPlaying(0)
      }
      playTrack()
    } else {
      if (queue?.length < 3) {
        if (nowPlaying < queue?.length - 1) {
          setNowPlaying(nowPlaying + 1)
        } else {
          setNowPlaying(0)
        }
        playTrack()
      } else {
        setNowPlaying(Math.floor(Math.random() * queue?.length))
      }
    }
  }
  return (
    <>
      <IoShuffle
        className={shuffleMode ? styles.activeShuffle : styles.disabledShuffle}
        onClick={() => setShuffleMode(!shuffleMode)}
      />
      <CgPlayTrackPrev onClick={() => prevTrack()} />
      {musicPause ? (
        <IoPlayCircle
          className={styles.playpausebtn}
          onClick={() => handlePlay()}
        />
      ) : (
        <IoPauseCircle
          className={styles.playpausebtn}
          onClick={() => handlePlay()}
        />
      )}
      <CgPlayTrackNext onClick={() => nextTrack()} />
      {repeatMode ? (
        <RiRepeatOneFill
          className={styles.repeatSvg}
          onClick={() => setRepeatMode(!repeatMode)}
        />
      ) : (
        <RiRepeat2Fill
          className={styles.repeatSvg}
          onClick={() => setRepeatMode(!repeatMode)}
        />
      )}
    </>
  )
}
export default ControlButtons
