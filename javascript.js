function computerPlay() {
    
    let rand = Math.floor(Math.random() * 3);

    let computerSelection = (rand === 0) ? 'Rock' : 
        (rand === 1) ? 'Paper' : 'Scissors';
    
        console.log(computerSelection);
}

computerPlay();