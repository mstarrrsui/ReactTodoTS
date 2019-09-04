import React from 'react';
import { observer } from 'mobx-react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import { useTaskListStore } from '../stores/TaskListStore';

const TodoList: React.SFC = () => {
  const taskListStore = useTaskListStore();

  return (
    <div className="container todolist">
      <TodoForm />
      {taskListStore.isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default observer(TodoList);
