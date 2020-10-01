import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import { refreshApex } from "@salesforce/apex";

//step-1
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
//step-2
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

//step-3
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import Id from "@salesforce/user/Id";
import USER_NAME_FIELD from "@salesforce/schema/User.Name";

export default class AccountCreatorWithRecordForm extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
  recordId = "";

  //retrived data used by LDS service
  userId = Id;
  @wire(getRecord, { recordId: "$userId", fields: [USER_NAME_FIELD] })
  user;

  get name() {
    console.log(JSON.stringify(this.user.data));
    return getFieldValue(this.user.data, USER_NAME_FIELD);
  }
  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Account created",
      message: "Record ID: " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);

    refreshApex(this.user);
  }
}
