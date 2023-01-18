class CannonBall{
    constructor(x,y){
        var options = {
        isStatic:true 
        };
        this.r = 40;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");    
        this.trajectory = [];//this is creation of array to store the path of the ball
        World.add(world,this.body);
    }

    remove(index){
        Matter.Body.setVelocity(this.body,{x:0, y:0});
        setTimeout(()=>{
            Matter.World.remove(world,this.body)
            delete balls[index];
        },1000)
        }
    
  
  
  

    shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
       Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y});
    }
    display(){
        var angle = this.body.angle
        var pos = this.body.position;
        push();//used to implement property
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.r,this.r);
        pop();



        if(this.body.velocity.x > 0 && this.body.position.x>300){
        var position = [this.body.position.x, this.body.position.y]
        this.trajectory.push(position);//push is used to add value in the array

        }

        for (var i = 0; i< this.trajectory.length;i++){
            image(this.image, this.trajectory[i][0], this.trajectory[i][1],5,5)
        }
    }

}