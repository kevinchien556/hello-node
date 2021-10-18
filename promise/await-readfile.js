const fs = require("fs");


// fs.readFile('input.txt',"utf-8",(err, data) => {
//   if (err) {
//       console.error("發生錯誤", err);
//   } else {
//       console.log("正確讀到", data);
//   }
// });




let p= new Promise((resolve,reject)=>{
    fs.readFile('input.txt',"utf-8", (err, data) => {
        if (err) {
            reject("發生錯誤"+ err);
        } else {
            resolve("正確讀到"+ data);
        }
        });
});

(async () => {
    try{
        let data= await p;
    console.log("await讀檔正確",data);
    }
    catch(e){
        console.error(e);
    } 
})();