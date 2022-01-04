//Ricardo Velasquez
//Boat Defender

//Start Class Alien##########
class Alien extends p5.Vector{
  constructor() {
    super(random(width), random(height * 0.25)); //First Set Position#####
    this.vel = p5.Vector.random2D(random(2, 4), random(2, 4)); //First Set Velocity#####
    this.acc = createVector(0.01, 0.01); //First Set Acceleration#####
    this.clr = color(48, 9, 69); //Purple Color#####
    this.topX = this.x; //Top X Position#####
    this.topY = this.y; //Top Y Position#####
    this.bottomX = this.x;//Bottom X Position#####
    this.bottomY = this.y + 20;//Bottom Y Position#####
    this.angle = atan2(boat.x - this.topX, boat.y - (this.topY + 10));//Angle#####
    this.fireRate = 150;
  }

  run() {
    this.render();
    this.move();
    this.tp(); //Temporary%%%%%%%%%%%%%%%%%%%%%%%%%%%
  }

  render() {
    push();
    fill(this.clr);
    stroke(107, 67, 142); //Light Purple#####
    strokeWeight(2);
    this.topX = this.x;//Top X Position#####
    this.topY = this.y;//Top Y Position#####
    this.bottomX = this.x;//Bottom X Position#####
    this.bottomY = this.y + 20;//Bottom Y Position#####
    let leftX = this.bottomX - 15;//Left X Position#####
    let leftY = this.bottomY;//Left Y Position#####
    let rightX = this.bottomX + 15;//Right X Position#####
    let rightY = this.bottomY;//Left Y Position#####
    triangle(
      this.topX,
      this.topY,
      leftX,
      leftY,
      rightX,
      rightY
    );
    pop();

    this.angle = atan2(boat.y - (this.topY + 10), boat.x - this.topX);//Angle#####

    push();
    translate(this.topX, this.topY + 10);
    rotate(this.angle);
    // line(0, 0, 15, 0);
    pop();

    this.fireRate--;
  }

  move() {
    this.acc = createVector(random(-0.45, 0.45), random(-0.45, 0.45));//Change of Acceleration#####
    this.vel.limit(4);//Velocity Limited to 6#####
    this.vel.add(this.acc);//Change of Velocity#####
    this.add(this.vel);//Change of Position#####
  }

  tp() {//Temporary%%%%%%%%%%%%%%%%%%%
    if (this.x > width) {
      this.x = 10;
    } else if (this.x < 0){
      this.x = width - 10;
    }
    
    if (this.y < 0) {
      this.y = height - 10;
    } else if (this.y > height){
      this.y = 10;
    }
  }
}
//End Class Alien##########
