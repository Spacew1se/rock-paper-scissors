function getComputerSelection() {
    const rand = Math.floor(Math.random() * 3);
    const computerSelection = (rand === 0) ? 'rock' : 
        (rand === 1) ? 'paper' : 'scissors';   
    return computerSelection;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

function gameOver() {
    const gameResult = (playerRoundsWon === WINCOND) ? "Congratulations, you won the game!" 
        : "You lost the game. Better luck next time!";
    const displayWinner = document.createElement('div');  
    displayWinner.classList.add('winner');
    displayWinner.textContent = gameResult;
    results.appendChild(displayWinner);   
    playAgain();
}

function playAgain() {
    const again = document.createElement('button');
    again.classList.add('again')
    again.textContent = "Play Again"
    results.appendChild(again)
    again.addEventListener('click', resetGame)
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
    displayScore();
}

function displayScore() {
    const playerScore = document.querySelector('.plyrRounds');
    const cpuScore = document.querySelector('.cpuRounds');
    playerScore.textContent = `Player: ${playerRoundsWon}`;
    cpuScore.textContent = `Opponent: ${cpuRoundsWon}`;
}

const WINCOND = 5;
let playerRoundsWon = 0;
let cpuRoundsWon = 0;
let roundsPlayed = 0;

const results = document.querySelector('.results')
const buttons = document.querySelectorAll('.btns');
buttons.forEach(btn => btn.addEventListener('click', playRound))

const container = document.querySelector('.container')