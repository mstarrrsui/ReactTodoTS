import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import log from 'loglevel';

import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  useObservable(todoListState.tasks, []);
  const isLoading = useObservable(todoListState.isLoading, true);

  useEffect(() => {
    function loadData(): void {
      log.debug('TodoList - Loading tasks');
      todoListState.loadFromLocalStorage();
    }

    loadData();

    return function cleanup() {
      log.debug('TodoList Will Unmount');
    };
  }, []);

  return (
    <div className="container todolist">
      <TodoForm />
      {isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default TodoList;
