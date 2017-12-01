var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
var url = "http://www.nike.co.kr/snkrs/detail.lecs?displayNo=NK1A86B26";
driver.get(url);
driver.findElement(By.css('.global_login a')).click();
driver.wait(function(){
    return until.elementLocated(By.name('loginId'));
},1000);
driver.findElement(By.name('loginId')).sendKeys(''); // 수정필요.
driver.findElement(By.name('password')).sendKeys(''); // 수정필요.
driver.findElement(By.css('.global_id_pass_info a')).click();
driver.sleep(500);
driver.wait(function(){
    return driver.executeScript(function(){
        return $(".global_login_window > a").text().trim()==""; // 수정필요.
    });
},500).then(function(){
    driver.wait(function(){
        return driver.executeScript(function(){
            return ($("#sizeArea").length) ? "1" : "0";
        });
    },500).then(function(area){
        areaCheck(area);
    });
});

function areaCheck(area){
    if(area=="1"){
        // 있다.
        driver.executeScript(function() {
            $("#sizeArea a[data-optionvaluecode=275]").click();
            $(".cart-area a").click();
        }).then(function(){
            driver.sleep(1000);
            driver.switchTo().alert().accept();
            driver.wait(function(){
                return until.elementLocated(By.id('pay_price_str'));
            },1000);
            driver.executeScript(function() {
                $("#selectcard option:eq(4)").attr("selected", "selected");
                fn_CreditCardSel();
                $("#assent").attr("checked","checked");
                fn_deliveryChkAjax('',3);
            });
        });
    }else{
        // 없다.
        driver.sleep(100);
        reCheck();
    };
}

function reCheck(){
    console.log("recheck");
    driver.get(url);
    driver.executeScript(function() {
        return ($("#sizeArea").length) ? "1" : "0";
    }).then(function(area){
        areaCheck(area);
    });
};