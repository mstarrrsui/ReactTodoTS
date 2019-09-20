import * as React from 'react';
import { useEffect } from 'react';
import TodoItem from './TodoItem';
import log from 'loglevel';

import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';
import Spinner from './Spinner';

const TodoItems: React.SFC = () => {
  const tasks = useObservable(todoListState.tasks, []);
  const isLoading = useObservable(todoListState.isLoading, true);
  //const isLoading = true;

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

  if (isLoading) {
    return (
      <div className="container todoitems">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="container todoitems">
        {tasks.map(item => (
          <TodoItem item={item} key={item.id} />
        ))}
      </div>
    );
  }
};

export default TodoItems;
