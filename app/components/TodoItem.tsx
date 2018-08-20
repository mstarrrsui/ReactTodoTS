import * as React from 'react';
import { ITask } from '../models/ITask';

import { css, cx } from 'emotion';

const TodoItemRowClasses =
    cx('row',
        [css`
            line-height: 50px;
            margin: 15px;
        `])
;

const TodoItemBoxClasses =
    cx('col-md-8', 'offset-md-2',
        [css`
            display: flex;
            align-items: center;
            box-shadow: 0px 5px 20px 0px #6a8491;
        `])
;

const TodoItemTextClassBase =
    cx('mr-auto',
        [css`
            font-weight: 400;
            font-size: 24px;
        `])
;

const TodoItemCompletedTextClass = css`
    opacity: .3;
    text-decoration-line: line-through;
    transition: all 300ms;
`;

interface ITodoItemProps {
    item: ITask;
    onClick: (item: ITask, e: React.MouseEvent) => void;
}

const TodoItem = ({ item, onClick }: ITodoItemProps) => {

    const onClickHandler = (e: React.MouseEvent) => onClick(item, e);

    const itemclasses: string = cx(TodoItemTextClassBase, { [TodoItemCompletedTextClass]: item.completed });
    const iconClasses: string = item.completed
        ? cx('fa fa-undo', [css`color: #1c08d3`])
        : cx('fa fa-check-circle-o', [css`color: #13eb37`]);

    return (
        <div className={TodoItemRowClasses} key={item.id}>
            <div className={TodoItemBoxClasses}>
                <div className={itemclasses}>{item.description}</div>
                <i
                    className={iconClasses}
                    onClick={onClickHandler}
                />
            </div>
        </div>
    );
};

export default TodoItem;
