import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import OpenApi from './OpenApi';
import './App.css';
import { Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from './service/ApiService';
import { fetchTodos } from './service/TodoService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      page: 0,
      size: 5,
      sort: 'createdAt',
      totalPages: 0,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) => this.setState({ items: response.data }));
    this.loadTodos();
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => this.setState({ items: response.data }));
    this.loadTodos();
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) => this.setState({ items: response.data }));
    this.loadTodos();
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    const { page, size, sort } = this.state;
    try {
      const response = await fetchTodos(page, size, sort); 
      this.setState({
        items: response.data.content,
        totalPages: response.data.totalPages,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  render() {
    const navigationBar = (
      <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="h6">오늘의 할일</Typography>
                    </Grid>
                    <Grid item>
                        <OpenApi />
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={signout}>Logout</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );

    const content = this.state.loading ? <h1>로딩중..</h1> : (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <TodoList add={this.add} delete={this.delete} update={this.update} />
        </Container>
      </div>
    );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
