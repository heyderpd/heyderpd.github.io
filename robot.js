/* v 4 run low */
function Running(){
    if (!Runner.call().tRex.ducking || Runner.call().tRex.status != 'DUCKING')
        Runner.call().tRex.setDuck(true);
    if(Runner.call().paused)
        Runner.call().play();
    for(var i=0; i<Runner.call().horizon.obstacles.length; i++){
        if(Runner.call().horizon.obstacles[i].processed == undefined){
            Runner.call().horizon.obstacles[i].processed = true;
            Runner.call().horizon.obstacles[i].collisionBoxes = [];
            return;
        }
        return;
    }
}
function start(){
    /* start game */
    if(Runner.call().paused)
        Runner.call().play()
    //new Runner('.interstitial-wrapper');
    Runner.call().startGame();
    Runner.call().playIntro();
    Runner.call().play();
    //Runner.call().restart();

    /* set speed */
    Runner.call().config['SPEEDD'] = 50;
    Runner.call().config['MAX_SPEED'] = 50;
    Runner.call().setSpeed(50); //16

    /* start macro */
    setInterval(Running, 1);
    console.log('Run lola!');
}
/* onready */
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    start();
  }
};