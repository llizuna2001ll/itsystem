import axios from 'axios';

const API_URL = "http://34.224.31.157:8080/api/v1/products";

const getToken = () => {
    return localStorage.getItem('jwt');
};

const ProductService = {
    getAllProducts: () => {
        return axios.get(`${API_URL}/clients`);
    },

    getRecentProducts: () => {
        return axios.get(`${API_URL}/clients/recent`);
    },

    getProductsByCategoryId: (categoryId, page) => {
        return axios.get(`${API_URL}/clients/category/${categoryId}?page=${page}`);
    },

    getProductByName: (productName) => {
        return axios.get(`${API_URL}/clients/${productName}`);
    },

    createProduct: (name, brand, reference, description, categoryId, productImage) => {
        const token = getToken();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('reference', reference);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('productImage', productImage);

        return axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
    },

    updateProduct: (productId, product) => {
        const token = getToken();
        return axios.put(`${API_URL}/${productId}`, product, { headers: { Authorization: `Bearer ${token}` } });
    },

    deleteProduct: (productId) => {
        const token = getToken();
        return axios.delete(`${API_URL}/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    }
};

export default ProductService;
