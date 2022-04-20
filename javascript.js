function computerPlay() {
    
    let rand = Math.floor(Math.random() * 3);

    let computerSelection = (rand === 0) ? 'rock' : 
        (rand === 1) ? 'paper' : 'scissors';
    
        return computerSelection;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function playRound(playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase();
    const tieMessage = `It's a tie! We both chose ${playerSelection}.`;
    const winMessage = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
    const loseMessage =  `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`

/*
    let roundResult = null;
    if (playerSelection === 'rock') {
        if (computerSelection === 'scissors') 
            roundResult = winMessage;
        else if (computerSelection === 'paper') 
            roundResult = loseMessage;
    }
    else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') 
            roundResult = winMessage;
        else if (computerSelection === 'scissors') 
            roundResult = loseMessage.`
    }
    else {
        if (computerSelection === 'paper') 
            roundResult = winMessage;
        else if (computerSelection === 'rock') 
            roundResult = loseMessage;
    }
*/

/*
    if (playerSelection === 'rock') 
        roundResult = (computerSelection === 'scissors') ? winMessage : (computerSelection === 'paper') ? loseMessage : tieMessage;
    else if (playerSelection === 'paper') 
        roundResult = (computerSelection === 'rock') ? winMessage : (computerSelection === 'scissors') ? loseMessage : tieMessage
    else 
        roundResult = (computerSelection === 'paper') ? winMessage : (computerSelection === 'rock') ? loseMessage : tieMessage;
*/

    const roundResult = (playerSelection === 'rock') ? ((computerSelection === 'scissors') ? winMessage : (computerSelection === 'paper') ? loseMessage : tieMessage) 
            : (playerSelection === 'paper') ? ((computerSelection === 'rock') ? winMessage : (computerSelection === 'scissors') ? loseMessage : tieMessage) 
            : ((computerSelection === 'paper') ? winMessage : (computerSelection === 'rock') ? loseMessage : tieMessage);

    return roundResult;
}