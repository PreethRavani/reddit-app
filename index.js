// Game state
let gameState = {
    mode: 'computer',
    difficulty: 'medium',
    overs: 5,
    maxWickets: 5,
    currentInning: 1,
    playerBatting: true, // true = player batting, false = player bowling
    playerScore: 0,
    playerWickets: 0,
    computerScore: 0,
    computerWickets: 0,
    currentOver: 1,
    ballsInOver: 0,
    target: null,
    gameEnded: false,
    playerChoice: null,
    computerChoice: null
};

const handEmojis = {
    1: '☝️', 2: '✌️', 3: '🤟', 4: '🤘', 5: '🖐️', 6: '🤚'
};

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function selectGameMode(mode) {
    gameState.mode = mode;
    showScreen('gameMode');
    
    const difficultySection = document.getElementById('difficultySection');
    difficultySection.style.display = mode === 'computer' ? 'block' : 'none';
}

function chooseDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`.difficulty-btn.${difficulty}`).classList.add('selected');
}

function beginGame(overs) {
    // Reset game state
    gameState = {
        mode: gameState.mode,
        difficulty: gameState.difficulty,
        overs: overs,
        maxWickets: overs,
        currentInning: 1,
        playerBatting: true,
        playerScore: 0,
        playerWickets: 0,
        computerScore: 0,
        computerWickets: 0,
        currentOver: 1,
        ballsInOver: 0,
        target: null,
        gameEnded: false,
        playerChoice: null,
        computerChoice: null
    };
    
    updateDisplay();
    showScreen('game');
    
    const status = document.getElementById('gameStatus');
    status.innerHTML = '<div>🏏 YOU ARE BATTING FIRST!</div><div style="font-size: 0.9em; margin-top: 10px;">CHOOSE YOUR BRUTAL NUMBER!</div>';
}

function updateDisplay() {
    // Update scores
    document.getElementById('playerScoreDisplay').textContent = `${gameState.playerScore}/${gameState.playerWickets}`;
    document.getElementById('computerScoreDisplay').textContent = `${gameState.computerScore}/${gameState.computerWickets}`;
    document.getElementById('playerRuns').textContent = gameState.playerScore;
    document.getElementById('playerWickets').textContent = gameState.playerWickets;
    document.getElementById('computerRuns').textContent = gameState.computerScore;
    document.getElementById('computerWickets').textContent = gameState.computerWickets;
    
    // Update over/ball info
    document.getElementById('overDisplay').textContent = `OVER ${gameState.currentOver}/${gameState.overs}`;
    document.getElementById('ballDisplay').textContent = `BALL ${gameState.ballsInOver + 1}/6`;
    document.getElementById('inningsDisplay').textContent = `INNINGS ${gameState.currentInning}`;
    
    // Update roles
    if (gameState.playerBatting) {
        document.getElementById('playerRole').textContent = 'BATTING';
        document.getElementById('computerRole').textContent = 'BOWLING';
        document.getElementById('playerCard').className = 'player-card batting';
        document.getElementById('computerCard').className = 'player-card bowling';
    } else {
        document.getElementById('playerRole').textContent = 'BOWLING';
        document.getElementById('computerRole').textContent = 'BATTING';
        document.getElementById('playerCard').className = 'player-card bowling';
        document.getElementById('computerCard').className = 'player-card batting';
    }
    
    // Update target display
    const targetDisplay = document.getElementById('targetDisplay');
    if (gameState.currentInning === 2 && gameState.target) {
        const needed = gameState.target - (gameState.playerBatting ? gameState.playerScore : gameState.computerScore);
        document.getElementById('targetRuns').textContent = gameState.target;
        document.getElementById('runsNeeded').textContent = Math.max(0, needed);
        targetDisplay.style.display = 'block';
    } else {
        targetDisplay.style.display = 'none';
    }
}

function makeChoice(number) {
    if (gameState.gameEnded) return;
    
    gameState.playerChoice = number;
    document.getElementById('playerHand').textContent = handEmojis[number];
    document.getElementById('playerChoice').innerHTML = '<div style="background: #00FF80; color: #000; padding: 5px; border: 2px solid #000; font-weight: bold;">CHOICE ✓</div>';
    
    // Disable buttons
    document.querySelectorAll('.number-button').forEach(btn => btn.disabled = true);
    
    const status = document.getElementById('gameStatus');
    status.innerHTML = '<div>🤖 COMPUTER IS THINKING...</div>';
    
    setTimeout(() => {
        const computerChoice = getComputerChoice();
        gameState.computerChoice = computerChoice;
        document.getElementById('computerHand').textContent = handEmojis[computerChoice];
        document.getElementById('computerChoice').innerHTML = '<div style="background: #FF0080; color: #FFF; padding: 5px; border: 2px solid #000; font-weight: bold;">CHOICE ✓</div>';
        
        processBall();
    }, 1500);
}

