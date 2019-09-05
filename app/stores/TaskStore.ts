import shortid from 'shortid';
import { BehaviorSubject, Observable } from 'rxjs';
import { useState, useEffect } from 'react';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

class TaskStore {
  private _tasks: Array<Task> = [];
  private tasks = new BehaviorSubject<Array<Task>>([]);

  add(description: string): void {
    const newTask = {
      completed: false,
      description,
      id: shortid.generate()
    };

    this._tasks = [...this._tasks, newTask];
    this.tasks.next(this._tasks);
  }

  clearAllCompleted(): void {
    this._tasks = this._tasks.filter(i => !i.completed);
    this.tasks.next(this._tasks);
  }

  loadFromLocalStorage(): void {
    console.log('Loading taskList from localStorage...');
    const STORAGE_KEY = 'todolist';
    const data = localStorage.getItem(STORAGE_KEY);
    // TODO - make this robust by checking shape of data or catching error and clearing old
    if (data) {
      console.log('Loaded taskList');
      this._tasks = JSON.parse(data);
    } else {
      console.log('No data for taskList found in localStorage.  Init with defaults');
      this._tasks = TaskListModel.create({ todoList: [], isLoading: false });
    }
  }
}

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(newValue => {
      setValue(newValue);
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}

export const taskStore = new TaskStore();
