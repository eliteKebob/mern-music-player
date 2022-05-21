import { useContext, useState } from "react"
import AppLevelContext from "../context/AppLevelContext"
import styles from "../styles/Header.module.css"
import { BsTriangleFill, BsPersonCircle } from "react-icons/bs"
import Logo from "../assets/logo-blue.png"

const MemberForm = () => {
  const { register, login } = useContext(AppLevelContext)
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [isMember, setIsMember] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isMember) {
      try {
        login(formData)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        register(formData)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.mfWrapper}>
      <BsTriangleFill className={styles.mfWrapperSvgFirst} />
      <div className={styles.mfBrand}>
        <img src={Logo} alt="brand" />
        <p>{isMember ? "Sign In to Rhinosound" : "Sign Up to Rhinosound"}</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className={styles.btn60}>
          {isMember ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className={styles.isMember}>
        <BsPersonCircle />
        <p onClick={() => setIsMember(!isMember)}>
          {!isMember ? "Already have an account?" : "Click here to register"}
        </p>
      </div>
    </div>
  )
}
export default MemberForm
