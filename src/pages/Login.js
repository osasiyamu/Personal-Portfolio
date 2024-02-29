import '../assets/css/join.css';

import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, []);

    return (
        <div>
            <div id="pageHeading">
                <h1>Welcome Back!</h1>
            </div>
        
            <div id="signUpC">
                <form method="post" action="" id="signupForm">
                
                <label>UserID:</label>
                <input type="email" id="username" name="username" required />
        
                <label>Password:</label>
                <input type= "password" id="password" name="password" required />
                
                <h6>Don't have an account? <a href="/join">Sign up here</a></h6>

                <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
