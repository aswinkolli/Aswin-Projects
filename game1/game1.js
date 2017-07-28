function hello() {
    document.getElementById("test").innerHTML="yolo";
}
var randomCellGlobal;
var score=0;
var gridsize;
var levelTimer = 8000;//120*60000;
var colorChangeTimer = 2000;
var colorChangeInterval;
var maxLevel=5;
var level = 1;
var minScore=2;
var failed = 0;
var levelInterval = setInterval(startNewLevel, levelTimer);

function generateGrid(n) {
    if(gridsize===undefined){
        gridsize = n;
    }
    n=gridsize;
    
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
    
    
    document.getElementById("main").addEventListener("click", checkColor);
    // setTimeout(setRandomCell(gridsize), 1000);
    setRandomCell(gridsize);
    colorChangeInterval= setInterval(setRandomCell, colorChangeTimer);
    // document.getElementById("main").innerHTML=grid.innerHTML;
}

function getRandom(max) {

  return Math.floor(Math.random() * (max - 1)) + 1;
}

function startNewLevel() {
    if(score>=minScore && level<maxLevel) {
        level+=1;
        minScore+=level*minScore;
        gridsize += 1
        generateGrid();
        clearInterval(colorChangeInterval);
        document.getElementById("levelIndicator").innerHTML="Your level is: " + level;
    } else {
        clearInterval(colorChangeInterval);
        clearInterval(levelInterval);
        document.getElementById("levelIndicator").innerHTML="You have lost the game, Your final score is: "+ score + " and your final level is: " + level;
        if(window.localStorage.getItem("score")) {
            var highScore = window.localStorage.getItem("score");
            var highLevel = window.localStorage.getItem("level")
            document.getElementById.innerHTML="The highest score is: "+highScore+" and the highest level is: "+highLevel;
            if(score>highScore){
                window.localStorage.setItem("score", score);
                window.localStorage.setItem("level", level);    
            }
        } else {
            window.localStorage.setItem("score", score);
            window.localStorage.setItem("level", level);
        }
    }

}

function checkColor(event) {
    clickedElement = event.target;
    console.log(clickedElement);
    if(clickedElement.classList.contains("colorCell")){
        // console.log("success");
        if(failed==0){
            score++
            document.getElementById("score").innerHTML="Your score is:"+score;
        }
    } else {
        // setRandomCell(gridsize);
        failed = 1;
    }
    // clickedElement.classList.remove("colorCell");
    // document.getElementById(randomCellGlobal).classList.remove("colorCell");
    
}

function setRandomCell(n) {
    failed=0;
    n = gridsize
    if(document.getElementById(randomCellGlobal)){
        document.getElementById(randomCellGlobal).classList.remove("colorCell");
    }
    var randomCell = getRandom(n*n+1);
    console.log(randomCell);
    var randomCellRow = randomCell%n==0?Math.floor(randomCell/n)-1:Math.floor(randomCell/n);
    var randomCellCol = randomCell%n==0?n-1:randomCell%n-1;
    // if(document.getElementById("cell"+randomCellRow+randomCellCol)){
    console.log("cell"+randomCellRow+randomCellCol);
    randomCellGlobal = "cell"+randomCellRow+randomCellCol;
    document.getElementById("cell"+randomCellRow+randomCellCol).classList.add("colorCell");
    // }
}

