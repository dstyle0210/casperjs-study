// https://www.ruvilla.com/releases/
var fs = require('fs');
var _ = require("lodash");
var request = require("request");
module.exports = {
    get: function (driver,CB) {
        var url = "https://www.ruvilla.com/releases/";
        var example = [
            {imgName:'897815-100',brand:'Nike',name:'KD 10',size:'Mens',price:150,year:2017,month:6,day:2,weekday:'Fri'},
            {imgName:'852395-103',brand:'Nike',name:'Kyrie 3',size:'Mens',price:120,year:2017,month:6,day:3,weekday:'Sat'},
            {imgName:'897644-101',brand:'Nike',name:'LEBRON SOLDIER XI',size:'Mens',price:130,year:2017,month:6,day:3,weekday:'Sat'},
            {imgName:'852425-107',brand:'Nike',name:'KOBE A.D.',size:'Mens',price:160,year:2017,month:6,day:3,weekday:'Sat'},
            {imgName:'304775-120',brand:'Jordan',name:'Retro 7',size:'Mens + Kids',price:190,year:2017,month:6,day:3,weekday:'Sat'},
            {imgName:'624041-007',brand:'Nike',name:'Air Foamposite Pro',size:'Mens',price:230,year:2017,month:6,day:9,weekday:'Fri'},
            {imgName:'878627-008',brand:'Nike',name:'PG 1',size:'Kids',price:110,year:2017,month:6,day:9,weekday:'Fri'},
            {imgName:'310810-022',brand:'Jordan',name:'Retro 13 Low',size:'Mens',price:175,year:2017,month:6,day:10,weekday:'Sat'},
            {imgName:'BY9951',brand:'Adidas',name:'NMD_R1',size:'Womens',price:130,year:2017,month:6,day:10,weekday:'Sat'},
            {imgName:'BY9952',brand:'Adidas',name:'NMD_R1',size:'Womens',price:130,year:2017,month:6,day:10,weekday:'Sat'},
            {imgName:'487724-118',brand:'Jordan',name:'Retro 4',size:'Kids',price:140,year:2017,month:6,day:10,weekday:'Sat'},
            {imgName:'897563-900-B',brand:'Jordan',name:'Jordan DMP Pack',size:'Mens',price:500,year:2017,month:6,day:14,weekday:'Wed'},
            {imgName:'V55619-A',brand:'Reebok',name:'Answer IV Stepover',size:'Mens',price:150,year:2017,month:6,day:16,weekday:'Fri'},
            {imgName:'308497-006',brand:'Jordan',name:'Retro 4',size:'Mens + Kids',price:190,year:2017,month:6,day:17,weekday:'Sat'},
            {imgName:'918228-101',brand:'Nike',name:'DUELIST RACER',size:'Mens',price:120,year:2017,month:6,day:22,weekday:'Wed'},
            {imgName:'CP9654',brand:'Adidas',name:'YEEZY BOOST 350 V2',size:'Mens',price:220,year:2017,month:6,day:24,weekday:'Sat'},
            {imgName:'917931-900',brand:'Jordan',name:'Jordan X Converse Pack',size:'Mens',price:300,year:2017,month:6,day:28,weekday:'Wed'},
            {imgName:'19039803',brand:'Puma',name:'Fenty Trainer HI',size:'Womens',price:190,year:2017,month:6,day:29,weekday:'Thur'},
            {imgName:'19039802',brand:'Puma',name:'Fenty Trainer HI',size:'Womens',price:190,year:2017,month:6,day:29,weekday:'Thur'},
            {imgName:'136027-602-A',brand:'Jordan',name:'Retro 5',size:'Mens + Kids',price:190,year:2017,month:7,day:1,weekday:'Sat'},
            {imgName:'852425-300',brand:'Nike',name:'KOBE A.D.',size:'Mens',price:160,year:2017,month:7,day:1,weekday:'Sat'},
            {imgName:'897815-001',brand:'Nike',name:'KD 10 FINGERPRINT',size:'Mens',price:150,year:2017,month:7,day:1,weekday:'Sat'},
            {imgName:'918228-602',brand:'Nike',name:'DUELIST RACER',size:'Mens',price:120,year:2017,month:7,day:1,weekday:'Thur'},
            {imgName:'918264-001',brand:'Nike',name:'ZOOM MARIAH FLYKNIT RACER',size:'Mens',price:160,year:2017,month:7,day:6,weekday:'Thur'},
            {imgName:'918264-002',brand:'Nike',name:'ZOOM MARIAH FLYKNIT RACER',size:'Mens',price:160,year:2017,month:7,day:6,weekday:'Thur'},
            {imgName:'918264-003',brand:'Nike',name:'ZOOM MARIAH FLYKNIT RACER',size:'Mens',price:160,year:2017,month:7,day:6,weekday:'Thur'},
            {imgName:'414962-105',brand:'Nike',name:'AIR MORE UPTEMPO 96',size:'Mens',price:160,year:2017,month:7,day:6,weekday:'Thur'},
            {brand:'Adidas',name:'EQT SUPPORT 93/17',size:'Mens',price:180,year:2017,month:7,day:8,weekday:'Sat'},
            {brand:'Adidas',name:'EQT SUPPORT 93/17',size:'Mens',price:180,year:2017,month:7,day:8,weekday:'Sat'},
            {brand:'Jordan',name:'Retro 6 Low',size:'Kids',price:120,year:2017,month:7,day:8,weekday:'Sat'},
            {brand:'Adidas',name:'NMD_R2',size:'Mens',price:130,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Adidas',name:'NMD_R2 PK',size:'Mens',price:170,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Adidas',name:'NMD_R2 PK',size:'Mens',price:170,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Adidas',name:'NMD_R2',size:'Mens',price:130,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Adidas',name:'NMD_R2 PK',size:'Mens',price:170,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Converse',name:'One Star Chuck Low',size:'Mens',price:85,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Converse',name:'One Star Chuck Low',size:'Mens',price:85,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'Converse',name:'One Star Chuck Low',size:'Mens',price:85,year:2017,month:7,day:13,weekday:'Thur'},
            {brand:'New Balance',name:'574 Lux',size:'Mens',price:120,year:2017,month:7,day:15,weekday:'Sat'},
            {brand:'New Balance',name:'574 Lux',size:'Mens',price:120,year:2017,month:7,day:15,weekday:'Sat'},
            {brand:'Nike',name:'Kyrie 3',size:'Mens',price:120,year:2017,month:7,day:15,weekday:'Sat'},
            {brand:'Nike',name:'AIR MORE UPTEMPO 96',size:'Mens',price:160,year:2017,month:7,day:15,weekday:'Sat'},
            {brand:'Nike',name:'Kyrie 3',size:'Mens',price:120,year:2017,month:7,day:21,weekday:'Fri'},
            {brand:'Jordan',name:'Retro 13',size:'Kids',price:140,year:2017,month:7,day:22,weekday:'Sat'},
            {brand:'Nike',name:'Lebron 14 Low',size:'Mens',price:150,year:2017,month:7,day:22,weekday:'Sat'},
            {brand:'Jordan',name:'Retro 13',size:'Mens + Kids',price:190,year:2017,month:7,day:22,weekday:'Sat'},
            {brand:'Nike',name:'Air Force 1 Utility Mid',size:'Mens',price:155,year:2017,month:7,day:28,weekday:'Fri'},
            {brand:'Nike',name:'AIR FOAMPOSITE One',size:'Mens',price:230,year:2017,month:7,day:29,weekday:'Sat'},
            {brand:'Adidas',name:'Ultraboost Laceless',size:'Mens',price:200,year:2017,month:8,day:1,weekday:'Tue'},
            {brand:'Adidas',name:'Ultraboost Laceless',size:'Mens',price:100,year:2017,month:8,day:1,weekday:'Tue'},
            {brand:'New Balance',name:'574 Sport',size:'Mens',price:120,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'Jordan',name:'Retro 5',size:'Kids',price:140,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'Puma',name:'Tsugi Blaze Staple',size:'Mens',price:120,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'New Balance',name:'574 Suede Sport',size:'Mens',price:110,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'New Balance',name:'574 Sport',size:'Mens',price:100,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'Jordan',name:'Retro 5',size:'Mens + Kids',price:190,year:2017,month:8,day:5,weekday:'Sat'},
            {brand:'Nike',name:'AIR MORE UPTEMPO 96',size:'Mens',price:160,year:2017,month:8,day:12,weekday:'Sat'},
            //{brand:'Adidas',name:'NMD_R1 PK',size:'Mens',price:180,year:2017,month:8,day:11,weekday:'Fri'},
            //{brand:'Adidas',name:'NMD_R1 PK',size:'Mens',price:170,year:2017,month:8,day:11,weekday:'Fri'},
            //{brand:'Adidas',name:'NMD_R1 PK',size:'Mens',price:170,year:2017,month:8,day:11,weekday:'Fri'},
            //{brand:'Adidas',name:'NMD_R1 PK',size:'Mens',price:170,year:2017,month:8,day:11,weekday:'Fri'},
            //{brand:'Jordan',name:'Retro 13',size:'Mens',price:190,year:2017,month:8,day:19,weekday:'Sat'},
            //{brand:'Adidas',name:'EQT SUPPORT 93/17',size:'Mens',price:180,year:2017,month:8,day:24,weekday:'Thur'},
            //{brand:'Jordan',name:'Retro 8',size:'Mens',price:190,year:2017,month:8,day:26,weekday:'Sat'},
            //{brand:'Adidas',name:'ULTRABOOST ATR LTD',size:'Mens',price:240,year:2017,month:8,day:30,weekday:'Wed'},
            //{brand:'Adidas',name:'ULTRABOOST',size:'Mens',price:200,year:2017,month:8,day:30,weekday:'Wed'},
            //{brand:'Adidas',name:'EQT SUPPORT 93/17',size:'Mens',price:180,year:2017,month:8,day:31,weekday:'Thur'},
            //{brand:'Adidas',name:'NMD_XR1',size:'Mens',price:140,year:2017,month:9,day:1,weekday:'Fri'},
            //{brand:'Jordan',name:'AIR JORDAN 1 RETRO HI FLYKNIT',size:'Mens',price:180,year:2017,month:9,day:1,weekday:'Fri'},
            //{brand:'Nike',name:'LUNAR SUPER.FLY',size:'Mens',price:150,year:2017,month:9,day:1,weekday:'Fri'},
            //{brand:'Nike',name:'KYRIE 3',size:'Mens',price:120,year:2017,month:9,day:1,weekday:'Fri'},
            //{brand:'Jordan',name:'Retro 5',size:'Mens',price:190,year:2017,month:9,day:2,weekday:'Sat'},
            //{brand:'Jordan',name:'Retro 11 Low IE',size:'Mens',price:170,year:2017,month:9,day:23,weekday:'Sat'},
            {brand:'Nike',name:'AIR FOAMPOSITE PRO',size:'Mens',price:230,year:2017,month:9,day:8,weekday:'Fri'},
            {brand:'Nike',name:'Air More Uptempo 96',size:'Mens',price:160,year:2017,month:9,day:23,weekday:'Sat'}];


        var DB = [];

        _.each(example,function(item,idx){
            var m = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
            DB.push({
                "store": "ruvilla",
                "brand": item.brand,
                "name": "["+item.size+"] "+item.name,
                "price": item.price+"",
                "year": item.year+"",
                "month": item.month+"",
                "day": item.day+"",
                "color": "",
                "image": (item.imgName) ? "https://www.ruvilla.com/media/releases/"+item.year+"/"+m[item.month-1]+"/"+item.imgName+".jpg" : "",
                "link": "https://www.ruvilla.com"
            });
        });
        fs.writeFileSync("./ruvilla.json",JSON.stringify(DB) );
        CB.call(null);
    }
};