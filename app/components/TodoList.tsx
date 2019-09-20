import React, { useEffect } from 'react';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';

import { todoListState } from '../stores/TodoListState';
import { useObservable } from '../util/useObservable';

const TodoList: React.SFC = () => {
  return (
    <div className="container todolist">
      <TodoForm />
      <TodoItems />
    </div>
  );
};

export default TodoList;
