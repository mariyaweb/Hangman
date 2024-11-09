import words from './js/word.js';
const bodyArr = ['human__head', 'human__trunk', 'hand__left', 'hand__right', 'leg__left', 'leg__right'];


//Create HTML body
const gameBlock = document.createElement('div');
gameBlock.classList.add('game');
const gameWrapper = document.createElement('div');
gameWrapper.classList.add('game__wrapper');
const gameHangman = document.createElement('div');
gameHangman.classList.add('game__hangman', 'hangman');
const hangmanWrapper = document.createElement('div');
hangmanWrapper.classList.add('hangman__wrapper');
const hangmanHangman = document.createElement('div');
hangmanHangman.classList.add('hangman__hangman');
const hangmanImg = document.createElement('img');
hangmanImg.classList.add('hangman__img');
hangmanImg.src = './img/hangman.svg';
hangmanImg.alt = 'hangman';
hangmanHangman.appendChild(hangmanImg);
const hangmanHuman = document.createElement('div');
hangmanHuman.classList.add('hangman__human', 'human');

const humanHead = document.createElement('div');
humanHead.classList.add('human__head', 'hidden');
const humanHeadImg = document.createElement('img');
humanHeadImg.classList.add('head__img');
humanHeadImg.src = './img/head.svg';
humanHeadImg.alt = 'head';
const humanBody = document.createElement('div');
humanBody.classList.add('human__body');
const humanHandLeft = document.createElement('div');
const humanHandLeftImg = document.createElement('img');
humanHandLeft.classList.add('human__hand', 'hand__left', 'hidden');
humanHandLeftImg.src = './img/hand.svg';
humanHandLeftImg.alt = 'hand left';
const humanBodyBody = document.createElement('div')
const humanBodyBodyImg = document.createElement('img');
humanBodyBody.classList.add('human__trunk', 'hidden');
humanBodyBodyImg.src = './img/body.svg';
humanBodyBodyImg.alt = 'body';
const humanHandRight = document.createElement('div')
const humanHandRightImg = document.createElement('img');
humanHandRight.classList.add('human__hand', 'hand__right', 'hidden');
humanHandRightImg.src = './img/hand-right.svg';
humanHandRightImg.alt = 'hand right';
const humanLeg = document.createElement('div');
humanLeg.classList.add('human__leg', 'leg');
const humanLegLeft = document.createElement('div')
const humanLegLeftImg = document.createElement('img');
humanLegLeft.classList.add('leg__left', 'hidden');
humanLegLeftImg.src = './img/hand.svg';
humanLegLeftImg.alt = 'leg left';
const humanLegRight = document.createElement('div')
const humanLegRightImg = document.createElement('img');
humanLegRight.classList.add('leg__right', 'hidden');
humanLegRightImg.src = './img/hand-right.svg';
humanLegRightImg.alt = 'leg right';

humanHead.appendChild(humanHeadImg);
hangmanHuman.appendChild(humanHead);
humanHandLeft.appendChild(humanHandLeftImg);
humanBodyBody.appendChild(humanBodyBodyImg);
humanHandRight.appendChild(humanHandRightImg);
humanBody.appendChild(humanHandLeft);
humanBody.appendChild(humanBodyBody);
humanBody.appendChild(humanHandRight);

hangmanHuman.appendChild(humanBody);

humanLegLeft.appendChild(humanLegLeftImg);
humanLegRight.appendChild(humanLegRightImg);
humanLeg.appendChild(humanLegLeft);
humanLeg.appendChild(humanLegRight);
hangmanHuman.appendChild(humanLeg);

hangmanWrapper.appendChild(hangmanHangman);
hangmanWrapper.appendChild(hangmanHuman);

gameHangman.appendChild(hangmanWrapper);
const hangmanTitle = document.createElement('h1');
hangmanTitle.classList.add('hangman__title');
hangmanTitle.innerHTML = 'HANGMAN GAME';
gameHangman.appendChild(hangmanTitle);
const gameQuiz = document.createElement('div');
const quizWord = document.createElement('div');
gameQuiz.classList.add('game__quiz', 'quiz');
quizWord.classList.add('quiz__word');
const quizQuestion = document.createElement('div');
const question = document.createElement('span');
quizQuestion.classList.add('quiz__question');
quizQuestion.innerHTML = `Hint: `;
question.classList.add('question');
quizQuestion.appendChild(question);
const quizCounter = document.createElement('div');
const counter = document.createElement('span');
quizCounter.classList.add('quiz__counter');
counter.classList.add('counter');
quizCounter.innerHTML = `Incorrect guesses: `;
let minCounter = 0;
const maxCounter = 6;
let winnerCounter = 0;
counter.innerHTML = `${minCounter} / ${maxCounter}`;
quizCounter.appendChild(counter);
const quizKeyboard = document.createElement('div');
quizKeyboard.classList.add('quiz__keyboard', 'keyboard');
gameWrapper.appendChild(gameHangman);
gameQuiz.appendChild(quizWord);
gameQuiz.appendChild(quizQuestion);
gameQuiz.appendChild(quizCounter);
gameQuiz.appendChild(quizKeyboard);
gameWrapper.appendChild(gameQuiz);
gameBlock.appendChild(gameWrapper);
document.body.appendChild(gameBlock);
const modal = document.createElement('div');
modal.classList.add('modal', 'modal-hide');
const modalWrapper = document.createElement('div');
modalWrapper.classList.add('modal__wrapper');
const modalWinner = document.createElement('p');
modalWinner.classList.add('modal__winner');
const modalAnswer = document.createElement('p');
const modalTrueAnswer = document.createElement('span');
modalAnswer.classList.add('modal__answer');
modalTrueAnswer.classList.add('answer');
modalAnswer.innerHTML = `The correct answer: `
modalAnswer.appendChild(modalTrueAnswer);
const modalBtn = document.createElement('div');
modalBtn.classList.add('modal__btn');
modalBtn.innerHTML = 'Play again!';
modalWrapper.appendChild(modalWinner);
modalWrapper.appendChild(modalAnswer);
modalWrapper.appendChild(modalBtn);
modal.appendChild(modalWrapper);
document.body.appendChild(modal);

