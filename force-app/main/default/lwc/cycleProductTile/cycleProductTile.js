import { api, LightningElement } from "lwc";

export default class CycleProductTile extends LightningElement {
  _product;

  @api
  get product() {
    return this._product;
  }
  set product(value) {
    this._product = value;
    this.pictureUrl = value.Picture_URL__c;
    this.name = value.Name;
    this.msrp = value.MSRP__c;
  }

  pictureUrl;
  name;
  msrp;

  handleClick() {
    const selectedEvent = new CustomEvent("selected", {
      detail: this.product.Id
    });
    this.dispatchEvent(selectedEvent);
  }
}
