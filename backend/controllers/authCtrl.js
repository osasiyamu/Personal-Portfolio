const bcrypt = require('bcrypt');
const { pool } = require('../config/dbConnection');

module.exports = {
    signUp: async (req, res) => {
        const { username, email, password, firstName, lastName, occupation } = req.body;
        try {
            // Check if the user already exists
            const userExists = await pool.query(
                "SELECT * FROM users WHERE username = $1 OR email = $2;",
                [username, email]
            );

            // Determine if the conflict is due to the username or the email
        if (userExists.rows.length > 0) {
            // Iterate through the results to find out if it's the username or email that exists
            let usernameConflict = false;
            let emailConflict = false;
            userExists.rows.forEach(row => {
                if (row.username === username) usernameConflict = true;
                if (row.email === email) emailConflict = true;
            });

            // Return specific error messages based on the conflict found
            if (usernameConflict) {
                return res.status(400).json({ message: "User already exists." });
            } else if (emailConflict) {
                return res.status(400).json({ message: "Email already taken." });
            }
        }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            // Insert the new user into the database
            const newUser = await pool.query(
                "INSERT INTO users (username, passwordhash, email) VALUES ($1, $2, $3) RETURNING userid;",
                [username, passwordHash, email]
            );

            console.log(newUser.rows[0]);
            console.log(newUser.rows[0].userid);
            const userId = newUser.rows[0].userid;

            // Insert the profile information into the Profiles table
            await pool.query(
                "INSERT INTO profiles (userid, firstname, lastname, occupation) VALUES ($1, $2, $3, $4);",
                [userId, firstName, lastName, occupation]
            );

            // Return the new user, excluding the password hash. Adjust according to what you need to return.
            res.status(201).json({
                userId: userId,
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                occupation: occupation
            });
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

            const user_id = await pool.query("SELECT userId FROM users WHERE username = $1;", [username]);
            const profile_id = await pool.query("SELECT profileId FROM profiles WHERE userId = $1;", [user_id.rows[0]["userid"]]);

            req.session.profile_id = profile_id.rows[0]["profileid"];

            // Return success message (Consider using JWT for authentication tokens here)
            res.status(200).json({ message: 'Logged in successfully', profile_id: profile_id.rows[0]["profileid"] });
        } catch (err) {
            console.error('Error executing sign-in', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
