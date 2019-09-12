import * as React from 'react';
import { taskStore, useObservable } from '../stores/TaskStore';

import TodoItem from './TodoItem';

//import { observer } from 'mobx-react';
//import { useTaskListStore } from '../stores/TaskListStore';

const TodoItems: React.SFC = () => {
  const tasks = useObservable(taskStore.tasks, []);

  return (
    <div className="container todoitems">
      {tasks.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoItems;
