import axios from 'axios';

const BFF_BASE_URL = "https://wipbv1ofz7.execute-api.us-west-2.amazonaws.com/CS3660/api";

const defaultHeaders = {
    "Content-Type": "application/json"
};

const bffService = {
    login_verify: async (token) => {
        try 
        {
            const response = await axios.post(`${BFF_BASE_URL}/login/verify/`, { 
                    jwt_token: token 
                }, {
                    headers: defaultHeaders
                });               
            if (!response.ok) {
                throw new Error("Invalid token");
            }
        }
        catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    },
    login: async (username, password) => {
        try {
            const response = await axios.post(`${BFF_BASE_URL}/login/`, {
                username,
                password
            }, {
                headers: defaultHeaders
            });
            return response.data;
        }
        catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    }
   
}

export default bffService;