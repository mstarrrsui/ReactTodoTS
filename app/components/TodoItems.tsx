import * as React from 'react';
import TodoItem from './TodoItem';

import { todoListState, Task } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';
import { List } from 'immutable';

const TodoItems: React.SFC = () => {
  const tasks = useObservable(todoListState.tasks, List<Task>());

  return (
    <div className="container todoitems">
      {tasks.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoItems;
