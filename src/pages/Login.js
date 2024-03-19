import { useState,useEffect } from 'react';
import '../assets/css/join.css';
import { login } from '../Authentication';

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
            if (data) {
                // Assuming 'data' contains a token or an indication of successful login
                // For this example, let's assume successful login sets 'isLoggedIn' in local storage
                login(); // You might want to pass a token here if your backend provides one
                window.location.href = "/"; // Redirect to the homepage or dashboard
            }
            // Handle redirection or display success message
        } catch (error) {
            console.error("Error during sign in: ", error);
            // Ideally, show an error message to the user
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
                    <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

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
