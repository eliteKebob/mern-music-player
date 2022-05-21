import express from "express"
import path from "path"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import musicRoutes from "./routes/music.js"
import rateLimit from "express-rate-limit"

dotenv.config()

import connectDB from "./config/db.js"
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
app.use("/api/users", userRoutes)
app.use("/api/music", musicRoutes)

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
