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
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Join";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing errors
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return; // Stop the submission if passwords don't match
        }
    
        // Define the password validation regex
        const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        // Validate the password against the policy
        if (!passwordPolicyRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.');
        return; // Stop the submission if the password doesn't meet the policy
        }

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
    
            navigate('/'); // Navigate to login page on successful sign-up
        } catch (error) {
            setError(error.message); // Set error message if there's an exception
        }
    };

    return (
        <div>
            <div id="pageHeading">
                <h1>Create a New Account</h1>
                <h3>Already have an account? <a href="/login">Sign in here</a></h3>
            </div>

            <div id="signUpC">
                <form id="signupForm" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" id="user-name" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label>Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />


                    <label>First Name:</label>
                    <input type="text" id="firstName" name="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label>Occupation:</label>
                    <input type="text" id="occupation" name="occupation" required value={occupation} onChange={(e) => setOccupation(e.target.value)} />

                    <div>
                        <input type="checkbox" id="terms_and_conds" name="checkbox" required />
                        <label htmlFor='terms_and_conds'>I accept the Terms and Conditions</label>
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
