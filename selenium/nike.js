var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://lecs.nike.co.kr/cart/list.lecs');
driver.findElement(By.css('.global_login a')).click();
driver.wait(function(){
    return until.elementLocated(By.name('loginId'));
},1000);
driver.findElement(By.name('loginId')).sendKeys('');
driver.findElement(By.name('password')).sendKeys('');
driver.findElement(By.css('.global_id_pass_info a')).click();
driver.sleep(100);
driver.wait(function(){
    return driver.executeScript(function(){
        return $(".ul_index:eq(0) > a").text().trim()=="원용봉 님";
    });
},500).then(function(){
    reCartCheck();
});


function reCartCheck(){
    driver.get('http://lecs.nike.co.kr/cart/list.lecs');
    driver.executeScript(function() {
        return $(".total em").text();
    }).then(function(text){
        if(text=="0"){
            reCartCheck(); // 재귀함수
        }else{
            goOrder();
        };
    })
};


function goOrder(){
    driver.executeScript(function() {
        fn_goOrder();
    });
    driver.sleep(100);
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
};




/*

driver.wait(function(){
    return until.elementLocated(By.name('loginId'));
},1000);



*/
/*

driver.executeScript(function(){
    if($(".total em").text()!=0){
        fn_goOrder();
    }else{
        location.href=location.href;
    };
}).then(function(){
    driver.sleep(200);
    // driver.switchTo().alert().accept();
    driver.sleep(200);

    driver.executeScript(function(){
        $("#selectcard option:eq(4)").attr("selected", "selected");
        fn_CreditCardSel();
        $("#assent").attr("checked","checked");
        fn_deliveryChkAjax('',3);
    });
    // driver.get('https://secure.nike.co.kr/order/list.lecs');
});*/
