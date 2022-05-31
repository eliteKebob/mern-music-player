import styles from '../styles/Landing.module.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { ImHeart, ImHeartBroken } from 'react-icons/im'
import { CgPlayListAdd, CgPlayButtonO } from 'react-icons/cg'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AppLevelContext from '../context/AppLevelContext'

const MostLikedTrack = () => {
  const {
    addMusicToQ,
    setShowPlayer,
    queue,
    setQueue,
    setNowPlaying,
    likeMusic,
    unlikeMusic,
    isLoggedIn,
    userData,
  } = useContext(AppLevelContext)
  const [likedTracksList, setLikedTracksList] = useState('')
  const [mostLiked, setMostLiked] = useState('')
  const [userLikedThisMusic, setUserLikedThisMusic] = useState(false)

  const navigate = useNavigate()

  const fetchTracksList = async () => {
    if (likedTracksList === '') {
      try {
        const response = await axios.post('/api/music/mostliked')
        if (response.data) {
          setLikedTracksList(response.data)
          findMostLiked()
        }
      } catch (error) {
        toast.dark(
          "There was an error getting most liked track's data, try again later"
        )
      }
    }
  }

  const findMostLiked = () => {
    let frequency = {} // array of frequency.
    let max = 0 // holds the max frequency.
    let result // holds the max frequency element.
    for (let v in likedTracksList) {
      frequency[likedTracksList[v]] = (frequency[likedTracksList[v]] || 0) + 1 // increment frequency.
      if (frequency[likedTracksList[v]] > max) {
        // is this frequency > max so far ?
        max = frequency[likedTracksList[v]] // update max.
        result = likedTracksList[v] // update result.
        fetchMusicInfo(result)
      }
    }
  }

  const fetchMusicInfo = async (id) => {
    try {
      const response = await axios.get(`/api/music/${id}`)
      if (response.data) {
        setMostLiked(response.data)
      }
    } catch (error) {
      toast.dark(
        "There was an error getting most liked track's data, try again later"
      )
    }
  }

  const handleClick = () => {
    addMusicToQ(mostLiked)
    setShowPlayer(true)
  }

  const handlePlay = () => {
    let newArr = queue
    newArr.push(mostLiked)
    setQueue(newArr)
    setNowPlaying(newArr.length - 1)
    setShowPlayer(true)
  }

  const checkLike = () => {
    if (userData?.likedMusics?.includes(mostLiked?._id)) {
      setUserLikedThisMusic(true)
    } else {
      setUserLikedThisMusic(false)
    }
  }

  const handleLike = () => {
    if (userData?.likedMusics?.includes(mostLiked?._id)) {
      unlikeMusic(mostLiked?._id)
      setUserLikedThisMusic(false)
    } else {
      likeMusic(mostLiked?._id)
      setUserLikedThisMusic(true)
    }
  }

  useEffect(() => {
    checkLike()
    // eslint-disable-next-line
  }, [mostLiked])

  useEffect(() => {
    fetchTracksList()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    findMostLiked()
    // eslint-disable-next-line
  }, [likedTracksList])

  return (
    <div className={styles.mltWrapper}>
      <div className={styles.mltTitle}>
        <ImHeart />
        <p>Most Liked Track</p>
        <ImHeart />
      </div>
      <div className={styles.mltContent}>
        {mostLiked === '' ? (
          <p className={styles.mltLoading}>Loading...</p>
        ) : (
          <div className={styles.mltTrack}>
            <img src={mostLiked?.photo} alt="trackphoto" />
            <div className={styles.mltTrackInfo}>
              <p>{mostLiked?.name}</p>
              <div className={styles.mltTrackArtists}>
                {mostLiked?.artists?.length > 1 ? (
                  mostLiked?.artists?.map((artist, idx) => (
                    <p className={styles.artist} key={idx}>
                      {artist}
                      {mostLiked?.artists?.length - 1 > idx ? ',' : ''}
                    </p>
                  ))
                ) : (
                  <p className={styles.artist}>{mostLiked?.artists[0]}</p>
                )}
              </div>
            </div>
            <div className={styles.mltUserControls}>
              <div className={styles.mltUser}>
                <img
                  src={mostLiked?.user?.photo}
                  alt="userphoto"
                  onClick={() => navigate(`/users/${mostLiked?.user?._id}`)}
                />
                <p onClick={() => navigate(`/users/${mostLiked?.user?._id}`)}>
                  {mostLiked?.user?.username}
                </p>
              </div>
              <div className={styles.mltControls}>
                <CgPlayButtonO title="Play" onClick={() => handlePlay()} />
                <CgPlayListAdd
                  title="Add to Queue"
                  onClick={() => handleClick()}
                />

                {userLikedThisMusic && isLoggedIn ? (
                  <ImHeartBroken onClick={() => handleLike()} />
                ) : (
                  ''
                )}
                {!userLikedThisMusic && isLoggedIn ? (
                  <ImHeart onClick={() => handleLike()} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default MostLikedTrack
