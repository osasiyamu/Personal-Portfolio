const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const {homePage, joinPage} =  require('./constants.js');

describe('Join Feature', function() { let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  // Test case 1
  it('Verify a user can sign up successfully', async function() {
    this.timeout(100000);
    await driver.get(homePage);
    await driver.manage().window().maximize();

    // Find the navbar element
    const navbarElement = await driver.findElement(By.className('navbar'));

    // Use XPath to locate the last anchor element within the navbar
    const lastAnchorElement = await navbarElement.findElement(By.xpath('.//a[last()]'));
    await lastAnchorElement.click();

    // Delay for 5 seconds before performing the assertion
    await delay(2000);

    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, joinPage, "Current page should be the login page");

    // Define all the elements on the page
    const username = await driver.findElement(By.id('username'));
    const email = await driver.findElement(By.id('email'));
    const password = await driver.findElement(By.id('password'));
    const firstName = await driver.findElement(By.id('firstName'));
    const lastName = await driver.findElement(By.id('lastName'));
    const occupation = await driver.findElement(By.id('occupation'));
    const iAccept = await driver.findElement(By.id('checkbox'));
    const submit = await driver.findElement(By.id('signup'));

    // Fill in the form with Admin data
    await username.sendKeys('admin');
    await email.sendKeys('admin@searchmeup.ca');
    await password.sendKeys('admin');
    await firstName.sendKeys('FirstName');
    await lastName.sendKeys('LastName');
    await occupation.sendKeys('Occupation');

    // Scroll the element into view
    await driver.executeScript("arguments[0].scrollIntoView()", iAccept);

    // Wait for the element to become clickable
    await driver.wait(until.elementIsVisible(iAccept));

    // Click on the element
    await iAccept.sendKeys(Key.SPACE);

    // Submit the form
    await driver.executeScript("arguments[0].scrollIntoView()", submit);
    await submit.sendKeys(Key.SPACE);
  });
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
