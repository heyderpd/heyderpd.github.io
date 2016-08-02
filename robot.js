var HY_DINO = function() {
  this.Mode = this.getQuery();
  this.IS_AUTOMATO = false;
  this.fakeKey = {
    preventDefault : function(){},
    target  : null,
    type    : null,
    keyCode : null
  };
  this.Time = {
    Id       : null,
    CallBack : null
  };
  this.Pos = {
    Jump : null,
    Duck : null
  };
  this.Sprites = {
    ''               : 'offline-resources-normal',
    'velociraptor'   : 'offline-resources-velociraptor',
    'automatosaurus' : 'offline-resources-automatosaurus'
  };
  this.Runner = function(){};
  this.Out = {
    Canvas : null,
    Game   : null,
    tRex   : null
  };
};

HY_DINO.prototype.getSprite = function(){
  return this.Sprites[this.Mode];
};

HY_DINO.prototype.createRunning = function(Func){
  return function(){
    if (this.Mode == 'velociraptor' && (!this.Out.tRex.ducking || this.Out.tRex.status != 'DUCKING'))
      this.Out.tRex.setDuck(true);
    if(this.Out.Game.paused)
      this.Out.Game.play();
    var Obstacles = this.Out.Game.horizon.obstacles;
    for(var i=0; i<Obstacles.length; i++){
      if(Func(Obstacles[i]))
        return;
    }
  }
};

<<<<<<< HEAD
HY_DINO.prototype.RUN = function(Item){
  if(Item.processed == undefined){
    Item.processed = true;
    Item.collisionBoxes = [];
    return true;
  }
  return false;
};

HY_DINO.prototype.AUTO = function(Item){
  if(Item.processed === undefined){
    if(73 < Item.yPos && Item.yPos <= 75) {
      if(Item.xPos <= this.Pos.Duck)
        if(this.TryDuck())
          Item.processed = true;
    } else {
      if(Item.yPos > 75) //75 pitero hit!
        if(Item.xPos <= this.Pos.Jump)
          if(this.TryJump())
            Item.processed = true;
    }
    if(Item.processed === true)
      return true;
  }
  return false;
};

HY_DINO.prototype.pressKey = function(keyCode, Time = 250){
  if(this.Time.CallBack !== null){
    clearTimeout(this.Time.Id);
    this.Time.CallBack();
  }
  var e = this.fakeKey;
  e.keyCode = keyCode;
  this.Out.Game.onKeyDown(e);
  this.upKey(e, Time);
};

HY_DINO.prototype.upKey = function(EventKey, Time = 250){
  this.Time.CallBack = function(){ this.Out.Game.onKeyUp(EventKey) }.bind(this);
  this.Time.Id = setTimeout(function(){
    this.Time.CallBack();
    this.Time.CallBack = null;
  }.bind(this), Time);
};

HY_DINO.prototype.TryJump = function(){
  if(!this.Out.tRex.jumping){
    this.pressKey('38', 100);
    return true;
  }
  return false;
};

HY_DINO.prototype.TryDuck = function(){
  if(/*!this.Out.tRex.jumping &&*/ !this.Out.tRex.ducking){
    this.pressKey('40');
    return true;
  }
  return false;
};

HY_DINO.prototype.getQuery = function(){
  var query = window.location.href.split('?');
  return query.length == 2 ? query[1] : '';
};

HY_DINO.prototype.setGameMode = function(){
  switch(this.Mode) {
    case 'velociraptor':
      this.Out.Game.setSpeed( this.Out.Game.config['MAX_SPEED'] = this.Out.Game.config['SPEED'] = 100);
      var Func = this.RUN.bind(this);
      break;
    case 'automatosaurus':
      this.Out.Game.config['CLOUD_FREQUENCY'] = 0.7;
      this.Out.Game.config['GRAVITY'] = 0.7;
      this.Out.Game.config['INITIAL_JUMP_VELOCITY'] = 13;
      this.Out.Game.config['INVERT_FADE_DURATION'] = 7000;
      this.Out.Game.config['MAX_CLOUDS'] = 10;
      this.Out.Game.config['MAX_OBSTACLE_LENGTH'] = 4;
      this.Out.Game.config['MIN_JUMP_HEIGHT'] = 40;
      this.Out.Game.config['CLEAR_TIME'] = 1000;
      this.Out.Game.config['ACCELERATION'] = 0.005;
      this.Out.Game.config['MAX_SPEED'] = 20;
      var Func = this.AUTO.bind(this);
  }
  this.IS_AUTOMATO = true;

  if(this.Out.Game.paused)
    this.Out.Game.play()
  this.Out.Game.startGame();
  this.Out.Game.playIntro();
  this.Out.Game.play();

  return Func;
};

HY_DINO.prototype.setJumpLength = function(){
  if(this.Out.Canvas != undefined){
    var Speed = 1.05 -Math.pow(1.04 -(this.Out.Game.currentSpeed /20), 2);
    this.Pos.Jump = parseInt(this.Out.Canvas.width *0.38  *Speed);
    this.Pos.Duck = parseInt(this.Out.Canvas.width *0.13 *Speed);
    this.Pos.Jump = this.Pos.Jump < 150 ? 150 : this.Pos.Jump;
    this.Pos.Duck = this.Pos.Duck <  60 ?  60 : this.Pos.Duck;
    this.Runner();
    //console.log(this.Out.Game.currentSpeed, Speed, this.Pos);
  }
};

HY_DINO.prototype.start = function(){
  this.Out.Canvas = document.getElementsByClassName('runner-canvas')[0];  
  this.Out.Game = Runner.call();
  this.Out.tRex = this.Out.Game.tRex;
  this.setJumpLength();
  var Func = function(){};
  if(this.Mode != '')
    var Func = this.setGameMode().bind(this);
  this.Runner = this.createRunning(Func); //setInterval( this.createRunning(Func).bind(this), 1);
  console.log('Run lola!');
};

var HD = new HY_DINO();

function ChangeGame(Mode = ''){
  window.location.href ='./index.html?'+Mode;
};

document.onreadystatechange = function() {
=======
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
>>>>>>> origin/master
  if (document.readyState === 'complete') {
    HD.start();
  }
};