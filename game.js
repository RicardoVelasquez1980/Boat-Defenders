//Ricardo Velasquez
//Boat Defender

//Global Variable#####
let aliens = [], boat, boatBullets = [], alienBullets = [], alienSpawn = 3;
let ocean, clouds = [], islands = [], trees = [];
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
let gameState = -1, gameStyle = "N/A", prevPage;
let playBtn, instructionBtn, settingBtn, basicGameBtn, imageGameBtn, backBtn;

function setup() {
  let cnv = createCanvas(windowWidth - 20, windowHeight - 60);
  cnv.position((windowWidth - width) / 2, 30);
  cursor(CROSS);//Set Cursor to Cross#####

  basicGameBtn = new Button(width * 0.1, height * 0.75, "BASIC", 50, NORMAL, color(255), color(0));
  imageGameBtn = new Button(width - ((width * 0.1) + (width * 0.25)), height * 0.75, "IMAGE", 50, NORMAL, color(255), color(0));
  playBtn = new Button(width * 0.2, height * 0.65, "PLAY", 60, BOLD, color(5, 195, 232), color(60));
  instructionBtn = new Button(width - ((width * 0.2) + (width * 0.25)), height * 0.65, "HELP", 60, BOLD, color(5, 195, 232), color(60));
  settingBtn = new SettingsButton(width * 0.04, height - (height * 0.06), "S", width * 0.03, BOLD, color(5, 195, 232), color(60));
  backBtn = new Button(width - ((width * 0.25) + 5), (height * 0.85) - 5, "BACK", 50, BOLD, color(5, 195, 232), color(60));

  ocean = new Ocean();
  justClouds('SETUP');//Couldn't Come Up With A Good Name#####
  loadIslands(ceil(random(3)));
  loadTrees(islands.length + ceil(random(4)));

  boat = new Boat(width / 2, height - 100);//Boat Made#####
  loadAliens(alienSpawn);//Function That Creates Starting Aliens#####
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
    gameState = 0;
    basicGameBtn.mouseOverButton = false;
  } else if (gameState === -1 && imageGameBtn.mouseOverButton){
    gameStyle = "IMAGE";
    alert("is Web Server For Chrome Being Used?");
    gameState = 0;
    imageGameBtn.mouseOverButton = false;
  }

  if (gameState === 0 && playBtn.mouseOverButton){
    gameState = 1;
    playBtn.mouseOverButton = false;
  } else if (gameState === 0 && instructionBtn.mouseOverButton){
    gameState = 4;
    prevPage = 0;
    instructionBtn.mouseOverButton = false;
  } else if (gameState === 0 && settingBtn.mouseOverButton){
    gameState = 3;
    prevPage = 0;
    settingBtn.mouseOverButton = false;
  }

  if (gameState === 2 && playBtn.mouseOverButton){
    scoreIndicator.score = 0;
    alienSpawn = 0;
    boatBullets = [];
    alienBullets = [];
    aliens = [];
    boat.health = 3;
    boat.fireRate = 45;
    boat.reloaded = false;
    gameState = 1;
    playBtn.mouseoverButton = false;
  } else if (gameState === 2 && instructionBtn.mouseOverButton){
    gameState = 4;
    prevPage = 2;
    instructionBtn.mouseOverButton = false;
  } else if (gameState === 2 && settingBtn.mouseOverButton){
    gameState = 3;
    prevPage = 2;
    settingBtn.mouseOverButton = false;
  }

  if (gameState === 3 && backBtn.mouseOverButton){
    gameState = prevPage;
    backBtn.mouseOverButton = false;
  }

  if (gameState === 4 && backBtn.mouseOverButton){
    gameState = prevPage;
    backBtn.mouseOverButton = false;
  }

}

