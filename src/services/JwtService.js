const JwtService = {
    getUserIdFromToken: () => {
        const jwtToken = localStorage.getItem('jwt');

        if (jwtToken) {
            try {
                const decodedToken = atob(jwtToken.split('.')[1]);
                const tokenData = JSON.parse(decodedToken);

                return tokenData.userId;
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                return null;
            }
        } else {
            console.warn('JWT token not found in localStorage');
            return null;
        }
    },

    isTokenExpired: () => {
        const jwtToken = localStorage.getItem('jwt');

        if (jwtToken) {
            try {
                const decodedToken = atob(jwtToken.split('.')[1]);
                const tokenData = JSON.parse(decodedToken);


                const expirationTime = tokenData.exp * 1000;
                const currentTime = Date.now();


                return expirationTime < currentTime;
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                return true;
            }
        } else {
            console.warn('JWT token not found in localStorage');
            return true;
        }
    }
}

export default JwtService;
