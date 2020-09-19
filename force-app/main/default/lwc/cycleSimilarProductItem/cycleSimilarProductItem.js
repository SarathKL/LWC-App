import { api, LightningElement } from "lwc";

import { NavigationMixin } from "lightning/navigation";
import PRODUCT_OBJECT from "@salesforce/schema/Product__c";

export default class CycleSimilarProductItem extends LightningElement {
  @api product;

  /** View Details Handler to navigates to the record page */
  handleViewDetailsClick() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.product.Id,
        objectApiName: PRODUCT_OBJECT.objectApiName,
        actionName: "view"
      }
    });
  }
}
