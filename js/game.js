/* ############################# */
/* ###     L U N A T I C     ### */ 
/* ###      PROJECT BY:      ### */
/* ###       Alan Hajo       ### */
/* ############################# */
"use strict";

/* ############################# */
/* ###     GAME VARIABLES    ### */ 
/* ############################# */
//Game and canvas
var isPaused = false;
var game;
var ctx, stage, counter, gameloop;
var preloader;
var text = "";
var onX;
var onY;
var bShootingProj = false;
var score = 0;
var hearts = 4;
var chance = 0.005;
var level = 0;

//Character
var charImage = new Image();
var currX = IMAGE_START_X, currY = IMAGE_START_EAST_Y;
var facing = "E";
var charX = CHAR_START_X;
var charY = CHAR_START_Y;
var isMoving = false;
var isAttacking = false;

//HP
var hpCurrY = HP_IMAGE_START_Y;

//Images and sounds
var bgImage = new Image();
var projectileImage = new Image();
var enemyEbirdImage = new Image();
var eyeImage = new Image();
var hpImage = new Image();
var hitSound = new sound("sound/hit.wav", false);
var levelUpSound = new sound("sound/levelup.wav", false);
var spoilSound = new sound("sound/spoil.wav", false);
var backgroundSound = new sound("sound/background.wav", true);
var walkSound = new sound("sound/walk.wav", false);
var laserGunSound = new sound("sound/lasergun.wav", false);
var eyeSound = new sound("sound/eye.wav", false);
var gameOverSound = new sound("sound/gameover.wav", false);
var enemyDeathSound = new sound("sound/enemydeath.wav", false);

//Arrays
var eastProjArray = new Array();
var westProjArray = new Array();
var enemyEbirdArray = new Array();
var eastEyeArray = new Array();
var westEyeArray = new Array();

//Setup
function init() {
	stage = document.getElementById("gameCanvas");
	ctx = stage.getContext("2d");

	//Set default values
	stage.width = STAGE_WIDTH;
	stage.height = STAGE_HEIGHT;
	ctx.font = GAME_FONTS;
	counter = 0;

	//Preload background
	bgImage.ready = false;
	bgImage.onload = setBgReady;
	bgImage.src = BG_PATH;

	//Preload projectile
	projectileImage.ready = false;
	projectileImage.onload = setProjReady;
	projectileImage.src = PROJ_PATH;

	//Preload Char spritesheet
	charImage.ready = false;
	charImage.onload = setAssetReady;
	charImage.src = CHAR_PATH;

	//Preload Enemy: Eeyebird spritesheet
	enemyEbirdImage.ready = false;
	enemyEbirdImage.onload = setEnemyEbirdReady;
	enemyEbirdImage.src = ENEMY_EBIRD_PATH;
	eyeImage.ready = false;
	eyeImage.onload = setEyeReady;
	eyeImage.src = EYE_PATH;

	//Preload HP-bar
	hpImage.ready = false;
	hpImage.onload = setHpReady;
	hpImage.src = HP_PATH;

	//Run preloader, eventlisteners and game songs
	preloader = setInterval(preloading, TIME_PER_FRAME);
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	spoilSound.play();
	setTimeout(function(){
		backgroundSound.play();
	}, 4200);
}

function setBgReady() {
	this.ready = true;
}

function setProjReady() {
	this.ready = true;
}

function setEnemyEbirdReady() {
	this.ready = true;
}

function setEyeReady() {
	this.ready = true;
}

function setHpReady() {
	this.ready = true;
}

function setAssetReady() {
	this.ready = true;
}

//Start game if everything is fully loaded
function preloading() {
	if(bgImage.ready && charImage.ready && projectileImage.ready && enemyEbirdImage.ready && eyeImage.ready && hpImage.ready) {
		clearInterval(preloader);
		start();
	}
}

//Do not pause game
function start() {
	if(!isPaused) {
		game = requestAnimationFrame(update);
	}
}

//Pause game
function stop() {
	isPaused = true;
	cancelAnimationFrame(game);
}

//Function for sounds
function sound(src, loop) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	if (loop) {
		this.sound.setAttribute("loop", true)
	}
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function() {
		this.sound.play();
	}
	this.stop = function() {
		this.sound.pause();
	}
}

