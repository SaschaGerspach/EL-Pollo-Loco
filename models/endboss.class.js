class Endboss extends MovableObject{
    width = 250;
    height = 400;
    y = 50;
    stopMovingEndboss;
    stopMovingEndboss;
    endbossAggroTriggered = false;

    offset = {
        top: 0,
        left: -20,
        right: 20,
        bottom: 0,
      };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
      'img/4_enemie_boss_chicken/2_alert/G5.png',
      'img/4_enemie_boss_chicken/2_alert/G6.png',
      'img/4_enemie_boss_chicken/2_alert/G7.png',
      'img/4_enemie_boss_chicken/2_alert/G8.png',
      'img/4_enemie_boss_chicken/2_alert/G9.png',
      'img/4_enemie_boss_chicken/2_alert/G10.png',
      'img/4_enemie_boss_chicken/2_alert/G11.png',
      'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_WIN = [
        'img/9_intro_outro_screens/win/win_1.png'
    ]


    ALERT_DISTANCE = 550;
    ATTACK_DISTANCE = 100;
    bossDead = 0;
    deathAnimationStarted = false;
    alertStarted = false;
    alertFinished = false;
    walkAnimationCounter = 0;

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WIN);
        this.x = 2600;
        this.animate();
    }

    win(){
      
            this.height = 200;
            this.width = 720;
            this.x = 0;
            this.y = 180;
            this.loadImage(this.IMAGES_WIN);
            clearAllIntervals();
    

    }

    animate(){
        let distance;
        let endBoss = setInterval(() => {
            let playerX = this.characterX;
            if (playerX === undefined && this.world && this.world.character) {
                playerX = this.world.character.x;
            }
            distance = Math.abs(parseInt(playerX) - parseInt(this.x));
            if (Number.isNaN(distance)) {
                return;
            }

            if (this.bossIsDead()) {
                if (!this.deathAnimationStarted) {
                    this.currentImage = 0;
                    this.deathAnimationStarted = true;
                }

                this.playAnimationOnce(this.IMAGES_DEAD);
                this.bossDead++;
                if (this.bossDead == 8) {
                    if (this.world && typeof this.world.winGame === "function") {
                        this.world.winGame();
                    } else {
                        this.win();
                    }
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (!this.alertStarted && distance <= this.ALERT_DISTANCE) {
                    this.alertStarted = true;
                    this.alertFinished = false;
                    this.currentImage = 0;
                }

                if (this.alertStarted && !this.alertFinished) {
                    this.playAnimationOnce(this.IMAGES_ALERT);
                    if (this.currentImage >= this.IMAGES_ALERT.length - 1) {
                        this.alertFinished = true;
                        this.currentImage = 0;
                    }
                    return;
                }

                if (!this.alertStarted) {
                    this.playAnimation(this.IMAGES_WALKING);
                    return;
                }

                if (this.alertFinished) {
                    if (distance > this.ATTACK_DISTANCE) {
                        this.moveLeft();
                        this.x -= 4;
                        if (this.walkAnimationCounter % 2 === 0) {
                            this.playAnimation(this.IMAGES_WALKING);
                        }
                    } else {
                        this.moveLeft();
                        this.x -= 4;
                        if (this.walkAnimationCounter % 2 === 0) {
                            this.playAnimation(this.IMAGES_ATTACK);
                        }
                    }
                    this.walkAnimationCounter++;
                }
            }

        }, 200);
    }
 
}
