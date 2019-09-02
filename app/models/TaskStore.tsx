import { types, Instance, onSnapshot, destroy } from 'mobx-state-tree';
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
    },
    toggleCompleted(task: Task) {
      const foundTask = self.todoList.find(t => t.id === task.id);
      if (foundTask) foundTask.completed = !foundTask.completed;
    },
    clearAllCompleted() {
      const itemsToRemove = self.todoList.filter(i => i.completed);
      itemsToRemove.forEach(i => destroy(i));
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
    throw new Error('You forgot to use a Provider, shame on you');
  }
  return store;
};
