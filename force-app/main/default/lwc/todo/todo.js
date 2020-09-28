import { LightningElement, track, wire } from "lwc";
import getTasks from "@salesforce/apex/ToDoListController.getTasks";
import insertTask from "@salesforce/apex/ToDoListController.insertTask";
import { refreshApex } from "@salesforce/apex";
import deleteTask from "@salesforce/apex/ToDoListController.deleteTask";

export default class Todo extends LightningElement {
  processing = true;
  newTask = "";

  todoTaskResponse;

  @track
  todoTasks = [];

  @wire(getTasks)
  getTodoTasks(response) {
    let data = response.data;
    let error = response.error;

    if (data || error) {
      this.processing = false;
    }

    this.todoTaskResponse = response;

    this.todoTasks = [];
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
    if (this.newTask === "") {
      return;
    }

    this.processing = true;

    let taskLastIndex = this.todoTasks.length ? this.todoTasks.length - 1 : 0;

    insertTask({ subject: this.newTask })
      .then((result) => {
        this.todoTasks.push({
          id: this.todoTasks[taskLastIndex].id + 1,
          name: this.newTask,
          recordId: result.Id
        });
        this.newTask = "";

        console.log("result ::", result);
        console.log("todo ::", this.todoTasks);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.processing = false;
      });
  }

  handleDelete(event) {
    this.processing = true;

    const existingTaskIndex = event.target.dataset.task;

    const taskIndex = this.todoTasks.findIndex((task) => {
      return JSON.stringify(task.id) === existingTaskIndex;
    });

    deleteTask({ recordId: this.todoTasks[taskIndex].recordId })
      .then((result) => {
        this.todoTasks.splice(taskIndex, 1);
        console.log(result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.processing = false;
      });
  }

  handleRefresh() {
    this.processing = true;

    refreshApex(this.todoTaskResponse).finally(() => {
      this.processing = false;
    });
  }
}
