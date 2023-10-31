
const playBoard = document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const HighScoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");

let foodX = 13, foodY = 10;
let headX=12 , headY=15;
let snakeBody=[];
let velocityX=0,velocityY=0;
let gameOver=false;
let setIntervalId;
let score=0;

let highScore=localStorage.getItem("high-score")||0;
HighScoreElement.innerText=`High Score:${highScore}`;


const changFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;

}
const handleGameOver=()=>{
    //clearing he timer and reloading the page on the game over
    clearInterval(setIntervalId);
    alert("Game over! please replay");
    location.reload();
}

const changeDirection=(e)=>{
    if(e.key==="ArrowUp" && velocityY!==1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key==="ArrowDown" && velocityY!==-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key==="ArrowLeft" && velocityX!==1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key==="ArrowRight" && velocityX!==-1){
        velocityX=1;
        velocityY=0;
    }
  
}
controls.forEach(key => {
    // Calling changeDirection on each key click and passing key dataset value as an object
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})


const initGame = () => {
    if(gameOver)
    {
       handleGameOver();
    }
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
  
    //to check if snake hit the food
    if(headX===foodX && headY===foodY){
        changFoodPosition();
        snakeBody.push([foodX,foodY]);//pushing food position inside snake body array
        score++;
        highScore=score>=highScore ? score:highScore;
        localStorage.setItem("high-score",highScore);
        HighScoreElement.innerText=`High Score:${highScore}`;
        scoreElement.innerText=`Score: ${score}`;

    }

    for(let i=snakeBody.length-1;i>0;i--){
        //shifting forward the values of the element in the snake body by one
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[headX,headY];//setting first element of the snake body to current snake position


    headX += velocityX;
    headY += velocityY;

    if( headX<=0 || headX>30 || headY<=0 || headY>30){
        gameOver=true;

    }


    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      //checking if the snake heat hit the body , if so set gameover to true
        if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
                gameOver=true;
        }
    }


 
    playBoard.innerHTML = htmlMarkup; // Append the food element to the play-board div
    
}


changFoodPosition();
setIntervalId=setInterval(initGame,120);


document.addEventListener("keydown",changeDirection);