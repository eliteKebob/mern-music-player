import styles from "../styles/Loading.module.css"
import Logo from "../assets/logo-transparent-orange.png"

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img src={Logo} alt="logo" />
      <h1>Loading...</h1>
    </div>
  )
}
export default Loading
