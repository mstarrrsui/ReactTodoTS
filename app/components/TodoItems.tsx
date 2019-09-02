import * as React from 'react';
import Task from '../types/Task';
import TodoItem from './TodoItem';
import log from 'loglevel';

import { observer } from 'mobx-react';
import { useStore } from '../models/TaskStore';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleClearItem(item: Task): void {
  log.debug(`task cleared is ${item.description}`);
  //const newitems = todoItems.map(i => (i.id === item.id ? { ...i, completed: !i.completed } : i));
  //setTodoItems(newitems);
}

const TodoItems: React.SFC = () => {
  const store = useStore();

  return (
    <div className="container todoitems">
      {store.todoList.map(item => (
        <TodoItem item={item} key={item.id} onClick={handleClearItem} />
      ))}
    </div>
  );
};

export default observer(TodoItems);
