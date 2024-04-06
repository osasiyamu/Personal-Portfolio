import { useState, useEffect } from 'react';
import '../assets/css/join.css';

const Join = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        document.title = "Join";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            handleStatus(0 ,'Passwords do not match.');
            return; // Stop the submission if passwords don't match
        }
    
        // Define the password validation regex
        const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        // Validate the password against the policy
        if (!passwordPolicyRegex.test(password)) {
            handleStatus(0, 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.');
            return; // Stop the submission if the password doesn't meet the policy
        }

        fetch('http://localhost:5555/api/signup', {
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
        })
        .then(response => {
			return response.json();
		})
        .then(data => {
            const { message, statusCode } = data;
            handleStatus(statusCode, message);
        });
    };

    function handleStatus(resCode, errMsg) {
        const errorPar = document.querySelector('.errorMsg');
        console.log(resCode);
        console.log(errMsg);

        if (resCode === 200) {
            localStorage.setItem("loggedIn", "true");
            window.location.replace("/");
        } else if ([0, 400, 401].includes(resCode)) {
            errorPar.innerHTML = "Error: " + errMsg;
        } else if (resCode ===  500){
            alert("Server is currently unavailable.")
        } else {
            errorPar.innerHTML = "Error Code: " + resCode + ". An unexpected error occurred. Please try again later.";
        }
    }

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

                    <div className="checkbox-container">
                        <input type="checkbox" id="terms_and_conds" name="checkbox" required />
                        <label htmlFor='terms_and_conds'>&nbsp; I accept the Terms and Conditions</label>
                    </div>

                    {/* Display error message if sign up fails */}
                    <p className='errorMsg'></p>
                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Join;
