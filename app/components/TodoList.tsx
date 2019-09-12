import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import { taskStore } from '../stores/TaskStore';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  const isLoading = useObservable(taskStore.isLoading, true);

  useEffect(() => {
    taskStore.loadFromLocalStorage();
  }, []);

  return (
    <div className="container todolist">
      <TodoForm />
      {isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default TodoList;
