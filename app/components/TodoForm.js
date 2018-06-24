import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';


export default class TodoForm extends React.Component {

    
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    
    state = {
        todoTask: ''
    }


    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => ({ todoTask : value }));
    }

    handleSubmit = (event) => {
        log.debug("handleSubmit");
        event.preventDefault();
        const newtask = this.state.todoTask;
        if (newtask.trim().length > 0) {
            this.props.onSubmit( newtask );
            this.setState(() => ({ todoTask : '' }));
        }
    } 

    render() {
        const { todoTask } = this.state;
        return (
            <form className="form-inline form-row" onSubmit={this.handleSubmit}>
                <div className="col-md-7 offset-md-2">
                    <input 
                        type="text" 
                        id="todoTask" 
                        className="form-control-lg w-100" 
                        placeholder="Enter a task"
                        value={todoTask}
                        onChange={this.handleChange} />
                </div>
                <div className="col-md-1">
                    <button 
                        type="submit" 
                        className="btn btn-primary m-2"
                        disabled={!todoTask}>Add
                    </button> 
                </div>
            </form>
        );
    }
  
}




