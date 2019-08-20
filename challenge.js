var scores, roundScore, activePlayer, isPlaying, lastDice;

function init() {
    isPlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    lastDice = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent ='0';
    document.getElementById('score-1').textContent ='0';
    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent ='0';
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    }

init();

//Rolling the dice

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if (isPlaying){
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // Display number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Check for 2 consecutive 6's
        if (dice === 6 && lastDice ===6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        // Update the round score if the rolled number is not 1 
        else if (dice !== 1){
            //Add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        }
        else {
            //Next player
            nextPlayer();

        }
        lastDice = dice;
    }
}); 

//Holding  button

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (isPlaying){
        // Add current score to global score 
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input){
            winningScore = input;
        }
        else{
            winningScore = 100;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isPlaying = false;
        }
        else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    document.getElementById('current-' + activePlayer).innerHTML = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// New button
document.querySelector('.btn-new').addEventListener('click', init);