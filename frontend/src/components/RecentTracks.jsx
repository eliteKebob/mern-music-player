import axios from "axios"
import { useState, useEffect } from "react"
import styles from "../styles/RecentTracks.module.css"
import Logo from "../assets/logo-blue.png"
import { toast } from "react-toastify"
import SingleRecentTrack from "./SingleRecentTrack"

const RecentTracks = () => {
  const [recentTracks, setRecentTracks] = useState("")

  const fetchRecentTracks = async () => {
    if (recentTracks === "") {
      try {
        const response = await axios.post("/api/music/recent")
        if (response.data) {
          setRecentTracks(response.data)
          console.log(response.data)
        }
      } catch (error) {
        toast.dark(
          "There was an error when getting recent tracks, try again later"
        )
      }
    } else {
      return
    }
  }

  useEffect(() => {
    fetchRecentTracks()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={Logo} alt="" />
        <p>Newest Tracks</p>
      </div>
      <div className={styles.content}>
        {recentTracks !== ""
          ? recentTracks?.map((music, idx) => (
              <SingleRecentTrack music={music} key={idx} />
            ))
          : ""}
      </div>
    </div>
  )
}
export default RecentTracks
