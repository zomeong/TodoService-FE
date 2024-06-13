import React from 'react';
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Typography } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly:true};
        this.delete = props.delete;
        this.update = props.update;
        this.toggleSelect = props.toggleSelect;
        this.loadTodos = props.loadTodos;
    }

    deleteEventHandler =()=>{
        this.delete(this.state.item);
        this.loadTodos();
    }

    offReadOnlyMode =()=>{
        this.setState({readOnly:false},()=>{
            console.log("ReadOnly?",this.state.readOnly)
        });
    }

    enterKeyEventHandler =(e)=>{
        if(e.key ==="Enter") {
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

    editEventHandler =(e)=>{
        const thisItem = this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem});
    }

    checkboxEventHandler = async (e)=>{
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        //this.setState({item: thisItem});
        this.setState({readOnly: true});
        await this.update(this.state.item);
        await this.loadTodos();
    }

    selectCheckboxEventHandler = (e) => {
        this.toggleSelect(this.state.item.id);
    }
    
    render() {
        const item = this.state.item;
        const { isSelected } = this.props;
        const createdAt = new Date(item.createdAt);
        const formattedDate = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

        return (
            <ListItem>
                <Checkbox
                checked={item.done}
                onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                    inputProps={{"aria-label":"naked",readOnly:this.state.readOnly}}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    onClick={this.offReadOnlyMode}
                    onChange={this.editEventHandler}
                    onKeyPress={this.enterKeyEventHandler}
                    />
                </ListItemText>
                <Typography variant="body2" color="textSecondary" style={{ marginRight: '16px' }}>
                    {formattedDate}
                </Typography>
                <Checkbox
                checked={isSelected}
                onChange={this.selectCheckboxEventHandler}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete"
                    onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;