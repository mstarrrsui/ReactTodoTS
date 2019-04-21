import * as React from 'react';

import log from 'loglevel';

interface Props {
  onSubmit: (newTask: string) => void;
  onClear: () => void;
}

interface State {
  todoTask: string;
}

const initialState: State = {
  todoTask: ''
};

export default class TodoForm extends React.Component<Props, State> {
  state: Readonly<State> = initialState;

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState(() => ({ todoTask: value }));
  };

  handleClear = () => {
    const { onClear } = this.props;
    log.debug('handleClear');
    onClear();
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props;
    const { todoTask } = this.state;

    log.debug('handleSubmit');
    event.preventDefault();
    const newtask = todoTask;
    if (newtask.trim().length > 0) {
      onSubmit(newtask);
      this.setState(() => ({ todoTask: '' }));
    }
  };

  render() {
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
            Add
          </button>
          <button type="button" onClick={this.handleClear} className="btn btn-success m-1">
            Clear Completed
          </button>
        </div>
      </form>
    );
  }
}
