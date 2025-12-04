class StatusbarEndboss extends Statusbar {
    IMNAGES_ENDBOSS_HP = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    bossEnergy = 100;
    constructor(){
        super().loadImage("img/7_statusbars/2_statusbar_endboss/blue/blue0.png");
        this.loadImages(this.IMNAGES_ENDBOSS_HP);
        this.y = 10;
        this.x = 540;
        this.setBossPercantage(100);

    }

    setBossPercantage(bossPercantage) {
        this.amountOrPercantage = bossPercantage;
        let path = this.IMNAGES_ENDBOSS_HP[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }
    
}