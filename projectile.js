//Ricardo Velasquez
//Boat Defender

//Start Class Bullet##########
class Projectile extends p5.Vector{
  constructor(x, y, angle){
    super(x, y);//Takes In Boat Turrent Position#####
    this.vel = p5.Vector.fromAngle(angle);//Makes A 2D Vector From An Angle#####
    // this.acc = createVector();
    this.angle = angle;//Takes In Boat Turret Position#####
  }

  run(){
    this.render();
    this.move();
  }

  render(){
    push();
    translate(this.x, this.y);
    stroke(0);
    strokeWeight(5);
    rotate(this.angle);
    point(45, 0);
    pop();
  }

  move(){
    this.vel.limit(10);//Velocity Of Bullet Limited#####
    this.vel.mult(3);//Velocity Of Bullet Multiplied#####
    this.add(this.vel);//Bullet Position Changed#####
  }
}
//End Class Bullet##########

//Start Class BoatBullet##########
class BoatBullet extends Projectile{//Copies Projectile Class Along With Its p5.Vector Iheritance#####
  constructor(x, y, angle){
    super(x, y, angle);//Uses Constructor Parameters In The Super(Projectile) Class#####
    this.detection = false;//Bullet Hasnt Been Detected Once First Made#####
    this.alienHit = aliens;//Used To Identify Which Alien Has Been Hit#####
    this.outOfBounds = false;//Bullet Hasnt Been Detected outOfBounds Once First Made#####
  }

  run(){//This Overwrites The Super(Projectile) Class Run Function#####
    super.render();
    super.move();
    this.checkDetection();
    this.checkInBounds();
  }

  checkDetection(){
    for (let i = 0; i < aliens.length; i++){
      let distance = round(dist(this.x, this.y, aliens[i].x, aliens[i].y), 1);//Distance Of Alien And Bullet Calculated#####
      if (distance < 30){
        this.detection = true;//Detection Becomes True#####
        this.alienHit = aliens[i];//Specifies Which Alien Has Been Hit#####
      }
    }
  }

  checkInBounds(){
    if (this.x < 0 || this.x > width || this.y < 0){//If Bullet Doesnt Hit A Bullet But Goes Out Of The Screen Then outOfBounds Becomes True#####
      this.outOfBounds = true;
    }
  }
}
//End Class BoatBullet##########

//Start Class AlienBullet##########
class AlienBullet extends Projectile{
  constructor(x, y, angle){
    super(x, y, angle);
    this.detection = false;
    this.outOfBounds = false;
  }
  run(){
    super.move();
    this.render();
    // this.checkDetection();
    this.checkInBounds();
  }

  render(){
    push();
    translate(this.x, this.y);
    rotate(super.angle);
    stroke(0);
    strokeWeight(5);
    line(0, 0, 0, 7.5);
    pop();
  }

  checkInBounds(){
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height){//If Bullet Doesnt Hit A Bullet But Goes Out Of The Screen Then outOfBounds Becomes True#####
      this.outOfBounds = true;
    }
  }
}
//End Class AlienBullet##########
