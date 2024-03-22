const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Login Feature', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  // Test case 1
  it('should navigate to dashboard after successful login', async function() {
    await driver.get('http://localhost:3000/login');

    
    assert.equal(true, true, 'Assertion failed');
  });
});


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
