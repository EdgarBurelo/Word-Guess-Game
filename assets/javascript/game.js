//Script starts
var myWordArray = ["Hello", "World", "anything"];

var word = myWordArray[Math.floor(Math.random()*3)];

var myWrongLetterArray = [];
var myRightLetterArray = [];
var myRightGuessArray = [];
var counter = 0;
var winFlag = 0;


var hangman = {
    "word1": "worrd",
    "wordLength": word.length,
    "numberOfGuesses": 15,
    "isLetter": function(strValue) { 
        var objRegExp  = /^[a-z]+$/;
        return objRegExp.test(strValue);
    },
    "letterPush": function() {
        var sent = this.word1
        for (var j=0; j<sent.length; j++) {
            myRightLetterArray.push(sent[j]);   
        }
        
    },
    "letterComp": function(pressKey) {
        for(var i=0; i < this.word1.length; i++) {
            if (pressKey === this.word1[i]) {
                 myRightGuessArray[i] = pressKey;
                 console.log(myRightGuessArray);

             } else if (myWrongLetterArray.indexOf(pressKey) == -1 && myRightLetterArray.indexOf(pressKey) == -1 && this.numberOfGuesses > 0) {
                myWrongLetterArray.push(pressKey);
                counter++;
                this.numberOfGuesses--;
                console.log(myWrongLetterArray);
                console.log(counter);
                console.log(this.numberOfGuesses);
            }
        }
    },
    "youWin": function() {
        var compSum = 0;
        for (var i = 0; i< myRightLetterArray.length;i++){
            if (myRightLetterArray[i] == myRightGuessArray[i]) {
                compSum ++;
            }
            if (myRightLetterArray.length == compSum) {
                winFlag = 1;
            }
        }
    }
}

hangman.letterPush();
document.onkeyup = function(event) {
    if(hangman.numberOfGuesses == 0 || winFlag == 1) {
        alert("do nothing");
    } else {
        console.log(event.key);
        var pressedKey = event.key;
        if (hangman.isLetter(pressedKey)) {
            hangman.letterComp(pressedKey);

        } else {
            alert("You can only choose letters");
        }
        hangman.youWin();
    }
};