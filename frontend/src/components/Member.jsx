import { useContext } from "react"
import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/Header.module.css"
import { useNavigate } from "react-router-dom"

const Member = () => {
  const { userData, logout } = useContext(AppLevelContext)

  const navigate = useNavigate()
  return (
    <div className={styles.mWrapper}>
      <img src={userData?.photo} alt="userphoto" />
      <p onClick={() => navigate(`/users/${userData?._id}`)}>
        {userData?.username}
      </p>
      <span onClick={() => logout()}>Logout</span>
    </div>
  )
}
export default Member
