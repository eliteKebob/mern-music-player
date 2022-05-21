import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const baglanti = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO DB baglandi ${baglanti.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
