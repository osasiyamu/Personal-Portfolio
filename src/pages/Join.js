import '../assets/css/join.css';

import { useEffect } from 'react';

const Join = () => {
    useEffect(() => {
        document.title = "Join"
    }, []);

    return (
        <div>
            <div id="pageHeading">
                <h1>Create a New Account</h1>
                <h3>Hello, let's set up your new account. Already have an account? <a href="/login"> sign in here</a></h3>
            </div>

            <div id="signUpC">
                <form method="post" action="" id="signupForm">
                    
                    <label>Username:</label>
                    <input type="text" id="username" name="username" required />

                    <label>Email:</label>
                    <input type="text" id="email" name="email" required />

                    <label>Password:</label>
                    <input type= "password" id="password" name="password" required />

                    <div>
                        <input type="checkbox" id="checkbox" name="checkbox" required />
                        <label>I accept the Terms and Conditions</label>
                    </div>
                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Join;
