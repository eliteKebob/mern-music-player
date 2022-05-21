import styles from "../styles/Search.module.css"
import axios from "axios"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { toast } from "react-toastify"
import SearchResult from "./SearchResult"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setSearchResults("")
    try {
      if (query !== "" || query.length > 1) {
        let config = {
          method: "post",
          url: "/api/music/search",
          data: {
            query: query,
          },
        }
        const response = await axios(config)
        if (response.data) {
          console.log(response.data)
          setSearchResults(response.data)
          setShowResults(true)
        }
      } else {
        toast.dark("Search text is too short (Minimum 2 characters)")
      }
    } catch (error) {
      toast.dark("There was an error during search, try again later")
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.barWrapper}>
        <div className={styles.formControl}>
          <div className={styles.fcSvg}>
            <FaSearch />
          </div>
          <form onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search track"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {showResults ? (
        <SearchResult
          searchResults={searchResults}
          setShowResults={setShowResults}
          setQuery={setQuery}
        />
      ) : (
        ""
      )}
    </>
  )
}
export default SearchBar
