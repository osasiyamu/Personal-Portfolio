import { useState, useEffect } from 'react';
import '../assets/css/join.css';

const Join = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Join";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            // Handle redirection or display success message
        } catch (error) {
            console.error("Error during sign up: ", error);
        }
    };

    return (
        <div>
            <div id="pageHeading">
                <h1>Create a New Account</h1>
                <h3>Hello, let's set up your new account. Already have an account? <a href="/login">sign in here</a></h3>
            </div>

            <div id="signUpC">
                <form id="signupForm" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div>
                        <input type="checkbox" id="checkbox" name="checkbox" required />
                        <label>I accept the Terms and Conditions</label>
                    </div>
                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Join;
