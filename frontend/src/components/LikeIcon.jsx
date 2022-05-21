import styles from "../styles/MusicPlayer.module.css"
import { useContext, useState, useEffect } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { IoHeart, IoHeartOutline } from "react-icons/io5"

const LikeIcon = () => {
  const { queue, nowPlaying, likeMusic, unlikeMusic, userData, isLoggedIn } =
    useContext(AppLevelContext)
  const [userLikedThisMusic, setUserLikedThisMusic] = useState(false)

  useEffect(() => {
    checkLike()
    // eslint-disable-next-line
  }, [queue])

  useEffect(() => {
    checkLike()
    // eslint-disable-next-line
  }, [nowPlaying])

  const checkLike = () => {
    if (userData?.likedMusics?.includes(queue[nowPlaying]?._id)) {
      setUserLikedThisMusic(true)
    } else {
      setUserLikedThisMusic(false)
    }
  }

  const handleLike = () => {
    if (userData?.likedMusics?.includes(queue[nowPlaying]?._id)) {
      unlikeMusic(queue[nowPlaying]?._id)
      setUserLikedThisMusic(false)
    } else {
      likeMusic(queue[nowPlaying]?._id)
      setUserLikedThisMusic(true)
    }
  }

  return (
    <>
      {userLikedThisMusic && isLoggedIn ? (
        <IoHeart onClick={() => handleLike()} className={styles.likeIcon} />
      ) : (
        ""
      )}{" "}
      {!userLikedThisMusic && isLoggedIn ? (
        <IoHeartOutline
          onClick={() => handleLike()}
          className={styles.unlikeIcon}
        />
      ) : (
        ""
      )}
    </>
  )
}
export default LikeIcon
