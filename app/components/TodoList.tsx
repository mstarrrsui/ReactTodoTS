import React, { useState, useEffect, useRef, useContext } from 'react';
import { observer } from 'mobx-react';
import log from 'loglevel';
import shortid from 'shortid';
import Task from '../types/Task';
import { saveTasks, loadTasks } from '../util/TodoRepo';
import Spinner from './Spinner';
import TodoForm from './TodoForm';
import TodoItems from './TodoItems';
import { useStore } from '../models/TaskStore';

const TodoList: React.SFC = () => {
  //const [todoItems, setTodoItems] = useState<Task[]>([]);
  const store = useStore();
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

  function handleSubmit(newtaskdescription: string): void {
    log.debug(`TodoList - adding tasks.  task is ${newtaskdescription}`);
    const newtask: Task = {
      completed: false,
      description: newtaskdescription,
      id: shortid.generate()
    };
    store.add(newtask);
    //setTodoItems(prevTasks => [...prevTasks, newtask]);
  }

  function handleClearCompleted(): void {
    //const nonCompletedItems = store.todoList.filter(i => !i.completed);
    //setTodoItems(nonCompletedItems);
  }

  function handleClearItem(item: Task): void {
    log.debug(`task cleared is ${item.description}`);
    //const newitems = todoItems.map(i => (i.id === item.id ? { ...i, completed: !i.completed } : i));
    //setTodoItems(newitems);
  }

  return (
    <div className="container todolist">
      <TodoForm onSubmit={handleSubmit} onClear={handleClearCompleted} />
      {isLoading ? <Spinner /> : <TodoItems items={store.todoList} onClearItem={handleClearItem} />}
    </div>
  );
};

export default observer(TodoList);
