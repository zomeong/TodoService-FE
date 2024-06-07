import React, { useState, useEffect } from 'react';
import { fetchTodos } from './service/TodoService';
import Todo from './Todo';
import { List, Button, Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const TodoList = ({ add, delete: deleteTodo, update }) => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id');
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

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '16px 0' }}>오늘의 할일</Typography>
            <Grid container justify="space-between" alignItems="center" style={{ marginBottom: '16px' }}>
                <Grid item>
                    <Typography variant="h6">LIST</Typography>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" style={{ minWidth: 120 }}>
                        <InputLabel id="sort-label">정렬 기준</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sort}
                            onChange={handleSortChange}
                            label="정렬 기준"
                        >
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="title">제목</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <List>
                {todos.map(todo => (
                    <Todo key={todo.id} item={todo} delete={deleteTodo} update={update} />
                ))}
            </List>
            <Grid container justify="space-between" alignItems="center" style={{ marginTop: '16px' }}>
                <Grid item>
                    <Button onClick={handlePreviousPage} disabled={page === 0}>Previous</Button>
                </Grid>
                <Grid item>
                    <Typography>{page + 1} / {totalPages}</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TodoList;