//Check for collisions
function collisionDetection(x1, y1, w1, h1, x2, y2, w2, h2) {
	return (x1 <= x2+w2 &&
			x2 <= x1+w1 &&
			y1 <= y2+h2 &&
			y2 <= y1+h1)
}

//Game Loop
function update() {
	ctx.drawImage(bgImage, 0, 0); //Add bg and clear canvas

	ctx.fillStyle = "#fff";
	ctx.fillText(score, COUNTER_X, COUNTER_Y);
	ctx.fillText(text, charX+20, charY+10);

	//Change HP bar depending on level of hearts
	if(hearts == 4){
		hpCurrY = 0;
	}
	else if(hearts == 3) {
		hpCurrY = 71;
	}
	else if(hearts == 2) {
		hpCurrY = 142;
	}
	else if(hearts == 1) {
		hpCurrY = 213;
	}
	else if(hearts == 0) {
		hpCurrY = 284;
		ctx.fillText("GAME OVER", STAGE_WIDTH/2, STAGE_HEIGHT/2);
		backgroundSound.stop();
		gameOverSound.play();
		stop();
		//End game
	}

	//Level up, increase chance and reset HP depending on points
	if(score == 100) {
		level = 1;
		chance = 0.01;
		levelUpSound.play();
		text = "Level up!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}
	else if (score == 300) {
		level = 2;
		chance = 0.02;
		levelUpSound.play();
		text = "Level up!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}
	else if (score == 500) {
		level = 3;
		chance = 0.03;
		levelUpSound.play();
		text = "Level up!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}
	else if (score == 700) {
		level = 4;
		chance = 0.04;
		levelUpSound.play();
		text = "Level up!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}
	else if (score == 900) {
		level = 5;
		chance = 0.05;
		levelUpSound.play();
		text = "Level up!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}
	else if (score == 1000) {
		level = "FINALE";
		chance = 0.1;
		levelUpSound.play();
		text = "Final level!";
		setTimeout(function(){
	        text = "";
	    },500);
	    score+=10;
	    hearts = 4;
	}

	//Check if user is moving
	if(isMoving) {
		walkSound.play();
		//Check facing direction and limit the game area
		if(facing == "N") {
			charY -= CHAR_SPEED;
			if (charY <= 90) {
				charY = 90;
			}
		} else if (facing == "E") {
			charX += CHAR_SPEED;
			currY = IMAGE_START_EAST_Y;
			if (charX >= AREA_WIDTH - 90 + 125) {
				charX = AREA_WIDTH - 90 + 125;
			}
		} else if (facing == "S") {
			charY += CHAR_SPEED;	
			if (charY >= AREA_HEIGHT - 90 + 120) {
				charY = AREA_HEIGHT - 90 + 120;
			}
		} else if (facing == "W") {
			charX -= CHAR_SPEED;
			currY = IMAGE_START_WEST_Y;
			if (charX <= 90) {
				charX = 90;
			}
		}
		//Select through images from spritesheet
		currX += CHAR_WIDTH;
		if (currX >= SPRITE_WIDTH) {
			currX = 0;
		}
	}
	//Start from x=270 in spritesheet by default, and then loop through
	else if (currY == IMAGE_START_WEST_Y || currY == IMAGE_START_EAST_Y) {
		currX = 270;
	}

	//Check if user is using attack
	if(isAttacking) {
		//Stay in the same facing direction with attack animations
		if(currY == IMAGE_START_WEST_Y) {
			currY = 180;
		}
		else if (currY == IMAGE_START_EAST_Y) {
			currY = 270;
		}
		currX += CHAR_WIDTH;
		//Stop at the last pic, NO looping
        if (currX >= 990) {
        	currX = 900;
        	if (!bShootingProj) {
        		//Create a projectile
        		if(currY == 270) {
	        		onX = charX + 59 - 15;
					onY = charY + 40;
					var newProj = {
						x:onX,
						y:onY
					}
					eastProjArray.push(newProj);
					bShootingProj = true;
				}
				else if(currY == 180) {
					onX = charX - 10;
					onY = charY + 40;
					var newProj = {
						x:onX,
						y:onY
					}
					westProjArray.push(newProj);
					bShootingProj = true;
				}
				//Go back to normal sprite
				setTimeout(function(){
					isAttacking = false;
					bShootingProj = false;
		        	if(currY == 180) {
						currY = IMAGE_START_WEST_Y;
						currX = 270;
					}
					else if(currY == 270) {
						currY = IMAGE_START_EAST_Y;
						currX = 270;
					}					
		    	}, 100);
			}
		}
		laserGunSound.play();
	}
	
	//Draw character
	ctx.drawImage(charImage, currX, currY, CHAR_WIDTH, CHAR_HEIGHT,
		charX, charY, CHAR_WIDTH, CHAR_HEIGHT);

	//Generate Enemy: Eyebird
	if (Math.random() < chance) {
		var enemyEbird = new Object();
		//Randomize location
		enemyEbird.x = Math.floor((Math.random() * AREA_WIDTH) + 1);
		enemyEbird.y = Math.floor((Math.random() * AREA_HEIGHT) + 1);;
		enemyEbird.currX = ENEMY_EBIRD_IMAGE_START_X;
		enemyEbird.currY = ENEMY_EBIRD_IMAGE_START_Y;
		enemyEbird.onX;
		enemyEbird.onY;
		//Choose direction and pole based on 50/50 chance
		if(Math.random() >= 0.5) {
			enemyEbird.direction = "E";
			enemyEbird.pole = "N";
		}
		else {
			enemyEbird.direction = "W";
			enemyEbird.pole = "S";
		}
		//Create Enemy: Eyebird
		enemyEbirdArray.push(enemyEbird);
	}

	//Update position for Enemy: Eyebird
	for(var i=enemyEbirdArray.length - 1; i >= 0; i--) {
		//Position for eye projectile
		enemyEbirdArray[i].onX = enemyEbirdArray[i].x + 59 - 15;
		enemyEbirdArray[i].onY = enemyEbirdArray[i].y + 40;
		//Check direction, then generate eye projectile on random, and limit game area
		if(enemyEbirdArray[i].direction == "W") {
			enemyEbirdArray[i].x -= ENEMY_EBIRD_SPEED;
			enemyEbirdArray[i].currY = 0;
			if (Math.random() < 0.005) {
				var newEye = {
					x:enemyEbirdArray[i].onX,
					y:enemyEbirdArray[i].onY
				}
				westEyeArray.push(newEye);
				eyeSound.play();
			}
			if (enemyEbirdArray[i].x <= 90) {
				enemyEbirdArray[i].direction = "E";
			}
		}
		else if(enemyEbirdArray[i].direction == "E") {
			enemyEbirdArray[i].x += ENEMY_EBIRD_SPEED;
			enemyEbirdArray[i].currY = 90;
			if (Math.random() < 0.005) {
				var newEye = {
					x:enemyEbirdArray[i].onX,
					y:enemyEbirdArray[i].onY
				}
				eastEyeArray.push(newEye);
				eyeSound.play();
			}
			if (enemyEbirdArray[i].x >= AREA_WIDTH - 90 + 125) {
				enemyEbirdArray[i].direction = "W";
			}
		}
		//Check pole, and limit game area
		if(enemyEbirdArray[i].pole == "S") {
			enemyEbirdArray[i].y += ENEMY_EBIRD_SPEED;
			if (enemyEbirdArray[i].y >= AREA_HEIGHT - 90 + 120) {
				enemyEbirdArray[i].pole = "N";
			}
		}
		else if(enemyEbirdArray[i].pole == "N") {
			enemyEbirdArray[i].y -= ENEMY_EBIRD_SPEED;
			if (enemyEbirdArray[i].y <= 90) {
				enemyEbirdArray[i].pole = "S";
			}
		}

		//Loop through spritesheet
		enemyEbirdArray[i].currX += CHAR_WIDTH;
		if (enemyEbirdArray[i].currX >= ENEMY_EBIRD_SPRITE_WIDTH) {
			enemyEbirdArray[i].currX = 0;
		}

		//Draw Enemy: Eyebird
		ctx.drawImage(enemyEbirdImage, enemyEbirdArray[i].currX, enemyEbirdArray[i].currY, CHAR_WIDTH, CHAR_HEIGHT,
		enemyEbirdArray[i].x, enemyEbirdArray[i].y, CHAR_WIDTH, CHAR_HEIGHT);

		//Check if user projectile has attacked
		if(eastProjArray.length >= 1){
			for (var j = 0; j < eastProjArray.length; j++) {
				if(collisionDetection(eastProjArray[j].x,
					eastProjArray[j].y,
					PROJ_WIDTH,
					PROJ_HEIGHT,
					enemyEbirdArray[i].x,
					enemyEbirdArray[i].y,
					CHAR_WIDTH,
					CHAR_HEIGHT)){
						eastProjArray.splice(j, 1);
						enemyEbirdArray.splice(i, 1);
						enemyDeathSound.play();
						score+=10;
				}
			}
		}else if(westProjArray.length >= 1){
			for (var j = 0; j < westProjArray.length; j++) {
				if(collisionDetection(westProjArray[j].x,
					westProjArray[j].y,
					PROJ_WIDTH,
					PROJ_HEIGHT,
					enemyEbirdArray[i].x,
					enemyEbirdArray[i].y,
					CHAR_WIDTH,
					CHAR_HEIGHT)){
						westProjArray.splice(j, 1);
						enemyEbirdArray.splice(i, 1);
						enemyDeathSound.play();
						score+=10;
				}
			}
		}
	}

	//East user projectile
	for(var i=eastProjArray.length - 1; i >= 0; i--) {
		eastProjArray[i].x += 10;
		if(eastProjArray[i].x > AREA_WIDTH + 106){
		    eastProjArray.splice(i, 1);
		}else{
			ctx.drawImage(projectileImage, eastProjArray[i].x, eastProjArray[i].y);
		}
		
	}

	//West user projectile
	for(var i=westProjArray.length - 1; i >= 0; i--) {
		westProjArray[i].x -= 10;
		if(westProjArray[i].x < 70){
			westProjArray.splice(i, 1);
		}
		else {
			ctx.drawImage(projectileImage, westProjArray[i].x, westProjArray[i].y);
		}
	}

	//East eye projectile
	for(var i=eastEyeArray.length - 1; i >= 0; i--) {
		eastEyeArray[i].x += 5;
		if(eastEyeArray[i].x > AREA_WIDTH + 106){
		    eastEyeArray.splice(i, 1);
		}else if (collisionDetection(eastEyeArray[i].x,
				eastEyeArray[i].y,
				EYE_WIDTH,
				EYE_HEIGHT,
				charX,
				charY,
				CHAR_WIDTH,
				CHAR_HEIGHT)) {
			eastEyeArray.splice(i, 1);
			hearts--;
			hitSound.play();
		}else{
			ctx.drawImage(eyeImage, eastEyeArray[i].x, eastEyeArray[i].y);
		}
	}

	//West eye projectile
	for(var i=westEyeArray.length - 1; i >= 0; i--) {
		westEyeArray[i].x -= 5;
		if(westEyeArray[i].x < 70){
		    westEyeArray.splice(i, 1);
		}else if (collisionDetection(westEyeArray[i].x,
				westEyeArray[i].y,
				EYE_WIDTH,
				EYE_HEIGHT,
				charX,
				charY,
				CHAR_WIDTH,
				CHAR_HEIGHT)) {
			westEyeArray.splice(i, 1);
			hearts--;
			hitSound.play();
		}else{
			ctx.drawImage(eyeImage, westEyeArray[i].x, westEyeArray[i].y);
		}
	}

	//Draw HP bar
	ctx.drawImage(hpImage, HP_IMAGE_START_X, hpCurrY, HP_WIDTH, HP_HEIGHT,
		HP_START_X, HP_START_Y, HP_WIDTH, HP_HEIGHT);

	//Loop
	start();
}


//Check if controls are pressed
function keyDownHandler(event) {
	if(event.keyCode == 38) { //Up
		facing = "N";
		isMoving = true;
	} else if (event.keyCode == 39) { //Right
		facing = "E";
		isMoving = true;
	} else if (event.keyCode == 40) { //Down
		facing = "S";
		isMoving = true;
	} else if (event.keyCode == 37) { //Left
		facing = "W";
		isMoving = true;
	} else if (event.keyCode == 90) { //Z
		isAttacking = true;
	}
}

//Check if controls are released
function keyUpHandler(event){
	if ((event.keyCode == 37) || (event.keyCode == 38) || 
		(event.keyCode == 39) || (event.keyCode == 40) ||
		(event.keyCode == 90)) {
		isMoving = false;
		walkSound.stop();
	}
}

//Run setup on page initiation
window.onload = init();