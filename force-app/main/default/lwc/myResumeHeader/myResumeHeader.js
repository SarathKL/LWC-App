import { LightningElement, api } from "lwc";

export default class MyResumeHeader extends LightningElement {
  @api socialDetails;
  @api userDetails;
  @api profileImage;

  get phoneLink() {
    return `tel:${this.userDetails.PHONE}`;
  }

  get emailLink() {
    return `mailto:${this.userDetails.EMAIL}`;
  }

  connectedCallback() {
    console.log("connected key :: ", Object.keys(this.socialDetails));
    console.log("socialDetails::", JSON.stringify(this.socialDetails));
    console.log("userDetails::", this.userDetails);
  }
}
