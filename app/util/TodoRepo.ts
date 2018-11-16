import { ITask } from '../types/ITask';

// simulated delay
const delay: number = 3000;

export interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}

const makeCancelable = <T extends {}>(promise: Promise<T>): CancellablePromise<T> => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(val => {
      if (hasCanceled) {
        console.log('wrappedPromise - resolve but has been CANCELLED');
        reject({isCanceled: true});
      } else {
        console.log('wrappedPromise - RESOLVING');
        resolve(val);
      }
    });
    promise.catch(error =>
      hasCanceled ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      console.log('CancellablePromise - SETTING CANCELLED FLAG');
      hasCanceled = true;
    }
  };
};

export default class TodoRepo {
  public static loadTasks(): CancellablePromise<ITask[]> {
    const itemsJson: string = localStorage.getItem('todoitems');
    const itemsFromStorage: ITask[] = (itemsJson ? JSON.parse(itemsJson) : []) as ITask[];

    const promise = new Promise<ITask[]>(resolve => {
      setTimeout(() => {
        resolve(itemsFromStorage);
      }, delay);
    });

    return makeCancelable(promise);
  }
}
