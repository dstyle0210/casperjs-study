var fs = require('fs');
var _ = require("lodash");
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.get('http://www.footaction.com/ns/common/fa/release-calendar/js/fa-relcal-json.js?cd=0');
driver.sleep(200);
driver.wait(function(){
    return driver.executeScript(function(){
        return document.body.innerHTML;
    });
},500).then(function(text){

    text = text.replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">','');
    text = text.replace('</pre>','');

    var DB = [];
    var json = JSON.parse(text);
    _.each(json.products,function(product){
        var data = {
            store:"footaction",
            brand:product.brand+"",
            name:product.name+"",
            price:"",
            year:(product.year*1)+"",
            month:(product.month*1)+"",
            day:(product.day*1)+"",
            color:product.colorways+"",
            image:product.imageURL+""
        };
        var sku = {}
        if(product.mens.model!=""){
            sku = product.mens;
        }else{
            sku = product.kids;
        };
        data.link = "http://www.footaction.com/product/model:"+sku.model+"/sku:"+sku.sku+"/";
        DB.push(data);
    });
    fs.writeFileSync("./footaction.json",JSON.stringify(DB) );
});
driver.quit();