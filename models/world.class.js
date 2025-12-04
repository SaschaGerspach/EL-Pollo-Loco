class World {
  character = new Character();
  chicken = new Chicken();
  chickenSmall = new ChickenSmall();
  endboss = new Endboss();
  movableObject = new MovableObject();
  bottles = new Bottles();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  statusbarBottles = new StatusbarBottles();
  statusbarCoins = new StatusbarCoins();
  statusbarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  countBottle = 0;
  gameWon = false;
  gameLost = false;
  winFrame = 0;
  winFrameTicks = 0;
  IMAGES_WIN = [
    "img/9_intro_outro_screens/win/win_1.png",
    "img/9_intro_outro_screens/win/win_2.png",
  ];
  winImageCache = {};

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.loadWinImages();
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    for (let i = 0; i < this.level.enemies.length; i++){
      this.level.enemies[i].characterX = this.character.x;
    }
    for (let i = 0; i < this.level.enemies.length; i++){
      this.level.enemies[i].world = this;
    }
    if (this.level.endboss) {
      this.level.endboss.world = this;
    }
  }

  run() { 
    
    setInterval(() => {
      if (this.gameWon || this.gameLost) {
        if (this.keyboard.R) {
          this.restartGame();
        }
        return;
      }
      for (let i = 0; i < this.level.enemies.length; i++) {
        this.level.enemies[i].characterX = this.character.x;
      }
      if (this.level.endboss) {
        this.level.endboss.characterX = this.character.x;
      }
      this.checkCollitions();
      this.ceckThrowableObjects();
      this.checkCollitionsThrow();

      if (!this.gameWon && !this.gameLost && this.character.isDead()) {
        this.loseGame();
      }
    }, 1000 / 20);
  }

  ceckThrowableObjects() {
    if (this.gameWon || this.gameLost) {
      return;
    }
    if (this.keyboard.E && this.countBottle > 0 && !this.keyboard.ePressed) {
      this.keyboard.ePressed = true;
      this.countBottle -= 1;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.amountBottle -= 20;
      this.statusbarBottles.setAmountBottles(this.character.amountBottle);
    }
  }

  checkCollitions() {
    this.level.enemies.forEach((enemy) => {
      const collisionSide = this.character.isColliding(enemy);
      if ((collisionSide === "left" || collisionSide === "right") && !enemy.isDead()) {
        this.character.hit();
        this.statusBar.setPercantage(this.character.energy);
      }
    });

    const stompTargets = [];
    this.level.enemies.forEach((enemy) => {
      const collisionSide = this.character.isColliding(enemy);
      if (!collisionSide || enemy.isDead()) {
        return;
      }

      const charBottom = this.character.y + this.character.height;
      const verticalToEnemyTop = charBottom - enemy.y;
      const descending = this.character.speedY < 0;
      const airborne = this.character.isAboveGround() && !this.character.isDead();
      const enemyUnderFeet = verticalToEnemyTop >= 0 && verticalToEnemyTop < 82.5;
      const comingFromAbove = collisionSide === "bottom" || (enemyUnderFeet && descending);

      if (airborne && descending && enemyUnderFeet && comingFromAbove) {
        stompTargets.push(enemy);
      }
    });

    stompTargets.forEach((enemy) => {
      const collisionSide = this.character.isColliding(enemy);
      if (!collisionSide) {
        return;
      }
      const charBottom = this.character.y + this.character.height;
      const verticalToEnemyTop = charBottom - enemy.y;
      const enemyUnderFeet = verticalToEnemyTop >= 0 && verticalToEnemyTop < 82.5;
      const descending = this.character.speedY < 0;

      if ((collisionSide === "bottom" || enemyUnderFeet) && descending && this.character.isAboveGround() && !enemy.isDead()) {
        if (enemy instanceof Chicken) {
          enemy.energy = 0;
          enemy.playAnimation(enemy.IMAGE_DEAD);
          clearInterval(enemy.stopMoving);
          clearInterval(enemy.stopWalking);
          setTimeout(() => {
            const removalIndex = this.level.enemies.indexOf(enemy);
            if (removalIndex > -1) {
              this.level.enemies.splice(removalIndex, 1);
            }
          }, 5000);
        }
        if (enemy instanceof ChickenSmall) {
          enemy.energy = 0;
          enemy.playAnimation(enemy.IMAGES_SMALL_DEAD);
          clearInterval(enemy.stopMovingSmall);
          clearInterval(enemy.stopWalkingSmall);
          setTimeout(() => {
            const removalIndex = this.level.enemies.indexOf(enemy);
            if (removalIndex > -1) {
              this.level.enemies.splice(removalIndex, 1);
            }
          }, 5000);
        }
      }
    });
    this.level.bottles.forEach((bottle, index) => {
      if (this.countBottle != 5) {
        if (
          this.character.isColliding(bottle) == "left" ||
          this.character.isColliding(bottle) == "right" ||
          this.character.isColliding(bottle) == "bottom"
        ) {
          this.character.amountBottle += 20;
          this.countBottle += 1;
          this.statusbarBottles.setAmountBottles(this.character.amountBottle);
          this.level.bottles.splice(index, 1);
        }
      }
    });
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) == "left" || this.character.isColliding(coin) == "right") {
        this.character.amountCoins += 20;
        this.statusbarCoins.setAmountCoins(this.character.amountCoins);
        this.level.coins.splice(index, 1);
      }
    });
  }

  
  checkCollitionsThrow() {
    const groundY = 430;
    const BOTTLE_GROUND_OFFSET = 10;
    const BOTTLE_BOSS_IMPACT_OFFSET = 10;
    const BOTTLE_ENEMY_IMPACT_OFFSET = 8;
    const BOSS_X_TIGHTEN = 8;

    this.throwableObjects.forEach((bottle) => {
      const bottleBottom = bottle.y + bottle.height;
      const bottleCenterX = bottle.x + bottle.width / 2;

      this.level.enemies.forEach((enemy) => {
        const collisionSide = bottle.isColliding(enemy);
        if (!collisionSide || bottle.glass || enemy.isDead()) {
          return;
        }

        const enemyTop = enemy.y + enemy.offset.top;

        if (enemy instanceof Chicken) {
          const chickenLeft = enemy.x + 10;
          const chickenRight = enemy.x + enemy.width - 10;
          const withinEnemyHorizontalRange = bottleCenterX >= chickenLeft && bottleCenterX <= chickenRight;

          if (collisionSide && withinEnemyHorizontalRange && bottleBottom >= enemyTop + BOTTLE_ENEMY_IMPACT_OFFSET) {
            enemy.energy = 0;
            enemy.playAnimation(enemy.IMAGE_DEAD);
            clearInterval(enemy.stopMoving);
            clearInterval(enemy.stopWalking);
            setTimeout(() => {
              const removalIndex = this.level.enemies.indexOf(enemy);
              if (removalIndex > -1) {
                this.level.enemies.splice(removalIndex, 1);
              }
            }, 5000);
            bottle.triggerSplash();
          }
        } else if (enemy instanceof ChickenSmall) {
          const chickenLeft = enemy.x + 10;
          const chickenRight = enemy.x + enemy.width - 10;
          const withinEnemyHorizontalRange = bottleCenterX >= chickenLeft && bottleCenterX <= chickenRight;

          if (collisionSide && withinEnemyHorizontalRange && bottleBottom >= enemyTop + BOTTLE_ENEMY_IMPACT_OFFSET) {
            enemy.energy = 0;
            enemy.playAnimation(enemy.IMAGES_SMALL_DEAD);
            clearInterval(enemy.stopMovingSmall);
            clearInterval(enemy.stopWalkingSmall);
            setTimeout(() => {
              const removalIndex = this.level.enemies.indexOf(enemy);
              if (removalIndex > -1) {
                this.level.enemies.splice(removalIndex, 1);
              }
            }, 5000);
            bottle.triggerSplash();
          }
        } else if (enemy instanceof Endboss) {
          const bottleCenterX = bottle.x + bottle.width / 2;
          const bossLeft = enemy.x + 20 + BOSS_X_TIGHTEN;
          const bossRight = enemy.x + enemy.width - 20 - BOSS_X_TIGHTEN;
          const withinHorizontalRange = bottleCenterX >= bossLeft && bottleCenterX <= bossRight;

          if (collisionSide && withinHorizontalRange && bottleBottom >= enemyTop + BOTTLE_BOSS_IMPACT_OFFSET) {
            enemy.hitBoss();
            bottle.triggerSplash();
          }
        }
      });

      if (!bottle.glass && bottleBottom >= groundY + BOTTLE_GROUND_OFFSET) {
        bottle.triggerSplash();
      }
    });

  }

  winGame() {
    if (this.gameWon) {
      return;
    }
    this.gameWon = true;
    this.winFrame = 0;
    this.winFrameTicks = 0;
    this.gameLost = false;
  }

  loseGame() {
    if (this.gameLost || this.gameWon) {
      return;
    }
    this.gameLost = true;
    this.winFrame = 0;
    this.winFrameTicks = 0;
  }

  restartGame() {
    location.reload();
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);

 
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusbarCoins);
    this.addToMap(this.statusbarBottles);
    this.addToMap(this.statusbarEndboss);

    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    if (this.gameWon || this.gameLost) {
      this.drawWinOverlay();
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  loadWinImages() {
    this.IMAGES_WIN.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.winImageCache[path] = img;
    });
  }

  drawWinOverlay() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    const winWidth = 300;
    const winHeight = 200;
    const winX = (this.canvas.width - winWidth) / 2;
    const winY = (this.canvas.height - winHeight) / 2;

    const framePath = this.IMAGES_WIN[this.winFrame];
    const img = this.winImageCache[framePath];
    if (img) {
      this.ctx.drawImage(img, winX, winY, winWidth, winHeight);
    }

    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("Press R to restart", winX + 20, winY + winHeight + 30);
    this.ctx.restore();

    this.winFrameTicks++;
    if (this.winFrameTicks >= 10) {
      this.winFrameTicks = 0;
      if (this.winFrame < this.IMAGES_WIN.length - 1) {
        this.winFrame++;
      }
    }
  }
}
