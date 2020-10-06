import { LightningElement, track } from "lwc";
import getRestCountries from "@salesforce/apex/RestCountryController.getRestCountries";
import pushCountriesBulks from "@salesforce/apex/RestCountryController.pushCountriesBulks";

const columns = [
  { label: "Name", fieldName: "name" },
  { label: "Alpha3Code", fieldName: "alpha3Code" },
  { label: "Capital", fieldName: "capital" },
  { label: "Cioc", fieldName: "cioc" },
  { label: "Native Name", fieldName: "nativeName" }
];

export default class RestCountry extends LightningElement {
  strEndPointURL = "https://restcountries.eu/rest/v2/all";
  isLoading = false;
  COLUMNS = columns;
  @track countries = [];

  connectedCallback() {
    //this.getRestCountries();
  }

  handleShowData() {
    this.getRestCountries();
  }

  handleImportData() {
    const payload =
      '[{"name":"Afghanistan","topLevelDomain":[".af"],"alpha2Code":"AF","alpha3Code":"AFG","callingCodes":["93"],"capital":"Kabul","altSpellings":["AF","Afġānistān"],"region":"Asia","subregion":"Southern Asia","population":27657145,"latlng":[33,65],"demonym":"Afghan","area":652230,"gini":27.8,"timezones":["UTC+04:30"],"borders":["IRN","PAK","TKM","UZB","TJK","CHN"],"nativeName":"افغانستان","numericCode":"004","currencies":[{"code":"AFN","name":"Afghan afghani","symbol":"؋"}],"languages":[{"iso639_1":"ps","iso639_2":"pus","name":"Pashto","nativeName":"پښتو"},{"iso639_1":"uz","iso639_2":"uzb","name":"Uzbek","nativeName":"Oʻzbek"},{"iso639_1":"tk","iso639_2":"tuk","name":"Turkmen","nativeName":"Türkmen"}],"translations":{"de":"Afghanistan","es":"Afganistán","fr":"Afghanistan","ja":"アフガニスタン","it":"Afghanistan","br":"Afeganistão","pt":"Afeganistão","nl":"Afghanistan","hr":"Afganistan","fa":"افغانستان"},"flag":"https://restcountries.eu/data/afg.svg","regionalBlocs":[{"acronym":"SAARC","name":"South Asian Association for Regional Cooperation","otherAcronyms":[],"otherNames":[]}],"cioc":"AFG"}]"';
    //pushCountriesBulks({ payload: JSON.stringify(this.countries) });
    pushCountriesBulks({ payload: payload });
  }

  getRestCountries() {
    this.isLoading = true;
    console.log("getRestCountries");
    getRestCountries({ strEndPointURL: this.strEndPointURL })
      .then((data) => {
        this.formatCountriesData(data);

        console.log(data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.isLoading = false;
      });
  }

  formatCountriesData(res) {
    this.countries = res.map((item, index) => {
      let newId = `new_${index + 1}`;
      return { ...item, newId: newId };
    });
  }
}
