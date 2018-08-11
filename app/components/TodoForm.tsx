import * as React from "react";
import log from 'loglevel';

interface ITodoFormProps {
    onSubmit: (newTask: string) => void
}

interface ITodoFormState {
    todoTask : string;
}

const initialState: ITodoFormState = {
    todoTask: ''
}

export default class TodoForm extends React.Component<ITodoFormProps,ITodoFormState> {

    state: Readonly<ITodoFormState> = initialState;


    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        this.setState(() => ({ todoTask: value }));
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const { onSubmit } = this.props;
        log.debug("handleSubmit");
        event.preventDefault();
        const newtask = this.state.todoTask;
        if (newtask.trim().length > 0) {
            onSubmit( newtask );
            this.setState(() => ({ todoTask : '' }));
        }
    }

    render() {
        const { todoTask } = this.state;
        return (
            <form className="form-inline form-row" onSubmit={this.handleSubmit}>
                <div className="col-md-7 offset-md-2">
                    <input
                        type="text"
                        id="todoTask"
                        className="form-control-lg w-100"
                        placeholder="Enter a task"
                        value={todoTask}
                        onChange={this.handleChange} />
                </div>
                <div className="col-md-1">
                    <button
                        type="submit"
                        className="btn btn-primary m-2"
                        disabled={!todoTask}>Add
                    </button>
                </div>
            </form>
        );
    }

}




