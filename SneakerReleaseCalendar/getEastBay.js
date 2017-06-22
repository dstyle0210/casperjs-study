var fs = require('fs');
var _ = require("lodash");
var request = require("request");
var url = "http://video.eastbay.com/feeds/release_watch.cfm?variable=products&months=1&cd=1m&_="+(new Date().getTime());
var DB = [];
request({url:url},function(err,res,body){
    var jsonStr = body.replace("var products = ","");
        jsonStr = jsonStr.replace("]};","]}");
        fs.writeFileSync("./eastbay_example.json",jsonStr );
    var sneakers = JSON.parse(jsonStr);
    _.each(sneakers.RECORDS,function(sneaker){
        var item = sneaker.PROPERTIES;
        DB.push({
            store:"eastbay",
            brand:item.P_brand+"",
            name:item.P_ModelName+"",
            price:item.P_StyleSalePrice+"",
            link:"http://www.eastbay.com/product/model:"+item.P_ModelNumber+"/sku:"+item.P_StyleSKU+"/",
            year:(item.P_release_year*1)+"",
            month:(item.P_release_month*1)+"",
            day:(item.P_release_day*1)+"",
            color:item.P_color+"",
            image:"http://images.eastbay.com/pi/"+item.P_StyleSKU+"/zoom/"
        });
    });
    fs.writeFileSync("./eastbay.json",JSON.stringify(DB) );
});