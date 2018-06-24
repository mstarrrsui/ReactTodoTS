import React from 'react';
import PropTypes from 'prop-types';


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
        event.preventDefault();
        this.props.onSubmit(
            this.state.todoTask
        )
    } 

    render() {

        return (
            <form className="form-inline form-row">
                <div className="col-md-7 offset-md-2">
                    <input 
                        type="text" 
                        id="todoTask" 
                        className="form-control-lg w-100" 
                        placeholder="Enter a task"
                        onChange={this.handleChange} />
                </div>
                <div className="col-md-1">
                    <button 
                        type="button" 
                        className="btn btn-primary m-2">Add
                    </button> 
                </div>
            </form>
        );
    }
  
}




