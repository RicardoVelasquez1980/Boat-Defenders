//Ricardo Velasquez
//Boat Defender

//Start Class Boat##########
class Boat extends p5.Vector{
  constructor(x, y){
    super(x, y);//Starting Location of the Boat#####
    this.vel = createVector(0, 0);//Starting Velocity of the Boat#####
    this.acc = createVector(0.3, 0);//Acceleration of the Boat#####
    this.health = 3;//Health of the Boat; Used in a Seperate Function not in the Class#####
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    this.fireRate = 45;
    this.reloaded = false;
  }

  run(){
    this.moveTurret();
    this.render();
    this.moveBoat();
    this.checkEdge();
    this.reload();
  }

  render(){
    push();
    noStroke();
    fill(79, 89, 115);
    arc(this.x, this.y, 90, 50, 0, PI, CHORD);//Boat#####
    pop();
  }

  moveBoat(){
    this.vel.limit(4.5);
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){//If A or Left Arrow is Pressed Move to the Left#####
      this.vel.add(this.acc);
      this.sub(this.vel);
    } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){//If D or Right Arrow is Pressed Move to the Right#####
      this.vel.add(this.acc);
      this.add(this.vel);
    } else{
      this.vel.x = 0;//If Neither Key is Pressed Remain Still#####
    }
  }

  moveTurret(){
    this.angle = atan2(mouseY - this.y, mouseX - this.x);//Angle#####
    if (this.angle > HALF_PI){//Prevents Turret From Going Under Boat#####
      this.angle = PI;
    } else if (this.angle > 0){
      this.angle = 0;
    }
    push();
    translate(this.x, this.y + 5);//Origin is Now At the Center of the Arc#####
    rotate(this.angle);//Rotate to Angle#####
    stroke(99, 109, 135);
    strokeWeight(15);
    line(0, 0, 45, 0);
    pop();
  }

  checkEdge(){
    if (this.x + 45 > width){
      this.x = width - 45;//Width Minus the Radius#####
    } else if (this.x - 45 < 0){
      this.x = 45;//A Radius Away From 0#####
    }
  }

  reload(){
    this.fireRate--;
    if (this.fireRate > 0){
      this.reloaded = false;
    } else if (this.fireRate < 0){
      this.reloaded = true;
    }
  }
}
//End Class Boat##########
