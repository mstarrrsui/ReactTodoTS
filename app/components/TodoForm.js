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
            <form className="form-inline p-2">
                <div className="col-md-6 offset-3">                 
                    <input 
                        type="text" 
                        id="todoTask" 
                        className="form-control-lg" 
                        placeholder="Enter a task"
                        onChange={this.handleChange} />
                    <button 
                        type="button" 
                        className="btn btn-primary m-3">Add
                    </button> 
                </div>
            </form>
        );
    }
  
}




