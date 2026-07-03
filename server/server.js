// server.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const app = express()
app.use(cors())
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }))
app.use(express.json())

app.get('/', (req, res) => res.send("API Working"))
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

connectDB().catch(err => console.error("DB connection error:", err))

// only listen locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => console.log("Server running on port " + PORT))
}

export default app