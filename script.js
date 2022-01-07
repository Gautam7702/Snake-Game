const canvas  = document.getElementById('game_screen');
const ctx = canvas.getContext('2d');
let snake = [];
var score =0;
let foodX,foodY;
let foodEaten=1;
document.addEventListener("keydown",PressKey);
function PressKey(e)
    {
        if(e.key  == 'ArrowUp'&&(snake[0].dy!= 20))
            moveUp();
        if(e.key == 'ArrowDown'&&(snake[0].dy!= -20))
            moveDown();
        if(e.key == 'ArrowLeft'&&(snake[0].dx!= 20))
            moveLeft();
        if(e.key == 'ArrowRight'&&(snake[0].dx!= -20))
            moveRight();
    }
function moveDown(){
    snake[0].dx  = 0;
    snake[0].dy  = 20;
}
function moveUp(){
    snake[0].dx  = 0;
    snake[0].dy  = -20;
}
function moveLeft(){
    snake[0]. dx  = -20;
    snake[0]. dy  = 0;
}
function moveRight(){
    snake[0].dx  = 20;
    snake[0].dy  = 0;
}

let id;

function move(){
    id = setInterval(draw,50);
}

function updateDir(){
    head = snake[0];
    if((head.x+ head.dx)>=500)
        {   
            head.x = -10;
        }
    if(head.x+head.dx<=0)
        {
            head.x  = 510;
        }
    if((head.y+head.dy)>=500)
        {   
            head.y = -10;
        }
    if(head.y+head.dy<=0)
        {
            head.y = 510;        
        }
}

function drawScore(){
    ctx.clearRect(0,500,500,100);
    ctx.beginPath();
    ctx.rect(0,500,500,100);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 210, 550);
    ctx.closePath();
}

function detectCollision(head)
    {
        for(let i=1;i<snake.length;i++)
            {
                if(snake[i].x==head.x && snake[i].y == head.y){
                    clearInterval(id);
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText("Game Over!", 200, 570);
                }
            }
    }

function createFood(){
    let curPlace = 0;
    while(curPlace!=1)
    {
        foodX = 10 +20*Math.floor((Math.random()*25));
        foodY = 10 + 20*Math.floor((Math.random() *25));
        curPlace = 1;        
        for(let i=0;i<snake.length;i++)
            {
                if(foodX==snake[i].x&&foodY==snake[i].y)
                    {
                        curPlace =0;
                    }
                if(foodX==(snake[0].x+snake[0].dx)&&foodY==(snake[0].y+snake[0].dy))
                    {
                        curPlace =0;
                    }
            }
        
    }
    ctx.beginPath();
    ctx.arc(foodX,foodY,10,0,Math.PI*2); 
    ctx.fillStyle = "brown";
    foodEaten = 0;
    ctx.fill();
    ctx.closePath();

}
function drawSnake(){

    for(let i=0;i<snake.length;i++)
    {
        ctx.beginPath();
        ctx.arc(snake[i].x,snake[i].y,10,0,Math.PI*2);
        if(i==0)
            ctx.fillStyle = "#4F7942"
        else
            ctx.fillStyle = "#228B22";
        ctx.fill();
        ctx.closePath();
    }
}
function draw(){
    drawScore();
    if(foodEaten==1)
        {
            createFood();
        }
    const prevTail = snake[snake.length-1];
    ctx.clearRect(prevTail.x-10, prevTail.y-10, 20, 20);
    for(let i =snake.length-1;i>0;i--)
        {
            snake[i] = Object.assign({}, snake[i-1]);
        }
    updateDir();
    const head = snake[0];
    head.x = head.x + head.dx;
    head.y = head.y + head.dy;
    detectCollision(head);
    if(head.x == foodX && head.y == foodY)
        {
            ctx.clearRect(foodX-10, foodY-10, 20, 20);
            const bit = {
                x :foodX,
                y :foodX,
                dx :head.dx,
                dy : head.dy, 
            };  
            foodEaten  = 1;
            score = score +1;
            snake.unshift(bit);
        }
    snake[0] = Object.assign({}, head);     
    drawSnake();    
}

function newgame(){
    const bit = {
        x :-10,
        y :10,
        dx :20,
        dy : 0, 
    };
    snake.push(bit);
    foodEaten = 1;
    move();
}

newgame();