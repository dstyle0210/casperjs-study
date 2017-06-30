var fs = require('fs');
var _ = require("lodash");
var request = require("request");
var cheerio = require('cheerio');
module.exports = {
    get: function (driver,CB) {
        var url = "https://www.nike.com/launch/?s=upcoming";
        var DB = [];
        driver.get(url);
        driver.sleep(1000);
        driver.wait(function(){
            return driver.executeScript(function(){
                return document.body.innerHTML;
            });
        },500).then(function(data){
            var $ = cheerio.load(data);
            console.log( $(".upcoming-card>div h3").length );
            var m = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12};
            $(".upcoming-card>div").each(function(idx,div){
                DB.push({
                    store:"nike",
                    brand:"nike",
                    name:$(div).find("h3").text(),
                    link:$(div).find("a").attr("href"),
                    year:"2017",
                    month:m[$(div).find(".launch-caption .mod-h2").text()],
                    day:($(div).find(".launch-caption .mod-h1").text())*1,
                    color:"",
                    image:$(div).find("img").attr("src"),
                    price:""
                });
                /*
                 {
                 "store": "finishline",
                 "brand": "NIKE",
                 "name": "WOMEN'S NIKE FREE TR 7",
                 "price": "",
                 "year": 2017,
                 "month": 5,
                 "day": 2,
                 "color": "WOLF GREY/PURE PLATINUM/SUNSET GLOW",
                 "image": "http://images.finishline.com/is/image/FinishLine/904651_005",
                 "link": "http://www.finishline.com/store/product/b/prod2060007?styleId=904651&colorId=005"
                 },
                 */
            });
            fs.writeFileSync("./nike.json",JSON.stringify(DB) );
            // fs.writeFileSync("./nike-example.json", $(".upcoming-card") );
            CB.call(null);
        });
    }
};
