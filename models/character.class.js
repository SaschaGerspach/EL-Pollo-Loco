class Character extends MovableObject {
  width = 100;
  height = 250;
  y = 192.5;
  x = 120;
  speed = 5;
  lastAction;

  offset = {
    top: 120,
    left: 30,
    right: 10,
    bottom: 30,
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP_START = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
  ];

  IMAGES_JUMP_UP = [
    "img/2_character_pepe/3_jump/J-35.png",
  ];

  IMAGES_JUMP_DOWN = [
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-36.png", // Hut hebt ab
  ];

  IMAGES_JUMP_LAND = [
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  GAME_OVER = [
    'img/9_intro_outro_screens/game_over/oh no you lost!.png'
  ]

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

  i_DEAD = 0;
  hurtAnimationActive = false;
  hurtAnimationFrame = 0;
  hurtAnimationTicks = 0;
  jumpPhase = null; // "start" | "up" | "down" | "land" | null
  wasAboveGround = false;
  jumpPhaseFrame = 0;
  jumpStartTicks = 0;
  MIN_JUMP_START_TICKS = 2; // 2 x 100ms = 200ms Mindestanzeige der Startphase
  HURT_TOTAL_TICKS = 5; // 5 x 100ms = 0.5s Hurt-Gesamtdauer
  world;
  walking_sound = new Audio("./audio/running.mp3");
  jump_sound = new Audio("./audio/jump.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP_START);
    this.loadImages(this.IMAGES_JUMP_UP);
    this.loadImages(this.IMAGES_JUMP_DOWN);
    this.loadImages(this.IMAGES_JUMP_LAND);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.GAME_OVER);
    this.applyGravity();
    this.animate();
    this.lastActionTime();
  }

  gameOver(){
   
      this.height = 480;
      this.width = 720;
      this.x -= 100;
      this.y = 0;
      this.loadImage(this.GAME_OVER);
      clearAllIntervals();

  }

  hit() {
    if (this.hurtAnimationActive || this.isHurt()) {
      return;
    }
    super.hit();
    if (!this.isDead()) {
      this.hurtAnimationActive = true;
      this.hurtAnimationFrame = 0;
      this.hurtAnimationTicks = 0;
    }
  }

  jump() {
    this.setJumpPhase("start");
    super.jump();
  }

  animate() {
    this.characterAnimate1 = setInterval(() => {
      if (this.world && (this.world.gameWon || this.world.gameLost)) {
        this.walking_sound.pause();
        return;
      }
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.lastActionTime();
   
      }
    }, 1000 / 60);

    this.characterAnimate2 = setInterval(() => {
      if (this.world && (this.world.gameWon || this.world.gameLost)) {
        return;
      }
      if (this.world.keyboard.LEFT && this.x > -615) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.lastActionTime();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastActionTime();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    this.idleID = setInterval(() => {
      let passedTime = (new Date().getTime() - this.lastAction) / 1000;
      
      if (passedTime > 3 && passedTime < 7) {
        this.playAnimation(this.IMAGES_IDLE);
      } else {
        if (passedTime > 7) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
        }
      }
    }, 200);

       setInterval(() => {
      const inAir = this.isAboveGround();
      const ascending = this.speedY > 0;
      const descending = this.speedY < 0;
      const landingThisTick = this.wasAboveGround && !inAir;

      if (this.isDead()) {

        this.playAnimation(this.IMAGES_DEAD);
     
        this.i_DEAD++;
      } else if (this.hurtAnimationActive) {
        this.playHurtAnimationOnceWithDuration();
      } else {
        if (landingThisTick) {
          this.setJumpPhase("land");
          this.playAnimationOnce(this.IMAGES_JUMP_LAND);
          this.jumpPhaseFrame++;
          if (this.jumpPhaseFrame >= this.IMAGES_JUMP_LAND.length) {
            this.jumpPhase = null;
          }
        } else if (inAir || this.jumpPhase) {
          this.handleJumpAnimation(inAir, ascending, descending);
        } else {
          this.jumpPhase = null;
          this.jumpPhaseFrame = 0;
          if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
          } else {
            this.playAnimation(this.IMAGES_IDLE);
          }
        }
      }
      this.wasAboveGround = inAir;
    }, 100);
  }

  lastActionTime() {
    this.lastAction = new Date().getTime();
  }

  setJumpPhase(phase) {
    if (this.jumpPhase !== phase) {
      this.jumpPhase = phase;
      this.currentImage = 0;
      this.jumpPhaseFrame = 0;
      this.jumpStartTicks = 0;
    }
  }

  handleJumpAnimation(inAir, ascending, descending) {
    if (this.jumpPhase === "start") {
      const minStartWindowPassed = this.jumpStartTicks >= this.MIN_JUMP_START_TICKS;
      this.playAnimationOnce(this.IMAGES_JUMP_START);
      this.jumpStartTicks++;
      this.jumpPhaseFrame++;

      if (!minStartWindowPassed) {
        return;
      }

      if (inAir) {
        if (ascending) {
          this.setJumpPhase("up");
        } else if (descending) {
          this.setJumpPhase("down");
        }
      }
      return;
    }

    if (inAir && ascending) {
      this.setJumpPhase("up");
      if (this.jumpPhaseFrame % 2 === 0) {
        this.playAnimation(this.IMAGES_JUMP_UP);
      }
      this.jumpPhaseFrame++;
      return;
    }

    if (inAir && descending) {
      this.setJumpPhase("down");
      if (this.jumpPhaseFrame % 2 === 0) {
        this.playAnimation(this.IMAGES_JUMP_DOWN);
      }
      this.jumpPhaseFrame++;
      return;
    }

    if (this.jumpPhase === "land") {
      this.playAnimationOnce(this.IMAGES_JUMP_LAND);
      this.jumpPhaseFrame++;
      if (this.jumpPhaseFrame >= this.IMAGES_JUMP_LAND.length) {
        this.jumpPhase = null;
      }
      return;
    }
  }

  playHurtAnimationOnceWithDuration() {
    const images = this.IMAGES_HURT;
    const lastIndex = images.length - 1;

    this.hurtAnimationTicks++;

    const ticksPerFrame = Math.max(1, Math.floor(this.HURT_TOTAL_TICKS / images.length));
    const frameIndex = Math.min(lastIndex, Math.floor((this.hurtAnimationTicks - 1) / ticksPerFrame));

    const path = images[frameIndex];
    this.img = this.imageCache[path];

    if (this.hurtAnimationTicks >= this.HURT_TOTAL_TICKS) {
      this.hurtAnimationActive = false;
      this.hurtAnimationFrame = 0;
      this.hurtAnimationTicks = 0;
    }
  }
}
