import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox, List } from "@mui/material";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item };  // 매개변수 item의 변수/값을 item에 대입
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done}/>
                <ListItemText>
                    <InputBase
                    inputProps={{ 'aria-label': 'naked' }}
                    type="text"
                    id={item.id}
                    name="{item.id}"
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    />
                </ListItemText>
            </ListItem>
        );
    }
}

export default Todo;  // Todo 클래스를 내보내기