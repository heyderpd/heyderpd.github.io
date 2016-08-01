function createRunning(Func){
    return function() {
        if (Mode == 'velociraptor' && (!tRex.ducking || tRex.status != 'DUCKING'))
            tRex.setDuck(true);
        if(Game.paused)
            Game.play();
        var Obstacles = Game.horizon.obstacles;
        if(Obstacles.length)
            Func(Obstacles[0]);
        return;

        for(var i=0; i<Obstacles.length; i++){
            if(Func(Obstacles[i]))
                return;
        }
    }
}

function RUN(Item){
    if(Item.processed == undefined){
        Item.processed = true;
        Item.collisionBoxes = [];
        return true;
    }
    return false;
}

function AUTO(Item){
    //if(Item.processed == undefined){
        if(73 < Item.yPos && Item.yPos <= 75) {
            if(Item.xPos <= Position.Duck)
                if(TryDuck())
                    Item.processed = true;
        } else {
            if(Item.yPos > 75) { //75 pitero hit!
                if(Item.xPos <= Position.Jump) {
                    if(TryJump())
                        Item.processed = true;
                    return true;
                }
            }
        }
    //}
    return false;
}

function pressKey(keyCode, Time = 250){
    var e = fakeKey;
    e.keyCode = keyCode;
    Game.onKeyDown(e);
    setTimeout(function(){Game.onKeyUp(e);}, Time);
}

function TryJump(){
    if(!tRex.jumping){
        pressKey('38', 100);
        return true;
    }
    return false;
}

function TryDuck(){
    if(!tRex.jumping){
        pressKey('40');
        return true;
    }
    return false;
}

function getQuery(){
    var query = window.location.href.split('?');
    var query = query.length == 2 ? query[1] : '';
    return query;
}

function setGameMode(){
    switch(Mode) {
        case 'velociraptor':
            Game.setSpeed( Game.config['MAX_SPEED'] = Game.config['SPEED'] = 50);
            var Func = RUN;
            break;
        case 'autonosaurus':
            Game.config['CLOUD_FREQUENCY'] = 0.7;
            Game.config['GRAVITY'] = 0.7;
            Game.config['INITIAL_JUMP_VELOCITY'] = 13;
            Game.config['INVERT_FADE_DURATION'] = 7000;
            Game.config['MAX_CLOUDS'] = 10;
            Game.config['MAX_OBSTACLE_LENGTH'] = 4;
            Game.config['MIN_JUMP_HEIGHT'] = 40;
            Game.config['CLEAR_TIME'] = 1000;
            Game.config['ACCELERATION'] = 0.005;
            Game.config['MAX_SPEED'] = 20;
            var Func = AUTO;
    }
    IS_AUTOMATO = true;

    if(Game.paused)
        Game.play()
    Game.startGame();
    Game.playIntro();
    Game.play();

    return Func;
}

function setJumpLength(){
    if(Canvas != undefined){
        var Speed = 1 -Math.pow(1 -(Game.currentSpeed /20), 2);
        Position.Jump = parseInt(Canvas.width *0.4  *Speed);
        Position.Duck = parseInt(Canvas.width *0.13 *Speed);
        Position.Jump = Position.Jump < 110 ? 110 : Position.Jump;
        Position.Duck = Position.Duck <  60 ?  60 : Position.Duck;
        //console.log(Game.currentSpeed, Speed, Position);
    }
}

function start(){
    Canvas = document.getElementsByClassName('runner-canvas')[0];    
    Game = Runner.call();
    tRex = Game.tRex;
    Obstacles = Game.horizon.obstacles;
    setJumpLength();

    var Func = function(){};
    if(Mode != '')
        var Func = setGameMode()

    setInterval( createRunning(Func), 1);
    console.log('Run lola!');
}

var fakeKey = {
    target : null,
    type : null,
    preventDefault : function(){},
    keyCode : null
}

var IS_AUTOMATO = false;
var Canvas = null;
var Position = {'Jump' : null, 'Duck' : null};
var Mode = getQuery();
var Game = null;
var tRex = null;
var Obstacles = null;
var Sprites = {
    ''             : 'offline-resources-normal',
    'velociraptor' : 'offline-resources-velociraptor',
    'autonosaurus' : 'offline-resources-autonosaurus'
}

function changeGame(Mode = ''){
    window.location.href ='./index.html?'+Mode;
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    start();
  }
};