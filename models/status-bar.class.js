class Statusbar extends DrawableObject {
  IMAGES_HP = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  amountOrPercantage;

  bottles = 0;
  coins = 0;


  constructor() {
    super();
    this.loadImages(this.IMAGES_HP);
    this.x = 10;
    this.y = 0;
    this.width = 170;
    this.height = 50;
    this.setPercantage(100);
  }

  setPercantage(percantage) {
    this.amountOrPercantage = percantage;
    let path = this.IMAGES_HP[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }



  resolveImageIndex() {
    if (this.amountOrPercantage >= 85) {
      return 5;
    } else if (this.amountOrPercantage >= 65) {
      return 4;
    } else if (this.amountOrPercantage >= 45) {
      return 3;
    } else if (this.amountOrPercantage >= 25) {
      return 2;
    } else if (this.amountOrPercantage >= 5) {
      return 1;
    } else {
      return 0;
    }
  }
}
