//Ricardo Velasquez
//Boat Defender

//Global Variable#####
let aliens = [], boat, boatBullets = [], alienBullets = [];
let ocean, clouds = [];
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
let gameState = -1, gameStyle = "N/A";
let playBtn, instructionBtn, settingBtn, basicGameBtn, imageGameBtn;

function setup() {
  let cnv = createCanvas(windowWidth - 20, windowHeight - 60);
  cnv.position((windowWidth - width) / 2, 30);
  cursor(CROSS);//Set Cursor to Cross#####

  basicGameBtn = new Button(width * 0.1, height * 0.75, "BASIC", 50, color(255), color(0));
  imageGameBtn = new Button(width - ((width * 0.1) + (width * 0.25)), height * 0.75, "IMAGE", 50, color(255), color(0))

  ocean = new Ocean();
  justClouds('SETUP');//Couldn't Come Up With A Good Name#####

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

  if (gameState === -1 && basicGameBtn.mouseOverButton){
    gameStyle = "BASIC";
    basicGameBtn.mouseOverButton = false;
    gameState = 0;
  } else if (gameState === -1 && imageGameBtn.mouseOverButton){
    gameStyle = "IMAGE";
    imageGameBtn.mouseOverButton = false;
    gameState = 0;
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
    push();
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(80);
    text("Decide On", width * 0.5, height * 0.2);
    text("A", width * 0.5, height * 0.35);
    text("Game Style", width * 0.5, height * 0.5);
    pop();
    push();
    fill(255, 0, 0);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text("You Can't Come Back To This Sreen", 5, 5);
    pop();
    basicGameBtn.run();
    imageGameBtn.run();

  } else if (gameState === 0){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    push();
    fill(76);
    stroke(85, 4, 143);
    strokeWeight(2);
    textSize(120);
    textAlign(CENTER);
    text("BOAT", width / 2, height * 0.25);;
    text("DEFENDERS", width / 2, height * 0.5);
    pop();


  } else if (gameState === 1){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####

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

//Start Function justClouds##########
function justClouds(str){
  let x = 0;
  let y = 0;
  let r = 0;
  if (str === 'SETUP'){
    for (let i = 1; i < 6; i++){
      for (let j = 0; j < 3; j++){
        r = random(100, 60);
        x = random(-700, -670) * i;
        y = random(height * 0.25 + r / 2, height * 0.25 - r / 2);
        clouds.push(new Clouds(x, y, r));
      }
    }
  } else if (str === 'DRAW'){
    for (let i = 0; i < clouds.length; i++){
      clouds[i].run();
    }
    for (let i = 0; i < clouds.length; i += 3){
      if (clouds[i].outOfBounds && clouds[i + 1].outOfBounds && clouds[i + 2].outOfBounds){
        clouds[i].rad = random(100, 60);
        clouds[i].x = random(-700, -670) * 6;
        clouds[i].y = random(height * 0.25 + r / 2, height * 0.25 - r / 2);

        clouds[i + 1].rad = random(100, 60);
        clouds[i + 1].x = random(-700, -670) * 6;
        clouds[i + 1].y = random(height * 0.25 + r / 2, height * 0.25 - r / 2);

        clouds[i + 2].rad = random(100, 60);
        clouds[i + 2].x = random(-700, -670) * 6;
        clouds[i + 2].y = random(height * 0.25 + r / 2, height * 0.25 - r / 2);

        clouds[i].outOfBounds = false;
        clouds[i + 1].outOfBounds = false;
        clouds[i + 2 ].outOfBounds = false;
      }
    }
  }
}
//End Function justClouds##########
