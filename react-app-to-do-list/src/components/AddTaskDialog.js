import React from "react";
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import { Alert } from '../components/Alert';
import PropTypes from 'prop-types';

export default class AddTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { priority: 'Low', nameTask: '', deadline: new Date(), open:false, openAlert:false };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
    this.validate = this.validate.bind(this);
  }

  // Handlers
  handleChangeSelectField = (event, index, priority) => {
    this.setState({ priority });
  }

  handleChangeDate = (event, date) => {
    this.setState({ deadline: date });
    // Current date
    let today = new Date();
    let days = today.getDate();
    let month = today.getMonth()+1;
    // Choosen date
    let daysChoosen = date.getDate();
    let monthChoosen = date.getMonth()+1;
    // Validation of date
    if (date < today & daysChoosen !== days) {
      this.setState({ openAlert: true })
    }
    else if(date < today & daysChoosen === days & monthChoosen !== month) {
      this.setState({ openAlert: true })
    }
  }

  handleTextFieldChange = event => {
    this.setState({ nameTask: event.target.value });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
     this.handleSubmitTask(event);
    }
  }
  
  handleCloseAlert = () => {
    this.setState({ openAlert: false })
  }

  handleSubmitTask = e => {
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // Clear form
      this.setState({
        open: false,
        nameTask: "",
        nameTaskError: "",
        priority: "Low",
        deadline: new Date()
      });
    }
  };
// Validation of add/edit task
  validate = () => {
    let isError = false;
    const errors = {
      nameTaskError: ""
  };

  if (this.state.nameTask.length < 3) {
      isError = true;
      errors.nameTaskError = "Name of task needs to be at least 3 characters long.";
  }
  this.setState({ ...errors });
  return isError;
  };

  render() {
    const actions = [
      <FlatButton label="Add" primary={true} keyboardFocused={true} onClick={e => this.handleSubmitTask(e)} />,
      <FlatButton label="Ok, got it!" primary={true} onClick={this.handleCloseAlert} />
    ];

    return (
      <form>
        <Dialog title="Add new Task" open={this.props.open} actions={actions[0]}>
          <TextField floatingLabelText="Task" value={this.state.nameTask} errorText={this.state.nameTaskError}
          onChange={e => this.handleTextFieldChange(e)}  
          onKeyPress={this.handleKeyPress}/>
          <DatePicker floatingLabelText="Deadline" value={this.state.deadline} onChange={this.handleChangeDate} />
          <SelectField floatingLabelText="Priority" value={this.state.priority} onChange={this.handleChangeSelectField}>
              <MenuItem value="High" primaryText="High" />
              <MenuItem value="Medium" primaryText="Medium" />
              <MenuItem value="Low" primaryText="Low" />
          </SelectField>
        </Dialog>  
        <Alert open={this.state.openAlert} actions={actions[1]} 
        alertStatement={"Time to complete the task has already passed. Change the date or keep current one."}/>
      </form>
    );
  }
}
// Proptypes
  AddTaskDialog.propTypes = {
    priority: PropTypes.string,
    nameTask: PropTypes.string,
    deadline: PropTypes.object,
    open: PropTypes.bool,
    openAlert: PropTypes.bool
  }