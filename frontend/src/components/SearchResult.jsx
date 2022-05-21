import styles from "../styles/Search.module.css"
import SingleRecentTrack from "./SingleRecentTrack"
import Logo from "../assets/logo-transparent-orange.png"

const SearchResult = ({ searchResults, setShowResults, setQuery }) => {
  const handleClick = () => {
    setShowResults(false)
    setQuery("")
  }
  return (
    <div className={styles.srWrapper}>
      <div className={styles.srTitle}>
        <img src={Logo} alt="logo" />
        <p>Here is Your Search Results</p>
        <span onClick={() => handleClick()}>X</span>
      </div>
      <div className={styles.srContent}>
        {searchResults !== "" && searchResults.length > 0 ? (
          searchResults.map((result, idx) => (
            <SingleRecentTrack music={result} key={idx} />
          ))
        ) : (
          <p className={styles.noResultText}>No results were found!</p>
        )}
      </div>
    </div>
  )
}
export default SearchResult
