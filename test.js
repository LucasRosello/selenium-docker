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

    let userInput = await driver.wait(until.elementLocated(By.id('input_0')), 10000);
    await userInput.sendKeys(process.env.WINA_USER)

    let passInput = await driver.wait(until.elementLocated(By.id('input_1')), 10000);
    await passInput.sendKeys(process.env.WINA_PASS)

    let loginButton = await driver.wait(until.elementLocated(By.id('btnIngresar')), 10000);
    await loginButton.click()

    await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/md-content/md-content/div[1]/ng-view/div/div[2]/div/div/div/div/div/ng-transclude/div[1]/span[1]/div')), 100000);

    await driver.get("https://allaria-ssl.allaria.com.ar/AllariaOnline/VBolsaNet/desktop.html#!/tenenciaval");







    const nombres = new Map();

    function limpiarTexto(nombre){
        nombre = nombre.replace("Rescatar","")
        if(nombre.substring(nombre.length-2,nombre.length) == "  "){
            return nombre.replace("  ","")
        }
    }
    
    

    let table = await driver.wait(until.elementLocated(By.id('pnlTV')), 20000);
    let rows = await driver.findElements(By.xpath("/html/body/div[3]/md-content/md-content/div[1]/ng-view/div/div[2]/div/div/div/ng-transclude/div[2]/div/div[1]/table/tbody/tr"))

    console.log((await rows).length)



  var inversiones =  [];


    for (let i = 1; i <= (await rows).length; i++) {
   
     var nombre = await driver.findElement(By.xpath("/html/body/div[3]/md-content/md-content/div[1]/ng-view/div/div[2]/div/div/div/ng-transclude/div[2]/div/div[1]/table/tbody/tr["+i+"]/td[2]")).getText()
    nombre = limpiarTexto(nombre)
    if (typeof nombre ==='string'){
      saldo = await driver.findElement(By.xpath("/html/body/div[3]/md-content/md-content/div[1]/ng-view/div/div[2]/div/div/div/ng-transclude/div[2]/div/div[1]/table/tbody/tr["+i+"]/td[8]")).getText()
      inversion = {
        "id": i,
        "nombre": nombre,
        "saldo": saldo
      }
      inversiones.push(inversion)
    }
    }

    console.log(inversiones)




enviarMensaje(inversiones)

  } finally {
    driver.quit();
  }
})();


function enviarMensaje(inversiones){

  var mensaje = "Hola, este es el resumen diario de Inversiones: \n\n"

  for(i = 0; i < inversiones.length; i++){
    mensaje = mensaje + inversiones[i].nombre + " tiene un saldo de " + inversiones[i].saldo + "\n"

  }

  var XMLHttpRequest = require('xhr2');
  var xhr = new XMLHttpRequest();
  const url = process.env.TELEGRAM_URL + mensaje
  xhr.open("GET", url)
  xhr.send()

}