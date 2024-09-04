const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const playVsComputerButton = document.getElementById('play-vs-computer');
const playTwoPlayersButton = document.getElementById('play-two-players');

let currentPlayer = 'X';
let gameActive = true;
let isVsComputer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || !gameActive) return;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        statusMessage.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        statusMessage.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }
    swapTurns();
    if (isVsComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function placeMark(cell, player) {
    cell.textContent = player;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function computerMove() {
    const availableCells = [...cells].filter(cell => cell.textContent === '');
    if (availableCells.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    placeMark(availableCells[randomIndex], 'O');
    if (checkWin('O')) {
        statusMessage.textContent = `O wins!`;
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        statusMessage.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }
    swapTurns();
}

function startVsComputer() {
    isVsComputer = true;
    restartGame();
}

function startTwoPlayers() {
    isVsComputer = false;
    restartGame();
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
restartButton.addEventListener('click', restartGame);
playVsComputerButton.addEventListener('click', startVsComputer);
playTwoPlayersButton.addEventListener('click', startTwoPlayers);

// Initialize the game
restartGame();
