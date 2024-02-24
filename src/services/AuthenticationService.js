import axios from 'axios';

const API_URL = "http://34.196.130.64:8080/api/auth"

const AuthService = {
    register: (registerRequest) => {
        return axios.post(`${API_URL}/register`, registerRequest);
    },

    authenticate: (authenticationRequest) => {
        return axios.post(`${API_URL}/authenticate`, authenticationRequest);
    },
};

export default AuthService;