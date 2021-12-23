//Ricardo Velasquez
//Boat Defender

//Global Variable#####
let aliens = [], boat, boatBullets = [], alienBullets = [];
let ocean, clouds;
let healthIndicator, scoreIndicator;
/*
gameState -1 = ASKS FOR IMAGES OR NO IMAGES
IF IMAGES THEN AN ALERT IS GIVEN TO MAKE SURE YOUR USING THE SERVER
THIS WILL BE NON EXISTANT WHEN PUBLISHED TO A WEBSITE


gameState 0 = Intro Screen
gameState 1 = Playing Game
gameState 2 = End/Losing Screen
gameState 3 = Settings
gameState 4 = Instructions

ADD OTHER GAMESTATES WHEN NEEDED
*/
let gameState = -1;

function setup() {
  let cnv = createCanvas(windowWidth - 20, windowHeight - 60);
  cnv.position((windowWidth - width) / 2, 30);
  cursor(CROSS);//Set Cursor to Cross#####
  ocean = new Ocean();
  boat = new Boat(width / 2, height - 100);//Boat Made#####
  loadAliens(3);//Function That Creates Starting Aliens#####
  healthIndicator = new HealthIndicator();//Health Indicator Made#####
  scoreIndicator = new ScoreIndicator();//Score Indicator Made#####

  // frameRate(7.5);

}

function draw() {
  gameRun();
}

function mousePressed(){
  if (boat.reloaded){
    boatBullets.push(new BoatBullet(boat.x, boat.y, boat.angle));//Make New Player Bullet#####
    boat.fireRate = 45;
  }
}

function keyPressed(){
  // console.log(char(keyCode) + " " + keyCode);
  if (keyCode === 32 && boat.reloaded){//If Space bar is Pressed Create A Bullet#####
    boatBullets.push(new BoatBullet(boat.x, boat.y, boat.angle));//Make New Player Bullet#####
    boat.fireRate = 45;
  }
}

//Start Function gameRun##########
function gameRun(){
  if (gameState === -1){
    background(0);
  } else if (gameState === 0){
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
    scoreIndicator.render();//Runs Score Indicator#####


    if (aliens.length === 0){//TEMP%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      loadAliens(5);
    }
  } else if (gameState === 1){

  } else if (gameState === 2){

  } else if (gameState === 3){

  } else if (gameState === 4){

  }
}
//End Function gameRun##########

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
  for (let i = 0; i < alienBullets.length; i++){
    if ( alienBullets[i].detection){
      boat.health--;//Boat Health Decreased#####
      alienBullets.splice(i, 1);//Alien Bullet Removed
    }
  }
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
      if (boatBullets[i].detection){
        scoreIndicator.score++;
      }
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
