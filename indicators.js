//Ricardo Velasquez
//Boat Defender

//Start Class HealthIndicator##########
class HealthIndicator extends p5.Vector{
  constructor(){
    super(5, height - 20);//Creates Vector#####
    this.indicate = boat.health;//Takes In Total Health Of Boat#####
    this.h = 15;//Height#####
    this.w = 25;//Width#####
  }

  run(){
    this.indicatorUpdate();
  }

  indicatorUpdate(){
    this.indicate = boat.health;//Takes In Total Health Of Boat#####
    this.indicatorRender(this.indicate);//Renders The Indicator With Current Boat Health#####

    if (this.indicate <= 0){//TEMPORARY%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      //Stops Game From Running When Dead#####
      noLoop();
    }

  }

  indicatorRender(indicate){
    for (let i = 0; i < indicate; i++){
      strokeWeight(3);
      stroke(260, 85, 85);
      fill(170, 20, 20);
      rect(this.x + (this.w * i), this.y, this.w, this.h)
    }
  }
}
//End Class HealthIndicator##########
