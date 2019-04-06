import * as React from 'react';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import log from 'loglevel';
import shortid from 'shortid';
import Task from '../types/Task';
import TodoRepo from '../util/TodoRepo';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';

interface State {
  todoItems: Task[];
  isLoading: boolean;
}

const initialState: State = {
  isLoading: true,
  todoItems: []
};

export default class TodoList extends React.Component<object, State> {
  state: Readonly<State> = initialState;

  unsubscribe$ = new Subject();

  componentDidMount() {
    log.debug('TodoList Mounted');
    this.subscription = TodoRepo.loadTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tasks => {
        log.debug('Setting todolist state');

        this.setState(() => ({
          isLoading: false,
          todoItems: tasks
        }));
      });
  }

  componentDidUpdate() {
    const { todoItems } = this.state;
    log.debug('TodoList - component did update');
    localStorage.setItem('todoitems', JSON.stringify(todoItems));
  }

  componentWillUnmount() {
    log.debug('TodoList Will Unmount');
    // use unsubscribe stream to cancel all subscribers (which are using takeUntil)
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleSubmit = (newtaskdescription: string) => {
    log.debug(`task is ${newtaskdescription}`);
    const newtask: Task = {
      completed: false,
      description: newtaskdescription,
      id: shortid.generate()
    };

    this.setState(prevState => ({
      todoItems: [...prevState.todoItems, newtask]
    }));
  };

  handleClearCompleted = () => {
    const { todoItems } = this.state;

    const nonCompletedItems = todoItems.filter(i => !i.completed);
    this.setState(() => ({
      todoItems: nonCompletedItems
    }));
  };

  handleClearItem = (item: Task) => {
    const { todoItems } = this.state;

    log.debug(`task cleared is ${item.description}`);
    const newitems = todoItems.map(i => (i.id === item.id ? { ...i, completed: !i.completed } : i));
    this.setState(() => ({
      todoItems: newitems
    }));
  };

  subscription: Subscription | undefined;

  render() {
    const { todoItems, isLoading } = this.state;

    return (
      <div className="container todolist">
        <TodoForm onSubmit={this.handleSubmit} onClear={this.handleClearCompleted} />
        {isLoading ? (
          <Spinner />
        ) : (
          <TodoItems items={todoItems} onClearItem={this.handleClearItem} />
        )}
      </div>
    );
  }
}
