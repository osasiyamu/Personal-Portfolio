import { useState, useEffect } from 'react';
import '../assets/css/join.css';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [error, setError] = useState(''); // State to store the error message
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Join";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing errors
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
                    firstName,
                    lastName,
                    occupation,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Could not complete sign up.');
            }

            // If sign up is successful, you might want to automatically log the user in or redirect them to the login page
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div id="pageHeading">
                <h1>Create a New Account</h1>
                <h3>Hello, let's set up your new account. Already have an account? <a href="/login">Sign in here</a></h3>
            </div>

            <div id="signUpC">
                <form id="signupForm" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label>First Name:</label>
                    <input type="text" id="firstName" name="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label>Occupation:</label>
                    <input type="text" id="occupation" name="occupation" required value={occupation} onChange={(e) => setOccupation(e.target.value)} />

                    <div>
                        <input type="checkbox" id="checkbox" name="checkbox" required />
                        <label>I accept the Terms and Conditions</label>
                    </div>
                    
                    {/* Display error message if sign up fails */}
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Join;
