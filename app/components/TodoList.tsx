import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import log from 'loglevel';
import { useTaskListStore } from '../stores/TaskListStore';

const TodoList: React.SFC = () => {
  const taskListStore = useTaskListStore();

  useEffect(() => {
    function loadData(): void {
      log.debug('TodoList - Loading tasks');
      taskListStore.fetchTasks();
    }

    loadData();

    return function cleanup() {
      log.debug('TodoList Will Unmount');
    };
  }, [taskListStore]);

  return (
    <div className="container todolist">
      <TodoForm />
      {taskListStore.isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default observer(TodoList);
