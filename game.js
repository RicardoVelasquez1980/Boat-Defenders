//Ricardo Velasquez
//Boat Defender

//Global Variable#####
let aliens, boat,  boatBullets, alienBullets;
let ocean;
let healthIndicator;

function setup() {
  let cnv = createCanvas(windowWidth - 20, windowHeight - 60);
  cnv.position((windowWidth - width) / 2, 30);
  cursor(CROSS);//Set Cursor to Cross#####
  ocean = new Ocean();
  aliens = [];
  boatBullets = [];
  alienBullets = [];
  boat = new Boat(width / 2, height - 100);//Boat Made#####
  loadAliens(5);//Function That Creates Starting Aliens#####
  healthIndicator = new HealthIndicator();//Health Indicator Made#####

  // frameRate(7.5);

}

function draw() {
  background(144, 214, 249);
  ocean.run();

  alienBulletCreation();
  runBullets();//Runs Bullets#####
  boat.run();//Runs Boat#####
  boatDamaged();//Function That Checks If Boat Has Been Hit#####
  healthIndicator.run();//Runs Health Indicator#####
  runAliens();//Function That Runs All Aliens#####
  alienKilled();//Function That Deletes Alien If Killed#####
  bulletDeletion();//Function That Deletes Bullets When Needed#####


  if (aliens.length === 0){//TEMP%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    loadAliens(5);
  }
}

function mousePressed(){
  boatBullets.push(new BoatBullet(boat.x, boat.y, boat.angle));//Make New Player Bullet#####
}

//Start Function loadAliens##########
function loadAliens(n){
  for (let i= 0; i < n; i++){
    aliens.push(new Alien());//Spawn New Aliens#####
  }
}
//End Function loadAliens##########

//Start Function runAliens##########
function runAliens(){
  for (let i = 0; i < aliens.length; i++){
    aliens[i].run();
  }
}
//End Function runAliens##########

//Start Function boatDamaged#####
function boatDamaged(){
  //Collistion Damage#####
  for (let i = 0; i < aliens.length; i++){
    if (aliens[i].bottomY > boat.y && aliens[i].topY < boat.y + 25 && aliens[i].bottomX - 15 > boat.x - 45 && aliens[i].bottomX < boat.x + 45){
      boat.health--;//Boat Health Decreased#####
      aliens.splice(i, 1);//Alien Removed But Wont Go Towards Players Score#####
    }
  }

  //Bullet Damage#####
}
//End Function boatDamaged#####

//Start Function alienBulletCreation##########
function alienBulletCreation(){
  for (let i = 0; i < aliens.length; i++){
    if (!aliens[i].fireRate){
      alienBullets.push(new  AlienBullet(aliens[i].topX, aliens[i].topY + 10, aliens[i].angle));
      aliens[i].fireRate = 150;
    }
  }
}
//End Function alienBulletCreation##########

//Start Function runBullets#####
function runBullets(){
  for (let i = 0; i < boatBullets.length; i++){
    boatBullets[i].run();
  }
  for (let i = 0; i < alienBullets.length; i++){
    alienBullets[i].run();
  }
}
//End Function runBullets#####

//Start Function bulletDeletion##########
function bulletDeletion(){
  for (let i = 0; i < boatBullets.length; i++){
    if (boatBullets[i].detection || boatBullets[i].outOfBounds){
      boatBullets.splice(i, 1);//Gets Rid Of Bullet#####
    }
  }
  for (let i = 0; i < alienBullets.length; i++){
    if (alienBullets[i].detection || alienBullets[i].outOfBounds){
      alienBullets.splice(i, 1);//Gets Rid Of Bullet#####
    }
  }
}
//End Function bulletDeletion##########

//Start Function alienKilled#####
function alienKilled(){
  for (let i = 0; i < boatBullets.length; i++){
    for (let j = 0; j < aliens.length; j++){
      if (boatBullets[i].detection && boatBullets[i].alienHit === aliens[j]){
      aliens.splice(j, 1);//Alien Is Removed#####
    }
    }
  }
}
//End Function alienKilled#####
