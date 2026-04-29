
const statusElement = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]  
];

function handleCellClick(event) {
    const clickedCell = event.target;
    
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
   
    board[index] = currentPlayer;
    
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); 
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

  
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
       
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        
        
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerText = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }


    if (!board.includes('')) {
        statusElement.innerText = 'Game ended in a draw!';
        isGameActive = false;
        return;
    }

    
    switchPlayer();
}

function restartGame() {
   
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
    
  
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);
