const boxs = document.querySelectorAll('.box');
const statusBar = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');
const x = '<img src="image-X.png">';
const o = '<img src="image-O.png">';
const result = document.querySelector('.result');

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = x;
let player = "X";
let running = true;
statusBar.textContent = `${player} - Your Turn`;


boxs.forEach((box) => {
    box.addEventListener('click', () => {
        const index = box.dataset.index;

        if (options[index] != '' || !running) {
            return;
        }
        options[index] = player;
        box.innerHTML = currentPlayer;

        checkWinner();
    });
});

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        let condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if (box1 == '' || box2 == '' || box3 == '') {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            winner(condition);
        }
    }

    if (isWon) {
        document.querySelector('.popup').style.display = 'flex';
        result.innerHTML = `${currentPlayer} - Won..`;
        statusBar.textContent = `${player} - Won..`;
        running = false;
    }
    else if (!options.includes('')) {
        document.querySelector('.popup').style.display = 'flex';
        result.innerHTML = `Game Draw...`;
        statusBar.textContent = ` Game Draw..`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
    currentPlayer = (currentPlayer == x) ? o : x;
    statusBar.textContent = `${player} - Your Turn`;
}

resetBtn.addEventListener('click', () => {

    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = x;
    player = "X";
    running = true;
    statusBar.textContent = `${player} - Your Turn`;

    boxs.forEach(box => {
        box.innerHTML = '';
        box.classList.remove('win');
    })
});


function removePopup() {
    document.querySelector('.popup').style.display = 'none';
}

function winner(condition){
    boxs[condition[0]].classList.add('win');
    boxs[condition[1]].classList.add('win');
    boxs[condition[2]].classList.add('win');
}