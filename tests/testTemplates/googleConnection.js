const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/');

    let title = await driver.getTitle();

    await delay(5000);

    await driver.wait(until.titleIs('SearchMeUp'), 10000); // Adjust timeout as needed

    console.log('Title of the page:', title);
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await driver.quit();
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

example();
