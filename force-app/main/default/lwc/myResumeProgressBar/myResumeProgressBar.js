import { api, LightningElement } from "lwc";

export default class MyResumeProgressBar extends LightningElement {
  @api progressValue = 0;

  get getStyle() {
    return `width:${this.progressValue}%`;
  }
}
