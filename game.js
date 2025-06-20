const boards = {
    Easy:
        "534678912" +
    "672195348" +
    "198342567" +
    "859761423" +
    "426853791" +
    "713924856" +
    "961537284" +
    "287419635" +
    "345286179",

    Medium:
        "--9748---" +
        "7--1-2---" +
        "1--9--5--" +
        "8--6---2-" +
        "4--5--7--" +
        "-2---9--5" +
        "--1--3--2" +
        "---2-7--9" +
        "---419--3",

    Hard:
        "----7-1--" +
        "6------3-" +
        "-2--4----" +
        "8--9----2" +
        "-5-----1-" +
        "4----6--7" +
        "----2--8-" +
        "-3------6" +
        "--1-8----"
};
const difficulty = localStorage.getItem("level") || "Easy";
let board = boards[difficulty] || boards["Easy"];

let selectedTile = null;

function getBoardArray(boardStr) {
    let arr = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            const char = boardStr[i * 9 + j];
            row.push(char === '-' ? '' : char);
        }
        arr.push(row);
    }
    return arr;
}

let boardArray = getBoardArray(board);

function generateBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    for (let i = 0; i < 81; i++) {
        const tile = document.createElement("p");
        const value = board.charAt(i);

        if (value !== '-') {
            tile.textContent = value;
        } else {
            tile.textContent = "";
            tile.classList.add("empty");
            tile.addEventListener("click", () => {
                if (selectedTile) {
                    selectedTile.classList.remove("selected");
                }
                selectedTile = tile;
                tile.classList.add("selected");
            });
        }
        document.getElementById("board").appendChild(tile);
    }
}
generateBoard();

let valueButtons = document.querySelectorAll("#board-contains > p");
valueButtons.forEach(p => {
    p.addEventListener("click", () => {
        if (selectedTile && selectedTile.classList.contains("empty")) {
            const boardTiles = Array.from(document.getElementById("board").children);
            const index = boardTiles.indexOf(selectedTile);
            const row = Math.floor(index / 9);
            const col = index % 9;
            const num = p.textContent;

            if (isValid(boardArray, row, col, num)) {
                selectedTile.textContent = num;
                boardArray[row][col] = num;
                selectedTile.style.color = "black";
            } else {
                selectedTile.textContent = num;
                selectedTile.style.color = "red";
            }

            selectedTile.classList.remove("selected");
            selectedTile = null;
        }
    });
});

function isValid(boardArray, row, col, num) {
    for (let c = 0; c < 9; c++) {
        if (boardArray[row][c] === num) return false;
    }
    for (let r = 0; r < 9; r++) {
        if (boardArray[r][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (boardArray[r][c] === num) return false;
        }
    }
    return true;
}

function isSolved(boardArray) {
    function hasAllDigits(group) {
        const digits = new Set(group);
        return digits.size === 9 && !digits.has('');
    }
    for (let row = 0; row < 9; row++) {
        if (!hasAllDigits(boardArray[row])) return false;
    }
    for (let col = 0; col < 9; col++) {
        let column = [];
        for (let row = 0; row < 9; row++) {
            column.push(boardArray[row][col]);
        }
        if (!hasAllDigits(column)) return false;
    }
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            let box = [];
            for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
                for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
                    box.push(boardArray[r][c]);
                }
            }
            if (!hasAllDigits(box)) return false;
        }
    }
    return true;
}

function checkSolution() {
    if (isSolved(boardArray)) {
        alert("🎉 Congratulations! Sudoku is completely solved!");
        window.location.href = "index.html";
    } else {
        alert("❌ Not solved yet. Try again.");
    }
}
const theme = localStorage.getItem("theme");
if (theme === "Dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
} else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
}

let storedTime = parseInt(localStorage.getItem("time")) || 1;
let timeleft = storedTime * 60;

function updateTime() {
    const sec = document.getElementById("sec");
    const min = document.getElementById("min");
    sec.textContent = (timeleft % 60).toString().padStart(2, '0');
    min.textContent = Math.floor(timeleft / 60).toString().padStart(2, '0');
}

const count = setInterval(() => {
    updateTime();
    if (timeleft <= 0) {
        clearInterval(count);
        const timerLine = document.getElementById("timer");
        if (timerLine) {
            timerLine.textContent = "⏰ Time's up!";
            timerLine.style.color = "red";
            timerLine.style.fontWeight = "bold";
        }
        alert("⏰ Time's up! You will be redirected to the home page.");
        window.location.href = "index.html";
        return;
    }
    timeleft--;
}, 1000);