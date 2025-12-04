class Chicken extends MovableObject{
    width = 100;
    height = 70;
    y = 360;
    stopMoving;
    stopWalking;
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 200 + Math.random() *2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate(){
       this.stopMoving = setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);
        this.stopWalking = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.x -= 2;
        }, 200);
    
    }
      
}