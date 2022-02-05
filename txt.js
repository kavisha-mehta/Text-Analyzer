
let charCount = document.getElementById('char'),
    wordCount = document.getElementById('word'),
    sentence = document.getElementById('sentence'),
    spaces = document.getElementById('spaces'),
    punctuation = document.getElementById('punctuation');

const textArea = document.querySelector('.data-entry textarea'),
      processBtn = document.getElementById('process-btn');

let UIValues = [charCount, wordCount, sentence, spaces, punctuation];

function init(){
    UIValues.forEach(value => value.innerHTML = 0);
}
init();
document.getElementById("processbtn").addEventListener("click", () =>{
    let text = textArea.value;
    charCount.innerHTML = text.length;
    wordCount.innerHTML = findWord(text);
    sentence.innerHTML = findSentence(text);
    spaces.innerHTML = text.split(" ").length - 1;
    punctuation.innerHTML = findPunctuation(text);
});

function findWord(text){
    let tempText = text.replace(/[.,!%&*;:'"-()]/g, "");
    tempText = tempText.replace(/[\r]/g, "").split(/\n/);

    let tempList =[];
    tempText.forEach(word => tempList.push(word.split(" ")));
    function extract(arr){
        return arr.reduce((wordList, word) => {
            return wordList.concat(Array.isArray(word)?extract(word) : word);
        }, []);
    }
    let wordList = extract(tempList);
    return wordList.filter(char => char != '').length;
}

function findSentence(text){
    const regex =/[\w|\)][.?!](\s|$)/g;
    let senCount = text.match(regex);
    return senCount ? senCount.length : 0;
}

function findPunctuation(text){
    const regex = /[.,?;:!'"(){}-]/g;
    let punCount = text.match(regex);
    return punCount ? punCount.length : 0;
}