import jwt from "jsonwebtoken";

// Verify the token and use it for protected routes
export const verifyJWT = (req, res, next) => {
    // Log the incoming request details
    console.log("Incoming request for verify:", JSON.stringify(req.headers, null, 2));
    
    // Extract the token from cookies or authorization header
    const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];
    
    // Log the token
    console.log("Token extracted:", token);

    // If no token is provided, return an error response
    if (!token) {
        console.log("No token provided");
        return res.status(403).json({ message: "No token provided!" });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Log the error if token verification fails
            console.log("Token verification failed:", err);
            return res.status(401).json({ message: "Unauthorized!" });
        }

        // Log the decoded token payload
        console.log("Token decoded:", decoded);

        // Attach the user ID to the request object
        req.userId = decoded.id;

        // Continue to the next middleware or route handler
        next();
    });
};
