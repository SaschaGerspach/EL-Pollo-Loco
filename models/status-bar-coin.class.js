class StatusbarCoins extends Statusbar {
  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
    this.loadImages(this.IMAGES_COIN);
    this.y = 80;
    this.setAmountCoins(0);
  }

  setAmountCoins(coins) {
    this.amountOrPercantage = coins;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
