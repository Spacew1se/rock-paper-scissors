const WINCOND = 5;
const CHOICE = ["Rock", "Paper", "Scissors"]
let playerRoundsWon = 0;
let cpuRoundsWon = 0;
let roundsPlayed = 1;

const container = document.querySelector('.container');
const start = document.querySelector('.start');
start.addEventListener('click', startGame);

function startGame() {
    start.parentNode.removeChild(start);
    createInfoCont();
    createButtons();
    createScore();
    showInstructions();
    displayScore();  
}

function createInfoCont() {
    const infoCont = document.createElement('div');
    infoCont.classList.add('infoCont');
    container.appendChild(infoCont);
}

function createButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('btns');
    container.appendChild(buttons);
    
    let btndiv, button, btntxt;
    for (let i=0; i<3; i++) {

        btndiv = document.createElement('div');
        btndiv.classList.add('btndiv');
        buttons.appendChild(btndiv);

        button = document.createElement('button');
        button.type = "submit";
        button.classList.add(lowercaseFirstLetter(CHOICE[i]), 'btn');
        button.id = lowercaseFirstLetter(CHOICE[i]);
        btndiv.appendChild(button);
        
        btntxt = document.createElement('p');
        btntxt.textContent = CHOICE[i];
        btntxt.classList.add('btntxt');   
        btndiv.appendChild(btntxt);
        button.addEventListener('click', playRound);
    }
}

function createScore() {
    const results = document.createElement('div');
    results.classList.add('results');
    container.appendChild(results);
    const round = document.createElement('div');
    round.classList.add('round');
    round.textContent = `Round ${roundsPlayed}`;
    results.appendChild(round);
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    results.appendChild(scoreDiv);
    const playerScore = document.createElement('p');
    playerScore.classList.add('plyrRounds');
    const cpuScore = document.createElement('p');
    cpuScore.classList.add('cpuRounds');
    scoreDiv.appendChild(playerScore);
    scoreDiv.appendChild(cpuScore);
}

function showInstructions() {
    const infoCont = document.querySelector('.infoCont');
    const instructdiv = document.createElement('div');
    instructdiv.classList.add('instructdiv');
    
    const instruct = document.createElement('p');
    instruct.classList.add('instructions');
    instruct.textContent = "Make your selection by clicking on one of the icons below!";

    const toWin = document.createElement('p');
    toWin.classList.add('instructions');
    toWin.textContent = `The first one to score ${WINCOND} points wins`;

    infoCont.replaceChildren(instructdiv);
    instructdiv.appendChild(toWin);
    instructdiv.appendChild(instruct);
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
    const tieMessage = `Round ${roundsPlayed} was a tie! We both chose ${playerSelection}.`;
    const winMessage = `You won round ${roundsPlayed}! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
    const loseMessage =  `You lost round ${roundsPlayed}! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`;
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
    
    if (roundsPlayed++ === 1) {
        const rndResult = document.createElement('div');
        rndResult.classList.add('rndResult');
        const score = document.querySelector('.score');
        results.insertBefore(rndResult, score);
    }
    const rndResult = document.querySelector('.rndResult');
    rndResult.textContent = roundResult;
}

function displayScore() {
    const round = document.querySelector('.round');
    const playerScore = document.querySelector('.plyrRounds');
    const cpuScore = document.querySelector('.cpuRounds');
    round.textContent = `Round ${roundsPlayed}`;
    playerScore.textContent = `Player: ${playerRoundsWon}`;
    cpuScore.textContent = `Opponent: ${cpuRoundsWon}`;
}

function gameOver() {
    const infoCont = document.querySelector('.infoCont');
    const gameResult = (playerRoundsWon === WINCOND) ? "Congratulations, you won the game!" 
        : "You lost the game. Better luck next time!";
    const displayWinner = document.createElement('div');
    displayWinner.classList.add('winner');
    displayWinner.textContent = gameResult;
    infoCont.replaceChildren(displayWinner) 
    rmEventListeners();
    playAgain();
}

function rmEventListeners() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.removeEventListener('click', playRound);
    });
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
    roundsPlayed = 1;
    const rmWinDisplay = document.querySelector('.winner');
    rmWinDisplay.parentNode.removeChild(rmWinDisplay);
    const rmButton = document.querySelector('.again');
    rmButton.parentNode.removeChild(rmButton);
    const rmRndDisplay = document.querySelector('.rndResult');
    rmRndDisplay.parentNode.removeChild(rmRndDisplay)
    addEventListeners();
    showInstructions();
    displayScore();
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
