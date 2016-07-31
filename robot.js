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
        if(Item.yPos <= 75 && Item.yPos > 70) {
            if(Item.xPos <= Position.Duck)
                if(TryDuck())
                    Item.processed = true;
        } else {
            if(Item.yPos > 75) { //75 pitero medio
                if(Item.xPos <= Position.Jump) { //350 300, 200 170 160 130 120 100
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
        //console.log('Jump!');
        //tRex.startJump(true);
        pressKey('38', 100);
        return true;
    }
    //console.log('Can\'t Jump!');
    return false;
}

function TryDuck(){
    console.log(tRex);
    if(!tRex.jumping){
        console.log('Duck!');
        pressKey('40');
        //tRex.setDuck(true);
        return true;
    }
    console.log('Can\'t Duck!');
    return false;
}

function getQuery(){
    var query = window.location.href.split('?');
    var query = query.length == 2 ? query[1] : '';
    return query;
}

function setGameMode(){
    /* start game */
    if(Game.paused)
        Game.play()
    //new Runner('.interstitial-wrapper');
    Game.startGame();
    Game.playIntro();
    Game.play();

    switch(Mode) {
        case 'velociraptor':
            Game.setSpeed( Game.config['MAX_SPEED'] = Game.config['SPEED'] = 50);
            var Func = RUN;
            break;
        case 'autonosaurus':
            Game.setSpeed( Game.config['MAX_SPEED'] = Game.config['SPEED'] = 13);
            var Func = AUTO;
        /*default:
            var Func = function(){};*/
    }
    //setKeyCodes(false);
    return Func;
}

function setKeyCodes(Active){
    Runner.keycodes = {
        JUMP: {'38': Active, '32': Active}, DUCK: {'40': Active},  RESTART: {'13': Active}
    };
}

function setJumpLength(){
    Canvas = document.getElementsByClassName('runner-canvas')[0];
    Position.Jump = parseInt(Canvas.width *0.4);
    Position.Duck = parseInt(Canvas.width *0.11);
    console.log('setJumpLength', Canvas.width, JumpLength);
}

function start(){
    Canvas = document.getElementsByClassName('runner-canvas')[0];
    Game = Runner.call();
    tRex = Game.tRex;
    Obstacles = Game.horizon.obstacles;

    var Func = function(){};
    if(Mode != '')
        var Func = setGameMode()

    /* start macro */
    setInterval( createRunning(Func), 1);
    console.log('Run lola!');
}

var fakeKey = {
    target : null,
    type : null,
    preventDefault : function(){},
    keyCode : null
}

var Canvas      = null;
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

/* onready */
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    start();
  }
};