function getComputerSelection() {
     
    let rand = Math.floor(Math.random() * 3);
    let computerSelection = (rand === 0) ? 'rock' : 
        (rand === 1) ? 'paper' : 'scissors';   
    return computerSelection;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function playRound(playerSelection, computerSelection) {

    const tieMessage = `It's a tie! We both chose ${playerSelection}.`;
    const winMessage = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
    const loseMessage =  `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`

    const roundResult = (playerSelection === 'rock') ? ((computerSelection === 'scissors') ? winMessage : (computerSelection === 'paper') ? loseMessage : tieMessage) 
            : (playerSelection === 'paper') ? ((computerSelection === 'rock') ? winMessage : (computerSelection === 'scissors') ? loseMessage : tieMessage) 
            : ((computerSelection === 'paper') ? winMessage : (computerSelection === 'rock') ? loseMessage : tieMessage);

    return roundResult;
}

function getPlayerSelection() {

    let playerSelection = window.prompt("Choose rock, paper, or scissors");
    playerSelection = playerSelection.toLowerCase();

    while (playerSelection != 'rock' && playerSelection != 'paper' && playerSelection != 'scissors') {
        playerSelection = window.prompt("Invalid selection. You may only enter rock, paper, or scissors.\nChoose rock, paper, or scissors");
        playerSelection = playerSelection.toLowerCase();
    }

    return playerSelection;
}

function game() {
    let playerRoundsWon = 0;
    let cpuRoundsWon = 0;
    let roundResult = "";
    let subRes = "";
    let gameResult = "";

    alert("Let's play rock, paper, scissors! Best out of 5 rounds wins.");
    
//    for (let i=0; i<5; i++) {
        roundResult = playRound(getPlayerSelection(), getComputerSelection());
        console.log(roundResult);

        subRes = roundResult.slice(4,7);
        if (subRes === 'win') 
            playerRoundsWon++;
        else if (subRes === 'los')
            cpuRoundsWon++;
 //   }

    gameResult = (playerRoundsWon > cpuRoundsWon) ? "Congratulations, you won the game!" 
        : (playerRoundsWon < cpuRoundsWon) ? "You lost the game. Better luck next time!" : "We tied! What are the odds of that?";

    console.log(gameResult);
}

const buttons = document.querySelector('.btns');
buttons.forEach(btn => btn.addEventListener('click', playRound))