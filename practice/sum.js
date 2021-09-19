console.log("hello world!");

function sum(param) {
  let total = 0;
  for (let i = 0; i <= param; i++) {
    total += i;
  }
  return total;
}

console.log(sum(10));
