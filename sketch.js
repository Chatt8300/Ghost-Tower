var tower, towerImage;
var door, doorImage;
var climber, climberImage;
var ghost, ghostImage;
var doorsGroup, climbersGroup;
var play;
var end;
var gameState = "play"
function preload(){
  towerImage = loadImage("tower.png")
  ghostImage = loadImage("ghost-standing.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  
}

function setup(){
  createCanvas(600, 600)
  tower = createSprite(300, 300, 10, 10)
  tower.addImage(towerImage)
  tower.velocityY = 2
  
  ghost = createSprite(300, 350)
  ghost.addImage(ghostImage)
  ghost.scale = 0.35
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  
}

function draw(){
  background("lime")
  
  if(tower.y >400){
    tower.y = 300
  }
  if(gameState === "play"){
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY + 0.8
  
  if (keyDown("left")){
    ghost.x = ghost.x-3
  }
  if (keyDown("right")){
    ghost.x = ghost.x+3
  }
    
  if(ghost.y >600){
    gameState = "end"
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
    gameState = "end"
  }
   spawnDoors()
  
  drawSprites()
  }
  if (gameState === "end"){
    textFont("fantasy")
    textSize(35)
    fill("red")
    stroke("red")
    text("GAME OVER", 250, 300)
  }
}

function spawnDoors(){
  if(frameCount%240 === 0){
  door = createSprite(Math.round(random(200, 500)), 0)
  door.velocityY = 2
  door.addImage(doorImage)
  door.lifetime = 300
  doorsGroup.add(door)
    
    
  climber = createSprite(door.x, door.y+50)
  climber.addImage(climberImage)
  climber.velocityY = 2
  climber.lifetime = 300
  climbersGroup.add(climber)
  
  ghost.depth = door.depth
  ghost.depth += 1
  }
  
  
}