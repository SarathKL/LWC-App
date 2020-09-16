import { LightningElement } from "lwc";
import retriveNews from "@salesforce/apex/NewsController.retriveNews";
export default class NewsComponent extends LightningElement {
  result = [];
  selectedNews = {};
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

  connectedCallback() {
    this.fetchNews();
  }

  fetchNews() {
    retriveNews()
      .then((response) => {
        this.formatNewsData(response.articles);
        console.log("resutl:::", this.result);
      })
      .catch((error) => {
        console.log("ERROR::");
        console.log(error);
      });
  }

  formatNewsData(res) {
    this.result = res.map((item, index) => {
      let newId = `new_${index + 1}`;
      let name = item.source.name;
      let date = new Date(item.publishedAt).toDateString();
      return { ...item, newId: newId, name: name, date: date };
    });
  }
  showModal(event) {
    const newId = event.target.dataset.item;
    const selectedNews = this.result.find((item) => item.newId === newId);
    this.selectedNews = { ...selectedNews };
    console.log("show modal:::", selectedNews);

    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
