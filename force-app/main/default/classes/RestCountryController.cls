public with sharing class RestCountryController {
  public class WrapperCountry {
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public List<String> topLevelDomain { get; set; }
    @AuraEnabled
    public String alpha2Code { get; set; }
    @AuraEnabled
    public String alpha3Code { get; set; }
    @AuraEnabled
    public List<String> callingCodes { get; set; }
    @AuraEnabled
    public String capital { get; set; }
    @AuraEnabled
    public List<String> altSpellings { get; set; }
    @AuraEnabled
    public String region { get; set; }
    @AuraEnabled
    public String subregion { get; set; }
    @AuraEnabled
    public Integer population { get; set; }
    @AuraEnabled
    public List<String> latlng { get; set; }
    @AuraEnabled
    public String demonym { get; set; }
    @AuraEnabled
    public Integer area { get; set; }
    @AuraEnabled
    public Decimal gini { get; set; }
    @AuraEnabled
    public List<String> timezones { get; set; }
    @AuraEnabled
    public List<String> borders { get; set; }
    @AuraEnabled
    public String nativeName { get; set; }
    @AuraEnabled
    public String numericCode { get; set; }
    @AuraEnabled
    public List<CountryCurrency> currencies { get; set; }
    @AuraEnabled
    public List<Language> languages { get; set; }
    @AuraEnabled
    public Translation translations { get; set; }
    @AuraEnabled
    public String flag { get; set; }
    @AuraEnabled
    public List<RegionalBlocs> regionalBlocs { get; set; }
    @AuraEnabled
    public String cioc { get; set; }
  }

  public class CountryCurrency {
    @AuraEnabled
    public String code { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public String symbol { get; set; }
  }

  public class Language {
    @AuraEnabled
    public String iso639_1 { get; set; }
    @AuraEnabled
    public String iso639_2 { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public String nativeName { get; set; }
  }
  public class Translation {
    @AuraEnabled
    public String Name { get; set; }
    @AuraEnabled
    public String Value { get; set; }
  }
  public class RegionalBlocs {
    @AuraEnabled
    public String acronym { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public List<String> otherAcronyms { get; set; }
    @AuraEnabled
    public List<String> otherNames { get; set; }
  }

  @AuraEnabled
  public static List<Object> getRestCountries(String strEndPointURL) {
    List<Object> mapJsonData = new List<Object>();
    String strResponse = null;

    if (String.isNotBlank(strEndPointURL)) {
      HttpRequest httpRequest = new HttpRequest();
      httpRequest.setEndpoint(strEndPointURL);

      httpRequest.setMethod('GET');
      httpRequest.setHeader(
        'Authorization',
        'OAuth ' + UserInfo.getSessionId()
      );
      httpRequest.setHeader(
        'Authorization',
        'Bearer ' + UserInfo.getSessionId()
      );

      try {
        Http http = new Http();
        HttpResponse httpResponse = http.send(httpRequest);

        while (httpResponse.getStatusCode() == 302) {
          httpRequest.setEndpoint(httpResponse.getHeader('Location'));
          httpResponse = new Http().send(httpRequest);
        }

        if (httpResponse.getStatusCode() == 200) {
          strResponse = httpResponse.getBody();
        } else {
          throw new CalloutException(httpResponse.getBody());
        }
      } catch (Exception ex) {
        throw ex;
      }
    }

    if (!String.isBlank(strResponse)) {
      mapJsonData = (List<Object>) JSON.deserializeUntyped(strResponse);
    }

    if (!mapJsonData.isEmpty()) {
      return mapJsonData;
    } else {
      return null;
    }
  }

  @AuraEnabled
  public static void pushCountriesBulks(String payload) {
    List<WrapperCountry> payloadObject = new List<WrapperCountry>();

    //System.debug(countries);
    try {
      if (!String.isBlank(payload)) {
        payloadObject = (List<WrapperCountry>) JSON.deserialize(
          payload,
          List<WrapperCountry>.class
        );
      }

      for (WrapperCountry myWrpCountry : payloadObject) {
        RestCountry__c myCountry = new RestCountry__c();

        myCountry = RestCountryController.pushContry(myWrpCountry);
        insert myCountry;
        System.debug('myCountry inserted ::: ');

        List<Currency__c> myCountryCurrency = new List<Currency__c>();
        myCountryCurrency = RestCountryController.pushCurrencies(
          myWrpCountry,
          myCountry.Id
        );
        insert myCountryCurrency;
        System.debug('myCountryCurrency inserted ::: ');

        List<Language__c> languages = new List<Language__c>();
        languages = RestCountryController.pushLanguages(
          myWrpCountry,
          myCountry.Id
        );
        insert languages;
        System.debug('languages inserted ::: ');

        List<Regional_Block__c> rBlocks = new List<Regional_Block__c>();
        rBlocks = RestCountryController.pushRegionalBlocks(
          myWrpCountry,
          myCountry.Id
        );
        insert rBlocks;
        System.debug('rBlocks inserted ::: ');
      }
    } catch (Exception ex) {
      System.debug('ERROR ::: ' + ex.getMessage());
    }
  }

  public static List<Regional_Block__c> pushRegionalBlocks(
    WrapperCountry myWrpCountry,
    Id countryId
  ) {
    List<Regional_Block__c> regionalBlocks = new List<Regional_Block__c>();

    for (RegionalBlocs myWrpRBlock : myWrpCountry.regionalBlocs) {
      Regional_Block__c myRBlock = new Regional_Block__c();

      myRBlock.Name = myWrpRBlock.name;
      myRBlock.Acronym__c = myWrpRBlock.acronym;
      myRBlock.Other_Names__c = String.join(myWrpRBlock.otherNames, ',');
      myRBlock.Other_Acronyms__c = String.join(myWrpRBlock.otherAcronyms, ',');

      myRBlock.RestCountry__c = countryId;

      regionalBlocks.add(myRBlock);
    }

    return regionalBlocks;
  }

  public static List<Language__c> pushLanguages(
    WrapperCountry myWrpCountry,
    Id countryId
  ) {
    List<Language__c> languages = new List<Language__c>();

    for (Language myWrpLanguage : myWrpCountry.languages) {
      Language__c myLanguage = new Language__c();

      myLanguage.Name = myWrpLanguage.name;
      myLanguage.Native_Name__c = myWrpLanguage.nativeName;
      myLanguage.Iso639_1__c = myWrpLanguage.iso639_1;
      myLanguage.Iso639_2__c = myWrpLanguage.iso639_2;

      myLanguage.RestCountry__c = countryId;

      languages.add(myLanguage);
    }

    return languages;
  }

  public static List<Currency__c> pushCurrencies(
    WrapperCountry myWrpCountry,
    Id countryId
  ) {
    List<Currency__c> myCountryCurrency = new List<Currency__c>();

    for (CountryCurrency myWrpCurrency : myWrpCountry.currencies) {
      Currency__c myCurrency = new Currency__c();

      myCurrency.Name = myWrpCurrency.name;
      myCurrency.Code__c = myWrpCurrency.code;
      myCurrency.Symbol__c = myWrpCurrency.symbol;
      myCurrency.RestCountry__c = countryId;

      myCountryCurrency.add(myCurrency);
    }

    return myCountryCurrency;
  }

  public static RestCountry__c pushContry(WrapperCountry myWrpCountry) {
    RestCountry__c myCountry = new RestCountry__c();

    myCountry.Name = myWrpCountry.name;
    myCountry.Top_Level_Domain__c = String.join(
      myWrpCountry.topLevelDomain,
      ','
    );
    myCountry.Alpha_2_Code__c = myWrpCountry.alpha2Code;
    myCountry.Alpha_3_Code__c = myWrpCountry.alpha3Code;
    myCountry.Calling_Codes__c = String.join(myWrpCountry.callingCodes, ',');
    myCountry.Capital__c = myWrpCountry.capital;
    myCountry.Alt_Spellings__c = String.join(myWrpCountry.altSpellings, ',');
    myCountry.Region__c = myWrpCountry.region;
    myCountry.Sub_Region__c = myWrpCountry.subregion;
    myCountry.Population__c = myWrpCountry.population;
    myCountry.Latlng__c = String.join(myWrpCountry.latlng, ',');
    myCountry.Demonym__c = myWrpCountry.demonym;
    myCountry.Area__c = myWrpCountry.area;
    myCountry.Gini__c = myWrpCountry.gini;
    myCountry.Time_Zones__c = String.join(myWrpCountry.timezones, ',');
    myCountry.Borders__c = String.join(myWrpCountry.borders, ',');
    myCountry.Native_Name__c = myWrpCountry.nativeName;
    myCountry.Numeric_Code__c = myWrpCountry.numericCode;
    myCountry.Flag__c = myWrpCountry.flag;
    myCountry.Cioc__c = myWrpCountry.cioc;

    return myCountry;
  }
}
