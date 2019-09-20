import shortid from 'shortid';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import log from 'loglevel';

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

  loadFromLocalStorage(): void {
    this.isLoading.next(true);
    this.loadData()
      .pipe(
        tap(() => log.debug('TAP Loaded taskList')),
        map(data => JSON.parse(data))
      )
      .subscribe((tasks: Array<Task>) => {
        this._tasks = tasks;
        this.tasks.next(this._tasks);
        this.isLoading.next(false);
      });
  }

  private _tasks: Array<Task> = [];

  private broadcastUpdatedTasks(): void {
    console.log('Saving taskList to localStorage...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks));
    this.tasks.next(this._tasks);
  }

  private loadData(): Observable<string> {
    console.log('Loading taskList from localStorage...');
    const data = localStorage.getItem(STORAGE_KEY);
    const obs = new Observable<string>(observer => {
      setTimeout(() => {
        if (data) {
          observer.next(data);
        } else {
          console.log('No data for taskList found in localStorage.  completing observable');
        }
        observer.complete();
      }, 3000);
    });
    return obs;
  }
}

const STORAGE_KEY = 'todolist';

export const todoListState = new TodoListState();
