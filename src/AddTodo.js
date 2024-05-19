import React from 'react';
import { TextField, Paper, Button, Grid } from '@mui/material';

class AddTodo extends React.Component{
    constructor(props){
        super(props);           // props에 상위 컴포넌트(App.js)에서 전달된 add 함수, 매개변수 포함
        this.state = {item :{title: ""}};
        this.add = props.add;   // props로 전달된 add 함수를 add 변수에 할당
    }

    onInputChange = (e)=>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
        console.log(thisItem);
    }

    onButtonClick = () =>{
        this.add(this.state.item);
        this.setState({item: {title: ""}});     // text 값을 추가하고 입력 필드는 초기화
    }

    enterKeyEventHolder = (e) => {
        if(e.key === 'Enter'){
            this.onButtonClick();
        }
    }

    render(){
        return(
            <Paper style={{margin:16, padding:16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight:16}}>
                        <TextField
                        placeholder="Add Todo here"
                        fullWidth
                        onChange={this.onInputChange}
                        value={this.state.item.title}
                        onKeyPress={this.enterKeyEventHolder}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={this.onButtonClick}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;