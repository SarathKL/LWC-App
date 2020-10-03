import { LightningElement, wire } from "lwc";
import queryAccountsByRevenue from "@salesforce/apex/AccountListControllerLwc.queryAccountsByRevenue";

const DELAY = 350;
export default class AccountFinder extends LightningElement {
  annualRevenue = null;
  @wire(queryAccountsByRevenue, { annualRevenue: "$annualRevenue" })
  accounts;

  get isLoading() {
    return !this.accounts.data && !this.accounts.error;
  }

  handleChange(event) {
    window.clearTimeout(this.delayTimeout);

    const searchKey = event.detail.value;

    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.annualRevenue = searchKey;
    }, DELAY);
  }

  reset() {
    this.annualRevenue = null;
  }
}
