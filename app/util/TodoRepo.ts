import { ITask } from '../types/ITask';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';



export default class TodoRepo {
   static loadTasks(): Observable<ITask[]> {
    const itemsJson: string | null = localStorage.getItem('todoitems');
    const itemsFromStorage: ITask[] = (itemsJson ? JSON.parse(itemsJson) : []) as ITask[];

    const items$ = of(itemsFromStorage).pipe(delay(3000)); // articifical delay to simulate API call
    return items$;
  }
}
