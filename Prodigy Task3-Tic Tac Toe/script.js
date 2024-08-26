const boxes = document.querySelectorAll('.box');
const status = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');

let currentPlayer = 'X'; 
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let gameActive = true; 

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

function handleClick(event) {
    const box = event.target;
    const index = box.dataset.ind;

    
    if (gameBoard[index] || !gameActive) return;

    
    gameBoard[index] = currentPlayer;
    box.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        status.textContent = `${currentPlayer} wins!`;
        gameActive = false; 
    } else if (gameBoard.every(cell => cell)) {
        status.textContent = 'It\'s a draw!';
        gameActive = false; 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
}
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.textContent = '';
    });
    currentPlayer = 'X';
    status.textContent = 'Play';
    gameActive = true; 
}

boxes.forEach(box => box.addEventListener('click', handleClick));
btnRestart.addEventListener('click', resetGame);
