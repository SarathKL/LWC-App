import { LightningElement, wire } from "lwc";

import { NavigationMixin } from "lightning/navigation";
import { subscribe, MessageContext } from "lightning/messageService";
import PRODUCT_SELECTED_MESSAGE from "@salesforce/messageChannel/ProductSelected__c";

import { getFieldValue } from "lightning/uiRecordApi";

// Product__c Schema
import PRODUCT_OBJECT from "@salesforce/schema/Product__c";
import NAME_FIELD from "@salesforce/schema/Product__c.Name";
import PICTURE_URL_FIELD from "@salesforce/schema/Product__c.Picture_URL__c";
import CATEGORY_FIELD from "@salesforce/schema/Product__c.Category__c";
import LEVEL_FIELD from "@salesforce/schema/Product__c.Level__c";
import MSRP_FIELD from "@salesforce/schema/Product__c.MSRP__c";
import BATTERY_FIELD from "@salesforce/schema/Product__c.Battery__c";
import CHARGER_FIELD from "@salesforce/schema/Product__c.Charger__c";
import MOTOR_FIELD from "@salesforce/schema/Product__c.Motor__c";
import MATERIAL_FIELD from "@salesforce/schema/Product__c.Material__c";
import FOPK_FIELD from "@salesforce/schema/Product__c.Fork__c";
import FRONT_BRAKES_FIELD from "@salesforce/schema/Product__c.Front_Brakes__c";
import REAR_BRAKES_FIELD from "@salesforce/schema/Product__c.Rear_Brakes__c";

export default class CycleProductCard extends NavigationMixin(
  LightningElement
) {
  // Exposing fields to make them available in the template
  categoryField = CATEGORY_FIELD;
  levelField = LEVEL_FIELD;
  msrpField = MSRP_FIELD;
  batteryField = BATTERY_FIELD;
  chargerField = CHARGER_FIELD;
  motorField = MOTOR_FIELD;
  materialField = MATERIAL_FIELD;
  forkField = FOPK_FIELD;
  frontBrakesField = FRONT_BRAKES_FIELD;
  rearBrakesField = REAR_BRAKES_FIELD;

  recordId;
  productName;
  productPictureUrl;

  @wire(MessageContext) messageContext;

  productSelectionSubscription;

  connectedCallback() {
    this.productSelectionSubscription = subscribe(
      this.messageContext,
      PRODUCT_SELECTED_MESSAGE,
      (message) => this.handleProductSelected(message.productId)
    );
  }

  handleProductSelected(productId) {
    this.recordId = productId;
  }

  handleRecordLoaded(event) {
    const { records } = event.detail;
    const recordData = records[this.recordId];
    this.productName = getFieldValue(recordData, NAME_FIELD);
    this.productPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
  }

  handleNavigateToRecord() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.recordId,
        objectApiName: PRODUCT_OBJECT.objectApiName,
        actionName: "view"
      }
    });
  }
}
