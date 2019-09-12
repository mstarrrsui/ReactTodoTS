import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  const isLoading = useObservable(todoListState.isLoading, true);

  useEffect(() => {
    todoListState.loadFromLocalStorage();
  }, []);

  return (
    <div className="container todolist">
      <TodoForm />
      {isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default TodoList;
