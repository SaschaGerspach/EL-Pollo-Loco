class ChickenSmall extends MovableObject{
    stopMovingSmall;
    stopWalkingSmall;

        IMAGES_SMALL_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_SMALL_DEAD =  [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_SMALL_WALKING[0]);
        this.loadImages(this.IMAGES_SMALL_WALKING);
        this.loadImages(this.IMAGES_SMALL_DEAD);
        this.width = 80;
        this.height = 60;
        this.y = 370;
        this.x = 300 + Math.random() *2000;;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.stopMovingSmall = setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);
        this.stopWalkingSmall = setInterval(() => {
            this.playAnimation(this.IMAGES_SMALL_WALKING);
            this.x -= 0.5;
        }, 300);
        
    }


}


