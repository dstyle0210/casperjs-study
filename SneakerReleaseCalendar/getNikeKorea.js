var fs = require('fs');
var _ = require("lodash");
var request = require("request");
var cheerio = require('cheerio');
module.exports = {
    get: function (driver,CB) {
        var url = "http://www.nike.co.kr/mobile/event/getLaunchMainList.lecs?productRelaseDt=U&currentPage=1&perPage=20&cornerNo=1562&displayNo=NK2A13";
        var DB = [];
        request({url:url},function(err,res,body){
            var $ = cheerio.load(body);
            $("a").each(function(){
                DB.push({
                    store:"nike-korea",
                    brand:"nike",
                    link:$(this).attr("href"),
                    image:$(this).find(".exp_lcc_img img").attr("src")
                });
            });
            getData(0);
        });
        function getData(idx){
            if(DB.length==idx){
                console.log("끝");
                fs.writeFileSync("./nike-korea.json",JSON.stringify(DB) );
                // driver.quit();
                CB.call(null);
                return;
            };
            driver.get(DB[idx].link);
            driver.sleep(200);
            driver.wait(function(){
                return driver.executeScript(function(){
                    return ({
                        name:$(".lcbv_pro_title").text().trim(),
                        price:$(".lcbv_pro_price").text().trim().replace("원","").replace(",",""),
                        date:$(".lcbv_pro_desc").text().trim().replace("출시정보 :",""),
                        color:$(".lcbv_pro_info>p:eq(0)").text().trim()
                    });
                });
            },500).then(function(data){
                DB[idx].name = data.name;
                DB[idx].price = data.price;
                DB[idx].year = (((data.date.match(/[0-9]{4}(년)/)[0]).match(/[0-9]{4}/)[0]) *1) +"";
                DB[idx].month = (((data.date.match(/[0-9]{1,2}(월)/)[0]).match(/[0-9]{1,2}/)[0]) * 1) +"";
                DB[idx].day = (((data.date.match(/[0-9]{1,2}(일)/)[0]).match(/[0-9]{1,2}/)[0]) * 1)+"";
                DB[idx].color = data.color;
                getData(idx+1);
            });
        };
    }
};
