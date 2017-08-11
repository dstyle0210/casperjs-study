var fs = require('fs');
var _ = require("lodash");
var request = require("request");
var cheerio = require('cheerio');
var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();

var DB = [];
var DB2 = [];
var DB3 = [];
var FINAL = [];
getData(1);
function getData(page){
    console.log("배당주목록 수집중 : page"+page);
    var url = "http://finance.naver.com/sise/dividend_list.nhn?field=dividend_rate&sosok=&ordering=desc&page="+page;
    driver.get(url);
    driver.executeScript(function() {
        var scriptElt = document.createElement('script');
        scriptElt.type = 'text/javascript';
        scriptElt.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(scriptElt);
    });
    driver.sleep(1000);
    driver.wait(function(){
        return driver.executeScript(function() {
            var data = [];
            $(".tb_ty tbody tr").each(function(){
                var tds = $(this).find("td");
                if( (tds.eq(0).text()!=" ") && (tds.eq(5).text()!="-") && (tds.eq(6).text()!="-") && (tds.eq(7).text()!="-") && (tds.eq(8).text()!="-") ){ // 회사명 , 배당성향 , ROE , PER , PBR 중에 한개라도 없으면 탈락.
                    if( (tds.eq(9).text()!="-") && (tds.eq(9).text()!="0") && (tds.eq(10).text()!="-") && (tds.eq(10).text()!="0") && (tds.eq(11).text()!="-") && (tds.eq(11).text()!="0") ){ // 3년간 배당준적이 한번도 없으면 탈락
                        if( (tds.eq(7).text()*1) <15 ){ // PER이 15보다 아래여야 한다.
                            if( (tds.eq(8).text()*1) <1.2 ){ // PBR이 1.2보다 아래여야 한다.
                                if( 3 < (tds.eq(6).text()*1) ) { // ROE가 3보다 커야 한다.
                                    if( ((tds.eq(11).text()*1) <= (tds.eq(10).text()*1)) && ((tds.eq(10).text()*1) <= (tds.eq(9).text()*1)) ){ // 3년전 배당보다, 2년전이 크거나 같고, 2년전은 1년전 보다 크거나 같아야 한다.
                                        data.push({
                                            name:tds.eq(0).text(), // 주식명
                                            price:tds.eq(1).text(), // 현재주가
                                            link:"http://finance.naver.com"+tds.eq(0).find("a").attr("href"), // 상세링크
                                            refundRate:tds.eq(4).text(), // 배당률(작년배당금 / 현재주가)
                                            PBR:(tds.eq(8).text()*1),
                                            ROE:(tds.eq(6).text()*1),
                                            oldRefund:(tds.eq(9).text()*1) // 작년배당금
                                        });
                                    };
                                };
                            };
                        };
                    };
                };
            });
            return data;
        });
    }).then(function(sdata){
        DB.push(sdata);
        if(page<7){
            getData(page+1);
        }else{
            DB2 = _.concat(DB[0],DB[1],DB[2],DB[3],DB[4],DB[5],DB[6]);
            // DB2 = _.concat(DB[0],DB[1]);
            // fs.writeFileSync("./stock_DB2.json",JSON.stringify(DB2) );
            getStockData(0);
        };
    });
};
function getStockData(idx){
    if(DB2.length==idx){
        DB3 = _.filter(DB2,function(item){return item.per});
        fs.writeFileSync("./stock_DB3.json",JSON.stringify(DB3) );
        getStockDetailData(0);
        console.log("주식기본정보 정리 끝");
        return;
    };
    console.log("주식기본정보 수집중 : "+DB2[idx].name);
    var url = DB2[idx].link;
    driver.get(url);
    driver.executeScript(function() {
        var scriptElt = document.createElement('script');
        scriptElt.type = 'text/javascript';
        scriptElt.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(scriptElt);
    });
    driver.sleep(1000);
    driver.wait(function(){
        return driver.executeScript(function() {
            var data = {};
            data.frRate = $("strong:contains('외국인소진율(B/A)')").parent().next().text().match(/[0-9\.]/gi).join("") * 1; // 외국인취득률
            data.midPer = $("a:contains('동일업종 PER')").parent().next().text().trim().match(/[0-9\.]/gi).join("") * 1; // 업계 평균PER
            data.per = $("th:contains('EPS(WISEfn)')").next().find("em:eq(0)").text().trim().match(/[0-9\.]/gi).join("") * 1; // 회사 PER
            data.p5 = $("caption:contains('외국인 기관')").parent().find("td:contains('+')").length; // 최근 5일 외국인,기관 매수횟수
            data.m5 = $("caption:contains('외국인 기관')").parent().find("td:contains('-')").length; // 최근 5일 외국인,기관 매도횟수
            data.dlink = "http://finance.naver.com"+$("a:contains('투자자별 매매동향')").attr("href"); // 투자자 정보
            data.preRefund = $("strong:contains('주당배당금(원)')").parent().parent().find("td:eq(3)").text().trim(); // 예상배당금
            if( data.preRefund!="" && data.preRefund!="-" ){
                data.preRefund = data.preRefund.match(/[0-9\.]/gi).join("") * 1;
            };
            return data;
        });
        //   $("strong:contains('주당배당금(원)')").parent().parent().find("td:eq(3)").text().trim().match(/[0-9\.]/gi).join("") * 1;
    }).then(function(data){
        if(10 < data.frRate){ // 외국인 취득률이 10%가 넘어야 한다.
            if(data.per < data.midPer){ // 업계평균 PER 보다 회사PER이 작아야 한다.
                if(data.m5 <= data.p5){ // 최근 5일 외국인,기관 매수가 매도보다 같거나 많아야 한다.
                    DB2[idx].frRate = data.frRate;
                    DB2[idx].plus = data.p5;
                    DB2[idx].per = data.per;
                    DB2[idx].dlink = data.dlink;
                    DB2[idx].preRefund = data.preRefund;
                };
            };
        };
        getStockData(idx+1);
        driver.quit();
    });
};


function getStockDetailData(idx){
    if(DB3.length==idx){
        FINAL = _.filter(DB3,function(item){return item.pass});
        // fs.writeFileSync("./stock.json",JSON.stringify(FINAL) );
        console.log("주식상세정보 정리 끝");
        driver.quit();
        return;
    };
    console.log("주식상세정보 수집중 : "+DB3[idx].name);
    var url = DB3[idx].dlink;
    driver.get(url);
    driver.executeScript(function() {
        var scriptElt = document.createElement('script');
        scriptElt.type = 'text/javascript';
        scriptElt.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(scriptElt);
    });
    driver.sleep(1000);
    driver.wait(function(){
        return driver.executeScript(function() {
            var data = {};
            data.now = $(".tlline2 + table").find("tr:eq(3) td:last-child").text().match(/[0-9\.]/gi).join("") * 1;
            data.old = $(".tlline2 + table").find("tr:eq(31) td:last-child").text().match(/[0-9\.]/gi).join("") * 1;

            return data;
        });
        //
    }).then(function(data){
        if(data.old<data.now){ // 외국인 취득률이 20일전 보다 많아졌다.
            DB3[idx].pass = "true";
        };
        getStockDetailData(idx+1);
    });
}


// $("strong:contains('외국인소진율(B/A)')").css({"border":"1px solid red"});


