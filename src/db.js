import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://moon-product.firebaseio.com/'
});

export default instance;