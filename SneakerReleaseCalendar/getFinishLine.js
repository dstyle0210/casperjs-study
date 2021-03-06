var fs = require('fs');
var _ = require("lodash");
module.exports = {
    get: function (driver,CB) {
        driver.get('http://www.finishline.com/store/releaseproduct/gadgets/releaseCalendarLookupAPI.jsp');
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
                var date = product.releaseDate.split("/");
                var data = {
                    store:"finishline",
                    brand:product.brand+"",
                    name:product.name+"",
                    price:"",
                    year:date[2]*1,
                    month:date[0]*1,
                    day:date[1]*1,
                    color:product.colorDescription+"",
                    image:"http://images.finishline.com/is/image/FinishLine/"+(product.styleColor).replace("-","_"),
                    link:"http://www.finishline.com/store/product/b/"+product.productId+"?styleId="+(product.styleColor).split("-")[0]+"&colorId="+(product.styleColor).split("-")[1]
                };
                DB.push(data);
            });
            fs.writeFileSync("./finishline.json",JSON.stringify(DB) );
            CB.call(null);
        });

    }
};
