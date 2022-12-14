// Module
const Gameboard = (() => {
    // Private
    let gameboard =
           [0, 0, 0,
            0, 0, 0,
            0, 0, 0];

    // Public
    const setGameBoard = (i, piece) => gameboard[i] = piece;
    const getGameBoard = () => gameboard;
    const getWinner = function () {
        if (gameboard[0] !== 0) {
            if (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]) return gameboard[0];
            else if (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]) return gameboard[0];
            else if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8]) return gameboard[0];
        }

        if (gameboard[4] !== 0) {
            if (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5]) return gameboard[3];
            else if (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7]) return gameboard[1];
            else if (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6]) return gameboard[2];
        }
        
        if (gameboard[8] !== 0){
            if (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]) return gameboard[6];
            else if (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]) return gameboard[2];
        }
        
        if (!(gameboard.includes(0))) return 0; // Draw
        
        return -1; // No result
    };

    return {
        setGameBoard,
        getGameBoard,
        getWinner
    };
})();

// Factory function
const Player = (pName, piece) => {
    // Public
    const getName = () => pName;
    const getPiece = () => piece;

    return {
        getName,
        getPiece
    };
};

// Module
const displayController = (() => {
    // Private
    let players = [];
    let currentPlayer = 0;

    // Public
    const createPlayer = (pName, piece) => players.push(Player(pName, piece));
    const playMove = (tile) => {
        let pc = players[currentPlayer].getPiece();
        Gameboard.setGameBoard(tile, pc);
        currentPlayer = currentPlayer ? 0 : 1;
    };
    const getCurrentPiece = () => players[currentPlayer].getPiece();
    const getWinner = () => {
        let winner = Gameboard.getWinner();
        if (winner === -1) return '';
        else if (winner === 0) return null;
        return players[winner - 1].getName();
    };

    return {
        createPlayer,
        playMove,
        getCurrentPiece,
        getWinner
    };
})();

const startBtn = document.getElementById('start');
const startDiv = document.getElementById('starting');
const board = document.getElementById('board');
const tiles = board.querySelectorAll('div');

function game(e) {
    let tile = e.target;
    if (tile.textContent === '') {
        if (displayController.getCurrentPiece() === 1) {
            tile.textContent = 'X';
        } else {
            tile.textContent = 'O';
        }
        
        
    }

    if (e.type === 'click' && !(tile.classList.contains('claimed'))) {
        tile.classList.add('claimed');
        displayController.playMove(Number(tile.id));
        let winner = displayController.getWinner();
        if (!(winner === '')) {console.log(winner);}
    }
    
}

startBtn.addEventListener('click', function () {
    const p1Name = document.getElementById('p1');
    const p2Name = document.getElementById('p2');

    if (p1Name.value === '' || p2Name.value === '') document.getElementById('error').classList.add('error');
    else {
        startDiv.classList.toggle('hide');
        startDiv.classList.toggle('starting');
        board.classList.toggle('hide');
        displayController.createPlayer(p1Name.value, 1);
        displayController.createPlayer(p2Name.value, 2);
    }
});

tiles.forEach((tile) => {
    tile.addEventListener('mouseover', game);
    tile.addEventListener('mouseleave', () => { if (!(tile.classList.contains('claimed'))) tile.textContent = ''; });
    tile.addEventListener('click', game);
});