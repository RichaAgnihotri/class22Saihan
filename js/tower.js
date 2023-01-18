class Tower{
    constructor(x,y,w,h){
    var options ={
        isStatic:true
    };
    this.image = loadImage("./assets/tower.png")
    this.w = w
    this.h = h
    this.body = Bodies.rectangle(x,y,this.w,this.h,options);
    World.add(world,this.body);
    }
    display(){
        var pos = this.body.position
        var angle = this.body.angle;
        push();//apply properties
        translate(pos.x,pos.y);//change position
        rotate(angle);//chang angle
        imageMode(CENTER);//should be created from the center
        image(this.image,0,0,this.w,this.h);//display image
        pop();//reset properties
    }

}