const {homePage} =  require('./constants.js');
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { del } = require('selenium-webdriver/http');

describe('Title', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  // Test case 1
  it('Verifies that the title page is set to "SearchMeUp"', async function() {
    await driver.get(homePage);
    let title = await driver.getTitle();
    assert.equal(title, 'SearchMeUp', 'Incorrect Website Title');
  });
});


