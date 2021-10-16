function promise() {
  return new Promise((resolve, reject) => {
    // resolve("成功");
    reject("失敗");
  });
}

promise().then(
  (fail) => {
    console.log(fail);
  },
  (success) => {
    console.log(success);
  }
);

promise();
