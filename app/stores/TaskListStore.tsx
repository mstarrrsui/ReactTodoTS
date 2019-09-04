import { types, Instance, destroy, applySnapshot, IStateTreeNode } from 'mobx-state-tree';
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
    todoList: types.array(TaskItemModel),
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
    }
  }));

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

// call this in App to setup the store
export const setupTaskListStore = (): TaskList => {
  console.log('Loading taskList from localStorage...');
  const STORAGE_KEY = 'todolist';
  const data = localStorage.getItem(STORAGE_KEY);
  // TODO - make this robust by checking shape of data or catching error and clearing old
  let store: TaskList;
  if (data) {
    console.log('Loaded taskList');
    store = TaskListModel.create(JSON.parse(data));
  } else {
    console.log('No data for taskList found in localStorage.  Init with defaults');
    store = TaskListModel.create({ todoList: [], isLoading: false });
  }

  // save taskList to local storage whenever it updates
  onSnapshot(store, newSnapshot => {
    console.log(`Saving taskListStore to local storage...`);
    console.dir(newSnapshot);
    const data = JSON.stringify(newSnapshot);
    localStorage.setItem(STORAGE_KEY, data);
  });

  // ⚠️ for debug purposes - should have an "if dev-mode" around this
  autorun(() => {
    console.log(`taskListStore now contains ${store.todoList.length} items`);
  });

  return store;
};
