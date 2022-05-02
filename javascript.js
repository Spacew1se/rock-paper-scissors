const WINCOND = 5;
const CHOICE = ["Rock", "Paper", "Scissors"]
let playerRoundsWon = 0;
let cpuRoundsWon = 0;
let roundsPlayed = 0;

const container = document.querySelector('.container');
const start = document.querySelector('.start');
start.addEventListener('click', startGame);

function startGame() {
    start.parentNode.removeChild(start);
    createButtons();
    createScore();
    displayScore();
}

function createButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('btns');
    container.appendChild(buttons);
    for (let i=0; i<3; i++) {
        let button = document.createElement('button');
        button.type = "submit";
        button.classList.add(lowercaseFirstLetter(CHOICE[i]));
        button.id = lowercaseFirstLetter(CHOICE[i]);
        button.classList.add('btn');
        button.textContent = CHOICE[i];
        buttons.appendChild(button);
        button.addEventListener('click', playRound);
    }
}

function createScore() {
    const results = document.createElement('div');
    results.classList.add('results');
    container.appendChild(results);
    const scoreList = document.createElement('ul');
    scoreList.classList.add('score');
    results.appendChild(scoreList);
    const playerScore = document.createElement('li');
    playerScore.classList.add('plyrRounds');
    const cpuScore = document.createElement('li');
    cpuScore.classList.add('cpuRounds');
    scoreList.appendChild(playerScore);
    scoreList.appendChild(cpuScore);
}

function getComputerSelection() {
    const rand = Math.floor(Math.random() * 3);
    const computerSelection = (rand === 0) ? 'rock' : 
        (rand === 1) ? 'paper' : 'scissors';   
    return computerSelection;
}

function playRound(playerChoice) {
    computerSelection = getComputerSelection();
    playerSelection = playerChoice.target.id;
    roundResult = calcRoundResult(playerSelection, computerSelection);
    displayRoundResult(roundResult)
    displayScore();
    if(playerRoundsWon === WINCOND || cpuRoundsWon === WINCOND) {
        gameOver();
    } 
}

function calcRoundResult (playerSelection, computerSelection) {
    const tieMessage = `It's a tie! We both chose ${playerSelection}.`;
    const winMessage = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
    const loseMessage =  `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`;
    const roundResult = (playerSelection === 'rock') ? ((computerSelection === 'scissors') ? winMessage : (computerSelection === 'paper') ? loseMessage : tieMessage) 
            : (playerSelection === 'paper') ? ((computerSelection === 'rock') ? winMessage : (computerSelection === 'scissors') ? loseMessage : tieMessage) 
            : ((computerSelection === 'paper') ? winMessage : (computerSelection === 'rock') ? loseMessage : tieMessage);
    const subRes = roundResult.slice(4, 5);
    if (subRes === 'w') playerRoundsWon++;
    else if (subRes === 'l') cpuRoundsWon++;
    return roundResult;
}

function displayRoundResult (roundResult) {
    const results = document.querySelector('.results');
    if (roundsPlayed++ === 0) {
        const rndResult = document.createElement('div');
        rndResult.classList.add('rndResult');
        const score = document.querySelector('.score');
        results.insertBefore(rndResult, score);
    }
    const rndResult = document.querySelector('.rndResult');
    rndResult.textContent = roundResult;
    rndResult.style.backgroundColor = 'purple';
}

function displayScore() {
    const playerScore = document.querySelector('.plyrRounds');
    const cpuScore = document.querySelector('.cpuRounds');
    playerScore.textContent = `Player: ${playerRoundsWon}`;
    cpuScore.textContent = `Opponent: ${cpuRoundsWon}`;
}

function gameOver() {
    const results = document.querySelector('.results');
    const gameResult = (playerRoundsWon === WINCOND) ? "Congratulations, you won the game!" 
        : "You lost the game. Better luck next time!";
    const displayWinner = document.createElement('div');
    displayWinner.classList.add('winner');
    displayWinner.textContent = gameResult;
    results.appendChild(displayWinner);  
    rmEventListeners();
    playAgain();
}

function playAgain() {
    const results = document.querySelector('.results');
    const again = document.createElement('button');
    again.type = "reset";
    again.classList.add('again');
    again.textContent = "Play Again";
    results.appendChild(again);
    again.addEventListener('click', resetGame);
}

function resetGame() {
    playerRoundsWon = 0;
    cpuRoundsWon = 0;
    roundsPlayed = 0;
    const rmWinDisplay = document.querySelector('.winner');
    rmWinDisplay.parentNode.removeChild(rmWinDisplay);
    const rmButton = document.querySelector('.again');
    rmButton.parentNode.removeChild(rmButton);
    const rmRndDisplay = document.querySelector('.rndResult');
    rmRndDisplay.parentNode.removeChild(rmRndDisplay)
    addEventListeners();
    displayScore();
}

function rmEventListeners() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.removeEventListener('click', playRound);
    });
}

function addEventListeners() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', playRound);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
