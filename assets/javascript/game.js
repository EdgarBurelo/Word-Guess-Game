//Script starts
var myWordArray = ["bowser", "excitebike", "kirby","link","mario","ridley","samus"];
var word = myWordArray[Math.floor(Math.random()*myWordArray.length)];
var winStreakCounerId = document.getElementById("winStreakCounter");


var hangman = {
    "word1": myWordArray[Math.floor(Math.random()*myWordArray.length)],
    "myWrongLetterArray": [],
    "myRightLetterArray": [],
    "myRightGuessArray": [],
    "counter": 0,
    "winFlag": 0,
    "winStreak": 0,
    "wordLength": word.length,
    "numberOfGuesses": 15,
    "isLetter": function(strValue) { 
        var objRegExp  = /^[a-z]+$/;
        return objRegExp.test(strValue);
    },
    "letterPush": function() {
        var sent = this.word1
        for (var j=0; j<sent.length; j++) {
            this.myRightLetterArray.push(sent[j]);   
        }
        
    },
    "letterComp": function(pressKey) {
        for(var i=0; i < this.word1.length; i++) {
            if (pressKey === this.word1[i]) {
                 this.myRightGuessArray[i] = pressKey;
                 var wordId = document.getElementById("word"+i);
                 
                 wordId.textContent = pressKey;

             } else if (this.myWrongLetterArray.indexOf(pressKey) == -1 && this.myRightLetterArray.indexOf(pressKey) == -1 && this.numberOfGuesses > 0) {
                this.myWrongLetterArray.push(pressKey);
                this.counter++;
                this.numberOfGuesses--;

                var targetDiv = document.getElementById("badTrys");
                var newDiv = document.createElement("div");
                newDiv.textContent = pressKey+" ,";
                targetDiv.appendChild(newDiv);
                newDiv.setAttribute("class", "col-s-1 letters");
                   
                document.getElementById("guessCounter").innerHTML = this.numberOfGuesses;
                console.log(this.myWrongLetterArray);
                console.log(this.counter);
                console.log(this.numberOfGuesses);
            }
        }
    },
    "youWin": function() {
        var compSum = 0;
        for (var i = 0; i< hangman.myRightLetterArray.length;i++){
            if (hangman.myRightLetterArray[i] == hangman.myRightGuessArray[i]) {
                compSum ++;
            }
            if (hangman.myRightLetterArray.length == compSum) {
                this.winFlag = 1;
                this.winStreak++;
                document.getElementById("winStreakCounter").innerHTML = this.winStreak;
                document.getElementById("btn-continue").style.display = "block";
                this.imgShow();
            }
        }
    },
    "divAppend": function () {
        
        var targetDiv = document.getElementById("hangmanTrys");
        
        for (var i =0; i < this.word1.length; i++) {
            
            var newDiv = document.createElement("div");
            newDiv.textContent = "_";
            targetDiv.appendChild(newDiv);
            newDiv.setAttribute("class", "col-s-1 letters");
            newDiv.setAttribute("id", "word"+i);   
        }
            
    },
    "continueB": function() {
        this.word1 = myWordArray[Math.floor(Math.random()*myWordArray.length)];
        this.myRightGuessArray = [];
        this.myWrongLetterArray = [];
        this.myRightLetterArray = [];
        this.counter = 0;
        this.winFlag = 0;
        this.numberOfGuesses = 15;
        hangman.letterPush();
        document.getElementById("hangmanTrys").innerHTML = "";
        hangman.divAppend();
        document.getElementById("btn-continue").style.display = "none";
        document.getElementById("badTrys").innerHTML = "";
        document.getElementById("guessCounter").innerHTML = this.numberOfGuesses;
        document.getElementById("imgContainer").innerHTML ="";
    },
    "restarB": function() {
        this.word1 = myWordArray[Math.floor(Math.random()*myWordArray.length)];
        this.myRightGuessArray = [];
        this.myWrongLetterArray = [];
        this.myRightLetterArray = [];
        this.counter = 0;
        this.winStreak = 0;
        this.winFlag = 0;
        this.numberOfGuesses = 15;
        hangman.letterPush();
        document.getElementById("hangmanTrys").innerHTML = "";
        hangman.divAppend();
        document.getElementById("winStreakCounter").innerHTML = this.winStreak;
        document.getElementById("btn-continue").style.display = "none";
        document.getElementById("badTrys").innerHTML = "";
        document.getElementById("guessCounter").innerHTML = this.numberOfGuesses;
        document.getElementById("imgContainer").innerHTML ="";
    },
    "imgShow": function() {
        var targetDiv = document.getElementById("imgContainer");
        var newImg = document.createElement("img");
        newImg.setAttribute("class", "imgWin");
        newImg.src = "./assets/images/"+this.word1+".png";
        targetDiv.appendChild(newImg);

    }
}

hangman.letterPush();
hangman.divAppend();

document.onkeyup = function(event) {
    
    if(hangman.numberOfGuesses == 0 || hangman.winFlag == 1) {
        //alert("do nothing");
    } else {
        console.log(event.key);
        var pressedKey = event.key;
        var pressedKeyLow = pressedKey.toLowerCase()
        if (hangman.isLetter(pressedKey)) {
            hangman.letterComp(pressedKeyLow);

        } else {
            //alert("You can only choose letters");
        }
        hangman.youWin();
    }
};

document.getElementById("btn-continue").addEventListener("click", function() {
    hangman.continueB();
});

document.getElementById("btn-Restart").addEventListener("click", function() {
    hangman.restarB();
});