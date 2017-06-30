var fs = require('fs');
var _ = require("lodash");
var open = require("open");
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
var Ruvilla = require("./SneakerReleaseCalendar/getRuvilla.js");
var Nike = require("./SneakerReleaseCalendar/getNike.js");
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
                        Ruvilla.get(driver,function() {
                            console.log("루빌라 완료.");
                            Nike.get(driver,function(){
                                console.log("나이키영문 완료.");

                                driver.get("http://localhost:63342/js-kids/releaseCalendar.html");
                                driver.sleep(2000);
                                driver.wait(function(){
                                    return driver.executeScript(function(){
                                        return setHTML();
                                    });
                                },500).then(function(html){
                                    var comingsoon = '<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" href="style.css"><title>곧 발매될 신발목록 : Coming Soon</title></head><body>';
                                    comingsoon += "<h1>Take My Money!</h1>";
                                    comingsoon += html;
                                    comingsoon += "</body></html>";
                                    fs.writeFileSync("../comingsoon/index.html",comingsoon);
                                });
                                driver.quit();

                            });
                        });
                    });
                });
            });
        });
    });
});

/*
NikeKorea.get(function(){
    console.log("나이키 코리아 완료.");
    AdidasKorea.get(function(){
        console.log("아디다스 코리아 완료.");

    });
});
*/