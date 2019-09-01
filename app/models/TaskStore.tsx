import { types, Instance, onSnapshot } from 'mobx-state-tree';
import TaskItem from './TaskItem';
import Task from '../types/Task';
import { useContext, createContext } from 'react';
import { autorun } from 'mobx';

export const storeContext = createContext<TTaskStore | null>(null);

export const Provider = storeContext.Provider;

export const TaskStore = types
  .model('todoList', {
    todoList: types.array(TaskItem)
  })
  .actions(self => ({
    add(task: Task) {
      self.todoList.push(task);
    }
  }));

export const rootStore = TaskStore.create({ todoList: [] });

autorun(() => {
  console.log(rootStore.todoList.length);
});

onSnapshot(rootStore, newSnapshot => {
  console.dir(newSnapshot);
});

export type TTaskStore = Instance<typeof TaskStore>;

export const useStore = (): TTaskStore => {
  const store = useContext<TTaskStore | null>(storeContext);
  if (!store) {
    throw new Error('You forgot to use StoreProvider, shame on you');
  }
  return store;
};
