import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import log from 'loglevel';

import { todoListState, Task } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';
import { List } from 'immutable';

const TodoList: React.SFC = () => {
  const isLoading = useObservable(todoListState.isLoading, true);
  const tasks = useObservable(todoListState.tasks, List<Task>());

  useEffect(() => {
    todoListState.loadFromLocalStorage();
  }, []);

  function handleClick(): void {
    log.debug('button pressed');
    log.debug(JSON.stringify(tasks));
    const newlist = tasks.filter(t => !t.completed);
    log.debug(JSON.stringify(newlist));
  }

  return (
    <div className="container todolist">
      <button onClick={handleClick}>Press Me</button>
      <TodoForm />
      {isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default TodoList;
