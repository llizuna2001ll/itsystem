import React, {useState} from 'react';
import AuthenticationService from "../services/AuthenticationService";
import {useNavigate} from "react-router-dom";

function AuthenticationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setIsLoading(true);
        try {
            const response = await AuthenticationService.authenticate({
                username: username,
                password: password
            });
            localStorage.setItem('jwt', response.data.access_token);
            // Refresh the page instead of navigating
            window.location.reload();
        } catch (error) {
            setLoginError(error.response.data);
        }
        setIsLoading(false);
    };


    return (
        <div style={{ height: "60vh" }} className="container d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h2 className="mb-4">Admin Dashboard</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" style={{ backgroundColor: "orange" }} className="btn btn-lg mt-3">Se connecter</button>
                </form>
                {isLoading && <div className="spinner-border text-warning mt-3" role="status">
                    <span className="sr-only"></span>
                </div>}
                {loginError && <p className="text-danger mt-2">{loginError}</p>}
            </div>
        </div>
    );
}

export default AuthenticationPage;
