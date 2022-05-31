import { useContext } from 'react'
import AppLevelContext from '../context/AppLevelContext'

const Audio = () => {
  const { queue, nowPlaying, repeatMode } = useContext(AppLevelContext)
  return (
    <audio
      id="player"
      src={queue[nowPlaying]?.files}
      loop={repeatMode ? true : false}
      autoPlay
    ></audio>
  )
}

export default Audio
