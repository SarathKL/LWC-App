import { LightningElement, track, wire } from "lwc";
import getTasks from "@salesforce/apex/ToDoListController.getTasks";

export default class Todo extends LightningElement {
  newTask = "";

  @track
  todoTasks = [];

  @wire(getTasks)
  getTodoTasks({ data, error }) {
    try {
      if (data) {
        for (const current of data) {
          this.todoTasks.push({
            id: this.todoTasks.length + 1,
            name: current.Subject,
            recordId: current.Id
          });
        }

        console.log(this.todoTasks);
      }
    } catch {
      console.log(error);
    }
  }

  updateNewTask(event) {
    const input = event.currentTarget.value;
    this.newTask = input;
  }

  handlerAdd() {
    this.todoTasks.push({ id: this.todoTasks.length + 1, name: this.newTask });
    this.newTask = "";
  }

  handleDelete(event) {
    const existingTaskIndex = event.target.dataset.task;

    const taskIndex = this.todoTasks.findIndex((task) => {
      return JSON.stringify(task.id) === existingTaskIndex;
    });

    this.todoTasks.splice(taskIndex, 1);
  }
}
