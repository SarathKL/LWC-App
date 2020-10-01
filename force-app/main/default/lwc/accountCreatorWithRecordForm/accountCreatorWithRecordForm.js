import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//step-1
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
//step-2
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class AccountCreatorWithRecordForm extends LightningElement {
  objectApiName = ACCOUNT_OBJECT;
  fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Account created",
      message: "Record ID: " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);
  }
}
