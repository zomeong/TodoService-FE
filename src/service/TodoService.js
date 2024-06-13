import axios from 'axios';

const API_URL = 'http://localhost:8080/todo';

const fetchTodos = (page, size, sort) => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    
    return axios.get(`${API_URL}/page`, {
        headers: headers,
        params: {
            page: page,
            size: size,
            sort: sort
        }
    });
};

export { fetchTodos };
