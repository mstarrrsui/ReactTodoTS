import shortid from 'shortid';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import log from 'loglevel';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface TodoListState {
  tasks: Array<Task>;
  isLoading: boolean;
}

export const INITIAL_STATE: TodoListState = {
  tasks: [],
  isLoading: true
};

class TodoListStore {
  private _state: TodoListState = INITIAL_STATE;
  private _stateSubject = new BehaviorSubject<TodoListState>(INITIAL_STATE);
  public stateDispatch$ = this._stateSubject.asObservable();

  add(description: string): void {
    const newTask = {
      completed: false,
      description,
      id: shortid.generate()
    };
    this.updateState({ tasks: [...this._state.tasks, newTask] });
    this.saveTasksToLocalStorage();
  }

  clearAllCompleted(): void {
    this.updateState({ tasks: this._state.tasks.filter(i => !i.completed) });
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompleted(taskId: string): void {
    const updatedtasks = this._state.tasks.map(t => {
      if (t.id === taskId) {
        log.debug(`found item to toggle ${taskId}`);
        t.completed = !t.completed;
      }
      return t;
    });
    this.updateState({ tasks: updatedtasks });
    this.saveTasksToLocalStorage();
  }

  loadFromLocalStorage(): void {
    this.updateState({ isLoading: true });
    this.loadData()
      .pipe(
        tap(data => log.debug(`TAP Loaded taskList: ${JSON.stringify(data)}`)),
        map(data => JSON.parse(data))
      )
      .subscribe((tasks: Array<Task>) => {
        this.updateState({ tasks, isLoading: false });
      });
  }

  private updateState(newState: Partial<TodoListState>): void {
    console.log(`UPDATE STATE. prevState:${JSON.stringify(this._state)}`);
    console.log(`UPDATE STATE. newState:${JSON.stringify(newState)}`);
    this._state = { ...this._state, ...newState };
    this._stateSubject.next(this._state);
  }

  private saveTasksToLocalStorage(): void {
    console.log('Saving taskList to localStorage...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state.tasks));
  }

  private loadData(): Observable<string> {
    console.log('Loading taskList from localStorage...');
    const data = localStorage.getItem(STORAGE_KEY);
    const obs = new Observable<string>(observer => {
      setTimeout(() => {
        if (data) {
          observer.next(data);
        } else {
          console.log('No data for taskList found in localStorage.');
          observer.next('[]');
        }
      }, 3000);
    });
    return obs;
  }
}

const STORAGE_KEY = 'todolist';

export const todoListStore = new TodoListStore();
