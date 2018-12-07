import { ITask } from '../types/ITask';
import { Observable, from } from 'rxjs';

// simulated delay
const delay: number = 3000;


export default class TodoRepo {
  public static loadTasks(): Observable<ITask[]> {
    const itemsJson: string = localStorage.getItem('todoitems');
    const itemsFromStorage: ITask[] = (itemsJson ? JSON.parse(itemsJson) : []) as ITask[];

    const promise = new Promise<ITask[]>(resolve => {
      setTimeout(() => {
        resolve(itemsFromStorage);
      }, delay);
    });

    return from(promise);
  }
}
