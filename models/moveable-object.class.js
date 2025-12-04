class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  amountBottle = 0;
  amountCoins = 0;
  glass = false;


  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  isColliding(mo) {
    if (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R -> L
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T -> B
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // B -> T
    ) {
      let collisionLeft = mo.x + mo.width - this.x; //von links
      let collisionRight = this.x + this.width - mo.x; //von rechts
      let collisionBottom = mo.y + mo.height - this.y; //von unten
      let collisionTop = this.y + this.height - mo.y; //von oben

      if (collisionTop < collisionBottom) {
        if (collisionTop < collisionLeft && collisionTop < collisionRight) {
          return "bottom";
        }
      } else {
        if (collisionBottom < collisionLeft && collisionBottom < collisionRight) {
          return "top";
        }
      }

      // Wenn keine vertikale Kollision, dann horizontale Kollision prüfen
      if (collisionLeft < collisionRight) {
        return "left";
      } else {
        return "right";
      }
    }
    return null; // Keine Kollision
  }

  hitBoss() {
    if (!this.world || !this.world.statusbarEndboss) {
      return;
    }

    this.world.statusbarEndboss.bossEnergy -= 20;
    if (this.world.statusbarEndboss.bossEnergy < 0) {
      this.world.statusbarEndboss.bossEnergy = 0;
    }
    this.lastHit = new Date().getTime();
    this.world.statusbarEndboss.setBossPercantage(this.world.statusbarEndboss.bossEnergy);
  }

  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.4;
  }

  isDead() {
    return this.energy == 0;
  }

  bossIsDead(){
    return this.world.statusbarEndboss.bossEnergy  == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Play an animation once and then keep showing the last frame.
   */
  playAnimationOnce(images) {
    const lastIndex = images.length - 1;

    if (this.currentImage > lastIndex) {
      this.currentImage = lastIndex;
    }

    if (this.currentImage < lastIndex) {
      const path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      const path = images[lastIndex];
      this.img = this.imageCache[path];
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
