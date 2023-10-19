let n = [];

for (let i = 0; i < 10000; i += 1) {
  n.push(Math.round(Math.random() * 20));
}

console.log(n);

let obj = {};

for (let i = 0; i < n.length; i += 1) {
  if (obj[n[i]]) {
    obj[n[i]] += 1;
  } else {
    obj[n[i]] = 1;
  }
}
console.log(obj);
