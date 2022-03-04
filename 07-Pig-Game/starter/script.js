'use strict';

/**
 * [Selecting Element]
 */
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Note📒: getElementBy id is faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Initial State
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let currentPlayer = 0;

let player0Score = 0;
let player1Score = 0;

const switchPlayer = () => {
  currentPlayer = currentPlayer ? 0 : 1;
  currentScore = currentPlayer
    ? Number(score1El.textContent)
    : Number(score0El.textContent);
};

//Rolling Dice
btnRoll.addEventListener('click', () => {
  //1. Generating a randome dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1
  if (dice !== 1) {
    if (currentPlayer === 0) {
      player0Score += dice;
      current0El.textContent = player0Score;
    }

    if (currentPlayer === 1) {
      player1Score += dice;
      current1El.textContent = player1Score;
    }
  } else {
    switchPlayer();
  }
});
