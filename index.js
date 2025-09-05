
        // Game State Variables
        let playerScore = 0;
        let computerScore = 0;
        let currentTarget = 0;
        let currentInnings = 1;
        let isPlayerBatting = false;
        let tossDone = false;
        let gameOver = false;
        let totalOvers = 0;
        let totalBalls = 0;
        let currentBalls = 0;
        let playerWickets = 0;
        let computerWickets = 0;
        let totalWickets = 0;
        let difficulty = 'medium';
        let matchCount = 0;
        let emailSubmitted = false;

        // SVG Hand Gestures
        const handSVGs = {
            1: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">1</text><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: 0 0; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            2: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">2</text><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            3: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">3</text><path class="finger" d="M-10 0 L-10 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M10 0 L10 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            4: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">4</text><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            5: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">5</text><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            6: `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#00f" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#00f" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">6</text><path class="finger" d="M-20 0 L-20 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M20 0 L20 -20" fill="none" stroke="#00f" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-1": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">1</text><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-2": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">2</text><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-3": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">3</text><path class="finger" d="M-10 0 L-10 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M10 0 L10 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-4": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">4</text><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-5": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">5</text><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M0 0 L0 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`,
            "ai-6": `<g transform="translate(50, 50) scale(1.2)"><path d="M-10 40 L-10 60 L10 60 L10 40 Z" fill="#f00" stroke="#000" stroke-width="2"/><path d="M-20 0 Q-20 30, -10 40 Q0 50, 10 40 Q20 30, 20 0 L10 0 Q0 10, -10 0 Z" fill="#f00" stroke="#000" stroke-width="2"/><text x="0" y="20" font-size="12" fill="#fff" text-anchor="middle">6</text><path class="finger" d="M-20 0 L-20 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-15 0 L-15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M-5 0 L-5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M5 0 L5 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M15 0 L15 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><path class="finger" d="M20 0 L20 -20" fill="none" stroke="#f00" stroke-width="6" stroke-linecap="round"/><style>.finger { animation: rise 0.5s ease-in-out; transform-origin: center bottom; } @keyframes rise { 0% { transform: translateY(20px) rotate(-10deg); opacity: 0; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }</style></g>`
        };

        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
        }

        function selectDifficulty(diff) {
            difficulty = diff;
            document.querySelectorAll('.difficulty-btn').forEach(btn => {
                btn.classList.remove('selected');
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '6px 6px 0px #000000';
            });
            const selectedBtn = document.querySelector(`.difficulty-btn.${diff}`);
            if (selectedBtn) {
                selectedBtn.classList.add('selected');
                selectedBtn.style.transform = 'scale(1.1)';
                selectedBtn.style.boxShadow = '8px 8px 0px #000';
            }
        }

        function startGame(overs) {
            totalOvers = overs;
            totalBalls = totalOvers * 6;
            totalWickets = totalOvers;
            showScreen('game');
            document.getElementById('toss-section').classList.remove('hidden');
            document.getElementById('status').textContent = 'Let\'s toss the coin!';
            document.getElementById('total-wickets').textContent = totalWickets;
            document.getElementById('total-wickets-ai').textContent = totalWickets;
            document.getElementById('overs-display').textContent = `Overs: 0.0/${totalOvers}`;
            updateScoreboard();
        }

        function tossCoin(playerCall) {
            if (tossDone) return;
            const tossResult = Math.random() < 0.5 ? 'heads' : 'tails';
            document.getElementById('toss-result').textContent = `Toss: ${tossResult.toUpperCase()}`;
            if (playerCall === tossResult) {
                document.getElementById('toss-status').textContent = 'Toss Won! Pick:';
                document.getElementById('toss-decision').classList.remove('hidden');
                document.getElementById('heads-btn').disabled = true;
                document.getElementById('tails-btn').disabled = true;
            } else {
                document.getElementById('toss-status').textContent = 'AI won the toss!';
                const aiChoice = Math.random() < 0.5 ? 'bat' : 'bowl';
                document.getElementById('toss-result').textContent += ` AI chose to ${aiChoice}.`;
                chooseToss(aiChoice === 'bat' ? 'bowl' : 'bat');
            }
        }

        function chooseToss(choice) {
            isPlayerBatting = choice === 'bat';
            tossDone = true;
            document.getElementById('toss-decision').classList.add('hidden');
            document.getElementById('toss-section').classList.add('hidden');
            document.getElementById('choices').classList.remove('hidden');
            document.getElementById('status').textContent = isPlayerBatting ? 
                'You are batting! Choose a number.' : 
                'You are bowling! Choose a number.';
            document.getElementById('innings-display').textContent = `Innings: ${currentInnings}/2`;
            document.getElementById('target-display').textContent = currentTarget || '-';
            updateScoreboard();
        }

        function play(playerChoice) {
            if (!tossDone || gameOver || (!emailSubmitted && matchCount >= 2)) return;

            let aiChoice;
            switch (difficulty) {
                case 'easy':
                    aiChoice = Math.floor(Math.random() * 6) + 1;
                    break;
                case 'medium':
                    aiChoice = Math.random() < 0.3 ? playerChoice : Math.floor(Math.random() * 6) + 1;
                    break;
                case 'hard':
                    aiChoice = Math.random() < 0.6 ? playerChoice : Math.floor(Math.random() * 6) + 1;
                    break;
            }

            currentBalls++;
            updateOversDisplay();

            document.getElementById('player-hand').innerHTML = handSVGs[playerChoice];
            document.getElementById('computer-hand').innerHTML = handSVGs[`ai-${aiChoice}`];

            if (isPlayerBatting) {
                playerBat(playerChoice, aiChoice);
            } else {
                aiBat(playerChoice, aiChoice);
            }
        }

        function playerBat(playerChoice, aiChoice) {
            if (playerChoice === aiChoice) {
                playerWickets++;
                document.getElementById('player-wickets').textContent = playerWickets;
                document.getElementById('status').textContent = 'OUT!';
                checkInningsEnd();
            } else {
                playerScore += playerChoice;
                document.getElementById('player-score').textContent = playerScore;
                document.getElementById('status').textContent = `You scored ${playerChoice} runs!`;
                if (currentInnings === 2 && playerScore >= currentTarget) {
                    endInnings();
                } else {
                    checkInningsEnd();
                }
            }
            updateScoreboard();
        }

        function aiBat(playerChoice, aiChoice) {
            if (playerChoice === aiChoice) {
                computerWickets++;
                document.getElementById('computer-wickets').textContent = computerWickets;
                document.getElementById('status').textContent = 'OUT!';
                checkInningsEnd();
            } else {
                computerScore += aiChoice;
                document.getElementById('computer-score').textContent = computerScore;
                document.getElementById('status').textContent = `AI scored ${aiChoice} runs!`;
                if (currentInnings === 2 && computerScore >= currentTarget) {
                    endInnings();
                } else {
                    checkInningsEnd();
                }
            }
            updateScoreboard();
        }

        function updateOversDisplay() {
            const overs = Math.floor(currentBalls / 6);
            const balls = currentBalls % 6;
            document.getElementById('overs-display').textContent = `Overs: ${overs}.${balls}/${totalOvers}`;
        }

        function checkInningsEnd() {
            if (currentBalls >= totalBalls || (isPlayerBatting && playerWickets >= totalWickets) || (!isPlayerBatting && computerWickets >= totalWickets)) {
                endInnings();
            }
        }

        function endInnings() {
            if (currentInnings === 1) {
                currentInnings = 2;
                currentBalls = 0;
                document.getElementById('innings-display').textContent = `Innings: ${currentInnings}/2`;
                currentTarget = isPlayerBatting ? playerScore + 1 : computerScore + 1;
                document.getElementById('target-display').textContent = currentTarget;
                isPlayerBatting = !isPlayerBatting;
                document.getElementById('status').textContent = isPlayerBatting ? 
                    `Your turn to bat! Chase ${currentTarget}.` : 
                    `Your turn to bowl! Defend ${currentTarget - 1}.`;
                document.getElementById('player-wickets').textContent = playerWickets = 0;
                document.getElementById('computer-wickets').textContent = computerWickets = 0;
                document.getElementById('player-hand').innerHTML = '';
                document.getElementById('computer-hand').innerHTML = '';
                updateOversDisplay();
            } else {
                gameOver = true;
                matchCount++;
                const result = playerScore > computerScore ? 'You Win!' : 
                              computerScore > playerScore ? 'AI Wins!' : 'It\'s a Tie!';
                document.getElementById('status').textContent = `${result} Final Scores - You: ${playerScore}, AI: ${computerScore}`;
                if (matchCount === 2 && !emailSubmitted) {
                    showEmailModal();
                }
            }
        }

        function showEmailModal() {
            document.getElementById('email-modal').classList.remove('hidden');
            document.getElementById('choices').classList.add('hidden');
            document.getElementById('reset-btn').disabled = true;
        }

        function submitEmail() {
            const emailInput = document.getElementById('email-input').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailInput || !emailRegex.test(emailInput)) {
                document.getElementById('email-error').classList.remove('hidden');
                return;
            }

            let emails = JSON.parse(localStorage.getItem('playerEmails') || '[]');
            if (!emails.includes(emailInput)) {
                emails.push(emailInput);
                localStorage.setItem('playerEmails', JSON.stringify(emails));
            }

            emailSubmitted = true;
            document.getElementById('email-modal').classList.add('hidden');
            document.getElementById('email-error').classList.add('hidden');
            document.getElementById('email-input').value = '';
            document.getElementById('reset-btn').disabled = false;
            document.getElementById('choices').classList.remove('hidden');
        }

        function resetGame() {
            if (!emailSubmitted && matchCount >= 2) return;

            playerScore = 0;
            computerScore = 0;
            currentTarget = 0;
            currentInnings = 1;
            tossDone = false;
            gameOver = false;
            isPlayerBatting = false;
            totalOvers = 0;
            totalBalls = 0;
            currentBalls = 0;
            playerWickets = 0;
            computerWickets = 0;
            totalWickets = 0;
            difficulty = 'medium';
            document.getElementById('player-score').textContent = playerScore;
            document.getElementById('computer-score').textContent = computerScore;
            document.getElementById('player-wickets').textContent = playerWickets;
            document.getElementById('computer-wickets').textContent = computerWickets;
            document.getElementById('total-wickets').textContent = totalWickets;
            document.getElementById('total-wickets-ai').textContent = totalWickets;
            document.getElementById('target-display').textContent = '-';
            document.getElementById('innings-display').textContent = 'Innings: 1/2';
            document.getElementById('overs-display').textContent = `Overs: 0.0/0`;
            document.getElementById('status').textContent = 'Choose mode and difficulty to start!';
            document.getElementById('player-hand').innerHTML = '';
            document.getElementById('computer-hand').innerHTML = '';
            document.getElementById('toss-section').classList.add('hidden');
            document.getElementById('choices').classList.add('hidden');
            document.getElementById('toss-decision').classList.add('hidden');
            document.getElementById('heads-btn').disabled = false;
            document.getElementById('tails-btn').disabled = false;
            document.getElementById('reset-btn').disabled = false;
            showScreen('mainMenu');
            updateScoreboard();
        }

        function updateScoreboard() {
            document.getElementById('player-score-display').textContent = `${playerScore}/${playerWickets}`;
            document.getElementById('computer-score-display').textContent = `${computerScore}/${computerWickets}`;
        }
    