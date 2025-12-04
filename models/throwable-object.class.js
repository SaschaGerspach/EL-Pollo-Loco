class ThrowableObject extends MovableObject {
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  world;
  throwOrSplash; // Interval-ID
  glass = false; // true, sobald die Flasche zerschellt

  THROW_INTERVAL = 50; // ms pro Tick für Bewegung/Animation
  ROTATION_FRAME_TIME = 120; // ms pro Rotationsframe
  SPLASH_DURATION = 600; // ms Gesamtdauer der Splash-Animation

  constructor(x, y) {
    super().loadImage(this.IMAGES_THROW[0]);
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);

    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;

    this.throw();
  }

  /**
   * Wurfphase:
   * - Flug per Gravitation + horizontale Bewegung
   * - Rotationsanimation
   * Splashphase wird über triggerSplash() ausgelöst.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    const dx = 10;
    let timeSinceLastFrame = 0;

    this.throwOrSplash = setInterval(() => {
      if (this.glass) {
        this.playAnimation(this.IMAGES_SPLASH);
        return;
      }

      this.x += dx;

      timeSinceLastFrame += this.THROW_INTERVAL;
      if (timeSinceLastFrame >= this.ROTATION_FRAME_TIME) {
        this.playAnimation(this.IMAGES_THROW);
        timeSinceLastFrame = 0;
      }
    }, this.THROW_INTERVAL);
  }

  /**
   * Splashphase starten und nach Ablauf despawnen.
   */
  triggerSplash() {
    if (this.glass) {
      return;
    }

    this.glass = true;
    this.speedY = 0;
    this.acceleration = 0;

    setTimeout(() => {
      if (this.throwOrSplash) {
        clearInterval(this.throwOrSplash);
        this.throwOrSplash = null;
      }
      this.y = 900; // außerhalb des sichtbaren Bereichs
    }, this.SPLASH_DURATION);
  }
}
