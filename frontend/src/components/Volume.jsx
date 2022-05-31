import { useState } from 'react'
import { CgPlayList } from 'react-icons/cg'
import {
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from 'react-icons/io5'
import AppLevelContext from '../context/AppLevelContext'
import { useContext } from 'react'
import styles from '../styles/MusicPlayer.module.css'

const Volume = () => {
  const { setShowQueue, showQueue } = useContext(AppLevelContext)
  const [volume, setVolume] = useState(50)

  const handleVolume = (e) => {
    let mPlayer = document.getElementById('player')
    setVolume(e.target.value)
    mPlayer.volume = volume / 100
  }

  const handleVolumeIconClick = () => {
    let mPlayer = document.getElementById('player')
    if (volume !== 0) {
      setVolume(0)
      mPlayer.volume = 0
    }
    if (volume < 1) {
      setVolume(50)
      mPlayer.volume = 0.5
    }
  }

  return (
    <>
      <CgPlayList onClick={() => setShowQueue(!showQueue)} />
      {volume < 1 ? (
        <IoVolumeMute
          className={styles.volumeSvg}
          onClick={() => handleVolumeIconClick()}
        />
      ) : (
        ''
      )}
      {volume > 0 && volume < 31 ? (
        <IoVolumeLow
          className={styles.volumeSvg}
          onClick={() => handleVolumeIconClick()}
        />
      ) : (
        ''
      )}
      {volume > 30 && volume < 75 ? (
        <IoVolumeMedium
          className={styles.volumeSvg}
          onClick={() => handleVolumeIconClick()}
        />
      ) : (
        ''
      )}
      {volume > 74 && volume < 101 ? (
        <IoVolumeHigh
          className={styles.volumeSvg}
          onClick={() => handleVolumeIconClick()}
        />
      ) : (
        ''
      )}
      <input
        type="range"
        name="volume"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => handleVolume(e)}
        className={styles.volumeInput}
      />
    </>
  )
}
export default Volume
