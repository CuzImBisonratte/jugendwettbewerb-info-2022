const fs = require("fs");

var words = [];

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
                    console.log(vokalgruppen);
                    vokalgruppe = "";
                }
            }
        }
        words.push({
            word: word,
            vokalgruppen: vokalgruppen
        });
    }
});


console.log(words);