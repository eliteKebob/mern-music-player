import styles from "../styles/Landing.module.css"
import SearchBar from "../components/SearchBar"
import RecentTracks from "../components/RecentTracks"
import Welcome from "../components/Welcome"
import MostLikedTrack from "../components/MostLikedTrack"

const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <SearchBar />
      <RecentTracks />
      <Welcome />
      <MostLikedTrack />
    </div>
  )
}
export default Landing
