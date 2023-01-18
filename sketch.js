const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas,angle,tower,ground,cannon,cannonBall;
var balls = [];//to store multiple cannon balls
var boats =[];//array to store multiple boats
var backgroundImg


function preload() {
 backgroundImg = loadImage("./assets/background.gif")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world
  angleMode(DEGREES);
  angle = 15
  tower = new Tower(150,350,160,310);//CREATION of object
  cannon = new Cannon(150,110,100,50,angle);
 // cannonBall = new CannonBall(cannon.x,cannon.y);
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 
}

function draw() {
  background(189);
  image(backgroundImg,0,0,width,height);
  Engine.update(engine);
 

for (var i = 0; i < balls.length; i ++){
  showCannonBalls (balls[i],i)
  collisionwithBoat(i);
}
  rect(ground.position.x, ground.position.y,width*2,1);

  showBoats();
  tower.display();//DISPLAY the object
  cannon.display();
  //cannonBall.display();
 
  
   
}

function keyPressed(){
  var cannonBall = new CannonBall(cannon.x,cannon.y);
  if(keyCode === DOWN_ARROW){
  (cannon.x,cannon.y);
  balls.push(cannonBall);
}
}
// function to show  the ball
function  showCannonBalls(ball,index){
  if (ball){
  ball.display();
  if ( ball.body.position.x >= width || ball.body.position.y >= height - 50){
ball.remove(index);
  }
}
}




//length is size of array
function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
      } 
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}
// to shoot the cannon balls
function keyReleased (){
  if (keyCode === DOWN_ARROW){
   balls[balls.length - 1].shoot();
  }
}
//index is position of the element in an array
function collisionwithBoat(index){
  for(var i = 0; i < boats.length; i++){
    if(balls[index]!==undefined  && boats[i]!==undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)
      if(collision.collided){
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}




