/* v3 and v4 run low */
function createRunning(Func){
    return function() {
        if (Mode == 'RUN' && (!tRex.ducking || tRex.status != 'DUCKING'))
            tRex.setDuck(true);
        if(Game.paused)
            Game.play();
        var Obstacles = Game.horizon.obstacles;
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
    if(Item.processed == undefined){
        if(Item.yPos >= 75)
            if(Item.xPos <= 300) //350 300, 200 170 160 130 120 100
                if(TryJump()) {
                    Item.processed = true;
                    return true;
                }
        else
            Item.processed = true;
    }
    return false;
}

function TryJump(){
    for (var j=0; j<100; j++) {
        if(Jump())
            return true;
    };
    return false;
}

function Jump(){
    if(!tRex.jumping){
        console.log('Jump!');
        tRex.startJump(true);
        return true;
    }
    console.log('Can\'t Jump!');
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
            Mode = 'RUN';
            Game.setSpeed( Game.config['MAX_SPEED'] = Game.config['SPEED'] = 50);
            var Func = RUN;
            break;
        case 'autonosaurus':
            Mode = 'AUTO';
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

function start(){
    Game = Runner.call();
    tRex = Game.tRex;
    Obstacles = Game.horizon.obstacles;
    Mode = getQuery();

    var Func = function(){};
    if(Mode != '')
        var Func = setGameMode()

    /* start macro */
    setInterval( createRunning(Func), 1);
    console.log('Run lola!');
}

var Mode = null;
var Game = null;
var tRex = null;
var Obstacles = null;


function gameNormal(){
    window.location.href ='./index.html?';
}

function gameVelociraptor(){
    window.location.href = './index.html?velociraptor';
}

function gameAutonosaurus(){
    window.location.href = './index.html?autonosaurus';
}

/* onready */
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    start();
  }
};
