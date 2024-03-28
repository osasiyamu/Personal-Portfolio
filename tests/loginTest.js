const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const {homePage, loginPage} =  require('./constants.js');
const {sequelize, User, Profile, Op} = require('./databaseModel/model.js');

describe('Login Feature', function() {
  let driver;

  beforeEach(async function() {
    await sequelize.sync()
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await Profile.destroy({ where: { 
    firstname: {
      [Op.like]: 'admin'
    } }});

    await User.destroy({ where: { 
    username: {
      [Op.like]: 'userAdmin'
    } }});
    await driver.quit();
  });

  // Test case 1
  it('Verify the page navigates to home page after successful login', async function() {
    this.timeout(500000);
    await driver.get(homePage);
    await driver.manage().window().maximize();

    // Delay for 5 seconds before performing the assertion
    await delay(2000);

    const testData = {
      username: 'userAdmin',
      email: 'userAdmin@searchmeup.com',
      password: 'testpassword',
      firstName: 'admin',
      lastName: 'admin',
      occupation: 'Student'
    };

    await register(driver, testData);

    // Find the navbar element
    const navbarElement = await driver.findElement(By.className('navbar'));

    // Use XPath to locate the last anchor element within the navbar
    const lastAnchorElement = await navbarElement.findElement(By.xpath('.//a[last()]'));
    await lastAnchorElement.click();

    // Define all the elements on the page
    const login = await driver.findElement(By.css('a[href="/login"]'));
    await login.click();


    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, loginPage);

    const username = await driver.findElement(By.id('username'));
    const password = await driver.findElement(By.id('password'));
    const signin = await driver.findElement(By.id('signin'));

    // Fill in the form with Admin data
    await username.sendKeys(testData.username);
    await password.sendKeys(testData.password);
    await signin.click();

    // Delay for 5 seconds before performing the assertion
    await delay(2000);
    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, homePage, "Current page should be home page after successful login");
  });
});

async function register (driver, testData) {
    // Find the navbar element
    const navbarElement = await driver.findElement(By.className('navbar'));

    // Use XPath to locate the last anchor element within the navbar
    const lastAnchorElement = await navbarElement.findElement(By.xpath('.//a[last()]'));
    await lastAnchorElement.click();

    // Delay for 2 seconds before performing the assertion
    await delay(2000);

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
    await username.sendKeys(testData.username);
    await email.sendKeys(testData.email);
    await password.sendKeys(testData.password);
    await firstName.sendKeys(testData.firstName);
    await lastName.sendKeys(testData.lastName);
    await occupation.sendKeys(testData.occupation);

    // Scroll the element into view
    await driver.executeScript("arguments[0].scrollIntoView()", iAccept);

    // Wait for the element to become clickable
    await driver.wait(until.elementIsVisible(iAccept));

    // Click on the element
    await iAccept.sendKeys(Key.SPACE);

    // Submit the form
    await driver.executeScript("arguments[0].scrollIntoView()", submit);
    await submit.sendKeys(Key.SPACE);
    await delay(5000);
}


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
