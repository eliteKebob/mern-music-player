import { useContext, useEffect } from 'react'
import AppLevelContext from '../context/AppLevelContext'
import styles from '../styles/MusicPlayer.module.css'
import Audio from './Audio'
import ControlButtons from './ControlButtons'
import LikeIcon from './LikeIcon'
import Queue from './Queue'
import Volume from './Volume'
import { RiArrowDownSLine } from 'react-icons/ri'

const MusicPlayer = () => {
  const {
    queue,
    nowPlaying,
    musicPause,
    showPlayer,
    timeSlider,
    setTimeSlider,
    totalDurationMinutes,
    totalDurationSeconds,
    setTotalDurationMinutes,
    setTotalDurationSeconds,
    currentMinutes,
    currentSeconds,
    setCurrentMinutes,
    setCurrentSeconds,
    showQueue,
    fullScreen,
    setFullScreen,
  } = useContext(AppLevelContext)

  useEffect(() => {
    let mPlayer = document.getElementById('player')
    mPlayer.load()
    mPlayer.addEventListener('timeupdate', seekUpdate)
    if (!musicPause) {
      document.title = `${queue[nowPlaying]?.name} - ${queue[nowPlaying]?.artists[0]}`
    }
    // eslint-disable-next-line
  }, [queue])

  const seekUpdate = () => {
    let mPlayer = document.getElementById('player')
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
    let mPlayer = document.getElementById('player')
    let seekto = mPlayer?.duration * (e.target.value / 100)
    mPlayer.currentTime = seekto
  }

  const handleFullScreen = () => {
    if (window.innerWidth < 501) {
      setFullScreen(!fullScreen)
    }
  }

  return (
    <>
      <div className={!showPlayer ? styles.noDisplay : ''}>
        <div className={fullScreen ? styles.fsWrapper : styles.wrapper}>
          {fullScreen ? (
            <div className={styles.closeIcon}>
              <RiArrowDownSLine onClick={handleFullScreen} />
            </div>
          ) : (
            ''
          )}
          <div className={fullScreen ? styles.fsImg : styles.img}>
            <img
              src={queue[nowPlaying]?.photo}
              alt="trackphoto"
              onClick={handleFullScreen}
            />
          </div>
          <div
            className={fullScreen ? styles.fsInfo : styles.info}
            onClick={handleFullScreen}
          >
            <p>{queue[nowPlaying]?.name}</p>
            <div className={fullScreen ? styles.fsArtists : styles.artists}>
              {queue[nowPlaying]?.artists.length > 1 ? (
                queue[nowPlaying]?.artists?.map((artist, idx) => (
                  <p key={idx}>{artist}</p>
                ))
              ) : (
                <p>{queue[nowPlaying]?.artists[0]}</p>
              )}
            </div>
          </div>
          <div className={fullScreen ? styles.fsMidPanel : styles.midPanel}>
            <LikeIcon />
          </div>
          <div
            className={
              fullScreen ? styles.fsAudioControls : styles.audioControls
            }
          >
            <Audio />
            <div
              className={
                fullScreen ? styles.fsControlButtons : styles.controlButtons
              }
            >
              <ControlButtons />
            </div>
            <div
              className={fullScreen ? styles.fsTimeSlider : styles.timeSlider}
            >
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
          <div className={fullScreen ? styles.fsVolume : styles.volume}>
            <Volume />
          </div>
        </div>
      </div>
      {showQueue ? <Queue /> : ''}
    </>
  )
}
export default MusicPlayer
