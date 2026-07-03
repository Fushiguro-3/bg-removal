// server.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

// server.js
const app = express()
app.use(cors())

// ensure DB is connected before any route runs
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB connection failed:", err.message);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
})

app.use('/api/user/webhooks', express.raw({ type: 'application/json' }))
app.use(express.json())
app.get('/', (req, res) => res.send("API Working"))
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 4000, () => console.log("Server running"))
}

export default app