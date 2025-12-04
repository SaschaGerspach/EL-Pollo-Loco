class Bottles extends BackgroundObject{

    width = 100;
    height = 70;

    offset = {
        top: 0,
        left: 60,
        right: 20,
        bottom: 0,
      };

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 430 - this.height;
    }

}