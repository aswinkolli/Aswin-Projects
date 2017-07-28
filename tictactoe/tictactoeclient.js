function generateGrid() {
    var n=3
    document.getElementById("main").innerHTML=""
    for(var i = 0; i<n; i++){
        
        var grid = document.getElementById("main");
        var row = document.createElement("div");
        row.setAttribute("id", "row"+i);
        row.className="row";
        for(var j = 0; j < n; j++) {
            var cell = document.createElement("div");
            cell.setAttribute("id", "cell"+i+j);
            cell.className = "cell";
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    
    
    document.getElementById("main").addEventListener("click", setCell);
}
var cellColor;
function getMyColor() {
    for(var i=0; i<3; i++) {
        for(var j=0; j<3; j++) {
            if(board[i][j]===0) {
                return 'colorCellX';
            }
        }
    }
    return 'colorCellO'
}
function setCell(event) {
    clickedElement = event.target;
    cellColor = cellColor ? cellColor : getMyColor();
    clickedElement.classList.add(cellColor);
    var cellNumbers = clickedElement.id.substr(4,2).split('').map(function(num) {return parseInt(num)})
    board[cellNumbers[0]][cellNumbers[1]] = cellColor==='colorCellO'?0:1;
    socket.send(board);
}
var board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];




// Create WebSocket connection.
//const socket = new WebSocket('ws://localhost:9000', 'echo-protocol');
const socket = new WebSocket('ws://10.184.45.19:80', 'echo-protocol');
//10.184.45.19
function updateBoard(boardStatus) {
    var boardArray = boardStatus.split(',').map(function(num) {return parseInt(num)});
    var boardArrayIndex = 0
    for(var i=0; i<3; i++) {
        for(var j=0; j<3; j++) {
            board[i][j] = boardArray[boardArrayIndex];
            if(board[i][j] === 0)
                document.getElementById("cell"+i+j).classList.add('colorCellO');
            else if(board[i][j] === 1)
                document.getElementById("cell"+i+j).classList.add('colorCellX');
            boardArrayIndex++;
        }
    }
    console.log(board);
}
// Connection opened
socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log("socket opened");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    // console.log('Message from server', event.data);
    updateBoard(event.data);
});