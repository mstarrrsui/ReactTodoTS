import { types, Instance, onSnapshot, destroy } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import { autorun } from 'mobx';
import shortid from 'shortid';

const TaskItem = types
  .model('Todo', {
    id: types.string,
    description: types.string,
    completed: false
  })
  .actions(self => ({
    toggleCompleted() {
      self.completed = !self.completed;
    }
  }));

export const TaskListStore = types
  .model('todoList', {
    todoList: types.array(TaskItem)
  })
  .actions(self => ({
    add(description: string): void {
      self.todoList.push({
        completed: false,
        description,
        id: shortid.generate()
      });
    },
    clearAllCompleted(): void {
      const itemsToRemove = self.todoList.filter(i => i.completed);
      itemsToRemove.forEach(i => destroy(i));
    }
  }));

export const rootStore = TaskListStore.create({ todoList: [] });

autorun(() => {
  console.log(rootStore.todoList.length);
});

onSnapshot(rootStore, newSnapshot => {
  console.dir(newSnapshot);
});

export type TaskItem = Instance<typeof TaskItem>;
export type TaskList = Instance<typeof TaskListStore>;

export const storeContext = createContext<TaskList | null>(null);

export const Provider = storeContext.Provider;

export const useStore = (): TaskList => {
  const store = useContext<TaskList | null>(storeContext);
  if (!store) {
    throw new Error('You forgot to use a Provider, shame on you');
  }
  return store;
};
