import shortid from 'shortid';
import { BehaviorSubject, Observable } from 'rxjs';
import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

class TaskStore {
  private _tasks: Array<Task> = [];
  public tasks = new BehaviorSubject<Array<Task>>([]);
  public isLoading = new BehaviorSubject<boolean>(false);

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

  loadDataAsyncLike(): Promise<string | null> {
    console.log('Loading taskList from localStorage...');
    this.isLoading.next(true);
    const STORAGE_KEY = 'todolist';
    const data = localStorage.getItem(STORAGE_KEY);
    const p = new Promise<string | null>(resolve => {
      setTimeout(resolve, 3000, data);
    });
    return p;
  }
  async loadFromLocalStorage(): Promise<void> {
    const data = await this.loadDataAsyncLike();
    if (data) {
      // TODO - make this robust by checking shape of data or catching error and clearing old
      console.log('Loaded taskList');
      this._tasks = JSON.parse(data);
      this.isLoading.next(false);
    } else {
      console.log('No data for taskList found in localStorage.  Init with defaults');
      this._tasks = [];
      this.isLoading.next(false);
    }
    this.tasks.next(this._tasks);
  }
}

export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(newValue => {
      setValue(newValue);
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}

export const taskStore = new TaskStore();
