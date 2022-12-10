// Module
const Gameboard = (() => {
    // Private
    let gameboard = [0, 0, 0,
                     0, 0, 0,
                     0, 0, 0];

    // Public
    const setGameBoard = (i, piece) => gameboard[i] = piece;
    const getGameBoard = () => gameboard;
    const getWinner = function () {
        if (gameboard[0] === gameboard[1] === gameboard[2]) return gameboard[0];
        else if (gameboard[3] === gameboard[4] === gameboard[5]) return gameboard[3];
        else if (gameboard[6] === gameboard[7] === gameboard[8]) return gameboard[6];
        else if (gameboard[0] === gameboard[3] === gameboard[6]) return gameboard[0];
        else if (gameboard[1] === gameboard[4] === gameboard[7]) return gameboard[1];
        else if (gameboard[2] === gameboard[5] === gameboard[8]) return gameboard[2];
        else if (gameboard[0] === gameboard[4] === gameboard[8]) return gameboard[0];
        else if (gameboard[2] === gameboard[4] === gameboard[6]) return gameboard[2];
        else if (!(0 in gameboard)) return 0; // Draw
        
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
    
    // Public
    const createPlayer = (pName, piece) => { players.push(Player(pName, piece)) };
    const playMove = (player, tile) => { Gameboard.setGameBoard(tile, players[player].getPiece) };

    return {
        createPlayer,
        playMove
    };
})();