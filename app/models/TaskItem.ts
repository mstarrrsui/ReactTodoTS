import { types } from 'mobx-state-tree';

const TaskItem = types
  .model('Todo', {
    id: types.string,
    description: types.string,
    completed: false
  })
  .actions(self => ({
    markCompleted() {
      self.completed = true;
    }
  }));

export default TaskItem;
