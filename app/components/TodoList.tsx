import React, { useState, useEffect, useRef, useContext } from 'react';
import { observer } from 'mobx-react';
import log from 'loglevel';
import shortid from 'shortid';
import Task from '../types/Task';
import { saveTasks, loadTasks } from '../util/TodoRepo';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';

const TodoList: React.SFC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  // run this hook to save tasks to local storage everytime state is updated
  // we don't want to rn this on initial mount though, only on updates
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     log.debug('TodoList - saving updated list to localStorage');
  //     saveTasks(todoItems);
  //   }
  // }, [todoItems]);

  // useEffect(() => {
  //   function loadData(): void {
  //     log.debug('TodoList - Loading tasks');
  //     loadTasks().subscribe(tasks => {
  //       log.debug('Setting todolist state');
  //       setTodoItems(tasks);
  //       setIsLoading(false);
  //     });
  //   }

  //   loadData();

  //   return function cleanup() {
  //     log.debug('TodoList Will Unmount');
  //   };
  // }, []);

  return (
    <div className="container todolist">
      <TodoForm />
      {isLoading ? <Spinner /> : <TodoItems />}
    </div>
  );
};

export default observer(TodoList);
