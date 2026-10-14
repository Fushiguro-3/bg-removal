import { getAuth } from '@clerk/express'

const authUser = (req, res, next) => {
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated || !userId) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized. Please log in again.'
        })
    }

    req.clerkId = userId
    next()
}

export default authUser