import * as React from 'react';
import { ITask } from '../models/ITask';
import TodoRepo from '../util/TodoRepo';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';

import log from 'loglevel';
import shortid from 'shortid';

interface ITodoListState {
    todoItems: ITask[];
    isLoading: boolean;
}

const initialState: ITodoListState = {
    todoItems: [],
    isLoading: true
}


export default class TodoList extends React.Component<object,ITodoListState> {

    state: Readonly<ITodoListState> = initialState;

    componentDidMount() {
        log.debug("TodoList Mounted");
        let tasksFromStorage = TodoRepo.loadTasks().then( tasks => {
            log.debug("Setting todolist state");

            this.setState( prevState => ({
                todoItems: tasks,
                isLoading: false
            }))
        })
    }

    componentDidUpdate(prevProps: any, prevState: ITodoListState) {
        localStorage.setItem('todoitems', JSON.stringify(this.state.todoItems));
    }



    handleSubmit = (newtaskdescription: string) => {
        log.debug(`task is ${newtaskdescription}`);
        const newtask: ITask = {
            id: shortid.generate(),
            description: newtaskdescription,
            completed: false
        };

        this.setState( prevState => ({
            todoItems: [...prevState.todoItems, newtask]
        }));
    }


    handleClearItem = (item: ITask) => {
        log.debug(`task cleared is ${item.description}`);
        const newitems = this.state.todoItems.map( i =>
            ( i.id === item.id
                ? { ...i, completed: !i.completed }
                : i ));
        this.setState( () => ({
            todoItems: newitems
        }));
    }

    render() {

      const {todoItems, isLoading} = this.state;

      return (
          <div className="container todolist">
            <TodoForm onSubmit={this.handleSubmit} />
            { isLoading
            ? <Spinner/>
            : <TodoItems items={todoItems} onClearItem={this.handleClearItem}/>
            }
          </div>
        );
    }
  }

