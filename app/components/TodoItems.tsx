import * as React from 'react';
import { todoListState } from '../stores/TodoListState';

import TodoItem from './TodoItem';
import { useObservable } from '../util/useObservable';

//import { observer } from 'mobx-react';
//import { useTaskListStore } from '../stores/TaskListStore';

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
