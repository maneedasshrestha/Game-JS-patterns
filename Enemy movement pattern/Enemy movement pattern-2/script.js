/**@type {HTMLCanvasElement}*/
const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
CANVAS_WIDTH=canvas.width=500;
CANVAS_HEIGHT=canvas.height=1000;
const numberofEnemies=18;
const enemiesArray=[];
let gameFrame=0;

class Enemy{
    constructor(){
        this.image=new Image()
        this.image.src='enemies/enemy2.png';
        this.speed=Math.random()*4+1;//random number between -2 and 2
        this.spriteWidth=266;
        this.spriteHeight=188;
        this.width=this.spriteWidth/2.5;
        this.x=Math.random()*(canvas.width-this.width);
        this.height=this.spriteHeight/2.5;
        this.y=Math.random()*(canvas.height-this.height);
        this.frame=0;
        this.flapSpeed=Math.floor(Math.random()*3+1);
        this.angle=Math.random()*2;
        this.angleSpeed=Math.random()*0.2;
        this.curve=Math.random()*7;
    }
    update(){
        this.x-=this.speed;
        this.y+=this.curve*Math.sin(this.angle);
        this.angle+=this.angleSpeed;
        if(this.x<0-this.width){
            this.x=canvas.width;
            this.y=Math.random()*(canvas.height-this.height);
            this.speed=Math.random()*4+1;
        }
        // this.y+=Math.random()*5-2.5;
        //animate sprites
        if(gameFrame%this.flapSpeed===0){
            this.frame>4?this.frame=0:this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width,this.height);
    }
}

for(let i=0;i<numberofEnemies;i++){
    enemiesArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    enemiesArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();