import { types, Instance, destroy, flow } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import shortid from 'shortid';
import { onSnapshot } from 'mobx-state-tree';
import { autorun } from 'mobx';

//
//  our state model
//

const TaskItemModel = types
  .model('taskItem', {
    id: types.string,
    description: types.string,
    completed: false
  })
  .actions(self => ({
    toggleCompleted() {
      self.completed = !self.completed;
    }
  }));

export const TaskListModel = types
  .model('taskList', {
    todoList: types.optional(types.array(TaskItemModel), []),
    isLoading: types.optional(types.boolean, false)
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
    fetchTasks: flow(function* fetchTasks(): IterableIterator<Promise<ITaskList>> {
      self.isLoading = true;
      try {
        // ... yield can be used in async/await style
        const list = yield loadFromLocalStorage();
        self.todoList = list;
        self.isLoading = false;
      } catch (error) {
        // ... including try/catch error handling
        console.error('Failed to fetch tasks', error);
        self.isLoading = false;
      }
    })
  }));

interface ITaskList extends Instance<typeof TaskListModel> {}
export type TaskItem = Instance<typeof TaskItemModel>;
export type TaskList = Instance<typeof TaskListModel>;

//
// ----------------------------------------------------------------
//

// 🔥 🔥 🔥 hook to use in components
export const useTaskListStore = (): TaskList => {
  const store = useContext<TaskList | null>(taskListContext);
  if (!store) {
    throw new Error('taskList store not found in Context. did you forget to use the Provider??');
  }
  return store;
};

export const taskListContext = createContext<TaskList | null>(null);
export const TaskListProvider = taskListContext.Provider;

export const taskListStore = TaskListModel.create({});

onSnapshot(taskListStore, newSnapshot => {
  console.log(`Saving task list to local storage...`);
  console.dir(newSnapshot.todoList);
  const data = JSON.stringify(newSnapshot.todoList);
  console.log(data);
  localStorage.setItem(STORAGE_KEY, data);
});

autorun(() => {
  console.log(`taskListStore now contains ${taskListStore.todoList.length} items`);
});

const STORAGE_KEY = 'todolist';

function loadFromLocalStorage(): Promise<ITaskList> {
  console.log('loadFromLocalStorage: Loading taskList from localStorage...');
  const data = localStorage.getItem(STORAGE_KEY) || '{}';
  const snapshot = JSON.parse(data);
  console.log('loadFromLocalStorage: loaded');
  const p = new Promise<ITaskList>(resolve => {
    setTimeout(resolve, 3000, snapshot);
  });
  return p;
}
