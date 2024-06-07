import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, TextField } from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItems: new Set(),
      loading: true,
      searchQuery: '',
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

  deleteBatch = () => {
    const { selectedItems } = this.state;
    call("/todo/batch", "DELETE", Array.from(selectedItems)).then((response) =>
      this.setState({ items: response.data, selectedItems: new Set() }));
  }

  toggleSelect = (id) => {
    this.setState((prevState) => {
      const selectedItems = new Set(prevState.selectedItems);
      if (selectedItems.has(id)) {
        selectedItems.delete(id);
      } else {
        selectedItems.add(id);
      }
      return { selectedItems };
    });
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) => this.setState({ items: response.data, loading: false }));
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  render() {
    const { items, selectedItems, searchQuery } = this.state;

    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const todoItems = filteredItems.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {filteredItems.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
              toggleSelect={this.toggleSelect}
              isSelected={selectedItems.has(item.id)}
            />
          ))}
        </List>
      </Paper>
    );

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

    const todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <TextField
            label="필터"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={this.handleSearch}
            style={{ width: '200px', height: '40px', marginBottom: 16 }}
          />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    const loadingPage = <h1>로딩중..</h1>
    const content = this.state.loading ? loadingPage : todoListPage;

    return (
      <div className="App">
        {content}
        <Button
          variant="contained"
          color="secondary"
          onClick={this.deleteBatch}
          disabled={selectedItems.size === 0}
          style={{ margin: 16 }}
        >
          Delete Selected
        </Button>
      </div>
    );
  }
}

export default App;
