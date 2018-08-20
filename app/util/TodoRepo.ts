
import { ITask } from '../models/ITask';

const delay: number = 3000;

export default class TodoRepo {

   public static loadTasks(): Promise<ITask[]> {

        const itemsJson: string = localStorage.getItem('todoitems');
        const itemsFromStorage: ITask[] = (itemsJson ? JSON.parse(itemsJson) : []) as ITask[];
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve(itemsFromStorage);
            }, delay);
          });
    }
}
