import styles from "../styles/Landing.module.css"
import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const { showForm, setShowForm, isLoggedIn, userData } =
    useContext(AppLevelContext)

  const navigate = useNavigate()

  return (
    <div className={styles.welcomeWrapper}>
      <div className={styles.welcomeContent}>
        <p>Publish your music now. Share with everyone.</p>
        {isLoggedIn ? (
          <button
            className={styles.btn55}
            onClick={() => navigate(`/users/${userData?._id}`)}
          >
            <span>My Profile</span>
          </button>
        ) : (
          <button
            className={styles.btn55}
            onClick={() => setShowForm(!showForm)}
          >
            <span>Sign Up</span>
          </button>
        )}
      </div>
    </div>
  )
}
export default Welcome
