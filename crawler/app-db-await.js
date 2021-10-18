const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

connection.connect();

function insertPromise(insertData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?,?,?,?,?)",
      insertData,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

//   connection.query('SELECT * FROM stock', function (error, results) {
//     if (error) {
//         console.error("資料庫錯誤",error);
//     }else{
//         console.log('查到資料', results);
//     }
//   });

let today = moment().format("YYYYMMDD");
let format = "json";

(async () => {
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");

    let dataAwait = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );

    //  console.log("await讀檔正確",dataAwait.data.data);
    let firstItem = dataAwait.data.data[1];
    console.log(firstItem);
    //0,1,2,8
    let insertData = [
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];
    let resultIp = await insertPromise(insertData);
    console.log(resultIp);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
})();
