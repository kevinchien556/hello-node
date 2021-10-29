const express = require("express");

let app = express();

// 路由 route/router
// app.Method(Path,Handler)
app.get("/", (req, res) => {
  res.send("我是首頁");
});

app.listen(3002, () => {
  console.log("express app 啟動了喔");
});
