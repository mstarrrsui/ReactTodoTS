import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';



export default class TodoList extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
          todoItems: []
      }
      
    }
  
    componentDidMount() {
        log.debug("TodoList Mounted");
    }


    loadMembers() {
        //   MemberApi.getAllMembers()
        //            .then( (members) => this.setState( () => ({ members: members }) ))
        //            .catch( error => { throw(error); })
    }

    handleSubmit = (task) => {
        log.debug(`task is ${task}`);
    } 

    render() {

      const {todoItems} = this.state;

      return (
          <div className="container todolist"> 
            <TodoForm onSubmit={this.handleSubmit} />
            <TodoItems items={todoItems} />         
          </div>
        );
    }
  }
  
