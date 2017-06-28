var open = require("open");
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
var Ruvilla = require("./SneakerReleaseCalendar/getRuvilla.js");



Ruvilla.get(driver,function() {


});
/*
var NikeKorea = require("./SneakerReleaseCalendar/getNikeKorea.js");
var AdidasKorea = require("./SneakerReleaseCalendar/getAdidasKorea.js");
var EastBay = require("./SneakerReleaseCalendar/getEastBay.js");
var FinishLine = require("./SneakerReleaseCalendar/getFinishLine.js");
var FootAction = require("./SneakerReleaseCalendar/getFootAction.js");
var FootLocker = require("./SneakerReleaseCalendar/getFootLocker.js");

NikeKorea.get(driver,function() {
    console.log("나이키 코리아 완료.");
    AdidasKorea.get(driver,function(){
        console.log("아디다스 코리아 완료.");
        EastBay.get(driver,function(){
            console.log("이스트베이 완료.");
            FinishLine.get(driver,function(){
                console.log("피니쉬라인 완료.");
                FootAction.get(driver,function(){
                    console.log("풋액션 완료.");
                    FootLocker.get(driver,function(){
                        console.log("풋락커 완료.");
                        driver.quit();
                        open("http://localhost:63342/js-kids/releaseCalendar.html");
                    });
                });
            });
        });
    });
});
*/
/*
NikeKorea.get(function(){
    console.log("나이키 코리아 완료.");
    AdidasKorea.get(function(){
        console.log("아디다스 코리아 완료.");

    });
});
*/