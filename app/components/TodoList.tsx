import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import log from 'loglevel';

import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  const isLoading = useObservable(todoListState.isLoading, true);
  const tasks = useObservable(todoListState.tasks, []);

  useEffect(() => {
    todoListState.loadFromLocalStorage();
  }, []);

  function handleClick(): void {
    log.debug('button pressed');
    log.debug(JSON.stringify(tasks));
    tasks.splice(0, 1);
    log.debug(JSON.stringify(tasks));
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
