const gameBoard = document.querySelector('#gameBoard')
const info = document.querySelector('#info')

const cells = [
    "", "", "", "", "", "", "", "", ""
]

let sign = 'circle'
info.textContent = "Circle goes first"

const addSymbol = (e) => {
    const symbol = document.createElement('div')
    symbol.classList.add(sign)
    e.target.append(symbol)
    sign = sign === "circle" ? "cross" : "circle"
    info.textContent = `Now ${sign}'s turn`
    e.target.removeEventListener('click', addSymbol)
    checkScore()
}

const checkScore = () => {
    const allSquares = document.querySelectorAll('.square');
    console.log(allSquares);
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let circleWins = false;
    let crossWins = false;

    winningCombos.forEach(array => {
        if (!circleWins) {
            circleWins = array.every(cell =>
                allSquares[cell].firstChild?.classList.contains('circle'));
        }
        if (!crossWins) {
            crossWins = array.every(cell =>
                allSquares[cell].firstChild?.classList.contains('cross'));
        }
    });

    if (circleWins) {
        const info = document.getElementById('info'); // Assuming 'info' is the ID of the element to update
        info.textContent = "Circle Wins!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
    }

    if (crossWins) {
        const info = document.getElementById('info'); // Assuming 'info' is the ID of the element to update
        info.textContent = "Cross Wins!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
    }
};


const createBoard = () => {
    cells.forEach((cell, index) => {
        const cellbox = document.createElement('div')
        cellbox.classList.add('square')
        cellbox.id = index
        cellbox.addEventListener('click', addSymbol)
        gameBoard.append(cellbox)
    })
}

createBoard()