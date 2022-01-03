//Ricardo Velasquez
//Boat Defender

//Start Class Button##########
class Button extends p5.Vector{
  constructor(x, y, str, strSize, clr1, clr2){
    super(x, y);
    this.w = width * 0.25;
    this.h = height * 0.15;
    this.name = str;
    this.nameSize = strSize;
    this.mouseOverButton = false;
    this.clr1 = clr1;
    this.clr2 = clr2;
    this.clr1Switch = clr2;
    this.clr2Switch = clr1;
  }

  run(){
    this.render();
    this.checkMouseOverButton();
  }

  render(){
    push();
    fill(this.clr1);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    pop();
    push();
    fill(this.clr2);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.nameSize);
    text(this.name, this.x + this.w / 2, this.y + this.h / 1.75);
    pop();
  }

  checkMouseOverButton(){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      this.mouseOverButton = true;
      this.clr1 = this.clr1Switch;
      this.clr2 = this.clr2Switch;
    } else{
      this.mouseOverButton = false;
      this.clr1 = this.clr2Switch;
      this.clr2 = this.clr1Switch;
    }
  }
}
//End Class Button##########
