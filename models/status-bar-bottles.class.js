class StatusbarBottles extends Statusbar {
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.y = 40;
    this.setAmountBottles(0);
  }

  setAmountBottles(bottles) {
    this.amountOrPercantage = bottles;
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
