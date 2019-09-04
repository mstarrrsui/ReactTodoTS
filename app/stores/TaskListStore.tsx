import { types, Instance, destroy, applySnapshot } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import shortid from 'shortid';
import { onSnapshot } from 'mobx-state-tree';
import { autorun } from 'mobx';

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
    todoList: types.array(TaskItem),
    isLoading: types.boolean
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
    },
    load(): void {
      //self.isLoading = true;
      const itemsJson = localStorage.getItem('todolist');
      if (itemsJson) {
        const snapshot = JSON.parse(itemsJson);
        // don't apply falsey (which will error), leave store in initial state
        if (!snapshot) {
          return;
        }
        setTimeout(() => {
          applySnapshot(self, snapshot);
          self.isLoading = false;
        }, 3000);
      }
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

export const taskListStore = TaskListStore.create({ todoList: [], isLoading: true });
//persist('reacttodo_taskliststore', taskListStore);

onSnapshot(taskListStore, newSnapshot => {
  console.dir(newSnapshot);
  const data = JSON.stringify(newSnapshot);
  console.log(`Saving to local storage...`);
  localStorage.setItem('todolist', data);
});

autorun(() => {
  console.log(taskListStore.todoList.length);
});