function keyPressed(){
  // console.log(char(keyCode) + " " + keyCode);
  if (keyCode === 32 && boat.reloaded){//If Space bar is Pressed Create A Bullet#####
    boatBullets.push(new BoatBullet(boat.x, boat.y, boat.angle));//Make New Player Bullet#####
    boat.fireRate = 45;
  }

  if (gameState === -1 && basicGameBtn.mouseOverButton && keyCode === 13){
    gameStyle = "BASIC";
    gameState = 0;
    basicGameBtn.mouseOverButton = false;
  } else if (gameState === -1 && imageGameBtn.mouseOverButton && keyCode === 13){
    gameStyle = "IMAGE";
    alert("is Web Server For Chrome Being Used?");
    gameState = 0;
    imageGameBtn.mouseOverButton = false;
  }

  if (gameState === 0 && playBtn.mouseOverButton && keyCode === 13){
    gameState = 1;
    playBtn.mouseOverButton = false;
  } else if (gameState === 0 && instructionBtn.mouseOverButton && keyCode === 13){
    gameState = 4;
    prevPage = 0;
    instructionBtn.mouseOverButton = false;
  } else if (gameState === 0 && settingBtn.mouseOverButton && keyCode === 13){
    gameState = 3;
    prevPage = 0;
    settingBtn.mouseOverButton = false;
  }

  if (gameState === 2 && playBtn.mouseOverButton && keyCode === 13){
    scoreIndicator.score = 0;
    alienSpawn = 0;
    boatBullets = [];
    alienBullets = [];
    aliens = [];
    boat.health = 3;
    boat.fireRate = 45;
    boat.reloaded = false;
    gameState = 1;
    playBtn.mouseoverButton = false;
  } else if (gameState === 2 && instructionBtn.mouseOverButton && keyCode === 13){
    gameState = 4;
    prevPage = 2;
    instructionBtn.mouseOverButton = false;
  } else if (gameState === 2 && settingBtn.mouseOverButton && keyCode === 13){
    gameState = 3;
    prevPage = 2;
    settingBtn.mouseOverButton = false;
  }

  if (gameState === 3 && backBtn.mouseOverButton && keyCode === 13){
    gameState = prevPage;
    backBtn.mouseOverButton = false;
  }

  if (gameState === 4 && backBtn.mouseOverButton && keyCode === 13){
    gameState = prevPage;
    backBtn.mouseOverButton = false;
  }

  if (gameState === 1 && keyCode === 80){
    gameState = "PAUSED";
  } else if (gameState === "PAUSED" && keyCode === 80){
    gameState = 1;
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
    textSize(15);
    textAlign(LEFT, TOP);
    text("You Can't Come Back To This Sreen", 5, 5);
    pop();

//DELETE THIS WHEN GAME STYLE IS USED%%%%%%%%%%%%%%%%%%%%%%
    push();
    fill(0, 255, 0);
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(10);
    text("AS OF RIGHT NOW GAME STYLE DOES NOTHING", width - 5, 5);
    pop();
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    basicGameBtn.run();
    imageGameBtn.run();


    runTrees();

  } else if (gameState === 0){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    runIslands();

    push();
    fill(5, 195, 232);
    stroke(60);
    strokeWeight(7);
    textSize(150);
    textStyle(BOLD);
    textAlign(CENTER);
    text("BOAT", width / 2, height * 0.25);;
    text("DEFENDERS", width / 2, height * 0.5);
    pop();

    playBtn.run();
    instructionBtn.run();
    settingBtn.run();

  } else if (gameState === 1){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    runIslands();

    alienBulletCreation();
    runBullets();//Runs Bullets#####
    boat.run();//Runs Boat#####
    boatDamaged();//Function That Checks If Boat Has Been Hit#####
    healthIndicator.run();//Runs Health Indicator#####
    runAliens();//Function That Runs All Aliens#####
    alienKilled();//Function That Deletes Alien If Killed#####
    bulletDeletion();//Function That Deletes Bullets When Needed#####
    scoreIndicator.render();//Runs Score Indicator#####

    if (aliens.length === 0){
      alienSpawn += ceil(random(1, 4));;
      loadAliens(alienSpawn);
    }

    if (boat.health <= 0){
      gameState = 2;
    }

  } else if (gameState === 2){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    runIslands();

    push();
    fill(5, 195, 232);
    stroke(60);
    strokeWeight(3);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER);
    text("BOAT", width / 2, height * 0.1);;
    text("DEFENDERS", width / 2, height * 0.2);
    pop();

    push();
    fill(200, 0, 0);
    noStroke();
    textSize(70);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height * 0.4);
    pop();

    push();
    fill(255);
    noStroke();
    textSize(30);
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    text("SCORE: " + scoreIndicator.score, width / 2, height / 2);
    pop();

    playBtn.run();
    instructionBtn.run();
    settingBtn.run();

  } else if (gameState === 3){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    runIslands();

    push();
    fill(255, 0, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(120);
    text("UNDER", width / 2, height * 0.25);
    text("DEVELOPMENT", width / 2, height * 0.75)
    pop();

    backBtn.run();

  } else if (gameState === 4){
    background(144, 214, 249);
    ocean.run();
    justClouds('DRAW');//Run And Make Clouds, Couldnt Find A Better Name For The Function#####
    runIslands();

    push();
    fill(63, 14, 79);
    noStroke();
    textAlign(LEFT, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    text("~ Use 'A'/Left Arrow and 'D'/Right Arrow to maneuver", 10, 20);
    text("~ Left Click/Press SpaceBar to shoot", 10, 50);
    text("~ Press 'P' to PAUSE game", 10, 80);

    text("~ FUN FACT: Mr.Ettlin is a Navy Veteran!", 10, 320)
    pop();

    backBtn.run();

  } else if (gameState === "PAUSED"){
    push();
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(100);
    text("PAUSED", width / 2, height / 2);
    pop();
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
    if (aliens[i].bottomY > boat.y && aliens[i].topY < boat.y + 25 && aliens[i].bottomX - 15 > boat.x - 45 && aliens[i].bottomX + 15 < boat.x + 45){
      boat.health--;//Boat Health Decreased#####
      aliens.splice(i, 1);//Alien Removed But Wont Go Towards Players Score#####
      aliens.push(new Alien());//Spawn New Aliens#####
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
    if (aliens[i].fireRate <= 0){
      alienBullets.push(new  AlienBullet(aliens[i].topX, aliens[i].topY + 10, aliens[i].angle));
      aliens[i].fireRate = random(90, 150);
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

//Start Function alienKilled##########
function alienKilled(){
  for (let i = 0; i < boatBullets.length; i++){
    for (let j = 0; j < aliens.length; j++){
      if (boatBullets[i].detection && boatBullets[i].alienHit === aliens[j]){
        aliens.splice(j, 1);//Alien Is Removed#####
      }
    }
  }

  for (let i = 0; i < aliens.length; i++){
    if (aliens[i].bottomY >= boat.y && aliens[i].bottomX - 15 < boat.x - 45){
      aliens.splice(i, 1);
      aliens.push(new Alien());//Spawn New Aliens#####
    } else if (aliens[i].bottomY >= boat.y && aliens[i].bottomX + 15 > boat.x + 45){
      aliens.splice(i, 1);
      aliens.push(new Alien());//Spawn New Aliens#####
    }
  }
}
//End Function alienKilled##########

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

//Start Function loadIslands##########
function loadIslands(amt){
  for (let i = 0; i < amt; i++){
    islands.push(new Island());
  }
}
//End Function loadIslands##########

//Start Function runIslands##########
function runIslands(){
  for (let i = 0; i < islands.length; i++){
    islands[i].run();
  }
}
//End Function runIslands##########

//Start Function loadTrees##########
function loadTrees(amt){
  for (let i = 0; i < amt; i ++){
    let index = floor(random(islands.length));
    trees.push(new Tree(islands[index].x, islands[index].y, islands[index].size));
  }
}
//End Function loadTrees##########

//Start Function runTrees##########
function runTrees(){
  for (let i = 0; i < trees.length; i++){
    trees[i].run();
  }
}
//End Function runTrees##########
