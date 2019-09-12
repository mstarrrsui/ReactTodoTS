import * as React from 'react';
import { css, cx } from 'emotion';
import log from 'loglevel';
import { Task, todoListState } from '../stores/TodoListState';

const TodoItemRowClasses = cx('row', [
  css`
    line-height: 50px;
    margin: 15px;
  `
]);

const TodoItemBoxClasses = cx('col-md-8', 'offset-md-2', [
  css`
    display: flex;
    align-items: center;
    box-shadow: 0px 5px 20px 0px #6a8491;
  `
]);

const TodoItemTextClassBase = cx('mr-auto', [
  css`
    font-weight: 400;
    font-size: 24px;
  `
]);

const TodoItemCompletedTextClass = css`
  opacity: 0.3;
  text-decoration-line: line-through;
  transition: all 3000ms;
`;

const TodoItemIconCompleted = cx('fa fa-undo', [
  css`
    color: #1c08d3;
  `
]);
const TodoItemIconNormal = cx('fa fa-check-circle-o', [
  css`
    color: #13eb37;
  `
]);

interface Props {
  item: Task;
}

const TodoItem: React.SFC<Props> = ({ item }) => {
  function onClickHandler(e: React.MouseEvent): void {
    log.debug(`toggle completed`);
    todoListState.toggleTaskCompleted(item.id);
  }

  function onKeypressHandler(e: React.KeyboardEvent): void {
    log.debug(`key:${e.key}`);
    if (e && e.key === 'x') {
      todoListState.toggleTaskCompleted(item.id);
    }
  }

  const itemclasses = cx(TodoItemTextClassBase, { [TodoItemCompletedTextClass]: item.completed });
  const iconClasses = item.completed ? TodoItemIconCompleted : TodoItemIconNormal;

  return (
    <div className={TodoItemRowClasses} key={item.id}>
      <div className={TodoItemBoxClasses}>
        <div className={itemclasses}>{item.description}</div>
        <i
          role="button"
          tabIndex={0}
          className={iconClasses}
          onClick={onClickHandler}
          onKeyPress={onKeypressHandler}
        />
      </div>
    </div>
  );
};

export default TodoItem;
