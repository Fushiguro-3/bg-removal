import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// ✅ CORS first
app.use(cors())

// ✅ Webhook route BEFORE express.json()
// Raw body needed for svix signature verification
app.use('/api/user/webhooks', express.raw({ type: 'application/json' }))

// ✅ JSON parser for all other routes
app.use(express.json())

// API routes
app.get('/', (req, res) => res.send("API Working"))
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(PORT, () => console.log("Server running on port " + PORT))