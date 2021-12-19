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
