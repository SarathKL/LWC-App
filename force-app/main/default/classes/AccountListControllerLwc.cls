public with sharing class AccountListControllerLwc {
  @AuraEnabled(cacheable=true)
  public static List<Account> queryAccountsByRevenue(Decimal annualRevenue) {
    if (annualRevenue == 0 || annualRevenue == null)
      return new List<Account>();

    return [SELECT Id, Name FROM Account WHERE AnnualRevenue >= :annualRevenue];
  }
}
