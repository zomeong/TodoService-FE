import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) => this.setState({ items: response.data }));
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => this.setState({ items: response.data }));
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) => this.setState({ items: response.data }));
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) => this.setState({ items: response.data, loading: false }));
  }

  render() {
    const navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout</Button>
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
