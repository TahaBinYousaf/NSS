const jwt = require("jsonwebtoken");
// Remove the import of tokenBlacklist here

// Accept the blacklist as a parameter instead of importing it
module.exports = (tokenBlacklist) => {
    return (req, res, next) => {
        // Check if Authorization header exists
        const authHeader = req.header("Authorization");
        if (!authHeader) return res.status(401).json({ message: "Access denied" });
        
        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Invalid token format" });
        
        // Check if the token is blacklisted (logged out)
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ message: "Token has been logged out" });
        }
        
        try {
            // Verify token with the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTime) {
                return res.status(401).json({ message: "Token has expired" });
            }
            
            // Set user information on request object
            req.user = decoded;
            next();
        } catch (error) {
            // Handle specific JWT errors
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            }
            
            // Handle any other errors
            res.status(500).json({ message: "Server error during authentication" });
        }
    };
};