const haystack_path = "haystack.txt";
const needle_path = "needle.txt";

// 
// End of Config
// 

const fs = require("fs");
const haystack = fs.readFileSync(haystack_path).toString().replace(/[^a-zA-ZäÄöÖüÜ \n]/g, "").toLowerCase();
const needle = fs.readFileSync(needle_path).toString();

// Needle to list
const needle_list = needle.toString().split(" ");

// Regex string
let regex = "/";
needle_list.forEach(needle_part => {
    if (needle_part == "_") regex += "[a-zA-Z]+";
    else regex += needle_part;
    regex += " ";
});
regex = regex.substring(0, regex.length - 1) + "/";

// Print occurence
console.log(regex.match(haystack));