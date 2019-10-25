import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import log from 'loglevel';

import { todoListStore, INITIAL_STATE } from '../stores/TodoListStore';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  //useObservable(todoListState.tasks, []);
  const state = useObservable(todoListStore.stateDispatch$, INITIAL_STATE);

  useEffect(() => {
    function loadData(): void {
      log.debug('TodoList - Loading tasks');
      todoListStore.loadFromLocalStorage();
    }

    loadData();

    return function cleanup() {
      log.debug('TodoList Will Unmount');
    };
  }, []);

  return (
    <div className="container todolist">
      <TodoForm />
      {state.isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default TodoList;
