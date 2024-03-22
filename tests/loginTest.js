const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const {homePage, loginPage} =  require('./constants.js');

describe('Login Feature', function() {
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  // Test case 1
  it('Verify the page navigates to home page after successful login', async function() {
    this.timeout(100000);
    await driver.get(homePage);
    await driver.manage().window().maximize();


    // Find the navbar element
    const navbarElement = await driver.findElement(By.className('navbar'));

    // Use XPath to locate the last anchor element within the navbar
    const lastAnchorElement = await navbarElement.findElement(By.xpath('.//a[last()]'));
    await lastAnchorElement.click();

    // Delay for 5 seconds before performing the assertion
    await delay(5000);

    // Define all the elements on the page
    const login = await driver.findElement(By.css('a[href="/login"]'));
    await login.click();

    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, loginPage);

    const username = await driver.findElement(By.id('username'));
    const password = await driver.findElement(By.id('password'));
    const signin = await driver.findElement(By.id('signin'));


    // Fill in the form with Admin data
    await username.sendKeys('admin');
    await password.sendKeys('admin');
    await signin.click();

    // Delay for 5 seconds before performing the assertion
    await delay(5000);
    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, homePage, "Current page should be home page after successful login");
  });
});


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
