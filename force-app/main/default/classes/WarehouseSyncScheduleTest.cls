@isTest
private class WarehouseSyncScheduleTest {
  //Dummy CRON expression
  public static String CRON_EXP = '0 0 0 15 3 ? 2022';
  @isTest
  static void testScheduledJob() {
    //call the MaintenanceRequestTest class with method CreateData
    MaintenanceRequestTest.CreateData(5, 2, 2, 'Repair');
    Test.startTest();
    //implements the mock callout
    Test.setMock(HttpCalloutMock.class, new WarehouseCalloutServiceMock());
    String joBID = System.schedule(
      'TestScheduleJob',
      CRON_EXP,
      new WarehouseSyncSchedule()
    );
    // List<Case> caselist = [Select count(id) from case where case]
    Test.stopTest();
  }
}
