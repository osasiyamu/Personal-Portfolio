import '../assets/css/error.css';
import { Button } from "react-bootstrap";

const PageNotFound = () => {
    return(
        <div className="error-page">
            <h1>404 - PAGE NOT FOUND</h1>
            <p>Sorry, the page you are looking for does not exist or has been moved.</p>
            <Button href="/" className='errorBtn'>HOMEPAGE</Button>
        </div>
    );
}

export default PageNotFound;
