import { LightningElement, wire } from "lwc";

import CONTACT_OBJECT from "@salesforce/schema/Contact";
import FIRSTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";

const COLUMS = [
  {
    label: "First Name",
    fieldName: FIRSTNAME_FIELD.fieldApiName,
    type: "text"
  },
  { label: "Last Name", fieldName: LASTNAME_FIELD.fieldApiName, type: "text" },
  { label: "Email", fieldName: EMAIL_FIELD.fieldApiName, type: "email" }
];

import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class ContactList extends LightningElement {
  columns = COLUMS;
  @wire(getContacts)
  contacts;

  get isLoading() {
    return !this.contacts.data && !this.contacts.error;
  }
}
