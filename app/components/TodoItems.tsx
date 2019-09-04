import * as React from 'react';
import TodoItem from './TodoItem';

import { observer } from 'mobx-react';
import { useTaskListStore } from '../stores/TaskListStore';

const TodoItems: React.SFC = () => {
  const store = useTaskListStore();

  return (
    <div className="container todoitems">
      {store.todoList.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default observer(TodoItems);
