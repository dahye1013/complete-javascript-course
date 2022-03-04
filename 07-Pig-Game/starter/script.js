'use strict';

/**
 * [Selecting Element]
 */
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Note📒: getElementBy id is faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

// Initialzing --------------------------------------------------------

const init = function () {
  // State
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Methods --------------------------------------------------------

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollingDice = () => {
  //1. Generating a randome dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1
  if (dice === 1) {
    switchPlayer();
    return;
  }

  currentScore += dice;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const holdScore = () => {
  //  Add current score to active player's score
  score[activePlayer] += currentScore;

  //Win the Game
  if (score[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }

  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  switchPlayer();
};

// Add Event --------------------------------------------------------

//Rolling Dice
btnRoll.addEventListener('click', () => {
  if (!playing) return;
  rollingDice();
});

// Hold Score
btnHold.addEventListener('click', () => {
  if (!playing) return;
  holdScore();
});

btnNew.addEventListener('click', init);

init();
