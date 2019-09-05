import shortid from 'shortid';
import { BehaviorSubject } from 'rxjs';

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
}

export const taskStore = new TaskStore();
