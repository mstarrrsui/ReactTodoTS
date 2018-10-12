import * as React from 'react';

import log from 'loglevel';

interface ITodoFormProps {
  onSubmit: (newTask: string) => void;
  onClear: () => void;
}

interface ITodoFormState {
  todoTask: string;
}

const initialState: ITodoFormState = {
  todoTask: ''
};

export default class TodoForm extends React.Component<ITodoFormProps, ITodoFormState> {
  public state: Readonly<ITodoFormState> = initialState;

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setState(() => ({ todoTask: value }));
  }

  public handleClear = () => {
    const { onClear } = this.props;
    log.debug('handleClear');
    onClear();
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const { onSubmit } = this.props;
    log.debug('handleSubmit');
    event.preventDefault();
    const newtask = this.state.todoTask;
    if (newtask.trim().length > 0) {
      onSubmit(newtask);
      this.setState(() => ({ todoTask: '' }));
    }
  }

  public render() {
    const { todoTask } = this.state;
    return (
      <form className="form-inline form-row" onSubmit={this.handleSubmit}>
        <div className="col-md-7 offset-md-1">
          <input
            type="text"
            id="todoTask"
            className="form-control-lg w-100"
            placeholder="Enter a task"
            value={todoTask}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary m-2" disabled={!todoTask}>
            {' '}
            Add
          </button>
          <button type="button" onClick={this.handleClear} className="btn btn-success m-1">
            {' '}
            Clear Completed
          </button>
        </div>
      </form>
    );
  }
}
