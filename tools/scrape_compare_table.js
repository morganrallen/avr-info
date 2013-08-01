var fs = require("fs");
var jsdom = require("jsdom");

// hit avrfreaks compare table, most complete resource i am aware of
jsdom.env("http://www.avrfreaks.net/index.php?module=FreaksDevices&func=ajaxProcess&open=compare_devices&selDevIds[]=7&selDevIds[]=8&selDevIds[]=9&selDevIds[]=11&selDevIds[]=12&selDevIds[]=13&selDevIds[]=14&selDevIds[]=15&selDevIds[]=16&selDevIds[]=17&selDevIds[]=20&selDevIds[]=21&selDevIds[]=25&selDevIds[]=26&selDevIds[]=27&selDevIds[]=28&selDevIds[]=29&selDevIds[]=30&selDevIds[]=31&selDevIds[]=32&selDevIds[]=33&selDevIds[]=34&selDevIds[]=35&selDevIds[]=36&selDevIds[]=37&selDevIds[]=38&selDevIds[]=39&selDevIds[]=40&selDevIds[]=41&selDevIds[]=42&selDevIds[]=44&selDevIds[]=45&selDevIds[]=46&selDevIds[]=47&selDevIds[]=48&selDevIds[]=49&selDevIds[]=50&selDevIds[]=51&selDevIds[]=52&selDevIds[]=53&selDevIds[]=54&selDevIds[]=55&selDevIds[]=56&selDevIds[]=57&selDevIds[]=58&selDevIds[]=59&selDevIds[]=60&selDevIds[]=61&selDevIds[]=62&selDevIds[]=63&selDevIds[]=64&selDevIds[]=65&selDevIds[]=66&selDevIds[]=67&selDevIds[]=68&selDevIds[]=69&selDevIds[]=70&selDevIds[]=72&selDevIds[]=73&selDevIds[]=74&selDevIds[]=75&selDevIds[]=76&selDevIds[]=77&selDevIds[]=78&selDevIds[]=79&selDevIds[]=80&selDevIds[]=81&selDevIds[]=82&selDevIds[]=83&selDevIds[]=84&selDevIds[]=85&selDevIds[]=86&selDevIds[]=87&selDevIds[]=88&selDevIds[]=89&selDevIds[]=90&selDevIds[]=91&selDevIds[]=92&selDevIds[]=93&selDevIds[]=94&selDevIds[]=95&selDevIds[]=97&selDevIds[]=98&selDevIds[]=99&selDevIds[]=100&selDevIds[]=101&selDevIds[]=102&selDevIds[]=103&selDevIds[]=104&selDevIds[]=105&selDevIds[]=106&selDevIds[]=107&selDevIds[]=108&selDevIds[]=109&selDevIds[]=110&selDevIds[]=111&selDevIds[]=112&selDevIds[]=113&selDevIds[]=114&selDevIds[]=115&selDevIds[]=116&selDevIds[]=117&selDevIds[]=118&selDevIds[]=119&selDevIds[]=120&selDevIds[]=121&selDevIds[]=122&selDevIds[]=123&selDevIds[]=124&selDevIds[]=125&selDevIds[]=126&selDevIds[]=127&selDevIds[]=128&selDevIds[]=129&selDevIds[]=132&selDevIds[]=133&selDevIds[]=134&selDevIds[]=135&selDevIds[]=136&selDevIds[]=137&selDevIds[]=138&selDevIds[]=139&selDevIds[]=140&selDevIds[]=141&selDevIds[]=142&selDevIds[]=143&selDevIds[]=144&selDevIds[]=145&selDevIds[]=146&selDevIds[]=147&selDevIds[]=148&selDevIds[]=149&selDevIds[]=150&selDevIds[]=151&selDevIds[]=152&selDevIds[]=153&selDevIds[]=154&selDevIds[]=155&selDevIds[]=156&selDevIds[]=157&selFeatureIds[]=1&selFeatureIds[]=2&selFeatureIds[]=3&selFeatureIds[]=18&selFeatureIds[]=27&selFeatureIds[]=37&selFeatureIds[]=38&selFeatureIds[]=39&selFeatureIds[]=40&selFeatureIds[]=45&selFeatureIds[]=46&selFeatureIds[]=47&selFeatureIds[]=49&selFeatureIds[]=50&selFeatureIds[]=52&selFeatureIds[]=59&selFeatureIds[]=60&selFeatureIds[]=61&selFeatureIds[]=62&selFeatureIds[]=63&selFeatureIds[]=64&selFeatureIds[]=65&selFeatureIds[]=69&selFeatureIds[]=70&selFeatureIds[]=71&selFeatureIds[]=74&selFeatureIds[]=75&_=", undefined, function(err, window) {
  if(err) throw err;

  var document = window.document;
  // table headers shouldn't change
  var headers = ["flash","eeprom","sram","xram","io","interrupts","extInterrupts","pcInterrupt","twi","spi","uart","usart","usi","timers_8bit","timers_16bit","pwm","wdt","rtc","analogComp","ADC","osc","brownout","jtag","isp","selfProg","V","clock"];

  /*
  // scrape column headers
  var tds = document.querySelectorAll("table thead td :not([data=''])");
  for(var i = 0; i < tds.length; i++) {
    headers.push(tds[i].getAttribute("data"));
  }
  console.log(JSON.stringify(headers));
  */
  var output = {};

  var trs = document.querySelectorAll("tr:nth-child(n+3)");
  // how many chips?
  console.log("%d chips", trs.length);
  for(var i = 0; i < trs.length; i++) {
    // add chip to list
    var chip = trs[i].querySelector("a").textContent;
    chip = output[chip] = {};
    
    // iterate chip values
    var tds = trs[i].querySelectorAll("td:nth-child(n+3)");
    for(var j = 0; j < tds.length; j++) {
      chip[headers[j]] = tds[j].textContent;
    }
  }

  // build index.js
  fs.writeFile("../index.js", "module.exports = " + JSON.stringify(output, null, 2), function() {
    console.log("done");
  });
});
