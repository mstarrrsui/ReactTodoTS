
import { ITask } from '../models/ITask'

const delay: number = 3000;

export default class TodoRepo {

    static loadTasks(): Promise<ITask[]> {

        const itemsJson: string = localStorage.getItem('todoitems')
        let itemsFromStorage: ITask[] = (itemsJson ? JSON.parse(itemsJson) : []) as ITask[]
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(itemsFromStorage);
            }, delay);
          })
    }
}