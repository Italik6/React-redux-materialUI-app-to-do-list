import React from "react";
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import { AddButton } from '../components/AddButton';

export default class AddTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { priority: '', nameTask: '', deadline: new Date(), open:false };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // Handlers
  handleChangeSelectField = (event, index, priority) => {
    this.setState(
       {priority}
    );
  }

  handleChangeDate = (event, date) => {
    this.setState({
      deadline: date
    });
  }

  handleTextFieldChange = (event) =>{
    this.setState({
      nameTask: event.target.value,  
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
     this.handleSubmit(event);
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
     this.handleSubmitTask(event);
    }
  }

  handleSubmitTask = e => {
    e.preventDefault();
    const err = this.validate();
    this.setState({open: false});

    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        nameTask: "",
        nameTaskError: "",
        priority: "",
        priorityError: "",
        deadline: new Date(),
        deadlineError: ""
      });
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      nameTaskError: "",
  };

    // if (this.state.nameTask.length < 5) {
    //   isError = true;
    //   errors.usernameError = "Username needs to be atleast 5 characters long";
    // }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  render() {
    const actions = [
      <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={e => this.handleSubmitTask(e)} />,
    ];

    return (
      <form>
        <AddButton onClick={this.handleOpen} />
        <Dialog title="Add new task" open={this.state.open} actions={actions}>
          <TextField floatingLabelText="Task" value={this.state.nameTask} onChange={e => this.handleTextFieldChange(e)} errorText={this.state.nameTaskError} onKeyPress={this.handleKeyPress}/>
          <DatePicker floatingLabelText="Deadline" value={this.state.deadline} onChange={this.handleChangeDate} />
          <SelectField floatingLabelText="Priority" value={this.state.priority} onChange={this.handleChangeSelectField} >
              <MenuItem value="High" primaryText="High" />
              <MenuItem value="Medium" primaryText="Medium" />
              <MenuItem value="Low" primaryText="Low" />
            </SelectField>
        </Dialog>  
      </form>
    );
  }
}
