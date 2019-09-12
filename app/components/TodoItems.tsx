import * as React from 'react';
import TodoItem from './TodoItem';

import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';

const TodoItems: React.SFC = () => {
  const tasks = useObservable(todoListState.tasks, []);

  return (
    <div className="container todoitems">
      {tasks.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoItems;
