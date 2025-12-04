class Coins extends BackgroundObject{

    width = 100;
    height = 100;

    offset = {
        top: 0,
        left: 40,
        right: 20,
        bottom: 0,
      };

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 300 - this.height;
    }

}