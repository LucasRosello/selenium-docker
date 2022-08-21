const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

(async function googleSearch() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub/")
    // .setChromeService(
    //   chrome.setDefaultService(
    //     new chrome.ServiceBuilder("./drivers/chromedriver_89").build()
    //   )
    // )
    .build();

  try {
    // Navigate to Url
    console.log("corriendo")
    await driver.get("https://allaria-ssl.allaria.com.ar/AllariaOnline/VBolsaNet/login.html");
    await driver.wait(until.titleIs('ALLARIA LEDESMA & CIA. S.A'), 1000);
    console.log(await driver.getTitle())

    let userInput = await driver.wait(until.elementLocated(By.id('input_0')), 10000);
    await userInput.sendKeys(process.env.WINA_USER)

    let passInput = await driver.wait(until.elementLocated(By.id('input_1')), 10000);
    await passInput.sendKeys(process.env.WINA_PASS)

    let loginButton = await driver.wait(until.elementLocated(By.id('btnIngresar')), 10000);
    await loginButton.click()

    await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/md-content/md-content/div[1]/ng-view/div/div[2]/div/div/div/div/div/ng-transclude/div[1]/span[1]/div')), 20000);

    await driver.get("https://allaria-ssl.allaria.com.ar/AllariaOnline/VBolsaNet/desktop.html#!/tenenciaval");

    // fake id for waiting
    await driver.wait(until.elementLocated(By.id('fakeid')), 10000);

    //pnlTV_container
       
    /*
      let button =
       await driver.wait(until.elementLocated(By.id('foo')), 10000);
   await button.click();
*/

    
  } finally {
    driver.quit();
  }
})();
