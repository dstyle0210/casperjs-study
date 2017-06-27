var fs = require('fs');
var _ = require("lodash");
var request = require("request");
var cheerio = require('cheerio');
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
var url = "http://shop.adidas.co.kr/PF021001.action?command=LIST&PAGE_CD=ALL&SEARCH_MON=ALL&STATUS_CD=SOON";
var DB = [];
driver.get(url);
driver.sleep(200);
driver.wait(function(){
    return driver.executeScript(function(){
        var DDD = [];
        jQuery(".ondate").each(function(idx,item){
            var code = ((jQuery(item).find("img").attr("src")).match(/[A-Z0-9]{6}(-1)/)[0]).replace("-1","");
            var month = jQuery(item).find(".status").text().trim().split(" ")[0];
            if(month=="jun"){ month = 6 };
            if(month=="jul"){ month = 7 };
            DDD.push({
                store:"adidas-korea",
                image:jQuery(item).find("img").attr("src"),
                name:jQuery(item).find(".tit").text().trim(),
                price:jQuery(item).find(".price").text().trim().replace("원","").replace(",",""),
                year:"2017",
                month:month,
                day:jQuery(item).find(".status").text().trim().split(" ")[1],
                color:"",
                link:"http://shop.adidas.co.kr/PF021002.action?PROD_CD="+code
            });
        });
        return DDD;
    });
},500).then(function(data){
    DB = data;
    fs.writeFileSync("./adidas-korea.json",JSON.stringify(DB) );
    driver.quit();
});