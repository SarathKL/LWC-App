import { api, LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import PRODUCT_FAMILY_FIELD from "@salesforce/schema/Product__c.Product_Family__c";
import getSimilarProducts from "@salesforce/apex/ProductController.getSimilarProducts";

const fields = [PRODUCT_FAMILY_FIELD];

export default class CycleSimilarProducts extends LightningElement {
  @api recordId;
  @api familyId;

  @wire(getRecord, { recordId: "$recordId", fields })
  product;

  @wire(getSimilarProducts, {
    productId: "$recordId",
    familyId: "$product.data.fields.Product_Family__c.value"
  })
  similarProducts;
}
