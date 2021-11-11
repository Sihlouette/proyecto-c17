var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,gameoverImg;
//GameStates (estados del juego)
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImg = loadImage("gameOver.png");
 // endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Mover fondo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
gameOver=createSprite(200,200);
gameOver.addImage(gameoverImg);
//crear sprite de boy (niño) corriendo
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
    gameOver.visible = false;
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //incrementar treasureCollection por 50
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            //incrementar treasureCollection por 100
      treasureCollection=treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            //incrementar treasureCollection por 150
      treasureCollection=treasureCollection+150;

      

      drawSprites();
          }
    else{
      if(swordGroup.isTouching(boy)) {
       gameState = END;
       //Cambiar gameState a End
if(gameState===END){
  gameOver.visible = true;
        path.velocityY = 0;
        diamondsG.velocityX = 0;
        jwelleryG.velocityX = 0;
        swordGroup.velocityX =0;
        cashG.velocityX = 0;

}
//destruir todos los grupos
//setvelocityEach como 0 para todos los grupos
cashG.setVelocityXEach(0);
diamondsG.setVelocityXEach(0);
jwelleryG.setVelocityXEach(0);
swordGroup.setVelocityXEach(0);
    }

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesoros: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
