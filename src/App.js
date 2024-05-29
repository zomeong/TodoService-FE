import logo from './logo.svg';
import React from 'react';
import Hello from './Hello';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {Paper, List, Container}from "@mui/material";
import './App.css';
import {call} from './service/ApiService';

class App extends React.Component{

    constructor(props){     // 매개변수 props 생성자
        super(props);       // 매개변수 props 초기화
        this.state = {      // item에 item.id, item.title, item.done 매개변수 이름과 값 할당
            items :[],
        };
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) => 
            this.setState({items: response.data}));
    }

    delete =(item)=> {
        call("/todo", "DELETE", item).then((response) =>
            this.setState({items: response.data}));
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) =>
            this.setState({items: response.data}));
    }

    render(){
        var todoItems = this.state.items.length > 0 &&(
            <Paper style={{margin:16}}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
                    ))}
                </List>
            </Paper>
        );

        return(
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}

export default App;
