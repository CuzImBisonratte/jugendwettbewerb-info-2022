const inputfile = "input.txt";

// 
// End of Config
// 

const fs = require("fs");

var words = [];
let wortpaare = [];

// Read the file and parse every line into the words array
// A vokalgruppe is a group of vowels that are next to each other | All vokalgruppen in haeuser would look like ["aeu", "e"]
fs.readFile(inputfile, "utf8", (err, data) => {
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
        words.push({
            word: word,
            vokalgruppen: vokalgruppen
        });
    }
    // Loop through every word
    for (let i = 0; i < words.length; i++) {
        // Get massgebende vokalgruppe
        let massgebende_vokalgruppe;
        if (words[i].vokalgruppen.length == 1) massgebende_vokalgruppe = words[i].vokalgruppen[0];
        else massgebende_vokalgruppe = words[i].vokalgruppen[words[i].vokalgruppen.length - 2];
        words[i].massgebende_vokalgruppe = massgebende_vokalgruppe;
        // Count the amount of letters after the massgebende vokalgruppe
        let letters_after_massgebende_vokalgruppe = 0;
        for (let j = words[i].word.indexOf(massgebende_vokalgruppe) + massgebende_vokalgruppe.length; j < words[i].word.length; j++) {
            if (words[i].word[j].match(/[a-z]/)) letters_after_massgebende_vokalgruppe++;
        }
        words[i].buchstaben_nach_massgebender_inkl = letters_after_massgebende_vokalgruppe + massgebende_vokalgruppe.length;
        // Check if the buchstaben_nach_massgebender_inkl is at least half the length of the word | if not so, remove it from the words array
        if (words[i].buchstaben_nach_massgebender_inkl < words[i].word.length / 2) words[i].invalid = true;
    }
    // Remove all words that are invalid
    words = words.filter(word => !word.invalid);
    }
    console.log(words);
});