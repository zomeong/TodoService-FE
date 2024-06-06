import React, { useState, useEffect } from 'react';
import { fetchTodos } from './service/TodoService';
import Todo from './Todo';
import { List, Button } from '@material-ui/core';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('createdAt');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadTodos();
    }, [page, size, sort]);

    const loadTodos = async () => {
        try {
            const response = await fetchTodos(page, size, sort);
            setTodos(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <List>
                {todos.map(todo => (
                    <Todo key={todo.id} item={todo} />
                ))}
            </List>
            <div>
                <Button onClick={handlePreviousPage} disabled={page === 0}>Previous</Button>
                <Button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</Button>
            </div>
        </div>
    );
};

export default TodoList;