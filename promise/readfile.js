const fs = require("fs");


// fs.readFile('input.txt',"utf-8",(err, data) => {
//   if (err) {
//       console.error("發生錯誤", err);
//   } else {
//       console.log("正確讀到", data);
//   }
// });



function readFilePromise(){
    return new Promise((resolve,reject)=>{
        fs.readFile('input.txt',"utf-8", (err, data) => {
            if (err) {
                reject("發生錯誤"+ err);
            } else {
                resolve("正確讀到"+ data);
            }
          });
    })
}

readFilePromise().then((success)=>{
    console.log(success);
}).catch((fail)=>{
    console.log(fail);
})