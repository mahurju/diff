const path = require("path");
const jsonfile = require("jsonfile");

const filePath = path.join(__dirname, "v1.json");
const file2Path = path.join(__dirname, "v2.json");

const file = jsonfile.readFileSync(filePath, { throws: false }) || {};
const file2 = jsonfile.readFileSync(file2Path, { throws: false }) || {};

const diff = {};
const subtract = {};
const add = {};

Object.keys(file2).map(key => {
  if (file2[key] && !file[key]) {
    add[key] = file2[key];
    return;
  }

  // if (!file2[key] && file[key]) {
  //   subtract[key] = "removed";
  //   return;
  // }

  if (file2[key] !== file[key]) {
    diff[key] = {
      before: file[key],
      after: file2[key]
    };
    return;
  }
});

Object.keys(file).map(key => {
  if (!file2[key] && file[key]) {
    subtract[key] = "removed";
    return;
  }
});

console.log(`[Added]`);
Object.keys(add).forEach(key => {
  console.log(key, add[key]);
});
console.log(`\n\n[Removed]`);
Object.keys(subtract).forEach(key => {
  console.log(key);
});
console.log(`\n\n[Modified]`);
Object.keys(diff).forEach(key => {
  const data = diff[key];
  console.log(`${key};${data.before};${data.after}`);
});
