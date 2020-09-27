public with sharing class ToDoListController {
  @AuraEnabled(cacheable=true)
  public static List<Task> getTasks() {
    return [SELECT Subject FROM Task WHERE OwnerId = :UserInfo.getUserId()];
  }
}
