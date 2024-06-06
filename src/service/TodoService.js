import axios from 'axios';

const API_URL = 'http://localhost:8080/todo';

const fetchTodos = (page, size, sort) => {
    return axios.get(`${API_URL}/page`, {
        params: {
            page: page,
            size: size,
            sort: sort
        }
    });
};

export { fetchTodos };
