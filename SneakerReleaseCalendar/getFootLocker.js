var fs = require('fs');
var _ = require("lodash");
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.get('http://www.footlocker.com/ns/common/fl/js/releaseCalendarJSON.js?cd=0');
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
    _.each(json.month,function(month){
        if(month.name=="May"){ month.number = "5"; }
        if(month.name=="Jun"){ month.number = "6"; }
        if(month.name=="Jul"){ month.number = "7"; }
        _.each(month.day,function(day){
            _.each(day.product,function(product){
                DB.push({
                    store:"footlocker",
                    brand:product.brand+"",
                    name:product.name+"",
                    price:"",
                    link:"http://www.footlocker.com/product/model:"+product.model+"/sku:"+product.sku+"/",
                    year:(month.year*1)+"",
                    month:(month.number*1)+"",
                    day:(day.date*1)+"",
                    color:product.color+"",
                    image:"http://images.footlocker.com/pi/"+product.sku+"/large/"
                });
            });
        });
    });

    fs.writeFileSync("./footlocker_example.json",text );
    fs.writeFileSync("./footlocker.json",JSON.stringify(DB) );
});
driver.quit();