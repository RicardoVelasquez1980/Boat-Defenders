//Ricardo Velasquez
//Boat Defender

//Start Class Ocean##########
class Ocean extends p5.Vector{
  constructor(){
    super(0, height - 85);//Location#####
    this.w = width;//Width#####
    this.h = height - (height - 85);//Height#####
  }

  run(){
    this.render();
  }

  render(){
    noStroke();
    fill(10, 112, 163);
    rect(this.x, this.y, this.w, this.h);
  }
}
//End Class Ocean##########

//Start Class Clouds##########
class Clouds extends p5.Vector{
  constructor(x, y, r){
    super(x, y);//Loaction#####
    this.vel = createVector(0.5, 0);//Velocity#####
    this.rad = r;//Radius of Cloud#####
    this.outOfBounds = false;//Not Out Of Bounds#####
  }

  run(){
    this.render();
    this.move();
    this.checkOutOfBounds();
  }

  render(){
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.rad);
  }

  move(){
    this.add(this.vel);
  }

  checkOutOfBounds(){
    if (this.x - this.rad > width){
      this.outOfBounds = true;
    }
  }
}
//End Class Clouds##########
