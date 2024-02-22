import axios from 'axios';

const API_URL = "https://34.224.31.157:8080/api/v1/categories";

const getToken = () => {
    return localStorage.getItem('jwt');
};


const CategoryService = {
    getAllCategories: () => {
        return axios.get(`${API_URL}/clients`);
    },

    getCategoryByName: (categoryName) => {
        return axios.get(`${API_URL}/clients/${categoryName}`);
    },

    createCategory: (category) => {
        const token = getToken();
        return axios.post(API_URL, category, { headers: { Authorization: `Bearer ${token}` } });
    },

    deleteCategoryById: (categoryId) => {
        const token = getToken();
        return axios.delete(`${API_URL}/${categoryId}`, { headers: { Authorization: `Bearer ${token}` } });
    },
};

export default CategoryService;