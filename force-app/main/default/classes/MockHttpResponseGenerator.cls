@isTest
global class MockHttpResponseGenerator implements HttpCalloutMock {
  // Implement this interface method
  global HTTPResponse respond(HTTPRequest req) {
    HttpResponse response = new HttpResponse();
    response.setHeader('Content-Type', 'application/json');
    response.setStatus('OK');
    response.setStatusCode(200);

    return response;
  }
}
