const bcrypt = require('bcrypt');
const { pool } = require('../config/dbConnection');

module.exports = {
    signUp: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            // Check if the user already exists
            const userExists = await pool.query(
                "SELECT * FROM users WHERE username = $1 OR email = $2;",
                [username, email]
            );

            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: "User already exists." });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            // Insert the new user into the database
            const newUser = await pool.query(
                "INSERT INTO users (username, passwordhash, email) VALUES ($1, $2, $3) RETURNING *;",
                [username, passwordHash, email]
            );

            // Return the new user, excluding the password hash
            const { passwordhash, ...userData } = newUser.rows[0];
            res.status(201).json(userData);
        } catch (err) {
            console.error('Error executing sign-up', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    signIn: async (req, res) => {
        const { username, password } = req.body;
        try {
            // Find the user by username
            const user = await pool.query(
                "SELECT * FROM users WHERE username = $1;",
                [username]
            );

            if (user.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the password is correct
            const validPassword = await bcrypt.compare(password, user.rows[0].passwordhash);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Return success message (Consider using JWT for authentication tokens here)
            res.status(200).json({ message: 'Logged in successfully', userId: user.rows[0].userid });
        } catch (err) {
            console.error('Error executing sign-in', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
