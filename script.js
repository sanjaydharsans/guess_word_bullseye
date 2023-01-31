const feed = document.querySelector(".feed"),
hintTag = document.querySelector(".hint span"),
left = document.querySelector(".left span"),
wrong = document.querySelector(".wrong span"),
reset = document.querySelector(".reset"),
typingInput = document.querySelector(".in");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

const randomWord = () => {
    const ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    left.innerText = maxGuesses;
    wrong.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    feed.innerHTML = html;
};
randomWord();

const initGame = (e) => {
    const key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    feed.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        left.innerText = maxGuesses;
        wrong.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                feed.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
};

reset.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
feed.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
