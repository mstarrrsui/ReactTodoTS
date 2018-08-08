import * as React from "react";
import TodoItem from './TodoItem';
import { ITask } from '../models/ITask';


interface ITodoItemsProps {
    items: ITask[],
    onClearItem: (item: ITask, e: React.MouseEvent) => void
}

export default function TodoItems({ items, onClearItem }: ITodoItemsProps) {
    return (
        <div className="container todoitems">
        { items.map( item =>
            <TodoItem item={item} key={item.id} onClick={onClearItem} />
        )}
        </div>

    )
}



