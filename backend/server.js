const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const rateLimit = require("express-rate-limit")

const connectDB = require("./config/db.js")
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // Limit each IP to 50 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", apiLimiter)
app.use("/api/users", require("./routes/user.js"))
app.use("/api/music", require("./routes/music.js"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Sunucu çalışır durumda..."))
}

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`))
