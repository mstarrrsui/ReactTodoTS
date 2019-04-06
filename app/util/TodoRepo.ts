import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import Task from '../types/Task';

export default class TodoRepo {
  static loadTasks(): Observable<Task[]> {
    const itemsJson = localStorage.getItem('todoitems');
    const itemsFromStorage: Task[] = (itemsJson ? JSON.parse(itemsJson) : []) as Task[];

    const items$ = of(itemsFromStorage).pipe(delay(3000)); // articifical delay to simulate API call
    return items$;
  }
}
