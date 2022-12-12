const fs = require("fs");

var words = [];
let wortpaare = [];

// Read the file and parse every line into the words array
// A vokalgruppe is a group of vowels that are next to each other | All vokalgruppen in haeuser would look like ["aeu", "e"]
fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) throw err;
    for (let word of data.split("\n")) {
        let vokalgruppen = [];
        let vokalgruppe = "";
        word = word.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue");
        for (let i = 0; i < word.length; i++) {
            // If the letter is a vowel, add it to the vokalgruppe
            if (word[i].match(/[aeiou]/)) {
                vokalgruppe += word[i];
            } else {
                // If the letter is not a vowel, add the vokalgruppe to the vokalgruppen array and reset the vokalgruppe
                if (vokalgruppe != "") {
                    vokalgruppen.push(vokalgruppe);
                    vokalgruppe = "";
                }
            }
        }
        if (vokalgruppe.length) vokalgruppen.push(vokalgruppe);
        console.log(vokalgruppen);
        words.push({
            word: word,
            vokalgruppen: vokalgruppen
        });
    }
    // 
    // END of Vokalgruppen filtering
    // START of Wortpaare filtering 
    // 
    // Loop through every word and its vokalgruppen
    for (let i = 0; i < words.length; i++) {
        // Loop through every other word and its vokalgruppen
        for (let j = 0; j < words.length; j++) {
            // Check if the words are the same
            if (words[i].word != words[j].word) return;
            // Check if any word ends with the other word
            if (words[i].word.endsWith(words[j].word) || words[j].word.endsWith(words[i].word)) return;
        };
    };
});


console.log(words);