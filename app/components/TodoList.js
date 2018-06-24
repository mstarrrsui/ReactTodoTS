import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import TodoForm from './TodoForm';



export default class TodoList extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
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

    render() {

      //const {members, isAddDialogOpen, scrollId} = this.state;

      return (
          <div className="todolist"> 
            <TodoForm></TodoForm>          
          </div>
        );
    }
  }
  
