import * as React from 'react';
import Task from '../types/Task';
import TodoItem from './TodoItem';
import { observer } from 'mobx-react';

interface Props {
  items: Task[];
  onClearItem: (item: Task, e: React.MouseEvent | React.KeyboardEvent) => void;
}

const TodoItems: React.SFC<Props> = ({ items, onClearItem }: Props) => {
  return (
    <div className="container todoitems">
      {items.map(item => (
        <TodoItem item={item} key={item.id} onClick={onClearItem} />
      ))}
    </div>
  );
};

export default observer(TodoItems);