function getComputerChoice() {
    switch (gameState.difficulty) {
        case 'easy':
            return Math.floor(Math.random() * 6) + 1;
        case 'medium':
            return Math.random() < 0.3 ? gameState.playerChoice : Math.floor(Math.random() * 6) + 1;
        case 'hard':
            return Math.random() < 0.6 ? gameState.playerChoice : Math.floor(Math.random() * 6) + 1;
        default:
            return Math.floor(Math.random() * 6) + 1;
    }
}

function processBall() {
    const playerChoice = gameState.playerChoice;
    const computerChoice = gameState.computerChoice;
    const status = document.getElementById('gameStatus');
    
    if (playerChoice === computerChoice) {
        // OUT!
        if (gameState.playerBatting) {
            gameState.playerWickets++;
            status.innerHTML = '<div style="color: #FF0080; font-size: 1.3em;">🔥 YOU ARE OUT! 🔥</div>';
        } else {
            gameState.computerWickets++;
            status.innerHTML = '<div style="color: #00FF80; font-size: 1.3em;">🎉 COMPUTER OUT! 🎉</div>';
        }
    } else {
        // Runs scored by the batsman
        if (gameState.playerBatting) {
            // Player is batting, so player scores runs
            gameState.playerScore += playerChoice;
            status.innerHTML = `<div style="color: #00FF80; font-size: 1.3em;">${playerChoice} BRUTAL RUNS! 🎉</div>`;
        } else {
            // Computer is batting, so computer scores runs
            gameState.computerScore += computerChoice;
            status.innerHTML = `<div style="color: #FF0080; font-size: 1.3em;">COMPUTER SCORED ${computerChoice} RUNS!</div>`;
        }
    }
    
    gameState.ballsInOver++;
    updateDisplay();
    
    // Check for over completion
    if (gameState.ballsInOver >= 6) {
        gameState.currentOver++;
        gameState.ballsInOver = 0;
        updateDisplay();
        
        setTimeout(() => {
            status.innerHTML += '<div style="margin-top: 10px;">📣 OVER COMPLETE!</div>';
        }, 1000);
    }
    
    setTimeout(() => {
        checkGameEnd();
    }, 2500);
}

function checkGameEnd() {
    const battingWickets = gameState.playerBatting ? gameState.playerWickets : gameState.computerWickets;
    const battingScore = gameState.playerBatting ? gameState.playerScore : gameState.computerScore;
    
    const gameEnded = 
        battingWickets >= gameState.maxWickets ||
        gameState.currentOver > gameState.overs ||
        (gameState.currentInning === 2 && gameState.target && battingScore >= gameState.target);
    
    if (gameEnded) {
        if (gameState.currentInning === 1) {
            startSecondInning();
        } else {
            endGame();
        }
    } else {
        resetBall();
    }
}

function startSecondInning() {
    gameState.currentInning = 2;
    gameState.target = Math.max(gameState.playerScore, gameState.computerScore) + 1;
    
    // Switch roles - if player was batting, now they bowl
    gameState.playerBatting = !gameState.playerBatting;
    
    gameState.currentOver = 1;
    gameState.ballsInOver = 0;
    
    updateDisplay();
    
    const status = document.getElementById('gameStatus');
    if (gameState.playerBatting) {
        status.innerHTML = `<div style="color: #00FF80; font-size: 1.3em;">📣 INNINGS BREAK! 🎯</div><div style="margin-top: 10px;">YOU ARE NOW BATTING! TARGET: ${gameState.target}</div>`;
    } else {
        status.innerHTML = `<div style="color: #00FF80; font-size: 1.3em;">📣 INNINGS BREAK! 🎯</div><div style="margin-top: 10px;">YOU ARE NOW BOWLING! DEFEND: ${gameState.target - 1}</div>`;
    }
    
    setTimeout(() => {
        resetBall();
        const newStatus = gameState.playerBatting ? 
            '<div>🏏 YOUR TURN TO BAT!</div><div style="font-size: 0.9em; margin-top: 10px;">CHOOSE YOUR BRUTAL NUMBER!</div>' :
            '<div>⚾ YOUR TURN TO BOWL!</div><div style="font-size: 0.9em; margin-top: 10px;">CHOOSE YOUR BRUTAL NUMBER!</div>';
        status.innerHTML = newStatus;
    }, 3000);
}

