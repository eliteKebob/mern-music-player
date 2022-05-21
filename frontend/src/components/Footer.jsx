import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <p>MERN Stack Music App</p>

        <a
          href="https://github.com/eliteKebob"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>

        <a
          href="https://kaanozmen.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Website
        </a>
      </div>
    </>
  )
}
export default Footer
