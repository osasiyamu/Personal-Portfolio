import { useState,useEffect } from 'react';
import '../assets/css/join.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Login";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            window.location = "/"
            localStorage.setItem("loggedIn", "true");
            // Handle redirection or display success message
        } catch (error) {
            console.error("Error during sign in: ", error);
        }
    };

    return (
        <div>
            <div id="pageHeading">
                <h1>Welcome Back!</h1>
            </div>

            <div id="signUpC">
                <form id="signupForm" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" id="user-name" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <h6>Don't have an account? <a href="/join">Sign up here</a></h6>

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
