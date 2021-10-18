const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");


// let stockCode = "2330";
let today = moment().format("YYYYMMDD");
let format = "json";

// "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=" + format + "&date=" + today + "&stockNo=" + stockCode
// `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${today}&stockNo=${stockCode}`

// axios
//   .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: format,
//       date: today,
//       stockNo: stockCode,
//     },
//   })
//   .then((res) => {
//     // HTTP response
//     console.log(res.data);
//   })
//   .catch((e) => {
//     console.error("發生錯誤啦", e);
//   });

  

  (async () => {
    try{
        let stockCode = await fs.readFile("stock.txt","utf-8");

        let dataAwait= await axios
        .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
          params: {
            response: format,
            date: today,
            stockNo: stockCode,
          },
        });
        
        console.log("await讀檔正確",dataAwait.data);
    }
    catch(e){
        console.error(e);
    } 
})();
