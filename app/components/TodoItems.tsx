import * as React from 'react';
import TodoItem from './TodoItem';

import { todoListStore, INITIAL_STATE } from '../stores/TodoListStore';
import { useObservable } from '../util/useObservable';

const TodoItems: React.SFC = () => {
  const state = useObservable(todoListStore.stateDispatch$, INITIAL_STATE);

  return (
    <div className="container todoitems">
      {state.tasks.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoItems;
