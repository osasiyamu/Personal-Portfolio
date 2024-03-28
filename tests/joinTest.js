const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const {homePage, joinPage, loginPage} =  require('./constants.js');
const {sequelize, User, Profile, Op} = require('./databaseModel/model.js');

describe('Join Feature', function() { let driver;

  beforeEach(async function() {
    await sequelize.sync();
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await Profile.destroy({ where: { 
    firstname: {
      [Op.like]: 'admin' // Use Op.like for pattern matching
    } }});

    await User.destroy({ where: { 
    username: {
      [Op.like]: 'userAdmin' // Use Op.like for pattern matching
    } }});
    await driver.quit();
  });

  // Test case 1
  it('Verify a user can sign up successfully, while maintsining unique usernames/emails', async function() {
    this.timeout(500000);
    await driver.get(homePage);
    await driver.manage().window().maximize();

    const testData = {
      username: 'userAdmin',
      email: 'userAdmin@searchmeup.com',
      password: 'testpassword',
      firstName: 'admin',
      lastName: 'admin',
      occupation: 'Student'
    };

    await register(driver, testData);

    const user = await User.findOne({ where: { username: testData.username } });

    // Verify that the user was created successfully
    assert.ok(user, "User should exit")
    assert.equal(user.username, testData.username);
    assert.equal(user.email, testData.email);

    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, loginPage, "Current page should be the login page");

    await register(driver, testData);

    // Get the alert for the user already exists if user tries to sign up again
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log('Alert Text:', alertText);
    assert.equal(alertText, "User already exists.");
    await alert.accept(); // Accept the alert
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

    currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, joinPage, "Current page should be the join page");

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
