import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import shortid from 'shortid'
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';



export default class TodoList extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
          todoItems: [ 
              { id: shortid.generate(), 
                description: 'Take out trash',
                completed: false
             },
             { id: shortid.generate(), 
                description: 'Mow the lawn',
                completed: false
             } 
            ]
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

    handleSubmit = (newtaskdescription) => {
        log.debug(`task is ${newtaskdescription}`);
        const newtask = {
            id: shortid.generate(), 
            description: newtaskdescription,
            completed: false
        }; 
        
        this.setState( prevState => ({
            todoItems: [...prevState.todoItems, newtask]
        }));
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
  
