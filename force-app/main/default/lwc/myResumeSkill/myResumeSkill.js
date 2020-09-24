import { api, LightningElement } from "lwc";

export default class MyResumeSkill extends LightningElement {
  @api skillDetails;

  connectedCallback() {
    console.log("skill details", this.skillDetails.EDUCATION_DATA);
  }
}