// Create a virtual keyboard
const alphabet = new Array(26).fill().map((item, index) => String.fromCharCode(65 + index));

alphabet.forEach((item) => {
  const keyItem = document.createElement('div');
  keyItem.classList.add('keyboard__btn');
  keyItem.innerHTML = item;
  quizKeyboard.appendChild(keyItem);
  keyItem.addEventListener('click', (e) => virtualKeyboard(e));
});


// Generate a random word and add it to the body
let currentWord;
let currentWordArr;
let randomNum;
getRandomWord();

function getRandomNumber() {
  const newNum = Math.floor(Math.random() * words.length);
  const prevNum = +localStorage.getItem('randomNumber');
  if (prevNum === newNum) {
    getRandomNumber();
  } else {
    randomNum = newNum;
    localStorage.setItem('randomNumber', newNum);
  }
}

function getRandomWord() {
  getRandomNumber();
  const { word, hint } = words[randomNum];
  currentWord = word.toUpperCase();
  currentWordArr = currentWord.split('');
  console.log(`The right word: ${currentWord}`);
  question.innerHTML = hint;
  for (let i = 0; i < word.length; i++) {
    const quizLetter = document.createElement('div');
    quizLetter.classList.add('quiz__letter');
    quizWord.appendChild(quizLetter);
  }
}


//Physical keyboard
document.addEventListener('keydown', (e) => physicalKeyboard(e));
function physicalKeyboard(e) {
  let letter;
  if (e.keyCode > 64 && e.keyCode < 91) {
    letter = e.code.slice(-1);

    Array.from(document.getElementsByClassName('keyboard__btn')).forEach((item) => {
      if (item.classList.contains('keyboard__btn-disable')) {
        return;
      }
      if (letter == item.innerText) {
        item.classList.add('keyboard__btn-disable');
        startGame(letter);
      }
    })
  }
}

//Virtual keyboard
function virtualKeyboard(e) {
  e.preventDefault();
  if (e.target.classList.contains('keyboard__btn-disable')) {
    return;
  }
  let letter = e.target.innerText;
  startGame(letter);
  e.target.classList.add('keyboard__btn-disable');
}

function startGame(clickedLetter) {
  const keyBtns = document.querySelectorAll('.quiz__letter');
  if (currentWord.includes(clickedLetter)) {
    currentWordArr.forEach((letter, index) => {
      if (letter === clickedLetter) {
        keyBtns[index].classList.add('quiz__letter-letter');
        keyBtns[index].innerHTML = clickedLetter;
        winnerCounter += 1;
      }
      if (winnerCounter === currentWordArr.length) {
        openModal(true, currentWord);
      }
    });
  } else {
    document.querySelector(`.${bodyArr[minCounter]}`).classList.remove('hidden');
    minCounter += 1;
    document.querySelector('.counter').innerHTML = `${minCounter} / ${maxCounter}`;
    if (minCounter === 6) {
      openModal(false, currentWord);
    }
  }

}

function openModal(win, trueWord) {
  document.querySelector('.modal').classList.remove('modal-hide');
  if (win) {
    document.querySelector('.modal__winner').innerHTML = 'You win!';
  } else {
    document.querySelector('.modal__winner').innerHTML = 'Game over!';
  }
  document.querySelector('.answer').innerHTML = `${trueWord}`;
  document.querySelector('.modal__btn').addEventListener('click', closeModal);
}

const closeModal = () => {
  document.querySelector('.modal').classList.add('modal-hide');
  cleanGame();
  getRandomWord();
}

function cleanGame() {
  document.querySelector('.quiz__word').innerHTML = '';

  quizKeyboard.querySelectorAll('.keyboard__btn').forEach((item) => {
    if (item.classList.contains('keyboard__btn-disable')) {
      item.classList.remove('keyboard__btn-disable');
    }
  });

  document.querySelectorAll('.quiz__letter-letter').forEach((item) => {
    item.classList.remove('quiz__letter-letter');
  });

  winnerCounter = 0;
  minCounter = 0;
  document.querySelector('.counter').innerHTML = `${minCounter} / ${maxCounter}`;

  bodyArr.forEach((item) => {
    let element = document.querySelector(`.${item}`);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  })
}