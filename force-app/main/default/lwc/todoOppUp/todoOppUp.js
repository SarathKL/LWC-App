import { LightningElement } from "lwc";

export default class TodoOppUp extends LightningElement {
  isModalOpen = false;
  get modalClass() {
    if (this.isModalOpen) {
      return "slds-modal slds-fade-in-open";
    }
    return "slds-modal ";
  }

  get modalBackdropClass() {
    if (this.isModalOpen) {
      return "slds-backdrop slds-backdrop_open";
    }
    return "slds-backdrop";
  }
  handlePopup(event) {
    console.log("clicked");
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
