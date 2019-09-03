import { types, Instance, destroy } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
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
  .model('TodoList', {
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

export type TaskItem = Instance<typeof TaskItem>;
export type TaskList = Instance<typeof TaskListStore>;

export const taskListContext = createContext<TaskList | null>(null);

export const useStore = (): TaskList => {
  const store = useContext<TaskList | null>(taskListContext);
  if (!store) {
    throw new Error('You forgot to use a Provider, shame on you');
  }
  return store;
};
