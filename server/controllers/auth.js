import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register function to handle user registration
export const register = (req, res) => {
    // Query to check if the username already exists in the database
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length) {
            return res.status(400).json("User already exists!");
        }

        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // Insert the new user into the database
        const insertQuery = "INSERT INTO users (`username`, `password`, `name`) VALUES (?)";
        const values = [req.body.username, hashedPassword, req.body.name];

        db.query(insertQuery, [values], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("User has been created");
        });
    });
};

// Login function to handle user login and token generation
export const login = (req, res) => {
    // Query to find the user by username
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Incorrect Username, try again.");

        // Compare the provided password with the stored hashed password
        const checkPass = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPass) return res.status(400).json("Incorrect Password, try again.");

        // Generate JWT tokens
        const accessToken = jwt.sign({ id: data[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: data[0].id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

        // Store the refresh token in the database
        const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";
        db.query(updateQuery, [refreshToken, data[0].id], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            // Exclude the password from the response
            const { password, refresh_token, ...other } = data[0];

            // Set the tokens as cookies and return the user data with accessToken and refreshToken in the response payload
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            }).cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',

            }).status(200).json({ ...other, accessToken, refreshToken });
        });
    });
};



// Function to handle refresh token and generate new access token
export const refreshToken = (req, res) => {
    // Get the refresh token from cookies or request body
    const refreshToken = req.cookies.refreshToken || req.body.token;
    console.log("Checking refresh token: " + refreshToken);
    if (!refreshToken) {
        return res.status(403).json("Refresh token is required");
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Invalid refresh token: ", err);
            return res.status(403).json("Invalid refresh token");
        }

        // Query to find the user by ID and refresh token
        const q = "SELECT * FROM users WHERE id = ? AND refresh_token = ?";
        db.query(q, [decoded.id, refreshToken], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.length === 0) {
                return res.status(403).json("Invalid refresh token");
            }

            // Generate new tokens
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

            // Update the new refresh token in the database
            const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";
            db.query(updateQuery, [newRefreshToken, decoded.id], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                // Set the new tokens as cookies and return the new access token
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict'
                }).cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict',
                }).status(200).json({ refreshToken: newRefreshToken, accessToken: newAccessToken });
            });
        });
    });
};

// Logout function to clear the refresh token
export const logout = (req, res) => {

    console.log("Incoming request for logout:", JSON.stringify(req.headers, null, 2));
    console.log("Incoming request cookies:", JSON.stringify(req.cookies, null, 2));

    // Get the refresh token from cookies
    const refreshToken = req.cookies.refreshToken;
    console.log("Refresh token extracted:", refreshToken);

    if (!refreshToken) {
        console.log("No refresh token provided");
        return res.status(400).json("No refresh token provided");
    }

    // Query to clear the refresh token from the database
    const q = "UPDATE users SET refresh_token = NULL WHERE refresh_token = ?";
    db.query(q, [refreshToken], (err, data) => {
        if (err) {
            console.log("Error clearing refresh token from database:", err);
            return res.status(500).json(err);
        }

        // Clear the cookies and return a success message
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });

        console.log("Logout successful, cookies cleared");
        return res.status(200).json("Logout successful");
    });
};
