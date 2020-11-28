"use strict";

/* ############################# */
/* ### BASIC GAME PROPERTIES ### */ 
/* ############################# */
	//Canvas area
		var STAGE_WIDTH = 1400;
		var STAGE_HEIGHT = 843;
	//FPS
		var TIME_PER_FRAME = 33;
	//Game area
		var AREA_WIDTH = 1178;
		var AREA_HEIGHT = 620;
	//Fonts & text placements
		var GAME_FONTS = "bold 20px sans-serif";
		var COUNTER_X = 600;
		var COUNTER_Y = 53;
		var HEARTS_X = 100;
		var HEARTS_Y = 40;
		var LEVEL_X = 5;
		var LEVEL_Y = 20;
/* ############################# */

/* ############################# */
/* ###  STATIC IMAGE PATHS   ### */ 
/* ############################# */
	//Background
		var BG_PATH = "img/bg.png"
		var BG_WIDTH = 1660;
		var BG_HEIGHT = 1000;
	//Projectile 1
		var PROJ_PATH = "img/projectile.png";
		var PROJ_WIDTH = 26;
		var PROJ_HEIGHT = 18;
	//Projectile 2
		var PROJ2_PATH = "img/projectile2.png";
		var PROJ2_WIDTH = 26;
		var PROJ2_HEIGHT = 18;
	//Eye
		var EYE_PATH = "img/eye.png";
		var EYE_WIDTH = 22;
		var EYE_HEIGHT = 21;
/* ############################# */

/* ############################# */
/* ###        SPRITES        ### */ 
/* ############################# */
	//Global sprite properties
		var CHAR_WIDTH = 90;
		var CHAR_HEIGHT = 90;
/* ############################# */

/* ############################# */
/* ###      PROTAGONIST      ### */ 
/* ############################# */
	//Sprite path
		var CHAR_PATH = "img/char3.png";
	//Start coordinates on game area
		var CHAR_START_X = 200;
		var CHAR_START_Y = 200;
	//Start position on spritesheet
		var IMAGE_START_X = 270;
		var IMAGE_START_Y = 0;
	//Sprite image width
		var SPRITE_WIDTH = 810;
	//Speed
		var CHAR_SPEED = 5;
	//Y-position depending on facing
		var IMAGE_START_EAST_Y = 90;
		var IMAGE_START_WEST_Y = 0;
/* ############################# */

/* ############################# */
/* ###        HP BAR         ### */ 
/* ############################# */
	//Sprite path
		var HP_PATH = "img/hp.png";
	//Start coordinates on game area
		var HP_START_X = 20;
		var HP_START_Y = 10;
	//Start position on spritesheet
		var HP_IMAGE_START_X = 0;
		var HP_IMAGE_START_Y = 0;
	//Sprite image width
		var HP_SPRITE_WIDTH = 564;
	//Sizes
		var HP_WIDTH = 564;
		var HP_HEIGHT = 71;
/* ############################# */

/* ############################# */
/* ###         ENEMY:        ### */ 
/* ###        EYEBIRD        ### */ 
/* ############################# */
	//Sprite path
		var ENEMY_EBIRD_PATH = "img/eyebird.png";
	//Start position on spritesheet
		var ENEMY_EBIRD_IMAGE_START_X = 0;
		var ENEMY_EBIRD_IMAGE_START_Y = 0;
	//Sprite image width
		var ENEMY_EBIRD_SPRITE_WIDTH = 720;
	//Speed
		var ENEMY_EBIRD_SPEED = 2;
	//Y-position depending on facing
		var ENEMY_EBIRD_IMAGE_START_EAST_Y = 90;
		var ENEMY_EBIRD_IMAGE_START_WEST_Y = 0;