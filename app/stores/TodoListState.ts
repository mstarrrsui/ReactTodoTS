import shortid from 'shortid';
import { BehaviorSubject } from 'rxjs';
import log from 'loglevel';

const STORAGE_KEY = 'todolist';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

class TodoListState {
  public tasks = new BehaviorSubject<Array<Task>>([]);
  public isLoading = new BehaviorSubject<boolean>(false);

  add(description: string): void {
    const newTask = {
      completed: false,
      description,
      id: shortid.generate()
    };

    this._tasks = [...this._tasks, newTask];
    this.broadcastUpdatedTasks();
  }

  clearAllCompleted(): void {
    this._tasks = this._tasks.filter(i => !i.completed);
    this.broadcastUpdatedTasks();
  }

  toggleTaskCompleted(taskId: string): void {
    this._tasks = this._tasks.map(t => {
      if (t.id === taskId) {
        log.debug(`found item to toggle ${taskId}`);
        t.completed = !t.completed;
      }
      return t;
    });
    this.broadcastUpdatedTasks();
  }

  async loadFromLocalStorage(): Promise<void> {
    console.log('Loading taskList from localStorage...');
    this.isLoading.next(true);
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
    //broadcast without saving to local storage
    this.tasks.next(this._tasks);
  }

  private _tasks: Array<Task> = [];

  private broadcastUpdatedTasks(): void {
    console.log('Saving taskList to localStorage...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks));
    this.tasks.next(this._tasks);
  }

  private loadDataAsyncLike(): Promise<string | null> {
    const data = localStorage.getItem(STORAGE_KEY);
    const p = new Promise<string | null>(resolve => {
      setTimeout(resolve, 3000, data);
    });
    return p;
  }
}

export const todoListState = new TodoListState();