function endGame() {
    gameState.gameEnded = true;
    const status = document.getElementById('gameStatus');
    
    let winner;
    if (gameState.playerScore > gameState.computerScore) {
        winner = 'YOU WIN';
    } else if (gameState.computerScore > gameState.playerScore) {
        winner = 'COMPUTER WINS';
    } else {
        winner = 'TIE GAME';
    }
    
    status.innerHTML = `
        <div style="color: ${winner === 'YOU WIN' ? '#00FF80' : winner === 'COMPUTER WINS' ? '#FF0080' : '#FFFF00'}; font-size: 1.5em;">
            🏏 ${winner}! 🏏
        </div>
        <div style="margin-top: 10px;">
            FINAL SCORE: YOU ${gameState.playerScore}/${gameState.playerWickets} - COMPUTER ${gameState.computerScore}/${gameState.computerWickets}
        </div>
    `;
    
    document.querySelectorAll('.number-button').forEach(btn => btn.disabled = true);
}

function resetBall() {
    gameState.playerChoice = null;
    gameState.computerChoice = null;
    
    document.getElementById('playerHand').textContent = '🤝';
    document.getElementById('computerHand').textContent = '🤝';
    document.getElementById('playerChoice').innerHTML = '';
    document.getElementById('computerChoice').innerHTML = '';
    
    document.querySelectorAll('.number-button').forEach(btn => btn.disabled = false);
    
    const status = document.getElementById('gameStatus');
    if (gameState.playerBatting) {
        status.innerHTML = '<div>🏏 YOUR TURN TO BAT!</div><div style="font-size: 0.9em; margin-top: 10px;">CHOOSE YOUR BRUTAL NUMBER!</div>';
    } else {
        status.innerHTML = '<div>⚾ YOUR TURN TO BOWL!</div><div style="font-size: 0.9em; margin-top: 10px;">CHOOSE YOUR BRUTAL NUMBER!</div>';
    }
}

function resetAndGoHome() {
    // Reset game state completely
    gameState = {
        mode: 'computer',
        difficulty: 'medium',
        overs: 5,
        maxWickets: 5,
        currentInning: 1,
        playerBatting: true,
        playerScore: 0,
        playerWickets: 0,
        computerScore: 0,
        computerWickets: 0,
        currentOver: 1,
        ballsInOver: 0,
        target: null,
        gameEnded: false,
        playerChoice: null,
        computerChoice: null
    };
    
    showScreen('mainMenu');
}

// Initialize event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hand Cricket game loaded successfully!');

    // Helper function to attach event listener and log if element is missing
    const attachListener = (selector, event, handler, elementType = 'querySelector') => {
        const element = elementType === 'getElementById' 
            ? document.getElementById(selector)
            : document.querySelector(selector);
        if (element) {
            element.addEventListener(event, handler);
            console.log(`Event listener attached to ${selector}`);
        } else {
            console.error(`Element not found: ${selector}`);
        }
    };

    // Main menu buttons
    attachListener('.play-reddit-btn', 'click', () => selectGameMode('multiplayer'));
    attachListener('.play-computer-btn', 'click', () => selectGameMode('computer'));
    attachListener('.hall-btn', 'click', () => showScreen('leaderboard'));

    // Game mode selection buttons
    attachListener('.quick-btn', 'click', () => beginGame(1));
    attachListener('.power-btn', 'click', () => beginGame(3));
    attachListener('.battle-btn', 'click', () => beginGame(5));
    attachListener('.championship-btn', 'click', () => beginGame(10));
    attachListener('.back-main-btn', 'click', () => showScreen('mainMenu'));

    // Difficulty selection buttons
    attachListener('.difficulty-btn.easy', 'click', () => chooseDifficulty('easy'));
    attachListener('.difficulty-btn.medium', 'click', () => chooseDifficulty('medium'));
    attachListener('.difficulty-btn.hard', 'click', () => chooseDifficulty('hard'));

    // Number choice buttons
    attachListener('.choice-1', 'click', () => makeChoice(1));
    attachListener('.choice-2', 'click', () => makeChoice(2));
    attachListener('.choice-3', 'click', () => makeChoice(3));
    attachListener('.choice-4', 'click', () => makeChoice(4));
    attachListener('.choice-5', 'click', () => makeChoice(5));
    attachListener('.choice-6', 'click', () => makeChoice(6));

    // Reset button
    attachListener('.reset-btn', 'click', resetAndGoHome);
});
