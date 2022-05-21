import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/Header.module.css"
import Logo from "../assets/logo-transparent-orange.png"
import { useEffect, useContext } from "react"
import { RiShieldUserFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import MemberForm from "./MemberForm"
import Member from "./Member"

const Header = () => {
  const { isLoggedIn, showForm, setShowForm } = useContext(AppLevelContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      setShowForm(false)
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.brand}>
          <img src={Logo} alt="brand" onClick={() => navigate("/")} />
          <p>RHINOSOUND</p>
        </div>
        <div className={styles.member}>
          {isLoggedIn ? (
            <Member />
          ) : (
            <>
              <RiShieldUserFill onClick={() => setShowForm(!showForm)} />
              <p onClick={() => setShowForm(!showForm)}>Sign in / Sign up</p>
            </>
          )}
        </div>
      </div>
      {showForm ? <MemberForm /> : ""}
    </>
  )
}
export default Header
