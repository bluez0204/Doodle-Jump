document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const doodler=document.createElement('div');
    let doodlerLeftSpace=50;
    let doodlerBottomSpace=150;
    let isGameOver=false;
    let platformCount=5;
    let platforms=[];
    let upTimerId;
    let downTimerId;

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace=platforms[0].left;
        doodler.style.left=doodlerLeftSpace+'px';
        doodler.style.bottom=doodlerBottomSpace+'px';
    }
    
    class Platform{
        constructor(newPlatformBottom){
            this.bottom=newPlatformBottom;
            // grid width - platform width
            this.left=Math.random()*315;
            this.visual=document.createElement('div');
            // storing this.visual in const visual variable because we have to add styling, which is done below 
            const visual=this.visual;
            visual.classList.add('platform');
            visual.style.left=this.left+'px';
            visual.style.bottom=this.bottom+'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms(){
        for(let i=0;i<platformCount;i++){
            // 600px is grid height
            let platformGap=600/platformCount;
            let newPlatformBottom=100+i*platformGap;
            let newPlatform=new Platform(newPlatformBottom);
            platforms.push(newPlatform);
            console.log(platforms);
        }
    }
    
    function movePlatforms(){
        // we want the platform to move only when doodler is above 200 px from bottom
        if(doodlerBottomSpace>200){
            platforms.forEach(platform=>{
                platform.bottom-=4;
                let visual=platform.visual;
                visual.style.bottom=platform.bottom+'px';

            })
        }
    }

    function jump(){
        upTimerId=setInterval(function(){
            doodlerBottomSpace+=20;
            doodler.style.bottom=doodlerBottomSpace+'px';
            if(doodlerBottomSpace>350){
                fall();
            }
        },30)
    }

    function fall(){
        clearInterval(upTimerId);
        downTimerId=setInterval(function(){
         doodlerBottomSpace-=5;
         doodler.style.bottom=doodlerBottomSpace+'px';   
         if(doodlerBottomSpace<=0){
             gameOver();
         }
        },30)
    }

    function gameOver(){
        console.log('game over');
        isGameOver=true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler(); 
            // moving platforms every 30 miliseconds
            setInterval(movePlatforms,30);
            jump();
        }
    }

    start();
})