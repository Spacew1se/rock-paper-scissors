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
        button = document.createElement('button');
        btntxt = document.createElement('p');

        btndiv.classList.add('btndiv');
        button.classList.add(lowercaseFirstLetter(CHOICE[i]), 'btn');
        button.type = "submit";
        button.id = lowercaseFirstLetter(CHOICE[i]);
        btntxt.classList.add('btntxt');
        btntxt.textContent = CHOICE[i];
        
        buttons.appendChild(btndiv);
        btndiv.append(button, btntxt);
    }
    addEventListeners();
}

function createScore() {
    const results = document.createElement('div');
    const round = document.createElement('div');
    const scoreDiv = document.createElement('div');
    const playerInfo = document.createElement('div');
    const cpuInfo = document.createElement('div');
    const playerScore = document.createElement('p');
    const cpuScore = document.createElement('p');
    
    results.classList.add('results');
    round.classList.add('round'); 
    scoreDiv.classList.add('score');
    cpuInfo.classList.add('cpuInfo')
    playerInfo.classList.add('playerInfo');
    playerScore.classList.add('playerRounds');
    cpuScore.classList.add('cpuRounds');
    round.textContent = `Round ${roundsPlayed}`;

    container.appendChild(results);
    results.append(round, scoreDiv);
    playerInfo.appendChild(playerScore);
    cpuInfo.appendChild(cpuScore);
    scoreDiv.append(playerInfo, cpuInfo);
}

function showInstructions() {
    const infoCont = document.querySelector('.infoCont');
    const instructdiv = document.createElement('div');
    const instruct = document.createElement('p');
    const toWin = document.createElement('p');

    instructdiv.classList.add('instructdiv');
    instruct.classList.add('instructions');
    toWin.classList.add('instructions');
    toWin.textContent = `The first one to score ${WINCOND} points wins`;
    instruct.textContent = "Make your selection by clicking on one of the icons below!";

    infoCont.replaceChildren(instructdiv);
    instructdiv.append(toWin, instruct);
}

function getComputerSelection() {
    const rand = Math.floor(Math.random() * 3);
    return lowercaseFirstLetter(CHOICE[rand]);
}

function playRound(playerChoice) {
    computerSelection = getComputerSelection();
    playerSelection = playerChoice.target.id;
    if (roundsPlayed === 1) createRoundResult();
    displayRoundResult(calcRoundResult(playerSelection, computerSelection));
    displayScore();
    if(playerRoundsWon === WINCOND || cpuRoundsWon === WINCOND) {
        gameOver();
    }
}

function createRoundResult () {
    const results = document.querySelector('.results');
    const score = document.querySelector('.score');
    const playerInfo = document.querySelector('.playerInfo');
    const cpuInfo = document.querySelector('.cpuInfo');
    const rndResult = document.createElement('div');
    const playerDisplay = document.createElement('p');
    const cpuDisplay = document.createElement('p');

    rndResult.classList.add('rndResult');   
    playerDisplay.classList.add('playerDisplay');
    cpuDisplay.classList.add('cpuDisplay');
    playerInfo.appendChild(playerDisplay);
    cpuInfo.appendChild(cpuDisplay);
    results.insertBefore(rndResult, score);
}

function calcRoundResult (playerSelection, computerSelection) {
    const rpsPlayer = `You chose ${playerSelection}`;
    const rpsCpu = `Computer chose ${computerSelection}`;
    const tieMessage = `Round ${roundsPlayed} was a tie! We both chose ${playerSelection}.`;
    const winMessage = `You won round ${roundsPlayed}! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
    const loseMessage =  `You lost round ${roundsPlayed}! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`;
    const roundResult = (playerSelection === 'rock') ? ((computerSelection === 'scissors') ? winMessage : (computerSelection === 'paper') ? loseMessage : tieMessage) 
            : (playerSelection === 'paper') ? ((computerSelection === 'rock') ? winMessage : (computerSelection === 'scissors') ? loseMessage : tieMessage) 
            : ((computerSelection === 'paper') ? winMessage : (computerSelection === 'rock') ? loseMessage : tieMessage);
    const subRes = roundResult.slice(4, 5);
    if (subRes === 'w') playerRoundsWon++;
    else if (subRes === 'l') cpuRoundsWon++;
    const resultArr = [rpsPlayer, rpsCpu, roundResult];
    return resultArr;
}

function displayRoundResult (resultArr) {
    const playerDisplay = document.querySelector('.playerDisplay');
    const cpuDisplay = document.querySelector('.cpuDisplay');
    const rndResult = document.querySelector('.rndResult');
    playerDisplay.textContent = resultArr[0];
    cpuDisplay.textContent = resultArr[1];   
    rndResult.textContent = resultArr[2];
}

function displayScore() {
    if (playerRoundsWon === WINCOND || cpuRoundsWon === WINCOND) --roundsPlayed;
    const round = document.querySelector('.round');
    const playerScore = document.querySelector('.playerRounds');
    const cpuScore = document.querySelector('.cpuRounds');
    round.textContent = `Round ${++roundsPlayed}`;
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
    roundsPlayed = 0;
    const rmWinDisplay = document.querySelector('.winner');
    rmWinDisplay.parentNode.removeChild(rmWinDisplay);
    const rmButton = document.querySelector('.again');
    rmButton.parentNode.removeChild(rmButton);
    const rmRndDisplay = document.querySelector('.rndResult');
    rmRndDisplay.parentNode.removeChild(rmRndDisplay);
    const rmPlayerDisplay = document.querySelector('.playerDisplay');
    rmPlayerDisplay.parentNode.removeChild(rmPlayerDisplay);
    const rmCpuDisplay = document.querySelector('.cpuDisplay');
    rmCpuDisplay.parentNode.removeChild(rmCpuDisplay);
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
