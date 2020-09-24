import { api, LightningElement } from "lwc";

export default class MyResumeTag extends LightningElement {
  @api tagList;
  @api heading;
}
